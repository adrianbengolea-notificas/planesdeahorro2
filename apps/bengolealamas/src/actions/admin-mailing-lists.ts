'use server';

import { FieldValue } from 'firebase-admin/firestore';
import {
  BL_MAILING_LISTS_COLLECTION,
  BL_MAILING_SENDS_COLLECTION,
  BL_PUBLICATIONS_COLLECTION,
} from '@repo/content-types';
import { getAdminFirestore, requireAdminSession } from '@/firebase/admin';
import { getBlMailingConfig, sendPublicationToContacts } from '@/lib/bl-mailing-email';
import type {
  MailingConfig,
  MailingContact,
  MailingListRecord,
  MailingListSummary,
  MailingSendRecord,
} from '@/lib/bl-mailing-types';
import { mapCmsPublication } from '@/lib/bl-cms-publications';
import {
  MAX_MAILING_CONTACTS,
  MAX_MAILING_CSV_CHARS,
  mergeContacts,
  parseMailingCsv,
} from '@/lib/parse-mailing-csv';

export type AdminResult<T = void> = { ok: true; data?: T } | { ok: false; error: string };

type CsvMode = 'replace' | 'merge';

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function iso(value: unknown): string | null {
  if (!value || typeof value !== 'object' || !('toDate' in value)) return null;
  const d = (value as { toDate: () => Date }).toDate();
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function asContacts(value: unknown): MailingContact[] {
  if (!Array.isArray(value)) return [];
  const out: MailingContact[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const email = str((item as { email?: string }).email).trim().toLowerCase();
    if (!email || seen.has(email)) continue;
    seen.add(email);
    out.push({ email, name: str((item as { name?: string }).name).trim() });
  }
  return out;
}

function mapListSummary(id: string, data: Record<string, unknown>): MailingListSummary {
  return {
    id,
    name: str(data.name),
    description: str(data.description),
    contactCount: typeof data.contactCount === 'number' ? data.contactCount : asContacts(data.contacts).length,
    updatedAt: iso(data.updatedAt),
  };
}

function mapList(id: string, data: Record<string, unknown>): MailingListRecord {
  const contacts = asContacts(data.contacts);
  return {
    ...mapListSummary(id, data),
    contacts,
    contactCount: contacts.length,
    createdAt: iso(data.createdAt),
    createdByEmail: str(data.createdByEmail) || null,
  };
}

function mapSend(id: string, data: Record<string, unknown>): MailingSendRecord {
  return {
    id,
    publicationId: str(data.publicationId),
    publicationTitle: str(data.publicationTitle),
    publicationSlug: str(data.publicationSlug),
    listIds: Array.isArray(data.listIds) ? data.listIds.map((item) => str(item)).filter(Boolean) : [],
    listNames: Array.isArray(data.listNames) ? data.listNames.map((item) => str(item)).filter(Boolean) : [],
    recipientCount: typeof data.recipientCount === 'number' ? data.recipientCount : 0,
    sentCount: typeof data.sentCount === 'number' ? data.sentCount : 0,
    failedCount: typeof data.failedCount === 'number' ? data.failedCount : 0,
    fromEmail: str(data.fromEmail),
    sentAt: iso(data.sentAt),
    sentByEmail: str(data.sentByEmail) || null,
    errorSummary: str(data.errorSummary),
  };
}

function parseIncomingCsv(csvText: string): AdminResult<{ contacts: MailingContact[]; skipped: number; duplicatesDropped: number; truncated: boolean }> {
  if (csvText.length > MAX_MAILING_CSV_CHARS) {
    return { ok: false, error: 'El archivo es demasiado grande. Probá un CSV más chico.' };
  }
  const parsed = parseMailingCsv(csvText);
  if (parsed.contacts.length === 0) {
    return { ok: false, error: 'No encontramos correos válidos en el CSV. Usá una columna email/correo, o un mail por línea.' };
  }
  return { ok: true, data: parsed };
}

export async function getBlMailingSetup(idToken: string): Promise<AdminResult<MailingConfig>> {
  try {
    await requireAdminSession(idToken);
    return { ok: true, data: getBlMailingConfig() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo leer la configuración de correo.' };
  }
}

export async function listBlMailingLists(idToken: string): Promise<AdminResult<MailingListSummary[]>> {
  try {
    await requireAdminSession(idToken);
    const snap = await getAdminFirestore().collection(BL_MAILING_LISTS_COLLECTION).get();
    const rows = snap.docs
      .map((doc) => mapListSummary(doc.id, doc.data() ?? {}))
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    return { ok: true, data: rows };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudieron listar las listas.' };
  }
}

export async function getBlMailingList(idToken: string, id: string): Promise<AdminResult<MailingListRecord>> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    const snap = await getAdminFirestore().collection(BL_MAILING_LISTS_COLLECTION).doc(id).get();
    if (!snap.exists) return { ok: false, error: 'Lista no encontrada.' };
    return { ok: true, data: mapList(snap.id, snap.data() ?? {}) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo leer la lista.' };
  }
}

export async function createBlMailingList(
  idToken: string,
  input: { name: string; description?: string; csvText: string },
): Promise<AdminResult<{ id: string; contactCount: number; skipped: number; duplicatesDropped: number; truncated: boolean }>> {
  try {
    const session = await requireAdminSession(idToken);
    const name = input.name.trim();
    if (name.length < 2) return { ok: false, error: 'El nombre de la lista debe tener al menos 2 caracteres.' };
    const parsed = parseIncomingCsv(input.csvText);
    if (!parsed.ok) return { ok: false, error: parsed.error };
    if (!parsed.data) return { ok: false, error: 'No se pudo leer el CSV.' };
    if (parsed.data.contacts.length > MAX_MAILING_CONTACTS) {
      return { ok: false, error: `Máximo ${MAX_MAILING_CONTACTS} contactos por lista.` };
    }
    const ref = await getAdminFirestore().collection(BL_MAILING_LISTS_COLLECTION).add({
      siteId: 'bl',
      name,
      description: (input.description ?? '').trim(),
      contacts: parsed.data.contacts,
      contactCount: parsed.data.contacts.length,
      createdByUid: session.uid,
      createdByEmail: session.email,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return {
      ok: true,
      data: {
        id: ref.id,
        contactCount: parsed.data.contacts.length,
        skipped: parsed.data.skipped,
        duplicatesDropped: parsed.data.duplicatesDropped,
        truncated: parsed.data.truncated,
      },
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo crear la lista.' };
  }
}

export async function updateBlMailingListMeta(
  idToken: string,
  id: string,
  input: { name: string; description: string },
): Promise<AdminResult> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    const name = input.name.trim();
    if (name.length < 2) return { ok: false, error: 'El nombre de la lista debe tener al menos 2 caracteres.' };
    await getAdminFirestore().collection(BL_MAILING_LISTS_COLLECTION).doc(id).update({
      name,
      description: input.description.trim(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo guardar la lista.' };
  }
}

export async function importBlMailingListCsv(
  idToken: string,
  id: string,
  input: { csvText: string; mode: CsvMode },
): Promise<AdminResult<{ contactCount: number; skipped: number; duplicatesDropped: number; truncated: boolean }>> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    const parsed = parseIncomingCsv(input.csvText);
    if (!parsed.ok) return { ok: false, error: parsed.error };
    if (!parsed.data) return { ok: false, error: 'No se pudo leer el CSV.' };
    const ref = getAdminFirestore().collection(BL_MAILING_LISTS_COLLECTION).doc(id);
    const snap = await ref.get();
    if (!snap.exists) return { ok: false, error: 'Lista no encontrada.' };
    const current = asContacts(snap.data()?.contacts);
    const next =
      input.mode === 'merge' ? mergeContacts(current, parsed.data.contacts) : parsed.data.contacts;
    if (next.length > MAX_MAILING_CONTACTS) {
      return { ok: false, error: `La lista superaría el máximo de ${MAX_MAILING_CONTACTS} contactos.` };
    }
    await ref.update({
      contacts: next,
      contactCount: next.length,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return {
      ok: true,
      data: {
        contactCount: next.length,
        skipped: parsed.data.skipped,
        duplicatesDropped: parsed.data.duplicatesDropped,
        truncated: parsed.data.truncated,
      },
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo importar el CSV.' };
  }
}

export async function deleteBlMailingList(idToken: string, id: string): Promise<AdminResult> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    await getAdminFirestore().collection(BL_MAILING_LISTS_COLLECTION).doc(id).delete();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo eliminar la lista.' };
  }
}

export async function listBlMailingSendsForPublication(
  idToken: string,
  publicationId: string,
): Promise<AdminResult<MailingSendRecord[]>> {
  try {
    await requireAdminSession(idToken);
    if (!publicationId.trim()) return { ok: false, error: 'Falta la nota.' };
    const snap = await getAdminFirestore()
      .collection(BL_MAILING_SENDS_COLLECTION)
      .where('publicationId', '==', publicationId)
      .limit(20)
      .get();
    const rows = snap.docs
      .map((doc) => mapSend(doc.id, doc.data() ?? {}))
      .sort((a, b) => (b.sentAt || '').localeCompare(a.sentAt || ''));
    return { ok: true, data: rows };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo leer el historial de envíos.' };
  }
}

export async function shareBlPublicationToLists(
  idToken: string,
  input: { publicationId: string; listIds: string[] },
): Promise<AdminResult<{ sent: number; failed: number; recipientCount: number; fromEmail: string }>> {
  try {
    const session = await requireAdminSession(idToken);
    const publicationId = input.publicationId.trim();
    const listIds = [...new Set(input.listIds.map((id) => id.trim()).filter(Boolean))];
    if (!publicationId) return { ok: false, error: 'Falta la nota.' };
    if (listIds.length === 0) return { ok: false, error: 'Elegí al menos una lista.' };

    const db = getAdminFirestore();
    const pubSnap = await db.collection(BL_PUBLICATIONS_COLLECTION).doc(publicationId).get();
    if (!pubSnap.exists) return { ok: false, error: 'Nota no encontrada.' };
    const publication = mapCmsPublication(pubSnap.id, pubSnap.data() ?? {});
    if (!publication.published) {
      return { ok: false, error: 'Publicá la nota antes de enviarla, así el enlace funciona en el sitio.' };
    }
    if (!publication.slug.trim()) return { ok: false, error: 'La nota no tiene URL.' };

    const listSnaps = await Promise.all(
      listIds.map((id) => db.collection(BL_MAILING_LISTS_COLLECTION).doc(id).get()),
    );
    const lists = listSnaps
      .filter((snap) => snap.exists)
      .map((snap) => mapList(snap.id, snap.data() ?? {}));
    if (lists.length === 0) return { ok: false, error: 'No se encontraron las listas elegidas.' };

    const recipients = mergeContacts(
      [],
      lists.flatMap((list) => list.contacts),
    );
    if (recipients.length === 0) return { ok: false, error: 'Las listas elegidas no tienen correos.' };

    const result = await sendPublicationToContacts({
      contacts: recipients,
      title: publication.title,
      excerpt: publication.excerpt,
      slug: publication.slug,
      heroImage: publication.heroImage || undefined,
    });

    await db.collection(BL_MAILING_SENDS_COLLECTION).add({
      siteId: 'bl',
      publicationId: publication.id,
      publicationTitle: publication.title,
      publicationSlug: publication.slug,
      listIds: lists.map((list) => list.id),
      listNames: lists.map((list) => list.name),
      recipientCount: recipients.length,
      sentCount: result.sent,
      failedCount: result.failed,
      fromEmail: result.fromEmail,
      sentByUid: session.uid,
      sentByEmail: session.email,
      errorSummary: result.errorSummary,
      sentAt: FieldValue.serverTimestamp(),
    });

    if (result.sent === 0) {
      return {
        ok: false,
        error: result.errorSummary || 'Resend no pudo enviar los correos. Revisá el dominio remitente y la API key.',
      };
    }

    return {
      ok: true,
      data: {
        sent: result.sent,
        failed: result.failed,
        recipientCount: recipients.length,
        fromEmail: result.fromEmail,
      },
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo enviar la nota.' };
  }
}
