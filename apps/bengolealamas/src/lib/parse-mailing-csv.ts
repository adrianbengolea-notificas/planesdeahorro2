import type { MailingContact } from '@/lib/bl-mailing-types';

export const MAX_MAILING_CONTACTS = 3000;
export const MAX_MAILING_CSV_CHARS = 500_000;

const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;

export function normalizeEmail(raw: string): string | null {
  const cleaned = raw.trim().toLowerCase().replace(/^mailto:/i, '').replace(/^['"]+|['"]+$/g, '');
  if (!EMAIL_RE.test(cleaned) || cleaned.length > 254) return null;
  return cleaned;
}

function stripBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function foldHeader(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function detectDelimiter(headerLine: string): string {
  const candidates: Array<[string, number]> = [
    [';', (headerLine.match(/;/g) ?? []).length],
    [',', (headerLine.match(/,/g) ?? []).length],
    ['\t', (headerLine.match(/\t/g) ?? []).length],
  ];
  candidates.sort((a, b) => b[1] - a[1]);
  return candidates[0][1] > 0 ? candidates[0][0] : ',';
}

function parseCsvRows(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  const src = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === delimiter) {
      row.push(cell.trim());
      cell = '';
      continue;
    }
    if (ch === '\n') {
      row.push(cell.trim());
      cell = '';
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      continue;
    }
    cell += ch;
  }

  row.push(cell.trim());
  if (row.some((value) => value.length > 0)) rows.push(row);
  return rows;
}

function headerIndex(headers: string[], aliases: string[]): number {
  const folded = headers.map(foldHeader);
  for (const alias of aliases) {
    const exact = folded.indexOf(alias);
    if (exact >= 0) return exact;
  }
  for (let i = 0; i < folded.length; i++) {
    if (aliases.some((alias) => folded[i].includes(alias))) return i;
  }
  return -1;
}

export function parseMailingCsv(raw: string): {
  contacts: MailingContact[];
  skipped: number;
  duplicatesDropped: number;
  truncated: boolean;
} {
  const text = stripBom(raw).trim();
  if (!text) return { contacts: [], skipped: 0, duplicatesDropped: 0, truncated: false };

  const firstLine = text.split('\n', 1)[0] ?? '';
  const rows = parseCsvRows(text, detectDelimiter(firstLine));
  if (rows.length === 0) return { contacts: [], skipped: 0, duplicatesDropped: 0, truncated: false };

  const first = rows[0];
  const emailHeader = headerIndex(first, ['email', 'e mail', 'correo', 'mail', 'e-mail']);
  const nameHeader = headerIndex(first, ['nombre', 'name', 'apellido', 'contacto', 'destinatario']);
  const firstLooksLikeHeader = emailHeader >= 0 || first.every((cell) => !normalizeEmail(cell));

  let emailCol = 0;
  let nameCol = -1;
  let start = 0;

  if (firstLooksLikeHeader) {
    start = 1;
    emailCol = emailHeader >= 0 ? emailHeader : 0;
    nameCol = nameHeader;
    if (emailHeader < 0 && rows[1]) {
      const found = rows[1].findIndex((cell) => Boolean(normalizeEmail(cell)));
      if (found >= 0) emailCol = found;
    }
  } else {
    const found = first.findIndex((cell) => Boolean(normalizeEmail(cell)));
    emailCol = found >= 0 ? found : 0;
    nameCol = first.findIndex((cell, index) => index !== emailCol && cell.length > 0 && !normalizeEmail(cell));
  }

  const seen = new Set<string>();
  const contacts: MailingContact[] = [];
  let skipped = 0;
  let duplicatesDropped = 0;
  let truncated = false;

  for (let i = start; i < rows.length; i++) {
    if (contacts.length >= MAX_MAILING_CONTACTS) {
      truncated = true;
      break;
    }
    const row = rows[i];
    let email = normalizeEmail(row[emailCol] ?? '');
    if (!email) {
      for (const cell of row) {
        email = normalizeEmail(cell);
        if (email) break;
      }
    }
    if (!email) {
      skipped += 1;
      continue;
    }
    if (seen.has(email)) {
      duplicatesDropped += 1;
      continue;
    }
    seen.add(email);
    const name = (nameCol >= 0 ? row[nameCol] : '')?.trim() ?? '';
    contacts.push({ email, name });
  }

  return { contacts, skipped, duplicatesDropped, truncated };
}

export function mailingContactsToCsv(contacts: MailingContact[]): string {
  const escape = (value: string) => {
    if (/[",;\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
    return value;
  };
  const lines = ['email,nombre'];
  for (const contact of contacts) {
    lines.push(`${contact.email},${escape(contact.name)}`);
  }
  return `${lines.join('\n')}\n`;
}

export function mergeContacts(existing: MailingContact[], incoming: MailingContact[]): MailingContact[] {
  const map = new Map<string, MailingContact>();
  for (const contact of existing) map.set(contact.email, contact);
  for (const contact of incoming) {
    const prev = map.get(contact.email);
    map.set(contact.email, {
      email: contact.email,
      name: contact.name || prev?.name || '',
    });
  }
  return [...map.values()];
}
