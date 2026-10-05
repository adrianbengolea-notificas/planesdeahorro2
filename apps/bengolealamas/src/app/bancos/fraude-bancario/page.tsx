import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('bancos-fraude');

export default function FraudeBancarioPage() {
  return <PracticeAreaPage areaId="bancos-fraude" />;
}
