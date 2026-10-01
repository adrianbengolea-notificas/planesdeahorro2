import { slugify } from '@/lib/slugify';

const MAX_TAGS = 24;
const MAX_TAG_LENGTH = 48;

export function parseTags(input: string | string[] | undefined | null): string[] {
  const raw = Array.isArray(input) ? input.join(',') : (input ?? '');
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const part of raw.split(/[,;]+/)) {
    const tag = part.trim().replace(/\s+/g, ' ');
    if (!tag || tag.length > MAX_TAG_LENGTH) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    tags.push(tag);
    if (tags.length >= MAX_TAGS) break;
  }
  return tags;
}

export function formatTagsCsv(tags: string[] | undefined | null): string {
  return (tags ?? []).join(', ');
}

export function tagSlug(tag: string): string {
  return slugify(tag);
}

export function publicationHasTag(tags: string[] | undefined, query: string): boolean {
  const wanted = tagSlug(query);
  if (!wanted) return false;
  return (tags ?? []).some((tag) => tagSlug(tag) === wanted);
}

export function collectPublicationTags(items: { tags?: string[] }[]): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const item of items) {
    for (const tag of item.tags ?? []) {
      const key = tag.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      tags.push(tag);
    }
  }
  return tags.sort((a, b) => a.localeCompare(b, 'es'));
}
