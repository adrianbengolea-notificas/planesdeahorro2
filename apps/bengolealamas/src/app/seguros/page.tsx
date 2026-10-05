import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('seguros');

export default function SegurosPage() {
  return <PracticeAreaPage areaId="seguros" />;
}
