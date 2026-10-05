import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('servicios-publicos');

export default function ServiciosPublicosPage() {
  return <PracticeAreaPage areaId="servicios-publicos" />;
}
