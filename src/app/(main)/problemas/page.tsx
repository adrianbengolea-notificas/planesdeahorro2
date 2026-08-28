import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaqAnswer } from '@/components/faq-answer';
import { frequentProblems, problemasIndexFaqs } from '@/lib/data';
import { problemasIndexJsonLd } from '@/lib/schema';
import { buildPageMetadata, DEFAULT_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Problemas de planes de ahorro',
  description:
    'Los problemas más frecuentes de los planes de ahorro en Argentina: liquidación demorada, rescisión, haberes netos, ejecución prendaria y cláusulas abusivas. Qué derechos tenés y cómo reclamar.',
  path: '/problemas',
  keywords: [
    'problemas de planes de ahorro',
    'problemas plan de ahorro Argentina',
    'conflictos con administradora plan de ahorro',
    ...DEFAULT_KEYWORDS,
  ],
});

export default function ProblemasIndexPage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={problemasIndexJsonLd()} />

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
              <li className="text-white/80">Problemas</li>
            </ol>
          </nav>
          <p className="text-accent text-[11px] font-medium tracking-[0.3em] uppercase mb-3">
            Planes de ahorro automotriz
          </p>
          <h1 className="font-headline text-4xl md:text-6xl font-bold leading-[1.05] max-w-4xl">
            Problemas frecuentes de planes de ahorro
          </h1>
          <div className="w-12 h-[2px] bg-accent mt-6" />
          <p className="text-white/70 mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            Los conflictos más habituales de los suscriptores en Argentina son la demora o el mal cálculo de la liquidación, la rescisión del contrato, diferencias en los haberes netos, la ejecución prendaria del vehículo y las cláusulas abusivas. El Dr. Adrián Bengolea asesora a residentes de la Provincia de Buenos Aires.
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground max-w-3xl text-base md:text-lg leading-relaxed mb-12">
            Si tenés un plan de Chevrolet, Ford, Volkswagen, Fiat, Renault (Plan Rombo) u otra administradora y surgió un conflicto, estos son los reclamos que más vemos. Cada uno tiene solución legal al amparo de la Ley de Defensa del Consumidor N.º 24.240.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {frequentProblems.map((problem, index) => (
              <Link
                key={problem.slug}
                href={`/problemas/${problem.slug}`}
                className="group flex flex-col bg-card p-7 md:p-8 hover:bg-secondary/40 transition-colors duration-200"
              >
                <span className="font-headline text-4xl font-bold text-border group-hover:text-accent/40 transition-colors mb-4 leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                  {problem.title}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base flex-grow leading-relaxed">
                  {problem.directAnswer}
                </p>
                <div className="mt-6 flex items-center text-primary text-sm font-semibold gap-1.5 group-hover:gap-3 transition-all">
                  Ver este problema <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-4">
          <p className="text-accent font-medium tracking-[0.25em] uppercase text-[11px] mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary max-w-2xl leading-tight mb-10">
            Si buscás “problemas de planes de ahorro”
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {problemasIndexFaqs.map((faq, index) => (
                <AccordionItem value={`hub-${index}`} key={faq.question} className="border-border">
                  <AccordionTrigger className="font-headline text-lg text-left text-foreground hover:text-primary py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-5">
                    <FaqAnswer text={faq.answer} className="text-muted-foreground" />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            ¿Tu caso encaja en alguno de estos problemas?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Dejá registrado tu relato. El estudio analiza si hay fundamentos para reclamar, sin compromiso.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12 px-8"
          >
            <Link href="/evaluar-caso">Contanos tu caso</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
