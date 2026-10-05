import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('bancos-habeas');

export default function HabeasDataPage() {
  return <PracticeAreaPage areaId="bancos-habeas" />;
}
