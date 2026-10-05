const ADMIN_SLUG = /^[-a-z0-9_\u00C0-\u024F]+$/i;

/** Conserva slugs migrados de Wix (tildes, guion inicial, _) y normaliza el resto. */
export function normalizeAdminSlug(input: string): string {
  const trimmed = input.trim();
  if (trimmed && ADMIN_SLUG.test(trimmed) && trimmed.length <= 200) return trimmed;
  return slugify(trimmed);
}

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Si el cuerpo no trae HTML, lo convierte en párrafos. */
export function bodyToHtml(body: string): string {
  const trimmed = body.trim();
  if (!trimmed) return '';
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  return trimmed
    .split(/\n{2,}/)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}
