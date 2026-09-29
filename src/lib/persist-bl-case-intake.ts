import 'server-only';

import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from '@/firebase/admin';
import type { BlIntakeStructured } from '@/lib/case-intake-bl-types';

/** Misma colección que `BL_CASE_INTAKES_COLLECTION` en `@repo/content-types`. */
const BL_CASE_INTAKES_COLLECTION = 'bl_case_intakes';

export async function persistBlCaseIntake(
  data: BlIntakeStructured,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    const db = getAdminFirestore();
    const ref = await db.collection(BL_CASE_INTAKES_COLLECTION).add({
      siteId: 'bl',
      source: 'asistente-ia',
      status: 'pendiente de revisión',
      archived: false,
      read: false,
      assignedTo: '',
      internalNotes: '',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      localidad: data.localidad,
      provincia: data.provincia,
      areaJuridicaProbable: data.areaJuridicaProbable,
      contraparte: data.contraparte,
      resumenCaso: data.resumenCaso,
      cronologiaRelevante: data.cronologiaRelevante,
      documentacionDisponible: data.documentacionDisponible,
      reclamosRealizados: data.reclamosRealizados,
      notificacionesRecibidas: data.notificacionesRecibidas,
      plazosOUrgencias: data.plazosOUrgencias,
      pretensionConsultante: data.pretensionConsultante,
      observacionesIA: data.observacionesIA,
      transcripcionResumen: data.transcripcionResumen,
      posibleUrgencia: data.posibleUrgencia,
      detalleUrgencia: data.detalleUrgencia,
      consentimientoDatos: data.consentimientoDatos,
    });
    return { ok: true, id: ref.id };
  } catch (e) {
    console.error('[persist-bl-case-intake]', e);
    return { ok: false, error: e instanceof Error ? e.message : 'firestore' };
  }
}
