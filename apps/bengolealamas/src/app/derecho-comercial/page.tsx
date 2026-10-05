import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('comercial');

export default function DerechoComercialPage() {
  return <PracticeAreaPage areaId="comercial" />;
}
