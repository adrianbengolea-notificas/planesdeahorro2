import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import raw from '@/data/bl-publications.json';
import { normalizePublicationHtml } from '@/lib/normalize-publication-html';

export type BlPublication = {
  title: string;
  excerpt: string;
  tags?: string[];
  publishDate: string;
  author: string;
  legacyUrl: string;
  guid: string;
  slug: string;
  source?: string;
  /** HTML en src/content/publications/{contentFile} */
  contentFile?: string;
  heroImage?: string | null;
  migratedAt?: string;
  imageCount?: number;
  scrapeError?: string;
  /** HTML de notas cargadas desde el CMS (Firestore). */
  bodyHtml?: string;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string | null;
};

type PublicationsFile = {
  syncedAt: string;
  source: string;
  count: number;
  migratedAt?: string;
  publications: BlPublication[];
};

const file = raw as PublicationsFile;

export function getBlPublications(): BlPublication[] {
  return file.publications;
}

export function getBlPublicationBySlug(slug: string): BlPublication | undefined {
  const decoded = tryDecode(slug);
  return file.publications.find((p) => p.slug === slug || p.slug === decoded || encodeSlug(p.slug) === slug);
}

function tryDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function encodeSlug(slug: string): string {
  return slug
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
}

export function publicationPath(slug: string): string {
  return `/publicaciones/${encodeSlug(slug)}`;
}

const RULING_PATTERN =
  /fallo|jurisprudenc|medida cautelar|autosatisfactiva|suprema corte|scba|cámara de apelaciones/i;

/** Notas que comentan una sentencia o medida; alimentan /jurisprudencia sin duplicar el listado general. */
export function publicationLooksLikeRuling(pub: Pick<BlPublication, 'title' | 'tags'>): boolean {
  const haystack = `${pub.title}\n${(pub.tags ?? []).join(' ')}`;
  return RULING_PATTERN.test(haystack);
}

export function formatPublicationDate(iso: string): string {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long', timeZone: 'America/Argentina/Buenos_Aires' }).format(
      new Date(iso),
    );
  } catch {
    return iso.slice(0, 10);
  }
}

export function getBlPublicationsSyncMeta() {
  return { syncedAt: file.syncedAt, source: file.source, count: file.count, migratedAt: file.migratedAt };
}

export function readPublicationHtml(contentFile: string): string | null {
  if (!contentFile || !/^[a-zA-Z0-9._\u00C0-\u024F-]+\.html$/.test(contentFile)) return null;
  try {
    const full = path.join(process.cwd(), 'src/content/publications', contentFile);
    return normalizePublicationHtml(fs.readFileSync(full, 'utf8'));
  } catch {
    return null;
  }
}

const THUMB_CANDIDATES = ['img-1.jpg', 'img-1.jpeg', 'img-1.png', 'img-1.webp'] as const;

function firstImageSrcInHtml(html: string): string | null {
  const match = html.match(/<img[^>]+src=(["'])(\/images\/publicaciones\/[^"']+)\1/i);
  return match?.[2] ?? null;
}

/** Miniatura para listados: hero del CMS, carpeta migrada o primera img del HTML. */
export function resolvePublicationThumbnail(pub: BlPublication): string | null {
  const hero = pub.heroImage?.trim();
  if (hero) return hero;

  const imageRoot = path.join(process.cwd(), 'public/images/publicaciones', pub.slug);
  for (const name of THUMB_CANDIDATES) {
    if (fs.existsSync(path.join(imageRoot, name))) {
      return `/images/publicaciones/${pub.slug}/${name}`;
    }
  }

  if (pub.contentFile && (pub.imageCount ?? 0) > 0) {
    const html = readPublicationHtml(pub.contentFile);
    if (html) return firstImageSrcInHtml(html);
  }

  return null;
}
