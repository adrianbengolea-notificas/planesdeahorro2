import type { Metadata } from 'next';
import { CaseForm } from './case-form';

export const metadata: Metadata = {
  title: 'Evalúe su Caso Gratis | JurisPlan',
  description: 'Complete nuestro formulario para recibir una evaluación gratuita y confidencial de su caso de plan de ahorro por parte de un abogado especialista.',
};

export default function EvaluateCasePage() {
  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Evalúe su Caso</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Complete el siguiente formulario con la mayor cantidad de detalles posible. Un especialista analizará su situación y lo contactará a la brevedad para informarle sus opciones. La consulta es gratuita y 100% confidencial.
          </p>
        </div>
        <CaseForm />
      </div>
    </div>
  );
}
