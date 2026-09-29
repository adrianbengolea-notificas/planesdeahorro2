/**
 * Modelo editorial multisite (Firestore futuro). No implica migración de colecciones actuales.
 */

export type SiteId = 'adrian' | 'bl';

export type ContentKind =
  | 'practice_area'
  | 'guide'
  | 'publication'
  | 'ruling_commentary'
  | 'faq'
  | 'professional';

export type ContentSeo = {
  title?: string;
  description?: string;
  /** URL absoluta; si se omite, se deriva del sitio + path */
  canonical?: string;
  noIndex?: boolean;
};

export type ContentHeroImage = {
  url: string;
  alt: string;
};

export type ContentRelations = {
  relatedContentIds: string[];
  legislationRefs: string[];
  rulingRefs: string[];
  faqIds: string[];
};

/** Documento conceptual unificado para portal jurídico. */
export type ContentDocument = {
  siteId: SiteId;
  kind: ContentKind;
  title: string;
  slug: string;
  /** Segmentos de URL publicados, p. ej. ['bancos','fraude-bancario'] */
  pathSegments: string[];
  description: string;
  excerpt: string;
  body: string;
  authorIds: string[];
  publishDate: string;
  updatedAt: string;
  categoryId?: string;
  tagIds: string[];
  seo: ContentSeo;
  heroImage?: ContentHeroImage;
  relations: ContentRelations;
  published: boolean;
};

export function contentPublicPath(doc: Pick<ContentDocument, 'pathSegments'>): string {
  const segments = doc.pathSegments.filter(Boolean);
  return segments.length ? `/${segments.join('/')}` : '/';
}

export function isBlContent(doc: Pick<ContentDocument, 'siteId'>): boolean {
  return doc.siteId === 'bl';
}

export function isAdrianContent(doc: Pick<ContentDocument, 'siteId'>): boolean {
  return doc.siteId === 'adrian';
}

/** Consultas del asistente de B&L (solo admin). */
export const BL_CASE_INTAKES_COLLECTION = 'bl_case_intakes';

/** Notas / publicaciones CMS de B&L. */
export const BL_PUBLICATIONS_COLLECTION = 'bl_publications';
