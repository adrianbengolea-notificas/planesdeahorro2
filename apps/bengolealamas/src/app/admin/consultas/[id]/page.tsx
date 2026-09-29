import { ConsultaDetailClient } from './consulta-detail-client';

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminConsultaDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ConsultaDetailClient id={id} />;
}
