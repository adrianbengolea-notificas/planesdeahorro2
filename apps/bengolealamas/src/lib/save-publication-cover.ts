import 'server-only';

import { randomBytes, randomUUID } from 'node:crypto';
import { getAdminApp, resolveStorageBucketName } from '@/firebase/admin';
import { firebaseConfig } from '@/firebase/config';
import { getStorage } from 'firebase-admin/storage';

const COVER_MAX_BYTES = 6 * 1024 * 1024;
const COVER_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function bucketNames(): string[] {
  const named = resolveStorageBucketName();
  const project = firebaseConfig.projectId;
  return [...new Set([named, `${project}.appspot.com`, `${project}.firebasestorage.app`].filter(Boolean))];
}

function extensionFor(mime: string, fileName: string): string | null {
  const fromMime = COVER_TYPES[mime];
  if (fromMime) return fromMime;
  const fromName = fileName.toLowerCase().match(/\.(jpe?g|png|webp)$/)?.[1];
  if (!fromName) return null;
  return fromName === 'jpeg' ? 'jpg' : fromName;
}

export async function savePublicationCover(input: {
  buffer: Buffer;
  mime: string;
  fileName: string;
}): Promise<{ url: string }> {
  if (!input.buffer.length) {
    throw new Error('Seleccioná una imagen.');
  }
  if (input.buffer.length > COVER_MAX_BYTES) {
    throw new Error('La imagen supera el máximo de 6 MB.');
  }
  const mime = (input.mime || '').toLowerCase();
  const ext = extensionFor(mime, input.fileName);
  if (!ext) {
    throw new Error('Usá JPG, PNG o WebP.');
  }

  const objectPath = `bl-publication-covers/${randomUUID()}.${ext}`;
  const token = randomBytes(32).toString('hex');
  const contentType = COVER_TYPES[mime] ? mime : `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  const names = bucketNames();
  let lastError: Error | null = null;

  for (const name of names) {
    try {
      const bucket = getStorage(getAdminApp()).bucket(name);
      await withTimeout(
        bucket.file(objectPath).save(input.buffer, {
          resumable: false,
          metadata: {
            contentType,
            cacheControl: 'public, max-age=31536000',
            metadata: { firebaseStorageDownloadTokens: token },
          },
        }),
        20_000,
        `Storage no respondió al subir a ${name}.`,
      );
      return {
        url: `https://firebasestorage.googleapis.com/v0/b/${name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw lastError ?? new Error('No se pudo subir la imagen.');
}
