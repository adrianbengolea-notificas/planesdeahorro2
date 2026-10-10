/**
 * Registro de áreas de práctica. Solo entradas con `published: true`
 * aparecen en sitemap y reciben página propia.
 */
export type PracticeAreaEntry = {
  id: string;
  title: string;
  /** Path publicado, p. ej. /bancos/fraude-bancario */
  path: string;
  description: string;
  published: boolean;
};

export const PRACTICE_AREAS: PracticeAreaEntry[] = [
  {
    id: 'defensa-consumidor',
    title: 'Defensa del consumidor',
    path: '/defensa-del-consumidor',
    description: 'Reclamos frente a empresas de servicios, bancos, aseguradoras y contratos de adhesión.',
    published: true,
  },
  {
    id: 'bancos',
    title: 'Bancos y servicios financieros',
    path: '/bancos',
    description: 'Fraude, débitos no autorizados, DEBIN, tarjetas y protección de datos.',
    published: true,
  },
  {
    id: 'bancos-fraude',
    title: 'Fraude bancario',
    path: '/bancos/fraude-bancario',
    description: 'Transferencias y operaciones no reconocidas; responsabilidad de la entidad financiera.',
    published: true,
  },
  {
    id: 'bancos-debitos',
    title: 'Débitos no autorizados',
    path: '/bancos/debitos-no-autorizados',
    description: 'Cargos en cuenta o tarjeta sin consentimiento válido.',
    published: true,
  },
  {
    id: 'bancos-debin',
    title: 'DEBIN',
    path: '/bancos/debin',
    description: 'Débitos inmediatos y controversias sobre autorización.',
    published: true,
  },
  {
    id: 'bancos-tarjetas',
    title: 'Tarjetas de crédito',
    path: '/bancos/tarjetas-de-credito',
    description: 'Cargos indebidos, refinanciaciones y cláusulas abusivas.',
    published: true,
  },
  {
    id: 'bancos-habeas',
    title: 'Habeas data',
    path: '/bancos/habeas-data',
    description: 'Protección de datos personales en relaciones con entidades financieras.',
    published: true,
  },
  {
    id: 'planes-ahorro',
    title: 'Planes de ahorro',
    path: '/planes-de-ahorro',
    description: 'Hub institucional con derivación al sitio especializado en planes de ahorro automotriz.',
    published: true,
  },
  {
    id: 'seguros',
    title: 'Seguros',
    path: '/seguros',
    description: 'Denegación de cobertura, baja de póliza y reclamos al asegurador.',
    published: true,
  },
  {
    id: 'servicios-publicos',
    title: 'Servicios públicos',
    path: '/servicios-publicos',
    description: 'Tarifas, facturación y calidad del servicio.',
    published: true,
  },
  {
    id: 'civil',
    title: 'Derecho civil',
    path: '/derecho-civil',
    description: 'Contratos, obligaciones, responsabilidad y conflictos patrimoniales.',
    published: true,
  },
  {
    id: 'danos',
    title: 'Daños y perjuicios',
    path: '/danos-y-perjuicios',
    description: 'Indemnizaciones por accidentes, mala praxis y responsabilidad civil.',
    published: true,
  },
  {
    id: 'comercial',
    title: 'Derecho comercial',
    path: '/derecho-comercial',
    description: 'Sociedades, contratos mercantiles y conflictos entre empresas.',
    published: true,
  },
  {
    id: 'empresas',
    title: 'Empresas',
    path: '/empresas',
    description: 'Asesoramiento y litigios vinculados a actividad empresarial.',
    published: true,
  },
  {
    id: 'administrativo',
    title: 'Derecho administrativo',
    path: '/derecho-administrativo',
    description: 'Actos de la administración pública y procedimientos.',
    published: true,
  },
  {
    id: 'colectivas',
    title: 'Acciones colectivas',
    path: '/acciones-colectivas',
    description: 'Defensa de intereses difusos y procesos representativos.',
    published: true,
  },
  {
    id: 'salud',
    title: 'Salud y discapacidad',
    path: '/salud-y-discapacidad',
    description: 'Coberturas, prestaciones y derechos de pacientes.',
    published: true,
  },
  {
    id: 'laboral',
    title: 'Derecho laboral',
    path: '/derecho-laboral',
    description: 'Consultas de trabajadores y pymes: contratación, salarios, desvinculaciones y reclamos.',
    published: true,
  },
  {
    id: 'familia',
    title: 'Derecho de familia',
    path: '/derecho-de-familia',
    description: 'Alimentos, divorcio, cuidado personal y acuerdos familiares.',
    published: true,
  },
  {
    id: 'medio-ambiente',
    title: 'Medio ambiente',
    path: '/medio-ambiente',
    description: 'Conflictos vecinales, daños y actuaciones administrativas con impacto ambiental.',
    published: true,
  },
  {
    id: 'tributario',
    title: 'Conflictos tributarios',
    path: '/conflictos-tributarios',
    description: 'Ganancias, tasas municipales y reclamos fiscales.',
    published: true,
  },
  {
    id: 'procesal',
    title: 'Cuestiones procesales complejas',
    path: '/cuestiones-procesales',
    description: 'Preparación del litigio, prueba, medidas y recursos.',
    published: true,
  },
];

export function getPublishedPracticeAreas(): PracticeAreaEntry[] {
  return PRACTICE_AREAS.filter((a) => a.published);
}

export function getPracticeAreaByPath(path: string): PracticeAreaEntry | undefined {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return PRACTICE_AREAS.find((a) => a.path === normalized);
}

/** Áreas destacadas en home (pueden no tener página propia aún). */
export const HOME_FEATURED_AREAS = [
  'defensa-consumidor',
  'bancos',
  'civil',
  'danos',
  'salud',
  'laboral',
  'seguros',
  'empresas',
] as const;
