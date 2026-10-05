import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('medio-ambiente');

export default function MedioAmbientePage() {
  return <PracticeAreaPage areaId="medio-ambiente" />;
}
