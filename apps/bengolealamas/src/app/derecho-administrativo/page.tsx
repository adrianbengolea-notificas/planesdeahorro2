import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('administrativo');

export default function DerechoAdministrativoPage() {
  return <PracticeAreaPage areaId="administrativo" />;
}
