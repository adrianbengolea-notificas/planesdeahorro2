import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { PRACTICE_AREAS } from '@/config/practice-areas';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Áreas de práctica',
  description:
    'Especialidades del Estudio Bengolea & Lamas en San Nicolás: consumo, bancos, civil, comercial, seguros, empresas y más.',
  path: '/areas-de-practica',
  keywords: ['áreas de práctica', 'abogados civil comercial', 'defensa del consumidor San Nicolás'],
});

export default function AreasDePracticaPage() {
  return (
    <PageShell
      title="Áreas de práctica"
      description="Mapa de especialidades del estudio. Cada área tiene página propia, con el recorte del conflicto y sin duplicar el sitio de planes de ahorro."
      path="/areas-de-practica"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Áreas de práctica' }]}
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {PRACTICE_AREAS.map((area) => (
          <li key={area.id} id={area.id} className="scroll-mt-24 rounded-lg border border-border p-5">
            <h2 className="font-headline text-lg font-semibold">{area.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{area.description}</p>
            {area.published ? (
              <Link href={area.path} className="mt-4 inline-block text-sm font-medium text-primary hover:text-accent">
                Ver página
              </Link>
            ) : (
              <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">Contenido en preparación</p>
            )}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
