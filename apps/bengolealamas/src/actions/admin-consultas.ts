'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { BL_CASE_INTAKES_COLLECTION } from '@repo/content-types';
import { getAdminFirestore, requireAdminSession } from '@/firebase/admin';
import {
  type BlCaseIntakeRow,
  type BlIntakeStatus,
  isBlIntakeStatus,
} from '@/lib/bl-intake-status';

export type AdminResult<T = void> = { ok: true; data?: T } | { ok: false; error: string };

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function iso(value: unknown): string | null {
  if (!value || typeof value !== 'object' || !('toDate' in value)) return null;
  const d = (value as { toDate: () => Date }).toDate();
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function mapIntake(id: string, data: Record<string, unknown>): BlCaseIntakeRow {
  return {
    id,
    createdAt: iso(data.createdAt),
    status: str(data.status) || 'pendiente de revisión',
    archived: data.archived === true,
    read: data.read === true,
    assignedTo: str(data.assignedTo),
    internalNotes: str(data.internalNotes),
    nombre: str(data.nombre),
    email: str(data.email),
    telefono: str(data.telefono),
    localidad: str(data.localidad),
    provincia: str(data.provincia),
    areaJuridicaProbable: str(data.areaJuridicaProbable),
    contraparte: str(data.contraparte),
    resumenCaso: str(data.resumenCaso),
    cronologiaRelevante: str(data.cronologiaRelevante),
    documentacionDisponible: str(data.documentacionDisponible),
    reclamosRealizados: str(data.reclamosRealizados),
    notificacionesRecibidas: str(data.notificacionesRecibidas),
    plazosOUrgencias: str(data.plazosOUrgencias),
    pretensionConsultante: str(data.pretensionConsultante),
    observacionesIA: str(data.observacionesIA),
    transcripcionResumen: str(data.transcripcionResumen),
    posibleUrgencia: data.posibleUrgencia === true,
    detalleUrgencia: str(data.detalleUrgencia),
  };
}

export async function listBlCaseIntakes(idToken: string): Promise<AdminResult<BlCaseIntakeRow[]>> {
  try {
    await requireAdminSession(idToken);
    const snap = await getAdminFirestore()
      .collection(BL_CASE_INTAKES_COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(200)
      .get();
    return { ok: true, data: snap.docs.map((d) => mapIntake(d.id, d.data() as Record<string, unknown>)) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudieron listar las consultas.' };
  }
}

export async function getBlCaseIntake(
  idToken: string,
  id: string,
): Promise<AdminResult<BlCaseIntakeRow>> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    const snap = await getAdminFirestore().collection(BL_CASE_INTAKES_COLLECTION).doc(id).get();
    if (!snap.exists) return { ok: false, error: 'Consulta no encontrada.' };
    return { ok: true, data: mapIntake(snap.id, (snap.data() ?? {}) as Record<string, unknown>) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo leer la consulta.' };
  }
}

export async function updateBlCaseIntake(
  idToken: string,
  id: string,
  patch: {
    status?: string;
    archived?: boolean;
    read?: boolean;
    assignedTo?: string;
    internalNotes?: string;
  },
): Promise<AdminResult> {
  try {
    await requireAdminSession(idToken);
    if (!id.trim()) return { ok: false, error: 'Falta el identificador.' };
    if (patch.status !== undefined && !isBlIntakeStatus(patch.status)) {
      return { ok: false, error: 'Estado no válido.' };
    }
    const payload: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };
    if (patch.status !== undefined) payload.status = patch.status as BlIntakeStatus;
    if (patch.archived !== undefined) payload.archived = patch.archived;
    if (patch.read !== undefined) payload.read = patch.read;
    if (patch.assignedTo !== undefined) payload.assignedTo = patch.assignedTo.slice(0, 120);
    if (patch.internalNotes !== undefined) payload.internalNotes = patch.internalNotes.slice(0, 20_000);
    await getAdminFirestore().collection(BL_CASE_INTAKES_COLLECTION).doc(id).update(payload);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'No se pudo actualizar la consulta.' };
  }
}
