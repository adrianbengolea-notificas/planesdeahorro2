'use server';

import { validateCaseSpeechTopicWithLlm } from '@/ai/flows/validate-case-speech-topic';

/**
 * Indica si el texto del dictado corresponde al tema del formulario (planes de ahorro).
 * Si falla la IA, se devuelve ok: false (no mostrar el dictado).
 */
export async function validateCaseSpeechTopic(text: string): Promise<{ ok: boolean }> {
  try {
    const onTopic = await validateCaseSpeechTopicWithLlm(text);
    return { ok: onTopic };
  } catch (err) {
    console.error('[validateCaseSpeechTopic]', err);
    return { ok: false };
  }
}
