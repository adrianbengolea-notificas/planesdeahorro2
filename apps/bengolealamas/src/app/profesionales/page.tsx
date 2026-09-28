import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Profesionales',
  description: 'Abogados y profesionales que integran el Estudio Jurídico Bengolea & Lamas.',
  path: '/profesionales',
});

export default function ProfesionalesPage() {
  return (
    <PageShell
      title="Profesionales"
      description="Equipo del estudio."
      path="/profesionales"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Profesionales' }]}
    >
      <ul className="space-y-4">
        <li className="rounded-lg border border-border p-5">
          <h2 className="font-headline text-lg font-semibold">
            <Link href="/profesionales/adrian-bengolea" className="hover:text-accent">
              Adrián Bengolea
            </Link>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Abogado — perfil profesional en el estudio.</p>
        </li>
      </ul>
    </PageShell>
  );
}
