import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicationList } from '@/components/publication-list';
import { PageShell } from '@/components/page-shell';
import { getAllPublicPublications } from '@/lib/bl-cms-publications';
import { publicationLooksLikeRuling } from '@/lib/bl-publications';
import { blPageMetadata } from '@/lib/page-metadata';

export const revalidate = 60;

export const metadata: Metadata = blPageMetadata({
  title: 'Jurisprudencia',
  description:
    'Notas del Estudio Bengolea & Lamas sobre fallos, medidas cautelares y líneas jurisprudenciales relevantes.',
  path: '/jurisprudencia',
  keywords: ['jurisprudencia San Nicolás', 'fallos Bengolea Lamas', 'medidas cautelares'],
});

export default async function JurisprudenciaPage() {
  const items = (await getAllPublicPublications()).filter(publicationLooksLikeRuling);

  return (
    <PageShell
      title="Jurisprudencia"
      description="Notas del estudio que comentan sentencias, medidas y líneas jurisprudenciales. No es un repositorio exhaustivo de fallos."
      path="/jurisprudencia"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Jurisprudencia' }]}
    >
      {items.length ? (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? 'nota' : 'notas'} vinculadas a fallos o medidas.{' '}
            <Link href="/publicaciones" className="text-accent hover:underline">
              Ver todas las publicaciones
            </Link>
            .
          </p>
          <PublicationList items={items} />
        </>
      ) : (
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Todavía no hay notas clasificadas acá.{' '}
          <Link href="/publicaciones" className="font-medium text-accent hover:underline">
            Publicaciones del estudio
          </Link>
          .
        </p>
      )}
    </PageShell>
  );
}
