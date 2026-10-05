import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('civil');

export default function DerechoCivilPage() {
  return <PracticeAreaPage areaId="civil" />;
}
