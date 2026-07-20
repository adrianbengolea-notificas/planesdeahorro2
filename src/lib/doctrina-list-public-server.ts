import 'server-only';
import { getAdminFirestore } from '@/firebase/admin';
import { doctrinalArticles } from '@/lib/data';

export type PublishedDoctrinaSummary = {
  slug: string;
  title: string;
  summary: string;
  publishDate: string;
  updatedAt?: string;
};

/** Listado publicado para sitemap (Firestore + fallback estático). */
export async function listPublishedDoctrinaForSeo(): Promise<PublishedDoctrinaSummary[]> {
  try {
    const db = getAdminFirestore();
    const snap = await db
      .collection('doctrina')
      .where('published', '==', true)
      .orderBy('publishDate', 'desc')
      .get();

    if (!snap.empty) {
      return snap.docs
        .map((d) => {
          const data = d.data();
          const updated =
            data.updatedAt?.toDate?.()?.toISOString?.() ??
            (typeof data.updatedAt === 'string' ? data.updatedAt : undefined);
          return {
            slug: String(data.slug ?? ''),
            title: String(data.title ?? ''),
            summary: String(data.summary ?? ''),
            publishDate: String(data.publishDate ?? ''),
            ...(updated ? { updatedAt: updated } : {}),
          };
        })
        .filter((a) => a.slug);
    }
  } catch (e) {
    console.warn('[doctrina] listado SEO no disponible, se usan artículos estáticos', e);
  }

  return doctrinalArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    summary: a.summary,
    publishDate: a.date,
  }));
}
