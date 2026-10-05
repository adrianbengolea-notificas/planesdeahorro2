import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('colectivas');

export default function AccionesColectivasPage() {
  return <PracticeAreaPage areaId="colectivas" />;
}
