import Link from 'next/link';
import { JsonLd } from '@repo/shared/components/json-ld';
import { absoluteUrl } from '@repo/shared/seo';
import { CaseIntakePromo } from '@/components/case-intake/case-intake-promo';
import { PageShell } from '@/components/page-shell';
import { RelatedPublications } from '@/components/related-publications';
import { getPracticeAreaPage } from '@/config/practice-area-pages';
import { PRACTICE_AREAS } from '@/config/practice-areas';
import { getProfessionalBySlug } from '@/config/professionals';
import { getBlSiteSeoConfig } from '@/config/seo';
import { ADRIAN_PLANES_SITE_URL } from '@/config/site';
import { blPageMetadata } from '@/lib/page-metadata';
import { faqPageJsonLd, practiceAreaServiceJsonLd } from '@/lib/schema';

export function practiceAreaMetadata(areaId: string) {
  const page = getPracticeAreaPage(areaId);
  const area = PRACTICE_AREAS.find((a) => a.id === areaId);
  if (!page || !area) {
    throw new Error(`Área de práctica sin contenido: ${areaId}`);
  }
  return blPageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: area.path,
    keywords: page.keywords,
  });
}

export function PracticeAreaPage({ areaId }: { areaId: string }) {
  const page = getPracticeAreaPage(areaId);
  const area = PRACTICE_AREAS.find((a) => a.id === areaId);
  if (!page || !area) {
    throw new Error(`Área de práctica sin contenido: ${areaId}`);
  }

  const site = getBlSiteSeoConfig();
  const url = absoluteUrl(site, area.path);
  const related = page.relatedIds
    .map((id) => PRACTICE_AREAS.find((a) => a.id === id))
    .filter((a): a is (typeof PRACTICE_AREAS)[number] => Boolean(a));
  const professionals = page.relatedProfessionalSlugs
    .map(getProfessionalBySlug)
    .filter((p): p is NonNullable<ReturnType<typeof getProfessionalBySlug>> => Boolean(p));

  return (
    <PageShell
      title={page.h1}
      description={page.directAnswer}
      path={area.path}
      breadcrumbs={[
        { label: 'Inicio', href: '/' },
        { label: 'Áreas de práctica', href: '/areas-de-practica' },
        { label: area.title },
      ]}
    >
      <JsonLd data={practiceAreaServiceJsonLd(area, page)} />
      <JsonLd data={faqPageJsonLd(page.faqs, url)} />

      <article className="max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        {page.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}

        {page.topics.map((topic, index) => (
          <section key={topic.title} className="scroll-mt-24 pt-4" aria-labelledby={`${areaId}-topic-${index}`}>
            <h2 id={`${areaId}-topic-${index}`} className="font-headline text-xl font-normal text-foreground md:text-2xl">
              {topic.title}
            </h2>
            <p className="mt-3">{topic.body}</p>
          </section>
        ))}

        {page.planesDeAhorroNote ? (
          <p>
            Conflictos de planes de ahorro automotriz:{' '}
            <Link href="/planes-de-ahorro" className="font-medium text-accent hover:underline">
              hub institucional
            </Link>
            {' · '}
            <a href={ADRIAN_PLANES_SITE_URL} rel="noopener noreferrer" className="font-medium text-accent hover:underline">
              sitio especializado
            </a>
            . Esta ficha no duplica ese contenido.
          </p>
        ) : null}

        <section className="border-t border-border pt-8" aria-labelledby={`${areaId}-faq`}>
          <h2 id={`${areaId}-faq`} className="font-headline text-xl font-normal text-foreground md:text-2xl">
            Preguntas frecuentes
          </h2>
          <dl className="mt-6 space-y-6">
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-medium text-foreground">{faq.question}</dt>
                <dd className="mt-2">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>

      {related.length > 0 ? (
        <nav className="mt-12 max-w-3xl" aria-label="Áreas relacionadas">
          <h2 className="font-headline text-lg font-normal text-foreground">También puede interesarte</h2>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm">
            {related.map((item) => {
              const href = item.published ? item.path : `/areas-de-practica#${item.id}`;
              return (
                <li key={item.id}>
                  <Link href={href} className="font-medium text-accent hover:underline">
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      <RelatedPublications areaId={areaId} />

      {professionals.length > 0 ? (
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
          Profesionales relacionados:{' '}
          {professionals.map((person, i) => (
            <span key={person.slug}>
              {i > 0 ? ' · ' : null}
              <Link href={`/profesionales/${person.slug}`} className="font-medium text-accent hover:underline">
                {person.name}
              </Link>
            </span>
          ))}
        </p>
      ) : null}

      <CaseIntakePromo className="mt-12 max-w-3xl" />
    </PageShell>
  );
}

