import { Resend } from 'resend';
import { STUDIO_EMAIL, formatStudioAddressLine } from '@/config/wix-brand';
import { SHORT_NAME, SITE_NAME, SITE_TAGLINE, getSiteUrl } from '@/config/site';
import type { MailingConfig, MailingContact } from '@/lib/bl-mailing-types';

const FROM_NAME = SHORT_NAME;
const BATCH_SIZE = 100;

const THEME = {
  primary: '#2b2e35',
  accent: '#44b3a8',
  body: '#2b2e35',
  muted: '#5c616b',
  subtle: '#8a8f97',
  border: '#e0e2e6',
  pageBg: '#f4f5f7',
  cardBg: '#ffffff',
  primaryFg: '#ffffff',
} as const;

export function getBlMailingConfig(): MailingConfig {
  const fromAddress = (
    process.env.RESEND_BL_FROM?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    STUDIO_EMAIL
  ).replace(/^.*<([^>]+)>.*$/, '$1');
  const replyTo = process.env.RESEND_BL_REPLY_TO?.trim() || STUDIO_EMAIL;
  return {
    fromName: FROM_NAME,
    fromAddress,
    replyTo,
    resendConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function absoluteUrl(pathOrUrl: string): string {
  const value = pathOrUrl.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('//')) return `https:${value}`;
  const origin = getSiteUrl().replace(/\/$/, '');
  return `${origin}${value.startsWith('/') ? value : `/${value}`}`;
}

export function publicationPublicUrl(slug: string): string {
  return `${getSiteUrl().replace(/\/$/, '')}/publicaciones/${encodeURIComponent(slug)}`;
}

function wrapBlEmailHtml(inner: string, preheader: string): string {
  const fontBody = "Georgia,'Times New Roman',serif";
  const fontSans = "Helvetica,Arial,sans-serif";
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>
<body style="margin:0;padding:0;background:${THEME.pageBg};-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${THEME.pageBg};border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:${THEME.cardBg};border-collapse:collapse;border:1px solid ${THEME.border};">
          <tr>
            <td style="padding:0;background:${THEME.primary};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width:4px;background:${THEME.accent};font-size:0;line-height:0;">&nbsp;</td>
                  <td style="padding:22px 26px;">
                    <div style="font-family:${fontBody};font-size:22px;font-weight:700;color:${THEME.primaryFg};line-height:1.2;">${escapeHtml(SITE_NAME)}</div>
                    <div style="font-family:${fontSans};font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.72);margin-top:8px;">${escapeHtml(SITE_TAGLINE)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px 12px;font-family:${fontSans};font-size:15px;line-height:1.65;color:${THEME.body};">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;font-family:${fontSans};font-size:11px;line-height:1.55;color:${THEME.subtle};">
              ${escapeHtml(formatStudioAddressLine())}<br>
              ${escapeHtml(STUDIO_EMAIL)}<br><br>
              Recibís este correo porque el estudio te comparte sus publicaciones. Si no querés seguir recibiendo estas notas, respondé solicitando la baja.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildPublicationShareHtml(options: {
  title: string;
  excerpt: string;
  slug: string;
  heroImage?: string;
  greetingName?: string;
}): { subject: string; html: string; text: string; url: string } {
  const url = publicationPublicUrl(options.slug);
  const subject = `${SHORT_NAME} — ${options.title.trim()}`;
  const greeting = options.greetingName?.trim()
    ? `<p style="margin:0 0 16px;">Hola ${escapeHtml(options.greetingName.trim())},</p>`
    : `<p style="margin:0 0 16px;">Hola,</p>`;
  const hero = options.heroImage
    ? `<p style="margin:0 0 18px;"><img src="${escapeHtml(absoluteUrl(options.heroImage))}" alt="" width="544" style="display:block;width:100%;max-width:544px;height:auto;border:0;"></p>`
    : '';
  const excerpt = options.excerpt.trim()
    ? `<p style="margin:0 0 18px;color:${THEME.muted};">${escapeHtml(options.excerpt.trim())}</p>`
    : '';

  const inner = `
    ${greeting}
    <p style="margin:0 0 18px;">Compartimos una nota del estudio:</p>
    <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:${THEME.primary};font-weight:700;">${escapeHtml(options.title.trim())}</h1>
    ${hero}
    ${excerpt}
    <p style="margin:8px 0 24px;">
      <a href="${escapeHtml(url)}" style="display:inline-block;padding:12px 20px;background:${THEME.primary};color:${THEME.primaryFg};text-decoration:none;font-weight:600;font-size:14px;">Leer la nota</a>
    </p>
    <p style="margin:0;font-size:13px;color:${THEME.subtle};">Si el botón no funciona, copiá este enlace:<br>${escapeHtml(url)}</p>
  `;

  const text = [
    options.greetingName?.trim() ? `Hola ${options.greetingName.trim()},` : 'Hola,',
    '',
    'Compartimos una nota del estudio:',
    options.title.trim(),
    '',
    options.excerpt.trim(),
    '',
    `Leer la nota: ${url}`,
    '',
    `${SITE_NAME} · ${formatStudioAddressLine()}`,
    'Si no querés seguir recibiendo estas notas, respondé solicitando la baja.',
  ]
    .filter((line) => line !== undefined)
    .join('\n');

  return { subject, html: wrapBlEmailHtml(inner, options.excerpt.trim() || options.title), text, url };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendPublicationToContacts(options: {
  contacts: MailingContact[];
  title: string;
  excerpt: string;
  slug: string;
  heroImage?: string;
}): Promise<{ sent: number; failed: number; fromEmail: string; errorSummary: string }> {
  const config = getBlMailingConfig();
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { sent: 0, failed: options.contacts.length, fromEmail: config.fromAddress, errorSummary: 'Falta RESEND_API_KEY.' };
  }

  const resend = new Resend(apiKey);
  const from = `${config.fromName} <${config.fromAddress}>`;
  const unique = new Map<string, MailingContact>();
  for (const contact of options.contacts) unique.set(contact.email, contact);
  const recipients = [...unique.values()];

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const slice = recipients.slice(i, i + BATCH_SIZE);
    const payload = slice.map((contact) => {
      const built = buildPublicationShareHtml({
        title: options.title,
        excerpt: options.excerpt,
        slug: options.slug,
        heroImage: options.heroImage,
        greetingName: contact.name,
      });
      return {
        from,
        to: [contact.email],
        reply_to: config.replyTo,
        subject: built.subject,
        html: built.html,
        text: built.text,
      };
    });

    const { error } = await resend.batch.send(payload);
    if (error) {
      failed += slice.length;
      errors.push(error.message || 'Error de Resend');
    } else {
      sent += slice.length;
    }
    if (i + BATCH_SIZE < recipients.length) await sleep(250);
  }

  return {
    sent,
    failed,
    fromEmail: config.fromAddress,
    errorSummary: errors.slice(0, 3).join(' · '),
  };
}
