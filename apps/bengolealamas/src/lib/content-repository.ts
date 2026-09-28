import 'server-only';
import type { ContentDocument, SiteId } from '@repo/content-types';

/**
 * Capa futura de lectura Firestore para B&L.
 * Todas las consultas deberán incluir `where('siteId', '==', 'bl')`.
 *
 * NO conectado a producción en esta fase — evita tocar reglas o datos de Adrian.
 */
export type ListContentOptions = {
  siteId: SiteId;
  kind?: ContentDocument['kind'];
  publishedOnly?: boolean;
  limit?: number;
};

export async function listContent(_options: ListContentOptions): Promise<ContentDocument[]> {
  return [];
}

export async function getContentByPath(
  _siteId: SiteId,
  _pathSegments: string[],
): Promise<ContentDocument | null> {
  return null;
}
