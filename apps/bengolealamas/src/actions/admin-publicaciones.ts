'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { BL_PUBLICATIONS_COLLECTION } from '@repo/content-types';
import { getAdminFirestore, requireAdminSession } from '@/firebase/admin';
import { savePublicationCover } from '@/lib/save-publication-cover';
import { mapCmsPublication } from '@/lib/bl-cms-publications';
import type { CmsPublicationRecord } from '@/lib/bl-cms-types';
import { parseTags } from '@/lib/publication-tags';
import { htmlHasContent, sanitizeRichHtml } from '@/lib/sanitize-rich-html';
import { slugify } from '@/lib/slugify';

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
  const slug = slugify(input.slug || input.title);
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
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { ok: false, error: 'Slug inválido. Completá el título o la URL.' };
  if (publishing && excerpt.length < 10) return { ok: false, error: 'El extracto debe tener al menos 10 caracteres para publicar.' };
  if (publishing && !htmlHasContent(body)) return { ok: false, error: 'El cuerpo de la nota es demasiado corto para publicar.' };
  if (!publishing && !htmlHasContent(body, 1)) return { ok: false, error: 'Escribí al menos un párrafo en el cuerpo para guardar el borrador.' };
  if (body.length > 200_000) return { ok: false, error: 'El cuerpo es demasiado largo.' };

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

export async function listBlPublications(idToken: string): Promise<AdminResult<CmsPublicationRecord[]>> {
  try {
    await requireAdminSession(idToken);
    const snap = await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).orderBy('updatedAt', 'desc').limit(200).get();
    return { ok: true, data: snap.docs.map((d) => mapCmsPublication(d.id, d.data())) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudieron listar las notas.' };
  }
}

export async function getBlPublication(
  idToken: string,
  id: string,
): Promise<AdminResult<CmsPublicationRecord>> {
  try {
    await requireAdminSession(idToken);
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
): Promise<AdminResult> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    await getAdminFirestore().collection(BL_PUBLICATIONS_COLLECTION).doc(id).update({
      published: published === true,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { ok: true };
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
