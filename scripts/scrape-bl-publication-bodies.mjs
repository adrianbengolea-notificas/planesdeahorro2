/**
 * Descarga cuerpo HTML e imágenes de cada nota Wix (requiere JS en cliente).
 * Uso: npm run scrape:bl-publications
 * Requiere: playwright + chromium (npx playwright install chromium)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_JSON = path.join(ROOT, 'apps/bengolealamas/src/data/bl-publications.json');
const HTML_DIR = path.join(ROOT, 'apps/bengolealamas/src/content/publications');
const IMG_ROOT = path.join(ROOT, 'apps/bengolealamas/public/images/publicaciones');

function safeSlug(slug) {
  return slug
    .normalize('NFC')
    .replace(/[<>:"|?*\\/%]/g, '-')
    .replace(/\s+/g, '-')
    .slice(0, 120);
}

function wixOriginalMediaUrl(url) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes('wixstatic.com')) return url;
    const m = u.pathname.match(/\/media\/([^/]+~mv2[^/]*)/);
    if (m) return `https://static.wixstatic.com/media/${m[1]}`;
    return url;
  } catch {
    return url;
  }
}

function sanitizeHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

async function downloadImage(url, destPath) {
  const original = wixOriginalMediaUrl(url);
  const res = await fetch(original);
  if (!res.ok) throw new Error(`img ${res.status} ${original}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
  return destPath;
}

function extFromUrl(url) {
  const m = url.match(/\.(jpe?g|png|webp|gif)/i);
  return m ? m[0].toLowerCase().replace('jpeg', '.jpg') : '.jpg';
}

async function scrapePost(page, pub) {
  const dirSlug = safeSlug(pub.slug);
  const url = pub.legacyUrl;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120_000 });
  await page.waitForSelector('[data-hook="post-description"]', { timeout: 60_000 });

  const extracted = await page.evaluate(() => {
    const desc = document.querySelector('[data-hook="post-description"]');
    const hero = document.querySelector('[data-hook="post-hero-image"] img');
    const title = document.querySelector('[data-hook="post-title"]')?.textContent?.trim();
    return {
      title,
      html: desc?.innerHTML ?? '',
      heroSrc: hero?.src ?? '',
      imgs: [...(desc?.querySelectorAll('img') ?? [])].map((img) => img.src),
    };
  });

  if (!extracted.html?.trim()) {
    throw new Error('empty post-description');
  }

  const imgDir = path.join(IMG_ROOT, dirSlug);
  const urlToLocal = new Map();
  let imgIndex = 0;

  if (extracted.heroSrc && !extracted.heroSrc.includes('w_32')) {
    const ext = extFromUrl(extracted.heroSrc);
    const local = `/images/publicaciones/${dirSlug}/hero${ext}`;
    await downloadImage(extracted.heroSrc, path.join(ROOT, 'apps/bengolealamas/public', local));
    urlToLocal.set(extracted.heroSrc, local);
  }

  for (const src of extracted.imgs) {
    if (!src || urlToLocal.has(src)) continue;
    if (src.includes('w_32') || src.includes('h_32')) continue;
    imgIndex += 1;
    const ext = extFromUrl(src);
    const local = `/images/publicaciones/${dirSlug}/img-${imgIndex}${ext}`;
    try {
      await downloadImage(src, path.join(ROOT, 'apps/bengolealamas/public', local));
      urlToLocal.set(src, local);
    } catch (e) {
      console.warn('  skip image', src, e.message);
    }
  }

  let html = sanitizeHtml(extracted.html);
  for (const [remote, local] of urlToLocal) {
    html = html.split(remote).join(local);
    const encoded = remote.replace(/&/g, '&amp;');
    html = html.split(encoded).join(local);
  }

  const contentFile = `${dirSlug}.html`;
  fs.mkdirSync(HTML_DIR, { recursive: true });
  fs.writeFileSync(path.join(HTML_DIR, contentFile), html, 'utf8');

  return {
    contentFile,
    heroImage: urlToLocal.get(extracted.heroSrc) ?? null,
    title: extracted.title || pub.title,
    migratedAt: new Date().toISOString(),
    imageCount: urlToLocal.size,
  };
}

async function main() {
  const onlySlug = process.argv[2];
  const data = JSON.parse(fs.readFileSync(DATA_JSON, 'utf8'));
  let pubs = data.publications;
  if (onlySlug) pubs = pubs.filter((p) => p.slug === onlySlug || safeSlug(p.slug) === onlySlug);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (let i = 0; i < pubs.length; i++) {
    const pub = pubs[i];
    const htmlPath = pub.contentFile
      ? path.join(HTML_DIR, pub.contentFile)
      : path.join(HTML_DIR, `${safeSlug(pub.slug)}.html`);
    if (pub.contentFile && fs.existsSync(htmlPath)) {
      console.log(`[${i + 1}/${pubs.length}] skip (ya migrado) ${pub.title.slice(0, 50)}…`);
      continue;
    }
    if (!pub.legacyUrl?.includes('single-post')) {
      pub.legacyUrl = `https://www.bengolealamas.com.ar/single-post/${encodeURI(pub.slug)}`;
    }
    console.log(`[${i + 1}/${pubs.length}] ${pub.title.slice(0, 60)}…`);
    try {
      const meta = await scrapePost(page, pub);
      Object.assign(pub, meta);
      delete pub.scrapeError;
    } catch (e) {
      console.error('  FAILED', e.message);
      pub.scrapeError = e.message;
    }
    await page.waitForTimeout(800);
  }

  await browser.close();
  data.migratedAt = new Date().toISOString();
  fs.writeFileSync(DATA_JSON, JSON.stringify(data, null, 2), 'utf8');
  console.log('Done. Updated', DATA_JSON);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
