import 'server-only';

import { evaluateBlCaseIntake } from '@/ai/flows/case-intake-bl-flow';
import { getBlPublicAppUrl } from '@/lib/bl-public-app-url';
import type { BlConversationOutput } from '@/lib/case-intake-bl-types';
import { persistBlCaseIntake } from '@/lib/persist-bl-case-intake';
import { sendBlIntakeEmail } from '@/lib/send-bl-intake-email';
import type { ChatMessage } from '@/lib/types';

function messageForAiFailure(error: unknown): string {
  const defaultMsg =
    'Hubo un problema con el asistente. Podés intentar de nuevo en unos minutos o contactar al estudio por los medios habituales.';
  if (!error || typeof error !== 'object') return defaultMsg;
  const e = error as { message?: string; code?: number; status?: string };
  const blob = `${e.message ?? ''}`.toLowerCase();
  if (e.code === 429 || e.status === 'RESOURCE_EXHAUSTED' || blob.includes('429')) {
    return 'El asistente no está disponible momentáneamente por límite de uso. Intentá más tarde o escribinos por contacto.';
  }
  return defaultMsg;
}

export async function processBlCaseIntakeConversation(history: ChatMessage[]): Promise<ChatMessage> {
  try {
    const assistantOutput: BlConversationOutput = await evaluateBlCaseIntake(history);

    if (assistantOutput.isFinished && assistantOutput.structuredData) {
      const persisted = await persistBlCaseIntake(assistantOutput.structuredData);
      const openInAdminUrl = persisted.ok
        ? `${getBlPublicAppUrl()}/admin/consultas/${encodeURIComponent(persisted.id)}`
        : undefined;
      const emailResult = await sendBlIntakeEmail(assistantOutput.structuredData, { openInAdminUrl });
      if (!persisted.ok && !emailResult.success) {
        return {
          id: `error-email-${Date.now()}`,
          role: 'system',
          content:
            'No pudimos registrar tu consulta. Por favor, intentá nuevamente con el botón de reintentar o usá el formulario de contacto. No hace falta repetir todo el relato si el asistente ya lo tiene en esta conversación.',
          isFinished: false,
          submissionFailed: true,
        };
      }

      return {
        id: `asistente-${Date.now()}`,
        role: 'assistant',
        content:
          assistantOutput.nextMessage ||
          'Recibimos tu consulta. El resumen fue enviado al Estudio Bengolea & Lamas para su revisión. Si necesitamos información adicional, podremos contactarte con los datos que proporcionaste.',
        isFinished: true,
        leadCaptured: true,
      };
    }

    return {
      id: `asistente-${Date.now()}`,
      role: 'assistant',
      content: assistantOutput.nextMessage,
      quickReplies: assistantOutput.quickReplies,
      isFinished: assistantOutput.isFinished,
    };
  } catch (aiError) {
    console.error('[case-intake-bl]', aiError);
    return {
      id: `error-${Date.now()}`,
      role: 'system',
      content: messageForAiFailure(aiError),
    };
  }
}
