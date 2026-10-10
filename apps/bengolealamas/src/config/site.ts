import type { SiteId } from '@repo/content-types';

/** Identidad del sitio Bengolea & Lamas — única fuente de verdad. */
export const SITE_ID: SiteId = 'bl';

export const SITE_NAME = 'Estudio Jurídico Bengolea & Lamas';
export const SHORT_NAME = 'Bengolea & Lamas';
export const SITE_TAGLINE = 'Derecho civil, comercial y defensa del consumidor';

export const DEFAULT_DESCRIPTION =
  'Estudio jurídico en Belgrano 174, San Nicolás de los Arroyos. Derecho civil, comercial, defensa del consumidor, daños, bancos y seguros.';

/** Host canónico (sin www, sin protocolo). */
export const CANONICAL_HOST = 'bengolealamas.com.ar';

export const PUBLIC_SITE_ORIGIN = `https://${CANONICAL_HOST}`;

function isPreviewOrigin(value: string): boolean {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return host.endsWith('.hosted.app') || host.endsWith('.web.app') || host.endsWith('.firebaseapp.com');
  } catch {
    return false;
  }
}

/**
 * URL pública del sitio. En local puede ser localhost; en producción siempre el dominio custom.
 * Las URLs de App Hosting (*.hosted.app) no deben salir en canonical, sitemap ni JSON-LD.
 * Nunca usar el dominio de adrianbengolea.com.ar aquí.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, '') ?? '';
  if (fromEnv && !isPreviewOrigin(fromEnv)) return fromEnv;
  if (fromEnv && isPreviewOrigin(fromEnv)) return PUBLIC_SITE_ORIGIN;
  if (process.env.NODE_ENV === 'production') return PUBLIC_SITE_ORIGIN;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;
  return 'http://localhost:9003';
}

export const SITE_URL = getSiteUrl();

export const SITE_TITLE = `${SITE_NAME} – ${SITE_TAGLINE}`;

/** Enlace editorial al sitio vertical de planes de ahorro (dominio distinto). */
export const ADRIAN_PLANES_SITE_URL = 'https://adrianbengolea.com.ar';

/** Redes institucionales — completar solo URLs verificadas. */
export const socialLinks = {
  facebook: 'https://www.facebook.com/estudiobl/',
  instagram: '' as string,
  linkedin: '' as string,
} as const;

export const SITE_SAME_AS: readonly string[] = [
  socialLinks.facebook,
  ...(socialLinks.instagram ? [socialLinks.instagram] : []),
  ...(socialLinks.linkedin ? [socialLinks.linkedin] : []),
];

export const UCU_URL = 'https://ucu.org.ar';
export const NOTIFICAS_URL = 'https://www.notificas.com';

export const SITE_LOCALE = 'es_AR';
