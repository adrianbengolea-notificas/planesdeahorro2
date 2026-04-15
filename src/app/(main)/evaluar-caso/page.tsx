import type { Metadata } from 'next';
import { ChatClient } from './chat-client';

export const metadata: Metadata = {
  title: 'Evalúe su Caso con IA | JurisPlan',
  description: 'Converse con nuestro asistente jurídico virtual para obtener una evaluación inicial gratuita y confidencial de su caso de plan de ahorro.',
};

export default function EvaluateCasePage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Asistente de Evaluación de Casos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Converse con nuestro asistente virtual para que podamos entender su situación. La consulta es gratuita, confidencial y el primer paso para encontrar una solución.
          </p>
        </div>
        <ChatClient />
      </div>
    </div>
  );
}
