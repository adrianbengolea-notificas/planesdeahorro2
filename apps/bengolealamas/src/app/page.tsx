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

export default function HomePage() {
  const homeUrl = absoluteUrl(siteSeo, '/');

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
          </div>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAreas.map((area) => (
            <li key={area.id} className="border border-border p-5 text-left">
              <h2 className="font-headline text-base font-normal text-foreground">{area.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
              {area.published ? (
                <Link href={area.path} className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
                  Ver más
                </Link>
              ) : (
                <Link
                  href={`/areas-de-practica#${area.id}`}
                  className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                >
                  Ver en áreas de práctica
                </Link>
              )}
            </li>
          ))}
        </ul>

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
