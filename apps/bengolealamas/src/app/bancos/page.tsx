import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('bancos');

export default function BancosPage() {
  return <PracticeAreaPage areaId="bancos" />;
}
