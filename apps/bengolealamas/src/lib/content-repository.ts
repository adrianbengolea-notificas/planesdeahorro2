import 'server-only';
import type { ContentDocument, SiteId } from '@repo/content-types';

/**
 * Capa futura de lectura Firestore para B&L.
 * Todas las consultas deberán incluir `where('siteId', '==', 'bl')`.
 *
 * NO conectado a producción en esta fase — evita tocar reglas o datos de Adrian.
 */
export type ListContentOptions = {
  siteId: SiteId;
  kind?: ContentDocument['kind'];
  publishedOnly?: boolean;
  limit?: number;
};

export async function listContent(options: ListContentOptions): Promise<ContentDocument[]> {
  if (options.siteId !== 'bl') return [];
  const { getBlPublications } = await import('@/lib/bl-publications');
  const pubs = getBlPublications();
  const docs: ContentDocument[] = pubs.map((p) => ({
    siteId: 'bl',
    kind: 'publication',
    title: p.title,
    slug: p.slug,
    pathSegments: ['publicaciones', p.slug],
    description: p.excerpt,
    excerpt: p.excerpt,
    body: p.excerpt,
    authorIds: [],
    publishDate: p.publishDate || p.guid,
    updatedAt: p.publishDate || p.guid,
    tagIds: [],
    seo: { title: p.title, description: p.excerpt.slice(0, 160) },
    relations: { relatedContentIds: [], legislationRefs: [], rulingRefs: [], faqIds: [] },
    published: true,
  }));
  if (options.kind && options.kind !== 'publication') return [];
  const filtered = options.publishedOnly === false ? docs : docs.filter((d) => d.published);
  const limit = options.limit ?? filtered.length;
  return filtered.slice(0, limit);
}

export async function getContentByPath(
  siteId: SiteId,
  pathSegments: string[],
): Promise<ContentDocument | null> {
  if (siteId !== 'bl' || pathSegments[0] !== 'publicaciones' || !pathSegments[1]) return null;
  const slug = decodeURIComponent(pathSegments.slice(1).join('/'));
  const all = await listContent({ siteId: 'bl', kind: 'publication', publishedOnly: true });
  return all.find((d) => d.slug === slug) ?? null;
}
