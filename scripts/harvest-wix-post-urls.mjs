import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../data/migration/wix-post-urls.json');
const LISTING = 'https://www.bengolealamas.com.ar/publicaciones';

function postLinksFromPage(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('[data-hook="post-list-item"] a[href*="single-post"]')]
      .map((a) => a.href)
      .filter(Boolean),
  );
}

function archiveLinksFromPage(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('[data-hook="link-list-item"] a[href*="/publicaciones/archive/"]')]
      .map((a) => a.href.split('?')[0])
      .filter(Boolean),
  );
}

async function gotoListing(page) {
  await page.goto(LISTING, { waitUntil: 'domcontentloaded', timeout: 120_000 });
  await page.waitForTimeout(2500);
}

async function collectFromArchive(page, archiveUrl) {
  await page.goto(archiveUrl, { waitUntil: 'domcontentloaded', timeout: 120_000 });
  await page.waitForTimeout(2000);
  const links = await postLinksFromPage(page);
  for (let p = 2; p <= 5; p++) {
    const btn = page.locator(`[data-hook="pagination__${p}"]`);
    if ((await btn.count()) === 0) break;
    await btn.click();
    await page.waitForTimeout(2000);
    links.push(...(await postLinksFromPage(page)));
  }
  return links;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const all = new Set();

  await gotoListing(page);
  (await postLinksFromPage(page)).forEach((l) => all.add(l.split('?')[0]));

  for (let p = 2; p <= 8; p++) {
    const btn = page.locator(`[data-hook="pagination__${p}"]`);
    if ((await btn.count()) === 0) break;
    await btn.click();
    await page.waitForTimeout(2000);
    (await postLinksFromPage(page)).forEach((l) => all.add(l.split('?')[0]));
  }

  await gotoListing(page);
  const archives = await archiveLinksFromPage(page);
  console.log('archive months', archives.length);

  for (const arch of archives) {
    const links = await collectFromArchive(page, arch);
    links.forEach((l) => all.add(l.split('?')[0]));
    console.log('archive', arch.replace(/.*archive\//, ''), '→', links.length, 'links');
  }

  for (let year = 2016; year <= 2019; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      const mm = String(month).padStart(2, '0');
      const arch = `${LISTING}/archive/${year}/${mm}`;
      if (archives.includes(arch)) continue;
      const links = await collectFromArchive(page, arch);
      if (links.length === 0) continue;
      links.forEach((l) => all.add(l.split('?')[0]));
      console.log('archive', `${year}/${mm}`, '→', links.length, 'links');
    }
  }

  await browser.close();
  const list = [...all].sort();
  fs.writeFileSync(OUT, JSON.stringify(list, null, 2), 'utf8');
  console.log('Wrote', list.length, 'urls to', OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
