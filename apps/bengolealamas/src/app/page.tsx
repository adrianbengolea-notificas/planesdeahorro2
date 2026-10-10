import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@repo/shared/components/json-ld';
import { absoluteUrl, buildPageMetadata } from '@repo/shared/seo';
import { HomeHeroCarousel } from '@/components/home-hero-carousel';
import { HOME_FAQS, HOME_IDENTITY } from '@/config/faqs';
import { HOME_FEATURED_AREAS, PRACTICE_AREAS } from '@/config/practice-areas';
import { getBlSiteSeoConfig } from '@/config/seo';
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/config/site';
import { HOME_SLIDES, formatStudioAddressLine } from '@/config/wix-brand';
import { getAllPublicPublications } from '@/lib/bl-cms-publications';
import { formatPublicationDate, publicationPath } from '@/lib/bl-publications';
import { faqPageJsonLd, webPageJsonLd } from '@/lib/schema';

const siteSeo = getBlSiteSeoConfig();

export const metadata: Metadata = buildPageMetadata(siteSeo, {
  title: SITE_NAME,
  description:
    'Estudio Jurídico Bengolea & Lamas en Belgrano 174, San Nicolás de los Arroyos. Abogados en derecho civil, comercial, defensa del consumidor, daños, bancos y seguros.',
  path: '/',
  absoluteTitle: true,
  keywords: siteSeo.keywords,
});

const featuredAreas = HOME_FEATURED_AREAS.map((id) => PRACTICE_AREAS.find((a) => a.id === id)).filter(
  (area): area is (typeof PRACTICE_AREAS)[number] => Boolean(area),
);

export default async function HomePage() {
  const homeUrl = absoluteUrl(siteSeo, '/');
  const recentNotes = (await getAllPublicPublications()).slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={webPageJsonLd({ path: '/', name: SITE_NAME, description: DEFAULT_DESCRIPTION })} />
      <JsonLd data={faqPageJsonLd(HOME_FAQS, homeUrl)} />
      <HomeHeroCarousel slides={[...HOME_SLIDES]} />
      <section className="border-t border-border bg-background px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{HOME_IDENTITY.kicker}</p>
          <h1 className="mt-3 font-headline text-3xl font-normal text-foreground md:text-4xl">{HOME_IDENTITY.h1}</h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">{HOME_IDENTITY.lead}</p>
          <p className="mt-3 text-sm text-muted-foreground">{formatStudioAddressLine()}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contanos-tu-caso"
              className="inline-flex border border-foreground bg-foreground px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-background transition hover:bg-foreground/90"
            >
              Contanos tu caso
            </Link>
            <Link
              href="/contacto"
              className="inline-flex border border-foreground px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-foreground hover:text-background"
            >
              Contacto
            </Link>
            <Link
              href="/estudio"
              className="inline-flex border border-border px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition hover:border-foreground hover:text-foreground"
            >
              El estudio
            </Link>
          </div>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAreas.map((area) => (
            <li key={area.id} className="border border-border p-5 text-left">
              <h2 className="font-headline text-base font-normal text-foreground">{area.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
              <Link href={area.path} className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
                Ver más
              </Link>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-5xl text-center text-sm">
          <Link href="/areas-de-practica" className="font-medium text-accent hover:underline">
            Ver todas las áreas de práctica
          </Link>
        </p>

        {recentNotes.length ? (
          <section className="mx-auto mt-16 max-w-3xl text-left" aria-labelledby="home-notes-heading">
            <h2 id="home-notes-heading" className="text-center font-headline text-2xl font-normal text-foreground">
              Notas recientes
            </h2>
            <ul className="mt-8 space-y-5">
              {recentNotes.map((pub) => (
                <li key={pub.slug}>
                  <Link href={publicationPath(pub.slug)} className="font-medium text-foreground hover:text-accent">
                    {pub.title}
                  </Link>
                  {pub.publishDate ? (
                    <p className="mt-1 text-xs text-muted-foreground">{formatPublicationDate(pub.publishDate)}</p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm">
              <Link href="/publicaciones" className="font-medium text-accent hover:underline">
                Publicaciones
              </Link>
              {' · '}
              <Link href="/jurisprudencia" className="font-medium text-accent hover:underline">
                Jurisprudencia
              </Link>
            </p>
          </section>
        ) : null}

        <section className="mx-auto mt-16 max-w-3xl text-left" aria-labelledby="home-faq-heading">
          <h2 id="home-faq-heading" className="text-center font-headline text-2xl font-normal text-foreground">
            Preguntas frecuentes
          </h2>
          <dl className="mt-8 space-y-6">
            {HOME_FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="font-medium text-foreground">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-center text-sm">
            <Link href="/preguntas-frecuentes" className="font-medium text-accent hover:underline">
              Ver todas las preguntas
            </Link>
          </p>
        </section>
      </section>
    </div>
  );
}
