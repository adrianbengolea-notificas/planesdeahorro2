import type { Metadata } from 'next';
import { EB_Garamond, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/header';
import { ConditionalFooter } from '@/components/conditional-footer';
import { ConditionalWhatsAppButton } from '@/components/whatsapp-button';
import { FirebaseClientProvider } from '@/firebase';
import { JsonLd } from '@/components/json-ld';
import { siteIdentityJsonLd } from '@/lib/schema';
import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
} from '@/lib/seo';

/** Etiqueta de Google Ads (gtag.js). Sobreescribible con NEXT_PUBLIC_GOOGLE_ADS_ID. */
const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || 'AW-18107912536';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_TITLE,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: absoluteUrl('/'),
    types: {
      'text/plain': absoluteUrl('/llms.txt'),
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: absoluteUrl('/'),
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'legal',
  verification: {
    other: {
      'msvalidate.01': '99A58204BDAF981B678193D8C9643E21',
    },
  },
};

const organizationJsonLd = siteIdentityJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={cn(inter.variable, ebGaramond.variable)}>
      <head>
        <link
          rel="alternate"
          type="text/plain"
          title="Índice para modelos de IA"
          href={absoluteUrl('/llms.txt')}
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <JsonLd data={organizationJsonLd} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <FirebaseClientProvider>
          <AppHeader />
          <main className="flex-grow">{children}</main>
          <ConditionalFooter />
          <ConditionalWhatsAppButton />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
