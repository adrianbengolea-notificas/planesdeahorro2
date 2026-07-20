import type { Metadata } from 'next';
import { FallosListClient } from './fallos-list-client';
import { listPublishedFallosForSeo } from '@/lib/fallos-public-server';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Fallos y Jurisprudencia',
  description:
    'Sentencias y medidas cautelares sobre planes de ahorro automotriz. Jurisprudencia relevante para la defensa de los derechos de los suscriptores en Argentina.',
  path: '/fallos',
  keywords: [
    'fallos planes de ahorro',
    'jurisprudencia plan de ahorro',
    'sentencias consumidor automotriz',
  ],
});

export default async function RulingsPage() {
  const initialFallos = await listPublishedFallosForSeo();
  return <FallosListClient initialFallos={initialFallos} />;
}
