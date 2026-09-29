import 'server-only';

import type { BlIntakeStructured } from '@/lib/case-intake-bl-types';
import { BlIntakeStructuredSchema } from '@/lib/case-intake-bl-types';
import { getBlPublicAppUrl } from '@/lib/bl-public-app-url';
import { persistBlCaseIntake } from '@/lib/persist-bl-case-intake';
import { sendBlIntakeEmail } from '@/lib/send-bl-intake-email';

export type BlIntakeDeliveryResult = {
  persisted: boolean;
  intakeId?: string;
  emailSent: boolean;
};

/** Persiste (si hace falta) y envía el mail interno — sin llamar a la IA. */
export async function deliverBlCaseIntake(
  structuredData: BlIntakeStructured,
  opts?: { existingIntakeId?: string },
): Promise<BlIntakeDeliveryResult> {
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
