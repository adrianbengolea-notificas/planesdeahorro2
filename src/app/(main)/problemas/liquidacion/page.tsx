import { ProblemPageLayout } from '@/components/problem-page-layout';
import type { Metadata } from 'next';
import { getProblemBySlug } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

const problem = getProblemBySlug('liquidacion')!;

export const metadata: Metadata = buildPageMetadata({
  title: problem.seoTitle,
  description: problem.seoDescription,
  path: '/problemas/liquidacion',
  keywords: problem.keywords,
});

export default function LiquidacionPage() {
  return (
    <ProblemPageLayout slug="liquidacion" title="Liquidación del Plan de Ahorro">
      <p>
        La liquidación de un plan de ahorro es uno de los problemas más frecuentes: ocurre al finalizar el plazo del grupo, cuando la administradora debe rendir cuentas y, en muchos casos, devolver dinero. En la práctica, esta etapa suele generar demoras, números opacos y descuentos que el suscriptor no puede controlar.
      </p>

      <h2 className="font-headline">¿Qué problemas hay en la liquidación de un plan de ahorro?</h2>
      <ul>
        <li><strong>Demoras injustificadas:</strong> las administradoras tardan meses o incluso años en liquidar y poner los fondos a disposición.</li>
        <li><strong>Cálculos incorrectos:</strong> descuentos indebidos, montos sin actualizar o liquidaciones por debajo de lo que corresponde.</li>
        <li><strong>Falta de información:</strong> no entregan un detalle claro de cómo se armó el haber a devolver.</li>
        <li><strong>Multas o penalidades improcedentes:</strong> cargos por rescisión que no corresponden o que son excesivos.</li>
      </ul>

      <h2 className="font-headline">¿Quiénes tienen derecho a la devolución de fondos?</h2>
      <p>
        Principalmente, quienes renunciaron al plan, quienes fueron rescindidos por falta de pago y, en algunos casos, quienes pagaron la totalidad pero nunca retiraron el vehículo. Corresponde devolver el valor de las cuotas puras pagadas, actualizado al valor del vehículo al momento de la liquidación.
      </p>

      <h2 className="font-headline">¿Qué hacer si la administradora demora o calcula mal la liquidación?</h2>
      <p>
        El reclamo suele avanzar en tres tramos:
      </p>
      <ol>
        <li><strong>Intimación por carta documento:</strong> se exige la liquidación correcta y el pago de los haberes.</li>
        <li><strong>Mediación y conciliación:</strong> se busca un acuerdo prejudicial para evitar un juicio largo.</li>
        <li><strong>Demanda judicial:</strong> si no cumplen, se reclama el cumplimiento del contrato, daños y, cuando corresponde, daño punitivo por conducta abusiva.</li>
      </ol>
      <p>
        La Ley de Defensa del Consumidor (N.º 24.240) ampara al suscriptor. No hay que resignarse a que la administradora retenga el dinero o lo pague desactualizado.
      </p>
    </ProblemPageLayout>
  );
}
