import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('tributario');

export default function ConflictosTributariosPage() {
  return <PracticeAreaPage areaId="tributario" />;
}
