'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { BL_PUBLICATIONS_COLLECTION } from '@repo/content-types';
import { getAdminFirestore, requireAdminSession } from '@/firebase/admin';
import { savePublicationCover } from '@/lib/save-publication-cover';
import { getCmsRecordBySlug, listAllCmsRecords, mapCmsPublication } from '@/lib/bl-cms-publications';
import type { CmsPublicationRecord } from '@/lib/bl-cms-types';
import {
  getBlPublicationBySlug,
  getBlPublications,
  readPublicationHtml,
  resolvePublicationThumbnail,
} from '@/lib/bl-publications';
import { parseTags } from '@/lib/publication-tags';
import { htmlHasContent, sanitizeRichHtml } from '@/lib/sanitize-rich-html';
import { normalizeAdminSlug } from '@/lib/slugify';

export type AdminResult<T = void> = { ok: true; data?: T } | { ok: false; error: string };

export type PublicationPayload = {
  title: string;
  slug: string;
  excerpt: string;
  tags?: string | string[];
  body: string;
  author: string;
  publishDate: string;
  published: boolean;
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
};

function normalizePayload(input: PublicationPayload): { ok: true; data: PublicationPayload } | { ok: false; error: string } {
  const title = input.title.trim();
  const slug = normalizeAdminSlug(input.slug || input.title);
  const publishing = input.published === true;
  const excerpt = input.excerpt.trim() || (publishing ? '' : title);
  const tags = parseTags(input.tags);
  const body = sanitizeRichHtml(input.body);
  const author = input.author.trim() || 'Estudio Bengolea & Lamas';
  const publishDate = input.publishDate.trim() || new Date().toISOString();
  const heroImage = (input.heroImage ?? '').trim();
  const seoTitle = (input.seoTitle ?? '').trim();
  const seoDescription = (input.seoDescription ?? '').trim();

  if (title.length < 3) return { ok: false, error: 'El título debe tener al menos 3 caracteres.' };
  if (!slug || !/^[-a-z0-9_\u00C0-\u024F]+$/i.test(slug)) {
    return { ok: false, error: 'Slug inválido. Completá el título o la URL.' };
  }
  if (body.length > 400_000) return { ok: false, error: 'El cuerpo es demasiado largo.' };
  if (publishing && excerpt.length < 10) return { ok: false, error: 'El extracto debe tener al menos 10 caracteres para publicar.' };
  if (publishing && !htmlHasContent(body)) return { ok: false, error: 'El cuerpo de la nota es demasiado corto para publicar.' };
  if (!publishing && !htmlHasContent(body, 1)) return { ok: false, error: 'Escribí al menos un párrafo en el cuerpo para guardar el borrador.' };

  return {
    ok: true,
    data: {
      title,
      slug,
      excerpt,
      tags,
      body,
      author,
      publishDate,
      published: input.published === true,
      heroImage,
      seoTitle,
      seoDescription,
    },
  };
}

async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const snap = await getAdminFirestore()
    .collection(BL_PUBLICATIONS_COLLECTION)
    .where('slug', '==', slug)
    .limit(2)
    .get();
  return snap.docs.some((d) => d.id !== exceptId);
}

function legacyToAdminRow(pub: {
  title: string;
  excerpt: string;
  tags?: string[];
  publishDate: string;
  author: string;
  slug: string;
  heroImage?: string | null;
  migratedAt?: string;
}): CmsPublicationRecord {
  return {
    id: `legacy:${pub.slug}`,
    origin: 'legacy',
    title: pub.title,
    slug: pub.slug,
    excerpt: pub.excerpt,
    tags: pub.tags ?? [],
    body: '',
    author: pub.author || 'Estudio Bengolea & Lamas',
    publishDate: pub.publishDate,
    published: true,
    heroImage: pub.heroImage ?? '',
    seoTitle: '',
    seoDescription: '',
    updatedAt: pub.migratedAt ?? pub.publishDate ?? null,
  };
}

export async function listBlPublications(idToken: string): Promise<AdminResult<CmsPublicationRecord[]>> {
  try {
    await requireAdminSession(idToken);
    const cms = await listAllCmsRecords();
    const occupied = new Set(cms.map((row) => row.slug));
    const legacy = getBlPublications()
      .filter((pub) => !occupied.has(pub.slug))
      .map(legacyToAdminRow);
    const rows = [...cms, ...legacy].sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''));
    return { ok: true, data: rows };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudieron listar las notas.' };
  }
}

export async function adoptLegacyPublication(
  idToken: string,
  slug: string,
): Promise<AdminResult<{ id: string }>> {
  try {
    const session = await requireAdminSession(idToken);
    const decoded = slug.trim();
    if (!decoded) return { ok: false, error: 'Falta el slug.' };
    const existing = await getCmsRecordBySlug(decoded);
    if (existing) return { ok: true, data: { id: existing.id } };

    const pub = getBlPublicationBySlug(decoded);
    if (!pub) return { ok: false, error: 'No se encontró la nota migrada.' };

    const html = pub.contentFile ? readPublicationHtml(pub.contentFile) : '';
    const body = sanitizeRichHtml(html || `<p>${pub.excerpt || pub.title}</p>`);
    const heroImage = resolvePublicationThumbnail(pub) ?? '';

    const ref = await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).add({
      siteId: 'bl',
      kind: 'publication',
      title: pub.title,
      slug: pub.slug,
      excerpt: (pub.excerpt || pub.title).trim(),
      tags: pub.tags ?? [],
      body,
      author: pub.author || 'Estudio Bengolea & Lamas',
      publishDate: pub.publishDate || new Date().toISOString(),
      published: true,
      heroImage,
      seoTitle: '',
      seoDescription: '',
      adoptedFrom: 'wix',
      authorId: session.uid,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { ok: true, data: { id: ref.id } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo abrir la nota migrada.' };
  }
}

export async function getBlPublication(
  idToken: string,
  id: string,
): Promise<AdminResult<CmsPublicationRecord>> {
  try {
    await requireAdminSession(idToken);
    if (id.startsWith('legacy:')) {
      const adopted = await adoptLegacyPublication(idToken, id.slice('legacy:'.length));
      if (!adopted.ok) return adopted;
      if (!adopted.data?.id) return { ok: false, error: 'No se pudo abrir la nota migrada.' };
      id = adopted.data.id;
    }
    const snap = await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).doc(id).get();
    if (!snap.exists) return { ok: false, error: 'Nota no encontrada.' };
    return { ok: true, data: mapCmsPublication(snap.id, snap.data() ?? {}) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo leer la nota.' };
  }
}

export async function createBlPublication(
  idToken: string,
  input: PublicationPayload,
): Promise<AdminResult<{ id: string }>> {
  try {
    const session = await requireAdminSession(idToken);
    const normalized = normalizePayload(input);
    if (!normalized.ok) return normalized;
    if (await slugTaken(normalized.data.slug)) {
      return { ok: false, error: 'Ya existe una nota con ese slug.' };
    }
    const ref = await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).add({
      siteId: 'bl',
      kind: 'publication',
      ...normalized.data,
      authorId: session.uid,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { ok: true, data: { id: ref.id } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo crear la nota.' };
  }
}

export async function updateBlPublication(
  idToken: string,
  id: string,
  input: PublicationPayload,
): Promise<AdminResult> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    const normalized = normalizePayload(input);
    if (!normalized.ok) return normalized;
    if (await slugTaken(normalized.data.slug, id)) {
      return { ok: false, error: 'Ya existe una nota con ese slug.' };
    }
    await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).doc(id).update({
      ...normalized.data,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo guardar la nota.' };
  }
}

export async function setBlPublicationPublished(
  idToken: string,
  id: string,
  published: boolean,
): Promise<AdminResult<{ id: string }>> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    if (id.startsWith('legacy:')) {
      const adopted = await adoptLegacyPublication(idToken, id.slice('legacy:'.length));
      if (!adopted.ok || !adopted.data?.id) return adopted;
      id = adopted.data.id;
    }
    await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).doc(id).update({
      published: published === true,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { ok: true, data: { id } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo actualizar el estado.' };
  }
}

export async function uploadBlPublicationCover(
  idToken: string,
  formData: FormData,
): Promise<AdminResult<{ url: string }>> {
  try {
    await requireAdminSession(idToken);
    const file = formData.get('file');
    if (typeof file !== 'object' || file === null || typeof (file as Blob).arrayBuffer !== 'function') {
      return { ok: false, error: 'Seleccioná una imagen.' };
    }
    const blob = file as Blob & { name?: string; type: string };
    if (!blob.size) return { ok: false, error: 'Seleccioná una imagen.' };
    const saved = await savePublicationCover({
      buffer: Buffer.from(await blob.arrayBuffer()),
      mime: blob.type || '',
      fileName: blob.name || 'portada.jpg',
    });
    return { ok: true, data: { url: saved.url } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo subir la imagen.' };
  }
}

export async function deleteBlPublication(idToken: string, id: string): Promise<AdminResult> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).doc(id).delete();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo eliminar la nota.' };
  }
}
