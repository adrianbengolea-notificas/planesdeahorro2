const slug = process.argv[2] || 'reclamos-por-planes-de-ahorro';
const url = `https://www.bengolealamas.com.ar/single-post/${encodeURIComponent(slug)}`;
const html = await fetch(url).then((r) => r.text());
console.log('richContent in html', html.includes('richContent'));
const idx = html.indexOf('richContent');
if (idx > 0) console.log(html.slice(idx, idx + 800));

const m = html.match(
  new RegExp('<script type="application/json" id="wix-warmup-data">([\\s\\S]*?)<\\/script>'),
);
if (m) {
  const raw = m[1];
  console.log('warmup has richContent', raw.includes('richContent'));
  const i2 = raw.indexOf('richContent');
  if (i2 > 0) console.log(raw.slice(i2, i2 + 1200));
}
