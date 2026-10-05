import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('salud');

export default function SaludYDiscapacidadPage() {
  return <PracticeAreaPage areaId="salud" />;
}
