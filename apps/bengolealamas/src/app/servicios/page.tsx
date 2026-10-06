import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { PRACTICE_AREAS } from '@/config/practice-areas';
import { blPageMetadata } from '@/lib/page-metadata';
import {
  SERVICIOS_ALLIANCES,
  SERVICIOS_CORPORATE,
  SERVICIOS_INTRO,
  SERVICIOS_PROFILE,
  SERVICIOS_SPECIALIZATION,
  SERVICIOS_TUTORIA,
} from '@/config/servicios';

const SPECIALIZATION_LINKS: Record<string, string> = {
  'Asesoramiento jurídico de empresas': '/empresas',
  Consumidor: '/defensa-del-consumidor',
  Laboral: '/derecho-laboral',
  Familia: '/derecho-de-familia',
  'Daños y perjuicios': '/danos-y-perjuicios',
  'Acciones colectivas': '/acciones-colectivas',
  'Cuestiones procesales complejas': '/cuestiones-procesales',
  'Medio ambiente': '/medio-ambiente',
  'Derecho administrativo': '/derecho-administrativo',
  'Conflictos tributarios': '/conflictos-tributarios',
};

const publishedFichas = PRACTICE_AREAS.filter((a) => a.published && a.id !== 'planes-ahorro');

export const metadata: Metadata = blPageMetadata({
  title: 'Servicios y áreas de competencia',
  description:
    'Perfil del Estudio Jurídico Bengolea & Lamas: litigio, prevención de conflictos, alianzas estratégicas y áreas de especialización en San Nicolás.',
  path: '/servicios',
  keywords: [
    'servicios jurídicos San Nicolás',
    'defensa del consumidor',
    'daños y perjuicios',
    'asesoramiento empresas',
  ],
});

export default function ServiciosPage() {
  return (
    <PageShell
      title={SERVICIOS_INTRO.title}
      description={SERVICIOS_INTRO.subtitle}
      path="/servicios"
      breadcrumbs={[
        { label: 'Inicio', href: '/' },
        { label: 'Servicios' },
      ]}
    >
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{SERVICIOS_INTRO.eyebrow}</p>

      <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        {SERVICIOS_PROFILE.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <section className="mt-14 scroll-mt-24" aria-labelledby="alianzas-heading">
        <h2 id="alianzas-heading" className="font-headline text-xl font-normal text-foreground md:text-2xl">
          {SERVICIOS_ALLIANCES.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {SERVICIOS_ALLIANCES.body}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {SERVICIOS_ALLIANCES.closing}
        </p>
      </section>

      <section className="mt-14 scroll-mt-24" aria-labelledby="tutoria-heading">
        <h2 id="tutoria-heading" className="font-headline text-xl font-normal text-foreground md:text-2xl">
          {SERVICIOS_TUTORIA.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {SERVICIOS_TUTORIA.body}
        </p>
        <p className="mt-4 text-sm">
          <Link href="/profesionales/adrian-bengolea" className="font-medium text-accent hover:underline">
            Perfil del Dr. Adrián Bengolea
          </Link>
        </p>
      </section>

      <section className="mt-14 scroll-mt-24" aria-labelledby="especializacion-heading">
        <h2 id="especializacion-heading" className="font-headline text-xl font-normal text-foreground md:text-2xl">
          {SERVICIOS_SPECIALIZATION.title}
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {SERVICIOS_SPECIALIZATION.columns.map((column) => (
            <ul key={column[0]} className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              {column.map((item) => (
                <li key={item}>
                  {SPECIALIZATION_LINKS[item] ? (
                    <Link href={SPECIALIZATION_LINKS[item]} className="text-accent hover:underline">
                      {item}
                    </Link>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/areas-de-practica" className="font-medium text-accent hover:underline">
            Mapa de áreas de práctica del sitio
          </Link>
        </p>
      </section>

      <section className="mt-14 scroll-mt-24" aria-labelledby="fichas-heading">
        <h2 id="fichas-heading" className="font-headline text-xl font-normal text-foreground md:text-2xl">
          Fichas de práctica
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {publishedFichas.map((area) => (
            <li key={area.id} className="border border-border p-5">
              <h3 className="font-headline text-base font-normal text-foreground">{area.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
              <Link href={area.path} className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
                Leer ficha
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 scroll-mt-24 border-t border-border pt-12" aria-labelledby="corporativos-heading">
        <h2 id="corporativos-heading" className="font-headline text-xl font-normal text-foreground md:text-2xl">
          {SERVICIOS_CORPORATE.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {SERVICIOS_CORPORATE.body}{' '}
          <Link href="/empresas" className="font-medium text-accent hover:underline">
            Ficha de empresas
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
