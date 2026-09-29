/**
 * Neutraliza imágenes en HTML migrado desde Wix/Ricos (position:absolute, height:100%, etc.).
 */
export function normalizePublicationHtml(html: string): string {
  if (!html) return html;

  return html.replace(/<img\b([^>]*?)>/gi, (tag) => {
    let cleaned = tag.replace(/\sstyle=(["'])[^"']*\1/gi, '');
    cleaned = cleaned.replace(/\sstyle=(["'])[^"']*\1/gi, '');
    return cleaned;
  });
}
