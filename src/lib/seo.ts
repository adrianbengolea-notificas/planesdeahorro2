import type { Metadata } from 'next';
import { getPublicAppUrl } from '@/lib/public-app-url';

export const SITE_NAME = 'Dr. Adrián Bengolea';
export const SITE_TAGLINE = 'Reclamos por planes de ahorro';
export const SITE_TITLE = `${SITE_NAME} – ${SITE_TAGLINE}`;

export const DEFAULT_DESCRIPTION =
  'Reclamos y asesoramiento legal en conflictos con planes de ahorro automotriz en Argentina. Liquidación, rescisión, cláusulas abusivas y más. Provincia de Buenos Aires.';

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
    alternates: { canonical: url },
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
