import type { Metadata } from 'next';
import { PracticeAreaPage, practiceAreaMetadata } from '@/components/practice-area-template';

export const metadata: Metadata = practiceAreaMetadata('bancos-tarjetas');

export default function TarjetasDeCreditoPage() {
  return <PracticeAreaPage areaId="bancos-tarjetas" />;
}
