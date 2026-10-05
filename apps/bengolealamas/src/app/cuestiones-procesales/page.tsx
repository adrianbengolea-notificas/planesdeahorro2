import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('procesal');

export default function CuestionesProcesalesPage() {
  return <PracticeAreaPage areaId="procesal" />;
}
