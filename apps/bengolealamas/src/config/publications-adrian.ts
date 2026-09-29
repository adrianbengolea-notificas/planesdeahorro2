/** Publicaciones atribuidas públicamente a Adrián Bengolea en UCU — ver docs/fuentes-profesionales.md */

export type PublicationRef = {
  title: string;
  date: string;
  excerpt: string;
  source: string;
  url: string;
};

export const ADRIAN_UCU_PUBLICATIONS: PublicationRef[] = [
  {
    title: 'Facilitando herramientas para la práctica diaria del derecho del consumidor',
    date: '',
    excerpt:
      'Presentación de modelos de intimaciones y demandas de consumo en la web de UCU para facilitar el trabajo de abogados en la materia.',
    source: 'UCU',
    url: 'https://ucu.org.ar/facilitando-herramientas-para-la-practica-diaria-del-derecho-del-consumidor/',
  },
  {
    title: '¿Qué pasaría si tus denuncias pudieran ser vistas por millones de argentinos?',
    date: '',
    excerpt: 'Reflexión sobre visibilidad pública de denuncias de consumidores y el rol de UCU.',
    source: 'UCU',
    url: 'https://ucu.org.ar/que-pasaria-si-tus-denuncias-pudieran-ser-vistas-por-un-millon-de-argentinos/',
  },
  {
    title: 'Nueva reglamentación en materia de Telefonía Celular',
    date: '',
    excerpt: 'Invitación a la comunidad a aportar ideas en el marco de la participación ciudadana en regulaciones de consumo.',
    source: 'UCU',
    url: 'https://ucu.org.ar/nueva-reglamentacion-en-materia-de-telefonia-celular-que-idea-podes-aportar/',
  },
  {
    title: 'Pergamino: Usuarios y Consumidores Unidos inaugura una delegación',
    date: '',
    excerpt:
      'Nota sobre la expansión territorial de UCU y los objetivos de la asociación en defensa de consumidores, con declaraciones de Adrián Bengolea como representante nacional.',
    source: 'UCU / LA OPINION (citado en UCU)',
    url: 'https://ucu.org.ar/pergamino-usuarios-y-consumidores-unidos-inaugura-una-delegacion/',
  },
  {
    title: 'Atención — Acción colectiva contra Liderar Seguros',
    date: '2023',
    excerpt: 'Comunicación sobre acción colectiva promovida por Usuarios y Consumidores Unidos.',
    source: 'UCU',
    url: 'https://ucu.org.ar/posts/atencion-accion-colectiva-contra-liderar-seguros',
  },
];
