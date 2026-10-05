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
      'Esta ficha es el mapa bancario del estudio. Fraude, débitos no autorizados, DEBIN, tarjetas y habeas data tienen página propia, cada una con el recorte de ese conflicto, sin copiar el mismo relato cinco veces.',
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
    relatedIds: ['bancos-fraude', 'bancos-debitos', 'bancos-debin', 'bancos-tarjetas', 'bancos-habeas', 'defensa-consumidor'],
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
    relatedIds: ['danos', 'defensa-consumidor', 'bancos', 'familia'],
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
  'bancos-fraude': {
    id: 'bancos-fraude',
    seoTitle: 'Fraude bancario en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para transferencias y operaciones no reconocidas. Responsabilidad de la entidad y reclamo por fraude bancario. Bengolea & Lamas.',
    keywords: ['fraude bancario San Nicolás', 'transferencia no reconocida', 'operación no autorizada banco'],
    h1: 'Fraude bancario',
    directAnswer:
      'Atendemos reclamos por fraude bancario en San Nicolás: transferencias, compras o préstamos que el cliente no reconoció, y la responsabilidad de la entidad por el canal de autenticación.',
    paragraphs: [
      'El conflicto típico no es “el banco me robó”, sino una operación que el cliente no autorizó o no comprendió cómo se originó: un débito por home banking, una compra con tarjeta, un préstamo preaprobado o un movimiento que aparece después de un phishing. El estudio reconstruye fechas, canales y reclamos previos.',
      'Ignacio Goñi Bengolea trabaja litigación y derecho bancario; el Dr. Adrián Bengolea interviene cuando el caso se encuadra también como relación de consumo. Esta ficha no promete la devolución automática del dinero: eso depende de la prueba y de lo que hizo (o dejó de hacer) la entidad.',
    ],
    topics: [
      {
        title: 'Operaciones no reconocidas',
        body: 'Transferencias, extracciones o compras que el titular desconoce. Se pide extracto, capturas, número de reclamo interno y, si existe, la denuncia. El eje es quién controlaba el factor de autenticación (clave, token, SMS, app).',
      },
      {
        title: 'Qué se le pide al banco',
        body: 'La entidad debe explicar el canal, los avisos que envió y las medidas de seguridad. Un reclamo administrativo interno no reemplaza el análisis jurídico, pero es prueba de que el cliente cuestionó el movimiento en tiempo.',
      },
      {
        title: 'Relación con consumo y daños',
        body: 'Si hay un consumidor frente a un contrato de adhesión, el caso puede cruzarse con defensa del consumidor. Si el perjuicio es patrimonial o moral, también con daños. El encuadre se define en la consulta, no en esta página.',
      },
    ],
    faqs: [
      {
        question: '¿Qué hago apenas veo un movimiento que no reconocí?',
        answer:
          'Conservá extractos, capturas y el número de reclamo al banco. Si hubo phishing o sustracción de claves, la denuncia suele ser útil. En la consulta del estudio se ordena esa prueba.',
      },
      {
        question: '¿El banco siempre tiene que devolver el dinero?',
        answer:
          'No de forma automática. Depende de cómo se originó la operación, qué avisos recibió el cliente y qué medidas tomó la entidad. Cada caso se analiza con esos hechos.',
      },
      {
        question: '¿Sirve solo el reclamo por la app del banco?',
        answer:
          'Sirve como constancia, pero no cierra el asunto. Si el banco rechaza o no responde, el estudio evalúa vías administrativas o judiciales según el monto, la prueba y los plazos.',
      },
    ],
    relatedIds: ['bancos', 'bancos-debitos', 'bancos-debin', 'defensa-consumidor'],
    relatedProfessionalSlugs: ['ignacio-goni', 'adrian-bengolea'],
  },
  'bancos-debitos': {
    id: 'bancos-debitos',
    seoTitle: 'Débitos no autorizados en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para cargos en cuenta o tarjeta sin consentimiento válido. Débitos no autorizados y reclamos al banco. Bengolea & Lamas.',
    keywords: ['débitos no autorizados', 'cargo en cuenta sin autorización', 'abogado banco San Nicolás'],
    h1: 'Débitos no autorizados',
    directAnswer:
      'Reclamamos débitos en cuenta o tarjeta que el cliente no autorizó de modo válido: cargos reiterados, adhesiones dudosas y descuentos que no se corresponden con un mandato claro.',
    paragraphs: [
      'Un débito no autorizado no siempre es un fraude “de un click”. A veces es un servicio que se adhirió por teléfono, un cargo que sobrevivió a una baja, o un descuento que el banco aplica con un mandato amplio o ilegible. El estudio pide el origen del débito: contrato, adhesión, débito automático o mandato.',
      'En la práctica del estudio este conflicto aparece junto a tarjetas, DEBIN y relaciones de consumo. No se trata de impugnar cualquier cargo: se trata de ver si hubo consentimiento informado y si la entidad puede acreditarlo.',
    ],
    topics: [
      {
        title: 'Consentimiento y mandato',
        body: 'Se revisa cómo se originó el débito: formulario, llamada, app, cláusula de adhesión. Si el banco no puede mostrar una autorización válida, el cargo queda en discusión.',
      },
      {
        title: 'Bajas que no se cumplen',
        body: 'Es frecuente que el cliente pida la baja y el débito continúe. Conservar el número de trámite, mails y extractos posteriores es parte de la prueba.',
      },
      {
        title: 'Cargos en cuenta y en tarjeta',
        body: 'El análisis cambia según el canal (caja de ahorro, cuenta corriente o tarjeta). La ficha de tarjetas cubre refinanciaciones y cargos del plástico; acá el eje es el débito sin consentimiento.',
      },
    ],
    faqs: [
      {
        question: '¿Un débito automático firmado hace años sigue valiendo?',
        answer:
          'Depende del texto, de si se informaron cambios y de si el cliente pudo revocarlo. No se responde en abstracto: hay que ver el mandato y los extractos.',
      },
      {
        question: '¿Puedo pedir la devolución de varios meses?',
        answer:
          'A veces sí, cuando se acredita que el cargo no tenía autorización o que la baja no se ejecutó. El período reclamable se evalúa con plazos y prueba, sin anticipar un monto.',
      },
      {
        question: '¿Es lo mismo que un DEBIN?',
        answer:
          'No. El DEBIN es un débito inmediato con un circuito propio. Si el caso es un DEBIN puntual, la ficha específica es esa. Si es un cargo reiterado en cuenta o tarjeta, el recorte es este.',
      },
    ],
    relatedIds: ['bancos', 'bancos-debin', 'bancos-tarjetas', 'defensa-consumidor'],
    relatedProfessionalSlugs: ['ignacio-goni', 'adrian-bengolea'],
  },
  'bancos-debin': {
    id: 'bancos-debin',
    seoTitle: 'DEBIN no reconocido en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para débitos inmediatos (DEBIN) cuya autorización se discute. Estudio Jurídico Bengolea & Lamas.',
    keywords: ['DEBIN no reconocido', 'débito inmediato', 'abogado DEBIN San Nicolás'],
    h1: 'DEBIN',
    directAnswer:
      'Atendemos controversias sobre DEBIN (débito inmediato): operaciones en las que se discute si hubo autorización válida, qué avisos recibió el cliente y qué control tuvo la entidad.',
    paragraphs: [
      'El DEBIN no es un débito automático clásico: es un débito inmediato que el originante dispara contra una cuenta. El conflicto aparece cuando el titular dice que no lo autorizó, que lo autorizó por error o que el banco no le dio información útil para frenarlo a tiempo.',
      'El estudio no trata el DEBIN como una etiqueta mágica. Se mira el comprobante, el originante, los avisos (SMS, push, mail), el reclamo interno y, si hubo, la denuncia. Ignacio Goñi Bengolea cubre el tramo bancario; el cruce con consumo se evalúa caso a caso.',
    ],
    topics: [
      {
        title: 'Autorización discutida',
        body: 'El punto es si el cliente prestó un consentimiento real o si un tercero usó su canal. Sin esa cronología (hora, dispositivo, aviso) el reclamo queda genérico.',
      },
      {
        title: 'Avisos y tiempo de reacción',
        body: 'Importa qué notificó el banco y cuánto tardó el cliente en reclamar. Un aviso tardío o incomprensible no decide solo el caso, pero forma parte de la prueba.',
      },
      {
        title: 'Relación con fraude y débitos',
        body: 'Si el DEBIN se encadena con otras operaciones no reconocidas, se trabaja junto a la ficha de fraude. Si el problema es un cargo reiterado, el recorte es débitos no autorizados.',
      },
    ],
    faqs: [
      {
        question: '¿El banco siempre responde por un DEBIN?',
        answer:
          'No de forma automática. Depende de cómo se originó la autorización, qué avisos recibió el cliente y qué medidas tomó la entidad. Cada caso se analiza con esos hechos.',
      },
      {
        question: '¿Tengo que denunciar un DEBIN que no reconocí?',
        answer:
          'La denuncia no es un requisito universal, pero suele ayudar cuando hay sospecha de fraude o uso de claves. El estudio indica si aporta según el relato.',
      },
      {
        question: '¿Se puede reclamar más de un DEBIN junto?',
        answer:
          'Sí, cuando forman una misma secuencia. Se ordenan por fecha y originante para no mezclar operaciones distintas en un solo reclamo confuso.',
      },
    ],
    relatedIds: ['bancos', 'bancos-fraude', 'bancos-debitos', 'defensa-consumidor'],
    relatedProfessionalSlugs: ['ignacio-goni', 'adrian-bengolea'],
  },
  'bancos-tarjetas': {
    id: 'bancos-tarjetas',
    seoTitle: 'Conflictos de tarjeta de crédito en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para cargos indebidos, refinanciaciones y cláusulas abusivas de tarjeta de crédito. Bengolea & Lamas.',
    keywords: ['tarjeta de crédito cargos indebidos', 'refinanciación tarjeta', 'abogado tarjeta San Nicolás'],
    h1: 'Tarjetas de crédito',
    directAnswer:
      'Revisamos conflictos de tarjeta de crédito en San Nicolás: cargos que no se informaron con claridad, refinanciaciones y cláusulas del contrato de adhesión del plástico.',
    paragraphs: [
      'El resumen de tarjeta junta consumos, intereses, seguros opcionales y refinanciaciones que el cliente a veces no eligió de modo expreso. El estudio lee el contrato, el resumen y los reclamos al emisor antes de hablar de “abusividad”.',
      'Es una materia que el estudio trabaja como litigio bancario y, cuando hay un consumidor, también como defensa del consumidor. No se impugna el resumen entero por sistema: se identifican cargos concretos y la información que faltó.',
    ],
    topics: [
      {
        title: 'Cargos e información',
        body: 'Seguros no pedidos, comisiones, renovaciones y consumos que el titular desconoce. Se compara el resumen con lo que el emisor puede acreditar como aceptación.',
      },
      {
        title: 'Refinanciaciones',
        body: 'Planes de pago, intereses y capitalización. El análisis es si el cliente comprendió el costo y si la entidad cumplió el deber de información. No se anticipa un resultado sobre la tasa.',
      },
      {
        title: 'Cláusulas del contrato de tarjeta',
        body: 'El contrato de adhesión suele reservar facultades amplias al emisor. Se mira qué se puede impugnar y qué queda como obligación válida, con el mismo criterio prudente que en consumo.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo reclamar un cargo del resumen si ya lo pagué?',
        answer:
          'A veces sí. El pago no siempre implica conformidad. Hay que ver el cargo, la información disponible y los plazos. En la consulta se indica qué se puede discutir.',
      },
      {
        question: '¿Una refinanciación se puede cuestionar?',
        answer:
          'Se puede revisar si hubo información insuficiente, capitalización poco clara o una adhesión dudosa. No toda refinanciación es impugnable solo por resultar cara.',
      },
      {
        question: '¿Esto incluye compras no reconocidas con la tarjeta?',
        answer:
          'Sí, cuando el consumo no se reconoce. Si el relato es un fraude o un phishing, también se trabaja con la ficha de fraude bancario.',
      },
    ],
    relatedIds: ['bancos', 'bancos-debitos', 'defensa-consumidor', 'civil'],
    relatedProfessionalSlugs: ['ignacio-goni', 'adrian-bengolea'],
  },
  'bancos-habeas': {
    id: 'bancos-habeas',
    seoTitle: 'Habeas data bancario en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para informes crediticios inexactos y protección de datos frente a bancos. Habeas data. Bengolea & Lamas.',
    keywords: ['habeas data San Nicolás', 'informe crediticio incorrecto', 'Ley 25.326'],
    h1: 'Habeas data',
    directAnswer:
      'Trabajamos habeas data frente a entidades financieras: datos personales o crediticios inexactos, desactualizados o difundidos sin causa, con base en la Ley 25.326.',
    paragraphs: [
      'Un informe crediticio erróneo o una deuda que ya se canceló y sigue figurando puede cerrar un crédito, un alquiler o una compra. El estudio reclama a la fuente de la información (banco, entidad, base) la rectificación o supresión, y evalúa si hay perjuicio resarcible.',
      'No se trata de “borrar el Veraz” por pedido genérico. Hay que identificar qué dato es inexacto, quién lo carga y qué trámite previo se hizo. El estudio ha litigado medidas urgentes en conflictos bancarios cuando la vía lo justifica; el instrumento concreto se define con el caso.',
    ],
    topics: [
      {
        title: 'Rectificación y supresión',
        body: 'El primer objetivo suele ser corregir o eliminar el dato falso o vencido. Se documenta la cancelación, el reclamo a la entidad y la persistencia del informe.',
      },
      {
        title: 'Perjuicio',
        body: 'Si el dato incorrecto impidió un acto o dañó el nombre, puede haber un tramo de daños. Eso exige prueba del nexo, no solo del error en la base.',
      },
      {
        title: 'Bancos y bases de información',
        body: 'El reclamo puede dirigirse a quien informa y, según el caso, a quien difunde. La ficha de bancos cubre el mapa; acá el eje es el dato personal.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo reclamar un informe crediticio incorrecto?',
        answer:
          'Sí, cuando hay datos inexactos o desactualizados. El habeas data apunta a rectificar o suprimir esa información y, si corresponde, a resarcir el perjuicio.',
      },
      {
        question: '¿Tengo que agotar un trámite administrativo antes?',
        answer:
          'Conviene reclamar primero a la fuente y conservar la respuesta. El estudio indica si ese paso alcanza o si corresponde una vía judicial.',
      },
      {
        question: '¿El habeas data borra deudas que sí existen?',
        answer:
          'No. El instituto no es un mecanismo para ocultar una deuda vigente. Se discute la exactitud, la vigencia y el modo en que se informa.',
      },
    ],
    relatedIds: ['bancos', 'danos', 'defensa-consumidor'],
    relatedProfessionalSlugs: ['ignacio-goni', 'adrian-bengolea'],
  },
  seguros: {
    id: 'seguros',
    seoTitle: 'Reclamos a aseguradoras en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para denegación de cobertura, baja de póliza y reclamos al asegurador. Estudio Jurídico Bengolea & Lamas.',
    keywords: ['abogado seguros San Nicolás', 'denegación de cobertura', 'reclamo aseguradora'],
    h1: 'Seguros',
    directAnswer:
      'Atendemos conflictos con aseguradoras en San Nicolás: denegación de cobertura, baja de póliza y reclamos al asegurador, leyendo la póliza y el siniestro antes de litigar.',
    paragraphs: [
      'El estudio no “pelea contra las compañías” en abstracto: lee la póliza, las exclusiones, la denuncia del siniestro y la carta de rechazo. Ignacio Goñi Bengolea tiene la materia de seguros entre sus áreas de trabajo; si el daño a la persona es el centro, se cruza con daños y, en salud, con la ficha de salud y discapacidad.',
      'Las notas públicas del estudio incluyen conflictos de coberturas y de prepagas. Esta página no reproduce esos fallos ni promete el mismo resultado. Sirve para encuadrar el reclamo actual.',
    ],
    topics: [
      {
        title: 'Denegación de cobertura',
        body: 'El asegurador rechaza el siniestro o limita la prestación. Se compara el rechazo con el texto de la póliza, los plazos y la información que se le dio al asegurado.',
      },
      {
        title: 'Baja o modificación de póliza',
        body: 'Cancelaciones, falta de pago discutida o cambios unilaterales. El análisis es si la aseguradora cumplió el procedimiento y si el asegurado fue informado.',
      },
      {
        title: 'Siniestro y prueba',
        body: 'Denuncia, pericia, fotos, historia clínica o presupuesto, según el ramo. Sin esa carpeta el reclamo queda en una queja. El estudio indica qué falta.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo reclamar si la aseguradora rechazó el siniestro?',
        answer:
          'Sí, cuando el rechazo no se corresponde con la póliza o con los hechos. Hay que tener la carta de rechazo, la póliza y la denuncia del siniestro.',
      },
      {
        question: '¿Esto incluye prepagas y medicina privada?',
        answer:
          'El cruce existe. Si el conflicto es una cobertura de salud, prestaciones o discapacidad, la ficha específica es salud y discapacidad. Si es un seguro patrimonial o de responsabilidad, el recorte es este.',
      },
      {
        question: '¿El estudio calcula la indemnización del seguro en la web?',
        answer:
          'No. Cualquier cifra sin póliza, siniestro y perjuicio acreditado sería especulativa.',
      },
    ],
    relatedIds: ['danos', 'salud', 'defensa-consumidor', 'bancos'],
    relatedProfessionalSlugs: ['ignacio-goni', 'adrian-bengolea'],
  },
  'servicios-publicos': {
    id: 'servicios-publicos',
    seoTitle: 'Reclamos de servicios públicos en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para tarifas, facturación y calidad de servicios públicos. Estudio Jurídico Bengolea & Lamas.',
    keywords: ['servicios públicos San Nicolás', 'factura incorrecta', 'reclamo prestador'],
    h1: 'Servicios públicos',
    directAnswer:
      'Intervenimos en conflictos con prestadores de servicios públicos y asimilables: facturación, tarifas y calidad del servicio, cuando hay un usuario frente a un contrato de adhesión.',
    paragraphs: [
      'Luz, gas, agua, telefonía o un servicio esencial de la zona suelen generar el mismo patrón: factura que no se entiende, corte, cargo que no se condice con el consumo, o una prestación que no llega. El estudio lo trata como relación de consumo y, si hay un acto de la administración, también como derecho administrativo.',
      'No se publica acá un instructivo genérico para cada prestador. En la consulta se pide la factura, el número de reclamo y, si hubo, el corte o el medidor. El Dr. Adrián Bengolea trabaja habitualmente este tipo de asimetrías.',
    ],
    topics: [
      {
        title: 'Facturación y cargos',
        body: 'Consumos estimados, recargos, intereses y conceptos que el usuario no puede controlar. Se compara la factura con el contrato y con los reclamos previos.',
      },
      {
        title: 'Calidad y cortes',
        body: 'Interrupciones, baja de tensión o servicio que no se presta. La prueba son reclamos, fotos, actas y, cuando existe, medición. El daño se evalúa aparte.',
      },
      {
        title: 'Vía administrativa y judicial',
        body: 'A veces conviene el ente de control o el reclamo interno; otras, la vía judicial. El estudio no impone una sola receta: depende del prestador, el monto y la urgencia.',
      },
    ],
    faqs: [
      {
        question: '¿Una factura alta alcanza para demandar?',
        answer:
          'No por sí sola. Hay que ver mediciones, reclamos y si el prestador explicó el consumo. La consulta sirve para ver si hay materia y qué prueba falta.',
      },
      {
        question: '¿Atienden solo servicios de San Nicolás?',
        answer:
          'La sede es Belgrano 174, San Nicolás. El alcance frente a cada prestador se evalúa en el caso (domicilio del servicio, contrato y competencia).',
      },
      {
        question: '¿Esto es lo mismo que defensa del consumidor?',
        answer:
          'Se superpone con frecuencia. Esta ficha recorta el prestador de servicio esencial o asimilable; la ficha de consumidor cubre el marco general.',
      },
    ],
    relatedIds: ['defensa-consumidor', 'administrativo', 'civil'],
    relatedProfessionalSlugs: ['adrian-bengolea'],
  },
  comercial: {
    id: 'comercial',
    seoTitle: 'Derecho comercial en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para sociedades, contratos mercantiles y conflictos entre empresas. Estudio Jurídico Bengolea & Lamas.',
    keywords: ['abogado comercial San Nicolás', 'contratos mercantiles', 'sociedades'],
    h1: 'Derecho comercial',
    directAnswer:
      'Asesoramos y litigamos en derecho comercial en San Nicolás: sociedades, contratos mercantiles y conflictos entre empresas de la región, con el perfil litigioso del estudio.',
    paragraphs: [
      'El Dr. Carlos Alberto Bengolea imprimió al estudio un trabajo de conflicto judicial también en materia civil y comercial. Hoy ese tramo convive con la prevención: revisar un contrato antes de firmarlo o ordenar un cobro antes de demandar.',
      'Las pymes de la zona llegan con incumplimientos de proveedores, socios, locaciones comerciales o garantías. Si el cliente es la empresa como organización (gobierno societario, reclamos laborales o tributarios), la ficha compañera es empresas.',
    ],
    topics: [
      {
        title: 'Contratos mercantiles',
        body: 'Compraventa, distribución, locación comercial, garantías. Se identifica qué se pactó, qué se prueba y qué remedio conviene (cumplimiento, resolución, daños).',
      },
      {
        title: 'Sociedades y conflictos entre socios',
        body: 'Desacuerdos de administración, información y salida. El estudio no ofrece un “kit societario” genérico: se trabaja el estatuto, las actas y el interés concreto.',
      },
      {
        title: 'Litigio entre empresas',
        body: 'Cuando la negociación se agotó, se prepara la demanda o la contestación con el mismo criterio de prueba que en el fuero civil. Las alianzas del estudio cubren materias poco frecuentes en la zona si el caso lo pide.',
      },
    ],
    faqs: [
      {
        question: '¿Atienden conflictos entre empresas?',
        answer:
          'Sí, cuando el asunto es contractual, societario o patrimonial. El perfil histórico del estudio es litigioso, con alianzas para materias menos frecuentes en la zona.',
      },
      {
        question: '¿Pueden revisar un contrato comercial antes de firmarlo?',
        answer:
          'Sí. La prevención evita litigios peores. Se revisan cláusulas, plazos, mora y jurisdicción.',
      },
      {
        question: '¿El derecho comercial incluye a las pymes de San Nicolás?',
        answer:
          'Sí. El estudio declara expresamente que trabaja tanto con la persona de a pie como con pequeñas y medianas empresas de la región.',
      },
    ],
    relatedIds: ['empresas', 'civil', 'administrativo'],
    relatedProfessionalSlugs: ['carlos-alberto-bengolea', 'ignacio-goni'],
  },
  empresas: {
    id: 'empresas',
    seoTitle: 'Abogados para empresas en San Nicolás',
    seoDescription:
      'Asesoramiento y litigios para empresas de San Nicolás y la región. Estudio Jurídico Bengolea & Lamas.',
    keywords: ['abogados empresas San Nicolás', 'asesoramiento jurídico pyme', 'litigios empresas'],
    h1: 'Empresas',
    directAnswer:
      'Brindamos asesoramiento y litigios a empresas de San Nicolás y la región: contratos, conflictos con clientes o proveedores, y el seguimiento de un asunto judicial con el mismo criterio que en los casos individuales.',
    paragraphs: [
      'El estudio no se presenta como un departamento legal interno de una corporación. Se presenta como un estudio de litigio y prevención que también trabaja con pymes: el mismo estándar de preparación y de información al cliente.',
      'Ignacio Goñi Bengolea aporta el tramo bancario, tributario y de seguros; Carlos Alberto Bengolea, el civil y comercial. Si hace falta una especialidad poco habitual en la zona (propiedad intelectual, defensa de la competencia, recurso extraordinario), el estudio acude a las alianzas que declara en Servicios.',
    ],
    topics: [
      {
        title: 'Asesoramiento preventivo',
        body: 'Revisión de contratos, reclamos de cobro, respuestas a intimaciones. El objetivo es decidir con información si conviene negociar, cumplir o litigar.',
      },
      {
        title: 'Litigios de la actividad',
        body: 'Demandas de clientes, proveedores, aseguradoras o la administración. Se arma la carpeta con la misma lógica procesal que en el resto de las fichas.',
      },
      {
        title: 'Tributario y bancos de la empresa',
        body: 'Conflictos tributarios y con entidades financieras aparecen en la práctica del estudio. El detalle bancario está en las fichas de bancos; el administrativo, en esa ficha.',
      },
    ],
    faqs: [
      {
        question: '¿Trabajan solo con personas o también con empresas?',
        answer:
          'Con ambas. En Servicios el estudio dice que está preparado para un servicio integral a la persona de a pie y a pymes de la zona.',
      },
      {
        question: '¿Tienen un abono mensual para empresas?',
        answer:
          'Eso se conversa en la consulta, según el volumen y el tipo de asunto. Esta web no publica un tarifario.',
      },
      {
        question: '¿Qué diferencia hay entre esta ficha y derecho comercial?',
        answer:
          'Comercial recorta contratos y sociedades. Empresas recorta el vínculo con la organización: asesoramiento continuo, litigios de la actividad y derivación a alianzas.',
      },
    ],
    relatedIds: ['comercial', 'administrativo', 'bancos', 'civil', 'laboral'],
    relatedProfessionalSlugs: ['carlos-alberto-bengolea', 'ignacio-goni'],
  },
  administrativo: {
    id: 'administrativo',
    seoTitle: 'Derecho administrativo en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para actos de la administración, municipios y procedimientos administrativos. Bengolea & Lamas.',
    keywords: ['derecho administrativo San Nicolás', 'reclamo municipal', 'acto administrativo'],
    h1: 'Derecho administrativo',
    directAnswer:
      'Intervenimos frente a actos de la administración pública —municipios, organismos y procedimientos— cuando un particular o una empresa necesita impugnar, reclamar o defenderse.',
    paragraphs: [
      'El estudio ha publicado trabajo sobre conflictos con municipalidades y sobre tributos locales (por ejemplo, tasas viales). Eso no convierte cada tasa o cada multa en un caso automático: hay que ver el acto, la notificación, los plazos y la prueba del servicio o del hecho gravado.',
      'El Dr. Adrián Bengolea suele llevar el tramo de usuarios y de reclamos frente al poder público; el fuero y la vía (administrativa previa, amparo, demanda) se eligen con el expediente en la mano.',
    ],
    topics: [
      {
        title: 'Acto administrativo y plazos',
        body: 'Multas, deudas, habilitaciones, caducidades. El primer filtro es si el acto existe, si fue notificado y si el plazo de impugnación sigue abierto.',
      },
      {
        title: 'Municipios y tasas',
        body: 'Conflictos con la comuna o con un gravamen local. Se pide la boleta, la norma y, si se discute el servicio, la prueba de qué se presta y cómo se calcula.',
      },
      {
        title: 'Procedimiento y prueba',
        body: 'Expediente, descargos y silencios de la administración. Un escrito tardío o genérico suele cerrar mejor vías que un litigio bien preparado.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo judicializar una multa o una tasa municipal?',
        answer:
          'A veces sí, cuando el acto es ilegítimo o el gravamen no se corresponde con el servicio. Hay plazos cortos. Conviene consultar con el acto y la notificación a la vista.',
      },
      {
        question: '¿Atienden solo el municipio de San Nicolás?',
        answer:
          'La sede está en San Nicolás. El estudio ha trabajado conflictos de otras comunas de la región. La competencia se confirma en la consulta.',
      },
      {
        question: '¿Es lo mismo que un reclamo de servicios públicos?',
        answer:
          'Puede cruzarse. Si el demandado es un prestador, la ficha de servicios públicos o de consumidor suele ser el recorte. Si el demandado es el Estado, el recorte es este.',
      },
    ],
    relatedIds: ['servicios-publicos', 'empresas', 'colectivas', 'tributario'],
    relatedProfessionalSlugs: ['adrian-bengolea', 'carlos-alberto-bengolea'],
  },
  colectivas: {
    id: 'colectivas',
    seoTitle: 'Acciones colectivas en San Nicolás',
    seoDescription:
      'Defensa de intereses colectivos y procesos representativos. Estudio Jurídico Bengolea & Lamas. Adrián Bengolea.',
    keywords: ['acciones colectivas', 'intereses difusos', 'abogado procesos colectivos'],
    h1: 'Acciones colectivas',
    directAnswer:
      'El estudio interviene en acciones colectivas y en la defensa de intereses de un grupo de usuarios cuando el conflicto se repite y no se agota en un caso individual.',
    paragraphs: [
      'El Dr. Adrián Bengolea es referente público del estudio en defensa del consumidor y en procesos colectivos, y dirige Usuarios y Consumidores Unidos (UCU). Esa trayectoria no significa que todo reclamo se judicialice como colectivo: primero se ve si hay homogeneidad, representación y utilidad real frente a un juicio individual.',
      'Las alianzas del estudio cubren, cuando hace falta, recursos extraordinarios y otras especialidades poco frecuentes en la zona. Esta ficha no convoca a “sumarse a un juicio” ni publica un recuento de afectados.',
    ],
    topics: [
      {
        title: 'Cuándo un caso es colectivo',
        body: 'Hechos similares, misma empresa o misma práctica, y un interés que no se agota en un damnificado. Si el perjuicio es solo individual, la vía es otra ficha (consumo, bancos, salud).',
      },
      {
        title: 'Representación y prueba',
        body: 'Hay que acreditar legitimación, el universo afectado y la conducta. Un relato de WhatsApp no arma un colectivo. El estudio pide documentación y un recorte preciso del hecho.',
      },
      {
        title: 'Relación con el sitio de planes de ahorro',
        body: 'Los conflictos masivos de planes de ahorro automotriz se atienden en el estudio, pero el contenido especializado vive en adrianbengolea.com.ar. Acá no se duplica esa doctrina.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo pedir que armen una acción colectiva con mi caso?',
        answer:
          'Se evalúa si el conflicto es representativo de un grupo y si esa vía sirve. No se promete una acción colectiva en el primer contacto.',
      },
      {
        question: '¿UCU y el estudio son lo mismo?',
        answer:
          'No. UCU es una organización de usuarios. El Estudio Bengolea & Lamas es el estudio jurídico. El Dr. Adrián Bengolea participa de ambos; las consultas del sitio se canalizan al estudio.',
      },
      {
        question: '¿Las acciones colectivas son solo de consumidores?',
        answer:
          'Es el campo más visible del estudio, pero el encuadre depende del derecho afectado. En la consulta se dice si el caso es individual, plural o colectivo.',
      },
    ],
    relatedIds: ['defensa-consumidor', 'salud', 'administrativo', 'planes-ahorro'],
    relatedProfessionalSlugs: ['adrian-bengolea'],
    planesDeAhorroNote: true,
  },
  salud: {
    id: 'salud',
    seoTitle: 'Salud y discapacidad en San Nicolás',
    seoDescription:
      'Abogados en San Nicolás para coberturas de salud, prepagas y derechos de pacientes y personas con discapacidad. Bengolea & Lamas.',
    keywords: ['abogado prepaga San Nicolás', 'cobertura discapacidad', 'derecho a la salud'],
    h1: 'Salud y discapacidad',
    directAnswer:
      'Atendemos conflictos de salud y discapacidad: coberturas denegadas, prestaciones, prepagas y obras sociales, cuando hay que exigir una práctica o una cobertura que la norma o el contrato reconocen.',
    paragraphs: [
      'El estudio ha publicado casos de coberturas de salud, discapacidad y prepagas. Esas notas describen asuntos ya trabajados; no son una promesa de idéntico resultado. El Dr. Adrián Bengolea lleva de forma habitual este tramo; si hay un daño a resarcir, se cruza con daños y con seguros.',
      'La consulta parte de la credencial, el rechazo por escrito, la indicación médica y, en discapacidad, el certificado y el plan de prestaciones. Sin esa carpeta no se puede decir si corresponde un amparo, un reclamo o otra vía.',
    ],
    topics: [
      {
        title: 'Coberturas y rechazos',
        body: 'Cirugías, tratamientos, medicamentos o prácticas que la prepaga u obra social niega. Se compara el rechazo con el contrato, el PMO y las indicaciones médicas.',
      },
      {
        title: 'Discapacidad',
        body: 'Prestaciones, apoyos y coberturas vinculadas al certificado de discapacidad. El estudio trabaja el derecho a la prestación; no sustituye el criterio médico.',
      },
      {
        title: 'Baja o expulsión de la cobertura',
        body: 'Cuando la entidad pretende dar de baja al afiliado o a su grupo. Se revisan los motivos, los plazos y la continuidad de la cobertura mientras se discute el caso.',
      },
    ],
    faqs: [
      {
        question: '¿Pueden exigir una cirugía o un tratamiento que la prepaga negó?',
        answer:
          'Se evalúa el rechazo, la indicación médica y el contrato. A veces la vía es urgente; a veces no. Esta web no indica un amparo en abstracto.',
      },
      {
        question: '¿Atienden solo discapacidad o también conflictos de prepaga de un adulto sin CUD?',
        answer:
          'Ambos. La ficha cubre pacientes y personas con discapacidad. El recorte lo da el rechazo y la prestación, no una etiqueta.',
      },
      {
        question: '¿Es lo mismo que un reclamo de seguros?',
        answer:
          'Si el conflicto es una póliza patrimonial, va a seguros. Si es una cobertura de salud o una prestación por discapacidad, el recorte es este.',
      },
    ],
    relatedIds: ['seguros', 'danos', 'colectivas', 'defensa-consumidor'],
    relatedProfessionalSlugs: ['adrian-bengolea', 'ignacio-goni'],
  },
  laboral: {
    id: 'laboral',
    seoTitle: 'Derecho laboral en San Nicolás',
    seoDescription:
      'Asesoramiento laboral para trabajadores y pymes de San Nicolás y la región. Consultas sobre contratación, salarios, desvinculaciones y reclamos.',
    keywords: [
      'derecho laboral San Nicolás',
      'asesoramiento a trabajadores',
      'asesoramiento laboral pymes',
      'conflictos laborales',
    ],
    h1: 'Asesoramiento laboral para trabajadores y pymes',
    directAnswer:
      'Sí. Bengolea & Lamas recibe consultas laborales de trabajadores y pymes de San Nicolás y la región, y evalúa el encuadre y las alternativas de cada situación.',
    paragraphs: [
      'Un conflicto laboral requiere revisar cómo se desarrolló la relación de trabajo, qué documentación existe y qué comunicaciones intercambiaron las partes. Podés consultar sobre condiciones de contratación, diferencias salariales, sanciones o finalización del vínculo para conocer los pasos que corresponde evaluar.',
      'Para las pymes, la prevención comienza con decisiones documentadas y una revisión jurídica antes de modificar condiciones o comunicar una desvinculación. El estudio analiza cada consulta y, cuando el asunto requiere una intervención especializada, evalúa su abordaje con profesionales colaboradores.',
    ],
    topics: [
      {
        title: 'Consultas de trabajadores',
        body: 'Revisión de recibos, condiciones de trabajo, comunicaciones y posibles incumplimientos. El análisis permite identificar qué información falta y qué alternativas de reclamo pueden corresponder.',
      },
      {
        title: 'Prevención para pymes',
        body: 'Asesoramiento sobre documentación de la relación laboral y decisiones que pueden generar conflictos. Se consideran las características de la actividad y las circunstancias del vínculo.',
      },
      {
        title: 'Desvinculaciones y acuerdos',
        body: 'Evaluación de antecedentes, comunicaciones y propuestas antes de adoptar una decisión o firmar un acuerdo. Sus efectos dependen del caso y de los requisitos aplicables.',
      },
    ],
    faqs: [
      {
        question: '¿El estudio recibe consultas de trabajadores y de empleadores?',
        answer:
          'Sí. Recibe consultas de trabajadores y pymes de la zona. Antes de asumir una intervención, se verifica que no exista un conflicto de intereses.',
      },
      {
        question: '¿Qué documentación conviene llevar a la consulta?',
        answer:
          'Recibos de sueldo, contratos, telegramas, cartas documento y mensajes relacionados con el conflicto. También resulta útil una cronología con fechas de ingreso, cambios de tareas y hechos relevantes.',
      },
      {
        question: '¿Puedo consultar antes de responder un telegrama o firmar un acuerdo?',
        answer:
          'Sí. Conviene revisar el documento antes de responder o firmar, porque su contenido y los plazos pueden afectar tus derechos. La consulta debe permitir acceder al texto completo y a sus antecedentes.',
      },
    ],
    relatedIds: ['empresas', 'danos', 'civil'],
    relatedProfessionalSlugs: ['carlos-alberto-bengolea'],
  },
  familia: {
    id: 'familia',
    seoTitle: 'Derecho de familia en San Nicolás',
    seoDescription:
      'Consultas de derecho de familia en San Nicolás: alimentos, divorcio, cuidado personal y acuerdos. Análisis jurídico de cada situación familiar.',
    keywords: ['derecho de familia San Nicolás', 'alimentos', 'divorcio', 'acuerdos familiares'],
    h1: 'Consultas y conflictos de familia',
    directAnswer:
      'Sí. Bengolea & Lamas recibe consultas de derecho de familia en San Nicolás, vinculadas con alimentos, separación, divorcio y organización familiar.',
    paragraphs: [
      'Los cambios en la vida familiar suelen exigir acuerdos sobre cuestiones personales y económicas. El estudio analiza los antecedentes y las necesidades de cada familia para evaluar soluciones que puedan cumplirse y, cuando corresponde, su instrumentación judicial.',
      'Cuando hay hijos, el abordaje considera sus necesidades y la organización cotidiana de sus cuidados. Podés consultar para revisar un acuerdo existente, plantear una modificación o conocer las alternativas frente a un desacuerdo, sin que la información general de esta página sustituya el análisis de tu situación.',
    ],
    topics: [
      {
        title: 'Alimentos y gastos de los hijos',
        body: 'Análisis de necesidades, recursos económicos, tareas de cuidado y aportes de cada progenitor. Revisión de acuerdos, reclamos y dificultades de cumplimiento.',
      },
      {
        title: 'Separación y divorcio',
        body: 'Orientación sobre el trámite y las cuestiones que deben organizarse a partir de la ruptura, como vivienda, bienes y responsabilidades familiares.',
      },
      {
        title: 'Cuidado personal y comunicación',
        body: 'Evaluación de acuerdos sobre convivencia, tiempos de cuidado y comunicación con los hijos. Se procura que las propuestas contemplen su vida cotidiana y puedan sostenerse en la práctica.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo consultar aunque todavía no haya una causa judicial?',
        answer:
          'Sí. Una consulta previa permite ordenar la información, identificar los puntos de desacuerdo y evaluar cómo documentar una propuesta o un acuerdo.',
      },
      {
        question: '¿El estudio puede revisar un acuerdo que ya firmamos?',
        answer:
          'Sí. Para evaluar su alcance y las alternativas disponibles, es necesario conocer el texto, si tuvo intervención judicial y qué circunstancias cambiaron desde su celebración.',
      },
      {
        question: '¿Qué información conviene preparar para una consulta por alimentos?',
        answer:
          'Un detalle de los gastos de los hijos, los aportes actuales, la organización de los cuidados y la información disponible sobre ingresos. Si existen acuerdos o resoluciones judiciales, también conviene acompañarlos.',
      },
    ],
    relatedIds: ['civil'],
    relatedProfessionalSlugs: ['carlos-alberto-bengolea'],
  },
  'medio-ambiente': {
    id: 'medio-ambiente',
    seoTitle: 'Conflictos ambientales en San Nicolás',
    seoDescription:
      'Evaluación de conflictos ambientales en San Nicolás: molestias vecinales, daños y actuaciones administrativas, según las particularidades del caso.',
    keywords: [
      'conflictos ambientales San Nicolás',
      'daños ambientales',
      'molestias vecinales',
      'reclamos administrativos ambientales',
    ],
    h1: 'Conflictos ambientales, vecinales y daños',
    directAnswer:
      'Sí. Bengolea & Lamas evalúa consultas ambientales en San Nicolás desde su vinculación con conflictos vecinales, daños y actuaciones administrativas; el alcance de la intervención se define en cada caso.',
    paragraphs: [
      'Ruidos, olores, emisiones o actividades que afectan el entorno pueden requerir una revisión de antecedentes, permisos y consecuencias concretas. El primer paso consiste en identificar el problema, las personas afectadas y los elementos disponibles para documentarlo.',
      'El estudio aborda estas consultas desde su práctica civil, de daños y administrativa. No presenta esta área como una práctica ambiental intensiva: cuando la cuestión exige conocimientos técnicos o jurídicos específicos, se evalúa la necesidad de colaboración especializada.',
    ],
    topics: [
      {
        title: 'Molestias y conflictos vecinales',
        body: 'Evaluación de situaciones que afectan el uso de una vivienda o inmueble, como ruidos, olores o emisiones. Se revisan su frecuencia, intensidad, origen y los reclamos realizados.',
      },
      {
        title: 'Daños y documentación del problema',
        body: 'Análisis de posibles daños a personas o bienes y de la documentación necesaria para investigarlos. Fotografías, informes técnicos y registros de los hechos pueden ser relevantes según la situación.',
      },
      {
        title: 'Actuaciones administrativas y afectación colectiva',
        body: 'Revisión de denuncias, inspecciones y respuestas de organismos públicos. Si el problema alcanza a un grupo de vecinos, se evalúan su dimensión colectiva y las vías disponibles.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo consultar por ruidos u olores provenientes de una actividad cercana?',
        answer:
          'Sí. Para una primera evaluación, conviene indicar dónde se producen, desde cuándo, con qué frecuencia y si ya se realizaron reclamos o inspecciones.',
      },
      {
        question: '¿Es suficiente una fotografía para iniciar un reclamo?',
        answer:
          'Una fotografía puede aportar información, pero su suficiencia depende de lo que se pretende acreditar. El caso puede requerir registros adicionales, actuaciones administrativas o informes técnicos.',
      },
      {
        question: '¿El estudio tramita amparos ambientales en cualquier caso?',
        answer:
          'La recepción de una consulta no implica que corresponda promover un amparo. Primero se evalúan los hechos, la documentación, la vía adecuada y la necesidad de intervención especializada.',
      },
    ],
    relatedIds: ['danos', 'administrativo', 'colectivas', 'civil'],
    relatedProfessionalSlugs: ['carlos-alberto-bengolea', 'adrian-bengolea'],
  },
  tributario: {
    id: 'tributario',
    seoTitle: 'Conflictos tributarios en San Nicolás',
    seoDescription:
      'Asesoramiento en conflictos tributarios en San Nicolás: Ganancias, tasas municipales y reclamos fiscales. Consultas con Ignacio Goñi Bengolea.',
    keywords: [
      'abogado tributario San Nicolás',
      'Impuesto a las Ganancias',
      'tasas municipales',
      'reclamos fiscales',
    ],
    h1: 'Conflictos tributarios y tasas municipales',
    directAnswer:
      'Sí. Bengolea & Lamas recibe consultas sobre conflictos tributarios en San Nicolás y la región, con intervención de Ignacio Goñi Bengolea en esta materia.',
    paragraphs: [
      'Una intimación fiscal o un cobro cuestionado requiere distinguir qué se exige, cuál es su fundamento y qué antecedentes existen. El estudio revisa actos, liquidaciones y comunicaciones para evaluar las alternativas de respuesta, impugnación o recuperación de pagos que puedan corresponder.',
      'El análisis comprende consultas vinculadas con el Impuesto a las Ganancias y tasas municipales, incluidas las relacionadas con inmuebles rurales. Cuando resulta necesario, la evaluación jurídica se complementa con información contable o colaboración especializada, sin anticipar resultados por la sola semejanza con otro asunto.',
    ],
    topics: [
      {
        title: 'Impuesto a las Ganancias',
        body: 'Evaluación de retenciones, liquidaciones y cobros cuestionados, a partir de la situación particular y la documentación disponible. Se analiza si existe fundamento para un reclamo administrativo o judicial.',
      },
      {
        title: 'Tasas municipales',
        body: 'Revisión de ordenanzas, liquidaciones, períodos reclamados y antecedentes del servicio o actividad municipal invocados. El análisis puede comprender tasas vinculadas con inmuebles urbanos o rurales.',
      },
      {
        title: 'Intimaciones y reclamos fiscales',
        body: 'Estudio de notificaciones, determinaciones y antecedentes de pago para identificar la etapa del procedimiento y las opciones de defensa. Los plazos se verifican a partir de la documentación concreta.',
      },
    ],
    faqs: [
      {
        question: '¿Quién interviene en las consultas tributarias?',
        answer:
          'Ignacio Goñi Bengolea interviene en esta materia. Según las características del asunto, puede requerirse información contable o la participación de profesionales especializados.',
      },
      {
        question: '¿Qué documentación llevo si quiero cuestionar una tasa municipal?',
        answer:
          'Boletas, comprobantes de pago, intimaciones y respuestas del municipio, junto con la identificación del inmueble o actividad. También sirve acompañar reclamos anteriores y documentación sobre el servicio cuestionado.',
      },
      {
        question: '¿Una consulta permite saber si puedo recuperar un impuesto pagado?',
        answer:
          'Permite realizar una evaluación inicial, pero una conclusión requiere revisar el fundamento del cobro, los períodos, los pagos y los antecedentes. No todo pago cuestionado da lugar a una devolución.',
      },
    ],
    relatedIds: ['administrativo', 'empresas', 'civil'],
    relatedProfessionalSlugs: ['ignacio-goni'],
  },
  procesal: {
    id: 'procesal',
    seoTitle: 'Cuestiones procesales complejas en San Nicolás',
    seoDescription:
      'Preparación de litigios, prueba, medidas y recursos en San Nicolás. Evaluación de cuestiones procesales complejas y colaboración especializada.',
    keywords: ['litigios San Nicolás', 'estrategia procesal', 'medidas cautelares', 'recursos judiciales'],
    h1: 'Preparación de litigios y cuestiones procesales complejas',
    directAnswer:
      'Sí. Bengolea & Lamas analiza cuestiones procesales complejas en San Nicolás, vinculadas con la preparación del litigio, la prueba, las medidas judiciales y los recursos.',
    paragraphs: [
      'La preparación de un juicio exige definir qué se pretende, contra quién, ante qué tribunal y con qué prueba. El estudio revisa estos aspectos desde el inicio y también recibe consultas sobre expedientes en trámite que presentan dificultades procesales o requieren evaluar el siguiente paso.',
      'La intervención se apoya en la práctica de litigio del estudio y en la revisión de las actuaciones completas. Para recursos extraordinarios u otras cuestiones que requieren una especialidad adicional, se recurre a alianzas profesionales según las necesidades del asunto.',
    ],
    topics: [
      {
        title: 'Preparación del litigio y de la prueba',
        body: 'Organización de antecedentes, pretensiones y documentación antes de demandar o responder. Se evalúan la vía procesal, la competencia y los elementos necesarios para sostener la posición.',
      },
      {
        title: 'Medidas y situaciones urgentes',
        body: 'Análisis de medidas cautelares, preservación de prueba y otras herramientas procesales. Su procedencia se estudia según los hechos, la documentación y los requisitos de la vía correspondiente.',
      },
      {
        title: 'Recursos y revisión de decisiones',
        body: 'Evaluación de resoluciones judiciales, fundamentos y requisitos de impugnación. En recursos extraordinarios, el estudio contempla la colaboración de profesionales especializados.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo consultar por un expediente que ya está en trámite?',
        answer:
          'Sí. Para evaluar una intervención o una segunda opinión, se necesitan las actuaciones relevantes, el estado actual y las notificaciones recientes. También se verifica la existencia de plazos pendientes.',
      },
      {
        question: '¿Qué necesitan para analizar una posible apelación?',
        answer:
          'La resolución completa, la constancia de notificación y los antecedentes que permitan comprender lo decidido. La viabilidad del recurso depende de sus requisitos, los fundamentos disponibles y la etapa del proceso.',
      },
      {
        question: '¿Una situación urgente siempre se resuelve mediante un amparo?',
        answer:
          'No. La urgencia debe analizarse junto con la naturaleza del derecho, los hechos y las vías disponibles. El estudio evalúa qué herramienta procesal corresponde, sin prometer una resolución en un plazo determinado.',
      },
    ],
    relatedIds: ['civil', 'comercial', 'colectivas', 'salud'],
    relatedProfessionalSlugs: ['carlos-alberto-bengolea', 'adrian-bengolea', 'ignacio-goni'],
  },
};

export function getPracticeAreaPage(id: string): PracticeAreaPageContent | undefined {
  return PRACTICE_AREA_PAGES[id];
}
