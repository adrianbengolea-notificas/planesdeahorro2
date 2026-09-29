import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import raw from '@/data/bl-publications.json';

export type BlPublication = {
  title: string;
  excerpt: string;
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
  if (!contentFile || !/^[a-zA-Z0-9._-]+\.html$/.test(contentFile)) return null;
  try {
    const full = path.join(process.cwd(), 'src/content/publications', contentFile);
    return fs.readFileSync(full, 'utf8');
  } catch {
    return null;
  }
}
