import Link from 'next/link';
import { Button } from './ui/button';
import { JsonLd } from '@/components/json-ld';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaqAnswer } from '@/components/faq-answer';
import { getProblemBySlug, getRelatedFaqsForProblem } from '@/lib/data';
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  problemWebPageJsonLd,
} from '@/lib/schema';
import { absoluteUrl } from '@/lib/seo';

interface ProblemPageLayoutProps {
  slug: string;
  title: string;
  children: React.ReactNode;
}

export function ProblemPageLayout({ slug, title, children }: ProblemPageLayoutProps) {
  const problem = getProblemBySlug(slug);
  const relatedFaqs = getRelatedFaqsForProblem(slug);
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Problemas de planes de ahorro', path: '/problemas' },
      { name: title, path: `/problemas/${slug}` },
    ]),
    ...(problem ? [problemWebPageJsonLd(problem)] : []),
    ...(relatedFaqs.length > 0
      ? [faqPageJsonLd(relatedFaqs, absoluteUrl(`/problemas/${slug}`))]
      : []),
  ];

  return (
    <div className="flex flex-col">
      <JsonLd data={jsonLd} />
      {/* ── Page header ── */}
      <div className="bg-primary text-primary-foreground py-14 md:py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-[3px] h-full bg-accent hidden md:block" />
        <div className="container mx-auto px-6 md:px-8">
          <nav aria-label="Miga de pan" className="text-white/50 text-sm mb-5">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white/80">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/problemas" className="hover:text-white/80">
                  Problemas
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80">{title}</li>
            </ol>
          </nav>
          <p className="text-accent text-[11px] font-medium tracking-[0.3em] uppercase mb-3">
            Problemas de planes de ahorro
          </p>
          <h1 className="font-headline text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl">
            {title}
          </h1>
          <div className="w-12 h-[2px] bg-accent mt-6" />
          {problem?.directAnswer && (
            <p className="text-white/70 mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
              {problem.directAnswer}
            </p>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Article */}
            <div className="lg:col-span-2">
              <article className="prose lg:prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary prose-a:text-primary">
                {children}
              </article>

              {relatedFaqs.length > 0 && (
                <section className="mt-16 border-t border-border pt-10">
                  <p className="text-accent font-medium tracking-[0.25em] uppercase text-[11px] mb-3">
                    Preguntas frecuentes
                  </p>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-6">
                    Dudas habituales sobre este problema
                  </h2>
                  <Accordion type="multiple" className="w-full">
                    {relatedFaqs.map((faq, index) => (
                      <AccordionItem
                        value={`${slug}-faq-${index}`}
                        key={faq.question}
                        className="border-border"
                      >
                        <AccordionTrigger className="text-left font-headline text-base md:text-lg hover:no-underline py-5 hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 pt-0.5">
                          <FaqAnswer
                            text={faq.answer}
                            className="text-base text-foreground/85 leading-relaxed max-w-prose"
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 border border-border bg-card p-8">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4">
                  Contanos tu caso
                </p>
                <h2 className="font-headline text-2xl font-bold text-primary mb-4 leading-tight">
                  ¿Tiene este problema?
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  No se resigne. Tiene derechos que lo protegen. Evaluamos su situación sin compromiso.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  <Link href="/evaluar-caso">Contanos tu caso</Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  100% confidencial.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}
