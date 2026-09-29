'use server';

import type { ChatMessage } from '@/lib/chat-types';

function bridgeUrl(): string | null {
  const url = process.env.INTAKE_BRIDGE_URL?.trim();
  return url || null;
}

export async function continueCaseIntake(history: ChatMessage[]): Promise<ChatMessage> {
  const url = bridgeUrl();
  const secret = process.env.INTAKE_BRIDGE_SECRET?.trim();

  if (!url || !secret) {
    return {
      id: `error-config-${Date.now()}`,
      role: 'system',
      content:
        'El asistente no está configurado en este entorno. Usá el formulario de contacto o escribinos por WhatsApp.',
    };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
        'X-Intake-Site': 'bengolea-lamas',
      },
      body: JSON.stringify({ history }),
      cache: 'no-store',
    });

    if (res.status === 429) {
      return {
        id: `error-rate-${Date.now()}`,
        role: 'system',
        content: 'Recibimos muchas consultas en poco tiempo. Esperá unos minutos e intentá de nuevo.',
      };
    }

    if (!res.ok) {
      console.error('[case-intake] bridge HTTP', res.status);
      return {
        id: `error-bridge-${Date.now()}`,
        role: 'system',
        content: 'No pudimos conectar con el asistente. Intentá nuevamente o usá contacto tradicional.',
      };
    }

    const data = (await res.json()) as { message?: ChatMessage };
    if (!data.message?.content) {
      return {
        id: `error-empty-${Date.now()}`,
        role: 'system',
        content: 'Respuesta inválida del asistente. Intentá de nuevo.',
      };
    }
    return data.message;
  } catch (e) {
    console.error('[case-intake] bridge fetch failed', e);
    return {
      id: `error-network-${Date.now()}`,
      role: 'system',
      content: 'Error de red al contactar el asistente. Revisá tu conexión e intentá otra vez.',
    };
  }
}
