import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('bancos-debitos');

export default function DebitosNoAutorizadosPage() {
  return <PracticeAreaPage areaId="bancos-debitos" />;
}
