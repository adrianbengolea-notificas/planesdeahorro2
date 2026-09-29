'use server';

import { randomUUID } from 'node:crypto';
import { getAdminStorage } from '@/firebase/admin';

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

export type CaseIntakeAttachment = {
  path: string;
  fileName: string;
};

export async function uploadCaseIntakeAttachment(
  sessionId: string,
  formData: FormData,
): Promise<{ ok: true; file: CaseIntakeAttachment } | { ok: false; error: string }> {
  const sid = sessionId.trim();
  if (!/^[a-f0-9-]{36}$/i.test(sid)) {
    return { ok: false, error: 'Sesión inválida.' };
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return { ok: false, error: 'Archivo requerido.' };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'El archivo supera 4 MB.' };
  }
  const type = file.type || 'application/octet-stream';
  if (!ALLOWED.has(type)) {
    return { ok: false, error: 'Formato no permitido (PDF o imagen).' };
  }

  const safeName = file.name.replace(/[^\w.\-()+ áéíóúñÁÉÍÓÚÑ]/g, '_').slice(0, 120) || 'documento';
  const path = `bl-intake-attachments/${sid}/${randomUUID()}-${safeName}`;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = getAdminStorage().bucket();
    await bucket.file(path).save(buffer, {
      metadata: { contentType: type },
      resumable: false,
    });
    return { ok: true, file: { path, fileName: safeName } };
  } catch (e) {
    console.error('[case-intake-upload]', e);
    return { ok: false, error: 'No se pudo subir el archivo.' };
  }
}
