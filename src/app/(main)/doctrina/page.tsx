import type { Metadata } from 'next';
import { DoctrineListClient } from './doctrine-list-client';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Doctrina y artículos sobre planes de ahorro',
  description:
    'Análisis y artículos de doctrina sobre la problemática de los planes de ahorro en Argentina.',
  path: '/doctrina',
  keywords: ['doctrina planes de ahorro', 'artículos jurídicos plan de ahorro'],
});

export default function DoctrinePage() {
  return <DoctrineListClient />;
}
