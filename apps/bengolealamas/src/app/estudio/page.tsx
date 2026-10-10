import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { STUDIO_HOURS } from '@/config/gbp';
import { PRACTICE_AREAS } from '@/config/practice-areas';
import { FOUNDERS, INFORMACION_BODY, INFORMACION_LEAD, formatStudioAddressLine } from '@/config/wix-brand';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'El estudio',
  description:
    'Estudio jurídico Bengolea & Lamas en Belgrano 174, San Nicolás de los Arroyos: trayectoria, litigio y defensa del consumidor.',
  path: '/estudio',
  keywords: ['estudio jurídico Bengolea Lamas', 'abogados San Nicolás historia'],
});

export default function EstudioPage() {
  return (
    <PageShell
      title="El estudio"
      description="Identidad institucional y forma de trabajo del Estudio Jurídico Bengolea & Lamas."
      path="/estudio"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'El estudio' }]}
    >
      <article className="max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p className="text-foreground">{INFORMACION_LEAD}</p>
        {INFORMACION_BODY.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          El domicilio es {formatStudioAddressLine()}. Atención {STUDIO_HOURS.display.toLowerCase()}, con turno
          previo. El equipo y las áreas de trabajo se detallan en{' '}
          <Link href="/profesionales" className="font-medium text-accent hover:underline">
            Profesionales
          </Link>
          ,{' '}
          <Link href="/servicios" className="font-medium text-accent hover:underline">
            Servicios
          </Link>{' '}
          y{' '}
          <Link href="/areas-de-practica" className="font-medium text-accent hover:underline">
            Áreas de práctica
          </Link>
          .
        </p>
        <p>
          Para una consulta inicial:{' '}
          <Link href="/contacto" className="font-medium text-accent hover:underline">
            Contacto
          </Link>
          {' · '}
          <Link href="/consultas-online" className="font-medium text-accent hover:underline">
            Consultas online
          </Link>
          {' · '}
          <Link href="/contanos-tu-caso" className="font-medium text-accent hover:underline">
            Contanos tu caso
          </Link>
          .
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {PRACTICE_AREAS.filter((area) => area.published && !area.path.startsWith('/bancos/')).map((area) => (
            <li key={area.id}>
              <Link href={area.path} className="font-medium text-accent hover:underline">
                {area.title}
              </Link>
            </li>
          ))}
        </ul>

        <section className="border-t border-border pt-8" aria-labelledby="fundadores-heading">
          <h2 id="fundadores-heading" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            Fundadores
          </h2>
          <ul className="mt-6 space-y-8">
            {FOUNDERS.map((person) => (
              <li key={person.name}>
                <h3 className="font-medium text-foreground">{person.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-accent">{person.role}</p>
                <blockquote className="mt-3 border-l-2 border-border pl-4 italic">{person.quote}</blockquote>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </PageShell>
  );
}
