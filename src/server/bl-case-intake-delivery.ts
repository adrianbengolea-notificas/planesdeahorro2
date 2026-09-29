import 'server-only';

import type { BlIntakeStructured } from '@/lib/case-intake-bl-types';
import { BlIntakeStructuredSchema } from '@/lib/case-intake-bl-types';
import { getBlPublicAppUrl } from '@/lib/bl-public-app-url';
import { persistBlCaseIntake } from '@/lib/persist-bl-case-intake';
import { sendBlIntakeEmail } from '@/lib/send-bl-intake-email';

export type BlIntakeAttachmentRef = { path: string; fileName: string };

export type BlIntakeDeliveryResult = {
  persisted: boolean;
  intakeId?: string;
  emailSent: boolean;
};

function mergeAttachments(
  structuredData: BlIntakeStructured,
  attachmentPaths?: BlIntakeAttachmentRef[],
): BlIntakeStructured {
  if (!attachmentPaths?.length) return structuredData;
  const prev = structuredData.archivosAdjuntos ?? [];
  const merged = [...prev, ...attachmentPaths];
  const list = merged.map((f) => `- ${f.fileName}`).join('\n');
  return {
    ...structuredData,
    archivosAdjuntos: merged,
    documentacionDisponible: [structuredData.documentacionDisponible, list ? `Archivos adjuntos en la web:\n${list}` : '']
      .filter(Boolean)
      .join('\n\n'),
  };
}

/** Persiste (si hace falta) y envía el mail interno — sin llamar a la IA. */
export async function deliverBlCaseIntake(
  structuredData: BlIntakeStructured,
  opts?: { existingIntakeId?: string; attachmentPaths?: BlIntakeAttachmentRef[] },
): Promise<BlIntakeDeliveryResult> {
  structuredData = mergeAttachments(structuredData, opts?.attachmentPaths);
  let intakeId = opts?.existingIntakeId?.trim() || undefined;
  let persisted = Boolean(intakeId);

  if (!intakeId) {
    const saved = await persistBlCaseIntake(structuredData);
    if (!saved.ok) {
      return { persisted: false, emailSent: false };
    }
    intakeId = saved.id;
    persisted = true;
  }

  const openInAdminUrl = `${getBlPublicAppUrl()}/admin/consultas/${encodeURIComponent(intakeId)}`;
  const emailResult = await sendBlIntakeEmail(structuredData, { openInAdminUrl });

  return {
    persisted,
    intakeId,
    emailSent: emailResult.success,
  };
}

export function parseBlIntakeStructured(raw: unknown): BlIntakeStructured {
  return BlIntakeStructuredSchema.parse(raw);
}
