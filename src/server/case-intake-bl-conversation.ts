import 'server-only';

import { evaluateBlCaseIntake } from '@/ai/flows/case-intake-bl-flow';
import type { BlConversationOutput } from '@/lib/case-intake-bl-types';
import { deliverBlCaseIntake } from '@/server/bl-case-intake-delivery';
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
      const structured = assistantOutput.structuredData;
      const delivery = await deliverBlCaseIntake(structured);

      if (!delivery.persisted && !delivery.emailSent) {
        return {
          id: `error-email-${Date.now()}`,
          role: 'system',
          content:
            'No pudimos registrar tu consulta. Usá «Reintentar envío» (no hace falta repetir el relato) o el formulario de contacto.',
          isFinished: false,
          submissionFailed: true,
          pendingSubmission: structured as unknown as Record<string, unknown>,
        };
      }

      if (!delivery.emailSent) {
        return {
          id: `error-email-${Date.now()}`,
          role: 'system',
          content:
            'Tu consulta quedó registrada, pero el aviso al estudio falló. Podés reintentar el envío sin volver a charlar con el asistente.',
          isFinished: false,
          submissionFailed: true,
          pendingSubmission: structured as unknown as Record<string, unknown>,
          intakeId: delivery.intakeId,
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
