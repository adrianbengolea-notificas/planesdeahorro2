import type { StudioFaq } from '@/config/faqs';

export type PracticeAreaPageContent = {
  id: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  h1: string;
  /** Respuesta directa para GEO (también va en el encabezado). */
  directAnswer: string;
  paragraphs: string[];
  topics: { title: string; body: string }[];
  faqs: StudioFaq[];
  relatedIds: string[];
  relatedProfessionalSlugs: string[];
  /** Solo consumidor: derivación al hub, sin copiar el sitio vertical. */
  planesDeAhorroNote?: boolean;
};

export const PRACTICE_AREA_PAGES: Record<string, PracticeAreaPageContent> = {
  'defensa-consumidor': {
    id: 'defensa-consumidor',
    seoTitle: 'Defensa del consumidor en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para reclamos de consumidores: contratos de adhesión, bancos, seguros y servicios. Estudio Bengolea & Lamas.',
    keywords: [
      'defensa del consumidor San Nicolás',
      'abogado consumidor',
      'Ley 24.240',
      'contratos de adhesión',
    ],
    h1: 'Defensa del consumidor',
    directAnswer:
      'El Estudio Bengolea & Lamas atiende reclamos de consumidores en San Nicolás de los Arroyos frente a empresas, bancos, aseguradoras y contratos de adhesión, con base en la Ley de Defensa del Consumidor 24.240.',
    paragraphs: [
      'La relación de consumo suele ser asimétrica: cláusulas impuestas, información incompleta o prácticas que trasladan al usuario un riesgo que no le corresponde. El estudio analiza el contrato, la prueba y las vías (administrativa o judicial) que mejor se ajustan al caso.',
      'Trabajamos con personas y también con conflictos que se repiten en un colectivo de usuarios. Cada consulta se ordena con los hechos concretos; esta página no sustituye un dictamen.',
    ],
    topics: [
      {
        title: 'Contratos de adhesión y cláusulas abusivas',
        body: 'Revisamos condiciones generales, cargos no pactados con claridad y cláusulas que desnaturalizan las obligaciones de la empresa. El objetivo es identificar qué se puede impugnar y con qué prueba.',
      },
      {
        title: 'Servicios, seguros y empresas',
        body: 'Intervenimos en conflictos con prestadores de servicios, aseguradoras y empresas de la región cuando hay incumplimiento, baja unilateral o negativa de cobertura. El recorte bancario específico está en la ficha de bancos.',
      },
      {
        title: 'Cómo se inicia una consulta',
        body: 'Podés contar el caso por el formulario, WhatsApp o el asistente inicial. Un abogado del estudio revisa el relato para ver si hay materia de reclamo y cuál sería el siguiente paso.',
      },
    ],
    faqs: [
      {
        question: '¿Qué es un reclamo de defensa del consumidor?',
        answer:
          'Es un conflicto entre un usuario o consumidor y una empresa, banco o prestador, cuando hay incumplimiento, cargos indebidos, falta de información o cláusulas abusivas. En Argentina rige la Ley 24.240 y normas complementarias.',
      },
      {
        question: '¿Atienden solo en San Nicolás?',
        answer:
          'El estudio tiene sede en Belgrano 174, San Nicolás de los Arroyos, y atiende consultas de la región. El alcance procesal de cada caso se evalúa en la consulta.',
      },
      {
        question: '¿Los planes de ahorro automotriz se tratan acá?',
        answer:
          'Sí, el estudio atiende esos conflictos. El contenido especializado (problemas frecuentes, fallos y consultas dedicadas) está en adrianbengolea.com.ar. En este sitio, el hub institucional es /planes-de-ahorro.',
      },
    ],
    relatedIds: ['bancos', 'danos', 'planes-ahorro'],
    relatedProfessionalSlugs: ['adrian-bengolea'],
    planesDeAhorroNote: true,
  },
  bancos: {
    id: 'bancos',
    seoTitle: 'Conflictos bancarios en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para fraude bancario, débitos no autorizados, DEBIN, tarjetas de crédito y habeas data. Estudio Bengolea & Lamas.',
    keywords: [
      'abogado bancos San Nicolás',
      'fraude bancario',
      'débitos no autorizados',
      'DEBIN',
      'habeas data',
    ],
    h1: 'Bancos y servicios financieros',
    directAnswer:
      'Atendemos conflictos con entidades financieras en San Nicolás: operaciones no reconocidas, débitos no autorizados, DEBIN, tarjetas de crédito y protección de datos personales.',
    paragraphs: [
      'Cuando aparece un movimiento que no se reconoció, un débito reiterado o un DEBIN cuestionado, el primer paso es reconstruir la cronología (extractos, denuncias, reclamos al banco) y ver qué carga de prueba le corresponde a la entidad.',
      'Esta ficha cubre el mapa bancario del estudio. Las subtemáticas (fraude, débitos, DEBIN, tarjetas, habeas data) se desarrollan acá para no fragmentar el mismo conflicto en cinco URLs delgadas.',
    ],
    topics: [
      {
        title: 'Fraude y operaciones no reconocidas',
        body: 'Transferencias, compras o préstamos que el cliente no autorizó. Se evalúa la denuncia, el reclamo al banco y la responsabilidad de la entidad por el canal de autenticación.',
      },
      {
        title: 'Débitos no autorizados y DEBIN',
        body: 'Cargos en cuenta o tarjeta sin consentimiento válido, y débitos inmediatos (DEBIN) cuya autorización se discute. El análisis combina extractos, mandatos y reclamos previos.',
      },
      {
        title: 'Tarjetas de crédito',
        body: 'Cargos indebidos, refinanciaciones y cláusulas del contrato de tarjeta. Puede cruzarse con defensa del consumidor cuando hay relación de consumo.',
      },
      {
        title: 'Habeas data',
        body: 'Información crediticia o datos personales mal registrados o difundidos por entidades financieras. Se trabaja con la Ley 25.326 y el reclamo a la fuente de la información.',
      },
    ],
    faqs: [
      {
        question: '¿Qué hago si no reconozco una transferencia?',
        answer:
          'Conservá extractos, capturas y el número de reclamo al banco. En la consulta del estudio se ordena esa prueba para evaluar si corresponde un reclamo por operación no reconocida.',
      },
      {
        question: '¿El banco siempre responde por un DEBIN?',
        answer:
          'No de forma automática. Depende de cómo se originó la autorización, qué avisos recibió el cliente y qué medidas tomó la entidad. Cada caso se analiza con esos hechos.',
      },
      {
        question: '¿Puedo reclamar un informe crediticio incorrecto?',
        answer:
          'Sí, cuando hay datos inexactos o desactualizados. El habeas data apunta a rectificar o suprimir esa información y, si corresponde, a resarcir el perjuicio.',
      },
    ],
    relatedIds: ['defensa-consumidor', 'danos', 'civil'],
    relatedProfessionalSlugs: ['ignacio-goni', 'adrian-bengolea'],
  },
  civil: {
    id: 'civil',
    seoTitle: 'Derecho civil en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para contratos, obligaciones, responsabilidad y conflictos patrimoniales. Estudio Jurídico Bengolea & Lamas.',
    keywords: [
      'abogado civil San Nicolás',
      'contratos',
      'obligaciones',
      'conflictos patrimoniales',
    ],
    h1: 'Derecho civil',
    directAnswer:
      'Asesoramos y litigamos en derecho civil en San Nicolás de los Arroyos: contratos, obligaciones, responsabilidad y conflictos patrimoniales de personas y de empresas.',
    paragraphs: [
      'El derecho civil es el marco de los acuerdos entre particulares y de las consecuencias cuando se incumplen. El estudio combina asesoramiento preventivo (revisión de contratos, estrategia de cobro) con litigio cuando el conflicto ya está judicializado.',
      'Si el reclamo es sobre todo una indemnización por un hecho dañoso (accidente, mala praxis), la ficha específica es daños y perjuicios. Acá se tratan el contrato, el incumplimiento y el patrimonio.',
    ],
    topics: [
      {
        title: 'Contratos y obligaciones',
        body: 'Redacción, interpretación e incumplimiento de contratos civiles y comerciales entre particulares. Se identifica qué se pactó, qué se prueba y qué remedios proceden (cumplimiento, resolución, daños).',
      },
      {
        title: 'Conflictos patrimoniales',
        body: 'Cobros, deudas, garantías y controversias sobre bienes. El enfoque es ordenar títulos, plazos y prueba antes de definir si conviene negociar o demandar.',
      },
      {
        title: 'Responsabilidad civil (marco general)',
        body: 'Cuando un incumplimiento o un hecho genera un perjuicio, se analiza nexo, antijuridicidad y daño. Los casos centrados en la indemnización se desarrollan en la ficha de daños.',
      },
    ],
    faqs: [
      {
        question: '¿Qué diferencia hay entre derecho civil y daños y perjuicios?',
        answer:
          'El derecho civil cubre contratos, obligaciones y patrimonio. Daños y perjuicios se concentra en reclamos indemnizatorios por un hecho dañoso (accidente, mala praxis, responsabilidad civil). Pueden superponerse; en la consulta se define el encuadre.',
      },
      {
        question: '¿Pueden revisar un contrato antes de firmarlo?',
        answer:
          'Sí. El estudio también trabaja en prevención: revisar cláusulas, plazos y riesgos antes de que el conflicto se judicialice.',
      },
      {
        question: '¿Atienden conflictos entre empresas?',
        answer:
          'Sí, cuando el asunto es contractual o patrimonial. El perfil histórico del estudio es litigioso, con alianzas para materias menos frecuentes en la zona.',
      },
    ],
    relatedIds: ['danos', 'defensa-consumidor', 'bancos'],
    relatedProfessionalSlugs: ['carlos-alberto-bengolea', 'ignacio-goni'],
  },
  danos: {
    id: 'danos',
    seoTitle: 'Daños y perjuicios en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para indemnizaciones por accidentes, responsabilidad civil y daños. Estudio Jurídico Bengolea & Lamas.',
    keywords: [
      'daños y perjuicios San Nicolás',
      'abogado accidentes',
      'responsabilidad civil',
      'indemnización',
    ],
    h1: 'Daños y perjuicios',
    directAnswer:
      'Representamos reclamos de daños y perjuicios en San Nicolás: accidentes, responsabilidad civil e indemnizaciones, con análisis del hecho, la prueba y el perjuicio.',
    paragraphs: [
      'Un reclamo de daños no es solo “pedir una suma”: hay que acreditar el hecho, el nexo con quien debe responder y la extensión del perjuicio (material y, cuando corresponde, moral). El estudio trabaja esa prueba con criterio procesal.',
      'Si el conflicto nace de un contrato de consumo o de un banco, puede cruzarse con esas fichas. Acá el eje es la indemnización.',
    ],
    topics: [
      {
        title: 'Accidentes y responsabilidad civil',
        body: 'Hechos que generan un daño a la persona o al patrimonio. Se evalúa quién responde, qué seguros intervienen y qué documentación hace falta (denuncias, historias clínicas, presupuestos).',
      },
      {
        title: 'Mala praxis y perjuicios a la salud',
        body: 'Cuando el daño se vincula a una prestación sanitaria, el análisis es técnico y prudente: historia clínica, nexo y perjuicio. No se anticipa un resultado en esta página.',
      },
      {
        title: 'Cuantificación del reclamo',
        body: 'La indemnización se construye con prueba (gastos, ingresos, secuelas). En la consulta se explica qué se puede acreditar y qué queda fuera, sin prometer montos.',
      },
    ],
    faqs: [
      {
        question: '¿Qué prueba necesito para un reclamo de daños?',
        answer:
          'Depende del hecho. En general: denuncia o actuación policial, documentación médica, fotos, testigos, gastos y, si hay seguro, la póliza y el siniestro. El estudio indica qué falta según el caso.',
      },
      {
        question: '¿Puedo reclamar si hubo un seguro de por medio?',
        answer:
          'A menudo sí: el reclamo puede dirigirse al responsable y, según el caso, involucrar al asegurador. El encuadre se define con la póliza y los hechos.',
      },
      {
        question: '¿El primer contacto tiene un monto de indemnización?',
        answer:
          'No. Esta web no calcula indemnizaciones. Primero se ordenan los hechos y la prueba; cualquier cifra sin esa base sería especulativa.',
      },
    ],
    relatedIds: ['civil', 'defensa-consumidor', 'bancos'],
    relatedProfessionalSlugs: ['ignacio-goni', 'adrian-bengolea'],
  },
};

export function getPracticeAreaPage(id: string): PracticeAreaPageContent | undefined {
  return PRACTICE_AREA_PAGES[id];
}
