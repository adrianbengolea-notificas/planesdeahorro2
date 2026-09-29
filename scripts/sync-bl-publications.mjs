/**
 * Genera apps/bengolealamas/src/data/bl-publications.json desde Wix (RSS + listados).
 * Ejecutar: node scripts/sync-bl-publications.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../apps/bengolealamas/src/data/bl-publications.json');
const URLS_FILE = path.join(__dirname, '../data/migration/wix-post-urls.json');
const RSS_URL = 'https://www.bengolealamas.com.ar/blog-feed.xml';
const LIST_BASE = 'https://www.bengolealamas.com.ar/publicaciones';

function decodeHtml(s) {
  return s
    .replace(/&#38;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function slugFromLegacyUrl(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    const idx = parts.indexOf('single-post');
    if (idx === -1) return parts[parts.length - 1] ?? 'publicacion';
    const rest = parts.slice(idx + 1);
    if (rest.length >= 4 && /^\d{4}$/.test(rest[0])) {
      const tail = rest.slice(3).join('-') || rest[rest.length - 1];
      try {
        return decodeURIComponent(tail);
      } catch {
        return tail;
      }
    }
    const raw = rest.join('-') || 'publicacion';
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  } catch {
    return 'publicacion';
  }
}

function titleFromSlug(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function parseRssItems(xml) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml))) {
    const block = m[1];
    const pick = (tag) => {
      const cdata = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`));
      if (cdata) return decodeHtml(cdata[1].trim());
      const plain = block.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
      return plain ? decodeHtml(plain[1].trim()) : '';
    };
    const link = pick('link');
    const guid = pick('guid') || link;
    items.push({
      title: pick('title'),
      excerpt: pick('description'),
      publishDate: pick('pubDate') ? new Date(pick('pubDate')).toISOString() : '',
      author: pick('dc:creator') || '',
      legacyUrl: link,
      guid,
      slug: slugFromLegacyUrl(link),
    });
  }
  return items;
}

async function fetchListingUrls(page) {
  const url = page === 1 ? LIST_BASE : `${LIST_BASE}/page/${page}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const html = await res.text();
  return [...html.matchAll(/https:\/\/www\.bengolealamas\.com\.ar\/single-post\/[^"\\s<>]+/gu)].map((x) => x[0]);
}

function isLikelyCompletePostUrl(url) {
  try {
    const u = new URL(cleanLegacyUrl(url));
    const parts = u.pathname.split('/').filter(Boolean);
    const idx = parts.indexOf('single-post');
    const rest = idx >= 0 ? parts.slice(idx + 1) : parts;
    if (rest.length >= 4 && /^\d{4}$/.test(rest[0])) {
      const slugPart = decodeURIComponent(rest[rest.length - 1] ?? '');
      return slugPart.length >= 15;
    }
    const slug = rest.join('-');
    // URLs truncadas en el HTML de Wix suelen ser prefijos cortos del slug real.
    return slug.length >= 22;
  } catch {
    return false;
  }
}

function normalizeKey(slug) {
  return slug.normalize('NFC').toLowerCase();
}

function cleanLegacyUrl(url) {
  try {
    const u = new URL(url);
    const path = decodeURIComponent(u.pathname);
    return `${u.origin}${path}`;
  } catch {
    return url.split('?')[0];
  }
}

function loadExistingMigration() {
  if (!fs.existsSync(OUT)) return new Map();
  try {
    const prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    const map = new Map();
    for (const p of prev.publications ?? []) {
      if (!p.slug || !p.contentFile) continue;
      map.set(normalizeKey(p.slug), {
        contentFile: p.contentFile,
        heroImage: p.heroImage,
        migratedAt: p.migratedAt,
        imageCount: p.imageCount,
      });
    }
    return map;
  } catch {
    return new Map();
  }
}

async function main() {
  const prevBySlug = loadExistingMigration();
  const rssRes = await fetch(RSS_URL);
  const rssXml = await rssRes.text();
  const fromRss = parseRssItems(rssXml);

  const bySlug = new Map();
  for (const p of fromRss) {
    if (!p.slug) continue;
    const key = normalizeKey(p.slug);
    const mig = prevBySlug.get(key);
    bySlug.set(key, {
      ...p,
      source: 'rss',
      legacyUrl: cleanLegacyUrl(p.legacyUrl),
      ...(mig ?? {}),
    });
  }

  const readUrlList = () => {
    if (!fs.existsSync(URLS_FILE)) return [];
    const raw = fs.readFileSync(URLS_FILE, 'utf8').replace(/^\uFEFF/, '');
    return JSON.parse(raw);
  };
  const listingUrls = readUrlList();
  if (listingUrls.length === 0) {
    for (let page = 1; page <= 8; page++) {
      listingUrls.push(...(await fetchListingUrls(page)));
    }
  }

  for (const rawUrl of listingUrls) {
      const legacyUrl = cleanLegacyUrl(rawUrl);
      if (!isLikelyCompletePostUrl(legacyUrl)) continue;
      const slug = slugFromLegacyUrl(legacyUrl);
      if (!slug) continue;
      const key = normalizeKey(slug);
      if (bySlug.has(key)) continue;
      const mig = prevBySlug.get(key);
      bySlug.set(key, {
        title: titleFromSlug(slug),
        excerpt: '',
        publishDate: '',
        author: '',
        legacyUrl,
        guid: legacyUrl,
        slug,
        source: 'listing',
        ...(mig ?? {}),
      });
  }

  const publications = [...bySlug.values()]
    .filter((p) => p.source === 'rss' || isLikelyCompletePostUrl(p.legacyUrl))
    .sort((a, b) => {
      const da = a.publishDate ? Date.parse(a.publishDate) : 0;
      const db = b.publishDate ? Date.parse(b.publishDate) : 0;
      return db - da;
    });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(
    OUT,
    JSON.stringify(
      {
        syncedAt: new Date().toISOString(),
        source: 'https://www.bengolealamas.com.ar/publicaciones',
        count: publications.length,
        publications,
      },
      null,
      2,
    ),
    'utf8',
  );
  console.log(`Wrote ${publications.length} publications to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
