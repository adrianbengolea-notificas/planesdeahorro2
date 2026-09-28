import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@repo/shared/seo';
import { buttonVariants } from '@/components/ui/button';
import { ContentEmptyState } from '@/components/content-empty-state';
import { getBlSiteSeoConfig } from '@/config/seo';
import {
  HOME_FEATURED_AREAS,
  PRACTICE_AREAS,
} from '@/config/practice-areas';
import { ADRIAN_PLANES_SITE_URL, DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/config/site';

const siteSeo = getBlSiteSeoConfig();

export const metadata: Metadata = buildPageMetadata(siteSeo, {
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  path: '/',
  absoluteTitle: true,
});

const featuredAreas = HOME_FEATURED_AREAS.map((id) => PRACTICE_AREAS.find((a) => a.id === id)).filter(
  Boolean,
) as typeof PRACTICE_AREAS;

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">San Nicolás de los Arroyos</p>
          <h1 className="mt-4 max-w-3xl font-headline text-4xl font-bold leading-tight md:text-5xl">
            {SITE_NAME}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">{SITE_TAGLINE}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
            {DEFAULT_DESCRIPTION} Acompañamos a personas y empresas con criterio técnico, claridad y respeto por el
            proceso judicial.
          </p>
          <div className="mt-10">
            <Link
              href="/contacto"
              className={buttonVariants({
                size: 'lg',
                className: 'bg-accent text-accent-foreground hover:bg-accent/90',
              })}
            >
              Consultar
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-18" aria-labelledby="areas-heading">
        <h2 id="areas-heading" className="font-headline text-2xl font-semibold md:text-3xl">
          Áreas principales
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Especialidades en las que el estudio concentra experiencia. Las fichas detalladas se publicarán progresivamente.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAreas.map((area) => (
            <li key={area.id}>
              <Link
                href={area.published ? area.path : `/areas-de-practica#${area.id}`}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="font-headline text-base font-semibold group-hover:text-accent">{area.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Ver más
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-secondary/60 border-y border-border" aria-labelledby="contenido-heading">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <h2 id="contenido-heading" className="font-headline text-2xl font-semibold md:text-3xl">
            Contenido jurídico
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-headline text-lg font-semibold">
                <Link href="/publicaciones" className="hover:text-accent">
                  Publicaciones
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Artículos y análisis sobre temas de actualidad.</p>
            </article>
            <article className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-headline text-lg font-semibold">
                <Link href="/jurisprudencia" className="hover:text-accent">
                  Jurisprudencia
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Fallos comentados y líneas jurisprudenciales relevantes.</p>
            </article>
            <article className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-headline text-lg font-semibold">Guías jurídicas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Próximamente: guías prácticas por área de práctica.
              </p>
            </article>
          </div>
          <div className="mt-8">
            <ContentEmptyState
              title="Portal en construcción"
              description="Las publicaciones y la jurisprudencia se irán incorporando desde el CMS multisite. Por ahora las secciones están preparadas técnicamente."
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-16" aria-labelledby="estudio-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="estudio-heading" className="font-headline text-2xl font-semibold md:text-3xl">
              El estudio
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Bengolea & Lamas es un estudio jurídico con base en San Nicolás de los Arroyos, orientado a brindar
              respuestas claras en conflictos civiles, comerciales y de consumo. Trabajamos con rigor técnico y
              comunicación directa con quien nos consulta.
            </p>
            <Link href="/estudio" className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:text-accent">
              Conocer el estudio
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </div>
          <aside className="rounded-lg border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Planes de ahorro automotriz:</strong> el desarrollo especializado de
              contenido y consultas sobre planes de ahorro se publica en el sitio dedicado{' '}
              <a
                href={ADRIAN_PLANES_SITE_URL}
                className="font-medium text-primary underline-offset-2 hover:underline"
                rel="noopener noreferrer"
              >
                adrianbengolea.com.ar
              </a>
              . En este sitio mantenemos un{' '}
              <Link href="/planes-de-ahorro" className="font-medium text-primary underline-offset-2 hover:underline">
                hub institucional
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex flex-col items-start gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-headline text-2xl font-semibold">Contacto</h2>
            <p className="mt-2 max-w-xl text-primary-foreground/75">
              Escribinos para coordinar una consulta. Publicaremos teléfono y correo oficiales en breve.
            </p>
          </div>
          <Link
            href="/contacto"
            className={buttonVariants({
              size: 'lg',
              className: 'bg-accent text-accent-foreground hover:bg-accent/90',
            })}
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </>
  );
}
