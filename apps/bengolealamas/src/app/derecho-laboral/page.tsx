import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('laboral');

export default function DerechoLaboralPage() {
  return <PracticeAreaPage areaId="laboral" />;
}
