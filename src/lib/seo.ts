import type { Metadata } from 'next';
import { getPublicAppUrl } from '@/lib/public-app-url';

export const SITE_NAME = 'Dr. Adrián Bengolea';
export const SITE_TAGLINE = 'Problemas y reclamos de planes de ahorro';
export const SITE_TITLE = `${SITE_NAME} – ${SITE_TAGLINE}`;

export const BAR_ASSOCIATION = 'Colegio de Abogados de San Nicolás';
export const BAR_REGISTRATION = 'Tomo 8, Folio 84';
export const BAR_REGISTRATION_LABEL = `${BAR_REGISTRATION} — ${BAR_ASSOCIATION}`;

export const FIRM_NAME = 'Estudio Jurídico Bengolea & Lamas';
export const FIRM_URL = 'https://www.bengolealamas.com.ar';
export const FIRM_FACEBOOK_URL = 'https://www.facebook.com/estudiobl/';

/** Perfiles oficiales del mismo profesional / estudio (sameAs para buscadores e IA). */
export const SITE_SAME_AS = [FIRM_URL, FIRM_FACEBOOK_URL] as const;

export const DEFAULT_DESCRIPTION =
  'Problemas con planes de ahorro automotriz en Argentina: liquidación demorada, rescisión, haberes netos mal calculados, ejecución prendaria y cláusulas abusivas. Asesoramiento legal del Dr. Adrián Bengolea en la Provincia de Buenos Aires.';

export const DEFAULT_KEYWORDS = [
  'problemas de planes de ahorro',
  'problemas plan de ahorro Argentina',
  'reclamo plan de ahorro',
  'abogado planes de ahorro',
  'liquidación plan de ahorro',
  'rescisión plan de ahorro',
  'cláusulas abusivas plan de ahorro',
  'ejecución prendaria plan de ahorro',
  'haberes netos plan de ahorro',
  'Defensa del Consumidor plan de ahorro',
  'Provincia de Buenos Aires',
  'Dr. Adrián Bengolea',
];

export const SITE_LOCALE = 'es_AR';

/** URL absoluta del sitio (sin barra final en el origen). */
export function absoluteUrl(path = '/'): string {
  const base = getPublicAppUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** Si true, usa el título tal cual (sin template del layout). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
};

/**
 * Metadata consistente por página: title, description, canonical, Open Graph y Twitter.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: BuildPageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
      types: { 'text/plain': absoluteUrl('/llms.txt') },
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type: ogType,
      locale: SITE_LOCALE,
      url,
      siteName: SITE_TITLE,
      title: ogTitle,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors?.length ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  };
}
