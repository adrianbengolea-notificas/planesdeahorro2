import 'server-only';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { applicationDefault, cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { firebaseConfig } from '@/firebase/config';

function hasExplicitServiceAccountEnv(): boolean {
  return Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim() ||
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim(),
  );
}

function loadServiceAccountJson(): Record<string, string> {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) {
    try {
      return JSON.parse(inline) as Record<string, string>;
    } catch {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON no es JSON válido.');
    }
  }

  const pathFromEnv =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();

  if (pathFromEnv) {
    const absolute = resolve(pathFromEnv);
    const raw = readFileSync(absolute, 'utf8');
    return JSON.parse(raw) as Record<string, string>;
  }

  throw new Error(
    'Falta credencial de Admin SDK: definí FIREBASE_SERVICE_ACCOUNT_PATH o FIREBASE_SERVICE_ACCOUNT_JSON.',
  );
}

function resolveAdminProjectId(): string {
  const fromFirebaseConfig = process.env.FIREBASE_CONFIG?.trim();
  if (fromFirebaseConfig) {
    try {
      const parsed = JSON.parse(fromFirebaseConfig) as { projectId?: string };
      if (parsed.projectId) return parsed.projectId;
    } catch {
      /* ignorar */
    }
  }
  return (
    process.env.GOOGLE_CLOUD_PROJECT?.trim() ||
    process.env.GCLOUD_PROJECT?.trim() ||
    firebaseConfig.projectId
  );
}

export function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  if (hasExplicitServiceAccountEnv()) {
    const parsed = loadServiceAccountJson();
    return initializeApp({
      credential: cert({
        projectId: parsed.project_id,
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key?.replace(/\\n/g, '\n'),
      }),
    });
  }

  const projectId = resolveAdminProjectId();
  if (!projectId) {
    throw new Error('Admin SDK sin credencial: falta GOOGLE_CLOUD_PROJECT o projectId.');
  }

  return initializeApp({
    credential: applicationDefault(),
    projectId,
  });
}

export function getAdminFirestore() {
  return getFirestore(getAdminApp());
}

export function getAdminStorage() {
  return getStorage(getAdminApp());
}

export function resolveStorageBucketName(): string {
  return process.env.FIREBASE_STORAGE_BUCKET?.trim() || firebaseConfig.storageBucket;
}

export function getAdminBucket() {
  return getStorage(getAdminApp()).bucket(resolveStorageBucketName());
}

export async function verifySessionIsAdmin(idToken: string): Promise<{ uid: string; admin: boolean }> {
  const decoded = await getAuth(getAdminApp()).verifyIdToken(idToken);
  const snap = await getAdminFirestore().collection('admin_users').doc(decoded.uid).get();
  return { uid: decoded.uid, admin: snap.exists };
}

export async function requireAdminSession(
  idToken: string,
): Promise<{ uid: string; email: string | null }> {
  const decoded = await getAuth(getAdminApp()).verifyIdToken(idToken);
  const snap = await getAdminFirestore().collection('admin_users').doc(decoded.uid).get();
  if (!snap.exists) {
    throw new Error('No autorizado: se requiere cuenta de administrador.');
  }
  return { uid: decoded.uid, email: decoded.email ?? null };
}
