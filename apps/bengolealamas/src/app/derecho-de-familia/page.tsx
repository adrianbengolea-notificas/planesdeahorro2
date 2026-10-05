import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('familia');

export default function DerechoDeFamiliaPage() {
  return <PracticeAreaPage areaId="familia" />;
}
