import 'server-only';

import { BL_PUBLICATIONS_COLLECTION } from '@repo/content-types';
import { getAdminFirestore } from '@/firebase/admin';
import {
  type BlPublication,
  formatPublicationDate,
  getBlPublicationBySlug,
  getBlPublications,
} from '@/lib/bl-publications';
import type { CmsPublicationRecord } from '@/lib/bl-cms-types';
import { parseTags } from '@/lib/publication-tags';

export type { CmsPublicationRecord };

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function bool(value: unknown): boolean {
  return value === true;
}

function isoDate(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value) {
    const d = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  return null;
}

export function mapCmsPublication(id: string, data: Record<string, unknown>): CmsPublicationRecord {
  return {
    id,
    title: str(data.title),
    slug: str(data.slug),
    excerpt: str(data.excerpt),
    tags: parseTags(Array.isArray(data.tags) ? data.tags.map(str) : str(data.tags)),
    body: str(data.body),
    author: str(data.author) || 'Estudio Bengolea & Lamas',
    publishDate: isoDate(data.publishDate) || str(data.publishDate),
    published: bool(data.published),
    heroImage: str(data.heroImage),
    seoTitle: str(data.seoTitle),
    seoDescription: str(data.seoDescription),
    updatedAt: isoDate(data.updatedAt),
    origin: 'cms',
  };
}

function cmsToPublic(row: CmsPublicationRecord): BlPublication {
  return {
    title: row.title,
    excerpt: row.excerpt,
    tags: row.tags,
    publishDate: row.publishDate,
    author: row.author,
    legacyUrl: '',
    guid: row.id,
    slug: row.slug,
    source: 'cms',
    heroImage: row.heroImage || null,
    bodyHtml: row.body,
    seoTitle: row.seoTitle || undefined,
    seoDescription: row.seoDescription || undefined,
    updatedAt: row.updatedAt,
  };
}

export async function listAllCmsRecords(): Promise<CmsPublicationRecord[]> {
  try {
    const snap = await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).get();
    return snap.docs.map((doc) => mapCmsPublication(doc.id, doc.data()));
  } catch (e) {
    console.warn('[bl-cms] no se pudieron leer publicaciones CMS', e);
    return [];
  }
}

export async function listPublishedCmsPublications(): Promise<BlPublication[]> {
  const rows = await listAllCmsRecords();
  return rows
    .filter((row) => row.published)
    .map(cmsToPublic)
    .sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''));
}

export async function getCmsRecordBySlug(slug: string): Promise<CmsPublicationRecord | null> {
  const decoded = decodeSafe(slug);
  try {
    const snap = await getAdminFirestore()
      .collection(BL_PUBLICATIONS_COLLECTION)
      .where('slug', '==', decoded)
      .limit(4)
      .get();
    return snap.docs[0] ? mapCmsPublication(snap.docs[0].id, snap.docs[0].data()) : null;
  } catch (e) {
    console.warn('[bl-cms] no se pudo leer la publicación CMS', e);
    return null;
  }
}

export async function getCmsPublicationBySlug(slug: string): Promise<BlPublication | null> {
  const row = await getCmsRecordBySlug(slug);
  if (!row?.published) return null;
  return cmsToPublic(row);
}

export async function getAllPublicPublications(): Promise<BlPublication[]> {
  const cmsRows = await listAllCmsRecords();
  const occupied = new Set(cmsRows.map((row) => row.slug));
  const cms = cmsRows.filter((row) => row.published).map(cmsToPublic);
  const legacy = getBlPublications().filter((p) => !occupied.has(p.slug));
  return [...cms, ...legacy].sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''));
}

export async function resolvePublicPublication(slug: string): Promise<BlPublication | null> {
  const row = await getCmsRecordBySlug(slug);
  if (row) return row.published ? cmsToPublic(row) : null;
  return getBlPublicationBySlug(slug) ?? null;
}

function decodeSafe(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export { formatPublicationDate };
