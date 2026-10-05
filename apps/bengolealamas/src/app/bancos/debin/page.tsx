import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('bancos-debin');

export default function DebinPage() {
  return <PracticeAreaPage areaId="bancos-debin" />;
}
