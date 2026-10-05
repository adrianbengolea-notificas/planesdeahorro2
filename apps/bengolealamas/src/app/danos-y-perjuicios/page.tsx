import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('danos');

export default function DanosYPerjuiciosPage() {
  return <PracticeAreaPage areaId="danos" />;
}
