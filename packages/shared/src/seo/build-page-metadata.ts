import type { Metadata } from 'next';
import { absoluteUrl } from './absolute-url';
import type { SiteSeoConfig } from './site-seo-config';

export type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  llmsTxtPath?: string;
};

export function buildPageMetadata(
  site: SiteSeoConfig,
  {
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
    llmsTxtPath = '/llms.txt',
  }: BuildPageMetadataOptions,
): Metadata {
  const url = absoluteUrl(site, path);
  const ogTitle = absoluteTitle ? title : `${title} | ${site.siteName}`;
  const locale = site.locale ?? 'es_AR';
  const ogImage = site.ogImagePath ? absoluteUrl(site, site.ogImagePath) : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
      types: { 'text/plain': absoluteUrl(site, llmsTxtPath) },
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type: ogType,
      locale,
      url,
      siteName: site.siteTitle,
      title: ogTitle,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors?.length ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function createMetadataBase(site: SiteSeoConfig): URL {
  return new URL(absoluteUrl(site, '/'));
}
