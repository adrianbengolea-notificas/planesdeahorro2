import 'server-only';
import type { DocumentData } from 'firebase-admin/firestore';
import { getAdminFirestore } from '@/firebase/admin';
import type { Fallo, PublishedFalloSummary } from '@/lib/types';

function toPlainFallo(id: string, data: DocumentData): Fallo {
  return {
    id,
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    tribunal: data.tribunal,
    date: data.date,
    tags: Array.isArray(data.tags) ? data.tags : [],
    content: data.content ?? '',
    published: data.published === true,
    pdfUrl: data.pdfUrl,
    pdfStoragePath: data.pdfStoragePath,
    pdfFileName: data.pdfFileName,
  };
}

export type FalloPublicLoadResult =
  | { mode: 'doc'; fallo: Fallo }
  | { mode: 'none' }
  | { mode: 'client_fallback' };

/**
 * Carga pública vía Admin SDK (misma estrategia que doctrina):
 * una cláusula `where` sobre `slug`, luego se verifica `published`.
 */
export async function loadFalloPublicBySlug(slug: string): Promise<FalloPublicLoadResult> {
  try {
    const db = getAdminFirestore();
    const snap = await db.collection('fallos').where('slug', '==', slug).limit(1).get();
    if (snap.empty) {
      return { mode: 'none' };
    }
    const d = snap.docs[0];
    const data = d.data();
    if (data.published !== true) {
      return { mode: 'none' };
    }
    return { mode: 'doc', fallo: toPlainFallo(d.id, data) };
  } catch (e) {
    console.warn('[fallos] carga vía Admin no disponible, se usa Firestore en el cliente', e);
    return { mode: 'client_fallback' };
  }
}

/** Listado publicado para sitemap / listado SSR (best-effort). */
export async function listPublishedFallosForSeo(): Promise<PublishedFalloSummary[]> {
  try {
    const db = getAdminFirestore();
    const snap = await db
      .collection('fallos')
      .where('published', '==', true)
      .orderBy('date', 'desc')
      .get();

    return snap.docs.map((d) => {
      const data = d.data();
      const updated =
        data.updatedAt?.toDate?.()?.toISOString?.() ??
        (typeof data.updatedAt === 'string' ? data.updatedAt : undefined);
      return {
        id: d.id,
        slug: String(data.slug ?? ''),
        title: String(data.title ?? ''),
        summary: String(data.summary ?? ''),
        tribunal: String(data.tribunal ?? ''),
        date: String(data.date ?? ''),
        ...(updated ? { updatedAt: updated } : {}),
      };
    }).filter((f) => f.slug);
  } catch (e) {
    console.warn('[fallos] listado SEO no disponible', e);
    return [];
  }
}
