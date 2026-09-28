import type { SiteId } from '@repo/content-types';

/** Identidad del sitio Bengolea & Lamas — única fuente de verdad. */
export const SITE_ID: SiteId = 'bl';

export const SITE_NAME = 'Estudio Jurídico Bengolea & Lamas';
export const SHORT_NAME = 'Bengolea & Lamas';
export const SITE_TAGLINE = 'Derecho civil, comercial y defensa del consumidor';

export const DEFAULT_DESCRIPTION =
  'Estudio jurídico en San Nicolás de los Arroyos especializado en derecho civil, comercial y defensa del consumidor.';

/** Host canónico (sin www, sin protocolo). */
export const CANONICAL_HOST = 'bengolealamas.com.ar';

/**
 * URL pública del sitio. En producción/staging definir NEXT_PUBLIC_APP_URL.
 * Nunca usar el dominio de adrianbengolea.com.ar aquí.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;
  return 'http://localhost:9003';
}

export const SITE_URL = getSiteUrl();

export const SITE_TITLE = `${SITE_NAME} – ${SITE_TAGLINE}`;

/** Enlace editorial al sitio vertical de planes de ahorro (dominio distinto). */
export const ADRIAN_PLANES_SITE_URL = 'https://adrianbengolea.com.ar';

/** Redes / perfiles — completar cuando estén confirmados. */
export const SITE_SAME_AS: readonly string[] = [
  'https://www.facebook.com/estudiobl/',
];

export const SITE_LOCALE = 'es_AR';
