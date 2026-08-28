import { ProblemPageLayout } from '@/components/problem-page-layout';
import type { Metadata } from 'next';
import { getProblemBySlug } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

const problem = getProblemBySlug('secuestro-prendario')!;

export const metadata: Metadata = buildPageMetadata({
  title: problem.seoTitle,
  description: problem.seoDescription,
  path: '/problemas/secuestro-prendario',
  keywords: problem.keywords,
});

export default function SecuestroPrendarioPage() {
  return (
    <ProblemPageLayout slug="secuestro-prendario" title="Ejecución Prendaria">
      <p>
        La ejecución prendaria es el problema más urgente de un plan de ahorro: la administradora inicia juicio cuando el suscriptor ya tiene el auto y deja de pagar cuotas. El objetivo suele ser secuestrar el vehículo, venderlo y cancelar la deuda.
      </p>
      <p>
        Es un proceso muy rápido. Si no se actúa a tiempo, se puede perder el auto en cuestión de semanas.
      </p>

      <h2 className="font-headline">¿Me pueden sacar el auto del plan de ahorro por deber cuotas?</h2>
      <ol>
        <li><strong>Mora:</strong> se dejan de pagar un número de cuotas.</li>
        <li><strong>Intimación:</strong> carta documento exigiendo el pago en un plazo corto.</li>
        <li><strong>Demanda:</strong> si no hay pago, piden el secuestro judicial.</li>
        <li><strong>Orden de secuestro:</strong> el juez puede librarla sin escuchar antes al deudor; un oficial, con policía, puede retirar el auto donde esté.</li>
        <li><strong>Subasta:</strong> el vehículo se remata.</li>
      </ol>

      <h2 className="font-headline">¿Qué defensas hay frente a una ejecución prendaria?</h2>
      <p>
        Aunque el trámite es rápido, no estás indefenso:
      </p>
      <ul>
        <li><strong>Nulidad de la intimación:</strong> si la carta no cumple requisitos legales, puede caer el proceso posterior.</li>
        <li><strong>Deuda abusiva:</strong> intereses sobre intereses (anatocismo), gastos improcedentes o un saldo mal armado.</li>
        <li><strong>Impugnación del cálculo:</strong> pedir al juez que revise el monto; si está inflado, la mora o el reclamo se debilita.</li>
        <li><strong>Ofrecimiento de pago:</strong> un plan razonable puede frenar el secuestro y regularizar.</li>
      </ul>

      <h2 className="font-headline">¿Por qué hay que actuar apenas llega la intimación?</h2>
      <p>
        Desde la primera carta documento o la cédula del juzgado, el tiempo es decisivo. Un abogado especializado en planes de ahorro puede marcar la diferencia entre conservar el vehículo y perderlo.
      </p>
    </ProblemPageLayout>
  );
}
