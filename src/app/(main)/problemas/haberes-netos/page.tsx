import { ProblemPageLayout } from '@/components/problem-page-layout';
import type { Metadata } from 'next';
import { getProblemBySlug } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

const problem = getProblemBySlug('haberes-netos')!;

export const metadata: Metadata = buildPageMetadata({
  title: problem.seoTitle,
  description: problem.seoDescription,
  path: '/problemas/haberes-netos',
  keywords: problem.keywords,
});

export default function HaberesNetosPage() {
  return (
    <ProblemPageLayout slug="haberes-netos" title="Cálculo de Haberes Netos">
      <p>
        Los haberes netos (o crédito neto) son el dinero que la administradora debe devolver a quien renunció o fue rescindido, cuando el grupo finaliza. El mal cálculo de ese monto es una de las principales fuentes de problemas en planes de ahorro.
      </p>

      <h2 className="font-headline">¿Cómo se deberían calcular los haberes netos?</h2>
      <p>
        La fórmula básica: suma de todas las cuotas puras pagadas. La cuota pura es el valor del vehículo (valor móvil) dividido por la cantidad de cuotas del plan (en general 84 o 120).
      </p>
      <p>
        Ese monto debe actualizarse. La jurisprudencia mayoritaria sostiene que las cuotas puras pagadas en el pasado se actualizan al valor del vehículo al cierre y liquidación del grupo. Eso protege el dinero de la inflación.
      </p>

      <h2 className="font-headline">¿Por qué me devolvieron menos de lo que esperaba?</h2>
      <p>
        Las administradoras suelen achicar el haber de estas formas:
      </p>
      <ul>
        <li><strong>No actualizan los montos:</strong> devuelven el valor nominal, irrisorio con inflación.</li>
        <li><strong>Descuentos indebidos:</strong> gastos administrativos, seguros o penalidades que no corresponden sobre el capital a devolver.</li>
        <li><strong>Valor móvil incorrecto:</strong> toman un precio del vehículo desactualizado o inferior al real.</li>
        <li><strong>Retienen el pago:</strong> demoran la devolución después de liquidar el grupo, sin intereses.</li>
      </ul>

      <h2 className="font-headline">¿Cómo se reclama un haber neto mal liquidado?</h2>
      <ol>
        <li><strong>Auditoría del cálculo:</strong> se pide el detalle completo de la liquidación.</li>
        <li><strong>Reclamo por la diferencia:</strong> intimación de pago con actualización e intereses.</li>
        <li><strong>Demanda de cobro:</strong> si no hay respuesta, un juez puede ordenar el pago correcto más daños.</li>
      </ol>
      <p>
        El dinero invertido es tuyo. La ley permite reclamar que lo devuelvan completo y actualizado.
      </p>
    </ProblemPageLayout>
  );
}
