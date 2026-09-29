import { Resend } from 'resend';
import type { BlIntakeStructured } from '@/lib/case-intake-bl-types';
import {
  EMAIL_THEME,
  emailIntroHeading,
  emailKeyValueRows,
  emailParagraph,
  escapeHtml,
  wrapEmailHtml,
} from '@/lib/email-layout';

function intakeDestinationEmail(): string {
  return (process.env.CASE_INTAKE_EMAIL ?? 'abengolea1@gmail.com').trim();
}

export function formatBlIntakePlainText(data: BlIntakeStructured): string {
  const urgencia = data.posibleUrgencia
    ? `⚠ POSIBLE URGENCIA\n${data.detalleUrgencia || data.plazosOUrgencias}\n`
    : '';

  return [
    '## NUEVA CONSULTA WEB — BENGOLEA & LAMAS',
    '',
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.telefono || '—'}`,
    `Localidad: ${data.localidad}`,
    `Provincia: ${data.provincia}`,
    '',
    `Área jurídica probable: ${data.areaJuridicaProbable}`,
    '',
    `Contraparte: ${data.contraparte}`,
    '',
    'Resumen del caso:',
    data.resumenCaso,
    '',
    'Cronología relevante:',
    data.cronologiaRelevante,
    '',
    'Documentación disponible:',
    data.documentacionDisponible,
    '',
    'Reclamos realizados:',
    data.reclamosRealizados,
    '',
    'Notificaciones / intimaciones recibidas:',
    data.notificacionesRecibidas,
    '',
    'Plazos o urgencias mencionadas:',
    data.plazosOUrgencias,
    '',
    'Pretensión del consultante:',
    data.pretensionConsultante,
    '',
    'Observaciones detectadas por IA:',
    data.observacionesIA,
    '',
    urgencia,
    'Transcripción o resumen ampliado de la conversación:',
    data.transcripcionResumen,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function sendBlIntakeEmail(
  data: BlIntakeStructured,
  options: { openInAdminUrl?: string } = {},
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[send-bl-intake-email] RESEND_API_KEY no definida.');
    return { success: false, error: 'Email service not configured' };
  }

  const resend = new Resend(apiKey);
  const from = (process.env.RESEND_CLIENT_FROM ?? process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev').trim();
  const to = [intakeDestinationEmail()];
  const subject = `Nueva consulta web — ${data.nombre} — ${data.areaJuridicaProbable}`;

  const plain = formatBlIntakePlainText(data);
  const urgencyBlock = data.posibleUrgencia
    ? emailParagraph(`⚠ POSIBLE URGENCIA — ${data.detalleUrgencia || data.plazosOUrgencias}`)
    : '';

  const cta = options.openInAdminUrl
    ? `
    <p style="margin:0 0 18px;font-family:'Source Sans 3',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${EMAIL_THEME.body};">
      <a href="${escapeHtml(options.openInAdminUrl)}" style="display:inline-block;padding:10px 18px;background:${EMAIL_THEME.primary};color:${EMAIL_THEME.primaryFg};text-decoration:none;border-radius:6px;font-weight:600;">Abrir en el panel de administración</a>
    </p>
  `
    : '';

  const inner = `
    ${emailIntroHeading('Nueva consulta web — Bengolea & Lamas')}
    ${emailParagraph('Consulta recibida vía asistente inicial del sitio institucional.')}
    ${cta}
    ${urgencyBlock}
    ${emailKeyValueRows([
      { label: 'Nombre', value: data.nombre },
      { label: 'Email', value: data.email },
      { label: 'Teléfono', value: data.telefono || '—' },
      { label: 'Localidad', value: data.localidad },
      { label: 'Provincia', value: data.provincia },
      { label: 'Área jurídica probable', value: data.areaJuridicaProbable },
      { label: 'Contraparte', value: data.contraparte },
    ])}
    <pre style="margin:0;font-family:monospace;font-size:13px;line-height:1.5;color:${EMAIL_THEME.body};white-space:pre-wrap;">${escapeHtml(plain)}</pre>
  `;

  const html = wrapEmailHtml(inner, {
    variant: 'internal',
    preheader: `${data.nombre} · ${data.areaJuridicaProbable}`,
    showSignature: false,
    footerNote: 'Correo automático — Estudio Bengolea & Lamas.',
  });

  try {
    const { error } = await resend.emails.send({
      from: `Bengolea & Lamas <${from}>`,
      to,
      subject,
      html,
      text: plain,
    });
    if (error) {
      console.error('[send-bl-intake-email]', error);
      return { success: false, error: 'Failed to send email' };
    }
    return { success: true };
  } catch (e) {
    console.error('[send-bl-intake-email]', e);
    return { success: false, error: 'Unexpected error' };
  }
}
