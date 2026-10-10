import type { SiteSeoConfig } from '@repo/shared/seo';
import {
  DEFAULT_DESCRIPTION,
  getSiteUrl,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
} from './site';

export function getBlSiteSeoConfig(): SiteSeoConfig {
  return {
    siteName: SITE_NAME,
    siteTitle: SITE_TITLE,
    siteUrl: getSiteUrl(),
    defaultDescription: DEFAULT_DESCRIPTION,
    locale: SITE_LOCALE,
    ogImagePath: '/opengraph-image',
    keywords: [
      'estudio jurídico San Nicolás',
      'abogados San Nicolás de los Arroyos',
      'Bengolea & Lamas',
      'Bengolea Lamas',
      'defensa del consumidor San Nicolás',
      'derecho civil',
      'derecho comercial',
      'daños y perjuicios',
      'abogados bancos San Nicolás',
      'abogados seguros San Nicolás',
      'abogados Belgrano 174',
    ],
  };
}
