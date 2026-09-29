import type { Metadata } from 'next';
import { Libre_Baskerville, Source_Sans_3 } from 'next/font/google';
import { JsonLd } from '@repo/shared/components/json-ld';
import { createMetadataBase, buildPageMetadata } from '@repo/shared/seo';
import { SiteChrome } from '@/components/site-chrome';
import { getBlSiteSeoConfig } from '@/config/seo';
import { DEFAULT_DESCRIPTION, SITE_TITLE } from '@/config/site';
import { siteIdentityJsonLd } from '@/lib/schema';
import { cn } from '@/lib/utils';
import './globals.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

const siteSeo = getBlSiteSeoConfig();

export const metadata: Metadata = {
  metadataBase: createMetadataBase(siteSeo),
  ...buildPageMetadata(siteSeo, {
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
    absoluteTitle: true,
    keywords: siteSeo.keywords,
  }),
  applicationName: SITE_TITLE,
  category: 'legal',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={cn(sourceSans.variable, libreBaskerville.variable)}>
      <head>
        <link
          rel="alternate"
          type="text/plain"
          title="Índice para modelos de IA"
          href={`${siteSeo.siteUrl.replace(/\/$/, '')}/llms.txt`}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={siteIdentityJsonLd()} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
