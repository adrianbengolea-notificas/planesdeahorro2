import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes sobre Planes de Ahorro | JurisPlan',
  description: 'Respuestas a las preguntas más comunes sobre aumentos de cuota, renuncias, secuestros prendarios y otros problemas de planes de ahorro.',
};

export default function FaqPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Preguntas Frecuentes</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Encuentre aquí respuestas claras y directas a las dudas más habituales de los suscriptores de planes de ahorro.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b">
                <AccordionTrigger className="text-left text-lg font-headline hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
