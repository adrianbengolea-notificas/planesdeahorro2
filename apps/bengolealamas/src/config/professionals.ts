/** Datos públicos verificados — ver docs/fuentes-profesionales.md */

export type ProfessionalSummary = {
  slug: string;
  name: string;
  honorific?: string;
  jobTitle: string;
  specialties: string[];
  teaser: string;
  image?: string;
  imageAlt: string;
  imageTodo?: boolean;
};

export const PROFESSIONALS_HERO = {
  title: 'Nuestros profesionales',
  subtitle: 'Experiencia, especialización y compromiso en la defensa de nuestros clientes.',
  intro: [
    'El Estudio Jurídico Bengolea & Lamas reúne abogados con trayectoria en litigación judicial, asesoramiento preventivo y acompañamiento en conflictos civiles, comerciales y de defensa del consumidor.',
    'Nuestro trabajo combina análisis jurídico riguroso, estrategia probatoria y comunicación clara con quien nos consulta, desde la provincia de Buenos Aires y con base en San Nicolás de los Arroyos.',
    'En esta sección podés conocer a quienes integran el equipo y acceder al detalle de su experiencia pública verificable.',
  ],
} as const;

export const PROFESSIONALS_TRADITION = {
  title: 'Una tradición profesional orientada al litigio',
  paragraphs: [
    'Desde sus inicios, Bengolea & Lamas se caracterizó por una fuerte actividad judicial y por el compromiso con la defensa de quienes enfrentan asimetrías en relaciones de consumo y en conflictos patrimoniales.',
    'En la actualidad, el estudio combina litigación, prevención de conflictos, negociación y asesoramiento en materia civil y comercial, daños, defensa del consumidor y otras áreas que surgen de cada caso concreto.',
    'Cada integrante aporta especialización y experiencia en función de la complejidad del asunto, siempre con el objetivo de preparar la estrategia adecuada y mantener informado al cliente sobre las etapas del proceso.',
  ],
} as const;

export const BAR_SAN_NICOLAS = {
  association: 'Colegio de Abogados de San Nicolás',
  registration: 'Tomo 8, Folio 84',
} as const;

export const TEAM: ProfessionalSummary[] = [
  {
    slug: 'carlos-alberto-bengolea',
    name: 'Carlos Alberto Bengolea',
    jobTitle: 'Abogado — Socio fundador',
    specialties: ['Litigación', 'Derecho civil', 'Derecho comercial'],
    teaser:
      'Socio fundador del estudio, con trayectoria orientada al litigio y al acompañamiento de clientes en conflictos judiciales.',
    image: '/images/profesionales/carlos-alberto-bengolea.jpg',
    imageAlt: 'Carlos Alberto Bengolea',
  },
  {
    slug: 'carlos-alberto-lamas',
    name: 'Carlos Alberto Lamas',
    jobTitle: 'Abogado — Socio fundador · In memoriam',
    specialties: ['Legado institucional', 'Litigación', 'Asesoramiento jurídico'],
    teaser:
      'Socio del estudio y parte fundamental de su historia. Su trayectoria, compromiso con la abogacía y dedicación a quienes confiaron en el estudio constituyen un legado presente en nuestra práctica profesional.',
    image: '/images/profesionales/carlos-alberto-lamas.jpg',
    imageAlt: 'Carlos Alberto Lamas',
  },
  {
    slug: 'adrian-bengolea',
    name: 'Adrián Bengolea',
    honorific: 'Dr.',
    jobTitle: 'Abogado',
    specialties: [
      'Defensa del consumidor',
      'Planes de ahorro',
      'Derecho civil y comercial',
      'Acciones colectivas',
    ],
    teaser:
      'Abogado matriculado en San Nicolás e integrante del estudio desde 2000. Director Ejecutivo de Usuarios y Consumidores Unidos (UCU) y fundador de Notificas SRL. Referente en defensa del consumidor, procesos colectivos y planes de ahorro automotor.',
    image: '/images/profesionales/adrian-bengolea.jpg',
    imageAlt: 'Dr. Adrián Bengolea',
  },
  {
    slug: 'ignacio-goni',
    name: 'Ignacio Goñi Bengolea',
    jobTitle: 'Abogado — Litigación · Derecho bancario · Tributario · Seguros',
    specialties: ['Litigación', 'Derecho bancario', 'Derecho tributario', 'Seguros', 'Daños'],
    teaser:
      'Graduado en la UBA, con posgrado en Derecho de Daños. Más de veinte años en litigación y asesoramiento; abogado apoderado del Banco de la Nación Argentina desde 2011.',
    image: '/images/profesionales/ignacio-goni.jpg',
    imageAlt: 'Ignacio Goñi Bengolea',
  },
];

export function getProfessionalBySlug(slug: string): ProfessionalSummary | undefined {
  return TEAM.find((p) => p.slug === slug);
}
