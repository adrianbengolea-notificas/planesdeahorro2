import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('empresas');

export default function EmpresasPage() {
  return <PracticeAreaPage areaId="empresas" />;
}
