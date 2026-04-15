import type { Article, FAQ, FrequentProblem } from './types';

export const frequentProblems: FrequentProblem[] = [
  {
    slug: 'liquidacion',
    title: 'Liquidación del Plan',
    description: 'Problemas y demoras al finalizar su plan y solicitar la liquidación de haberes.',
  },
  {
    slug: 'rescision',
    title: 'Rescisión de Contrato',
    description: 'Conflictos derivados de la rescisión anticipada del contrato por parte del suscriptor o la administradora.',
  },
  {
    slug: 'haberes-netos',
    title: 'Cálculo de Haberes Netos',
    description: 'Discrepancias en el cálculo de los haberes netos y los montos a reintegrar por la administradora.',
  },
  {
    slug: 'secuestro-prendario',
    title: 'Secuestro Prendario',
    description: 'Defensa ante acciones de secuestro del vehículo por falta de pago de cuotas.',
  },
  {
    slug: 'clausulas-abusivas',
    title: 'Cláusulas Abusivas',
    description: 'Análisis y nulidad de cláusulas que imponen condiciones desproporcionadas en el contrato.',
  },
  {
    slug: 'aumento-cuota',
    title: 'Aumento Excesivo de Cuota',
    description: 'Reclamos por aumentos desmedidos en el valor de la cuota mensual del plan.',
  },
];

export const doctrinalArticles: Article[] = [
  {
    slug: 'la-naturaleza-juridica-del-plan-de-ahorro',
    title: 'La Naturaleza Jurídica del Contrato de Plan de Ahorro',
    summary:
      'Un análisis profundo sobre si el plan de ahorro es un contrato de consumo, un mandato, o una figura mixta. Implicancias prácticas de cada postura.',
    author: 'Dr. Juan Pérez',
    date: '2024-03-10',
    content: 'Análisis detallado sobre la naturaleza jurídica del contrato de plan de ahorro...',
  },
  {
    slug: 'el-valor-movil-y-la-crisis-economica',
    title: 'El "Valor Móvil" en Jaque: Cómo la Crisis Económica Desnaturaliza el Contrato',
    summary:
      'Exploración de la teoría de la imprevisión y el esfuerzo compartido como herramientas legales para morigerar los efectos de la devaluación en los planes de ahorro.',
    author: 'Dra. Ana Gómez',
    date: '2024-02-05',
    content: 'Artículo completo sobre la crisis económica y su impacto en el valor móvil...',
  },
  {
    slug: 'defensa-del-consumidor-en-secuestro-prendario',
    title: 'Estrategias de Defensa del Consumidor ante un Secuestro Prendario',
    summary:
      'Guía práctica con las principales defensas y nulidades que pueden oponerse en un juicio de secuestro prendario iniciado por una administradora de plan de ahorro.',
    author: 'Dr. Carlos Rodríguez',
    date: '2024-01-20',
    content: 'Guía detallada sobre cómo defenderse en un juicio de secuestro prendario...',
  },
];

export const faqs: FAQ[] = [
  {
    question: '¿Qué hago si la cuota de mi plan aumentó más que mi sueldo?',
    answer:
      'Si el aumento de la cuota es desproporcionado, es posible solicitar una medida cautelar en la justicia para que se readecúe la cuota a un índice razonable, como el de variación salarial. Contáctenos para evaluar su caso.',
  },
  {
    question: 'Dejé de pagar el plan, ¿pueden quitarme el auto?',
    answer:
      'Sí, si el vehículo está prendado a favor de la administradora, pueden iniciar un juicio de secuestro prendario. Sin embargo, existen defensas legales para oponerse y negociar. Es crucial actuar rápido.',
  },
  {
    question: 'Terminé de pagar el plan, ¿cuánto tardan en devolverme el dinero?',
    answer:
      'La administradora tiene un plazo para realizar la liquidación final del grupo y devolver los haberes netos a los suscriptores que no adjudicaron el vehículo. Si hay demoras o el monto es incorrecto, se puede intimar y reclamar judicialmente.',
  },
  {
    question: '¿Puedo renunciar a mi plan de ahorro?',
    answer:
      'Sí, puede renunciar en cualquier momento. La administradora deberá reintegrarle el valor de las cuotas puras abonadas al finalizar el plan, actualizado. Es importante formalizar la renuncia de manera fehaciente.',
  },
   {
    question: '¿Qué es el "valor móvil" del auto?',
    answer:
      'El "valor móvil" es el precio de lista del vehículo 0km, que sirve como base para calcular la cuota pura de su plan. Cuando el precio del auto sube, su cuota también lo hace. Este es el principal factor de los aumentos.',
  },
   {
    question: '¿La consulta tiene costo?',
    answer:
      'La primera evaluación de su caso es totalmente gratuita y sin compromiso. Analizamos su situación y le informamos sobre las posibles vías de acción y los costos asociados si decide proceder.',
  },
];
