import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('defensa-consumidor');

export default function DefensaDelConsumidorPage() {
  return <PracticeAreaPage areaId="defensa-consumidor" />;
}
