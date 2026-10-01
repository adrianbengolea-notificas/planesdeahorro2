const ALLOWED_TAGS = new Set([
  'p',
  'div',
  'br',
  'span',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'strike',
  'h1',
  'h2',
  'h3',
  'h4',
  'ul',
  'ol',
  'li',
  'a',
  'blockquote',
  'sub',
  'sup',
  'hr',
  'table',
  'thead',
  'tbody',
  'tr',
  'td',
  'th',
]);

const ALLOWED_ATTRS = new Set(['href', 'target', 'rel', 'style', 'align', 'colspan', 'rowspan']);

const STYLE_KEEP = new Set([
  'text-align',
  'line-height',
  'margin',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'padding',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'text-indent',
  'font-weight',
  'font-style',
  'text-decoration',
  'font-size',
]);

function filterStyle(style: string): string {
  return style
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((decl) => {
      const prop = decl.split(':')[0]?.trim().toLowerCase();
      if (!prop || prop.startsWith('mso-')) return false;
      return STYLE_KEEP.has(prop);
    })
    .join('; ');
}

function stripDangerousServer(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<\/?(?:o:p|w:[^>\s/]+)[^>]*>/gi, '')
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '');
}

function extractClipboardFragment(html: string): string {
  const start = html.indexOf('<!--StartFragment-->');
  const end = html.indexOf('<!--EndFragment-->');
  if (start !== -1 && end > start) {
    return html.slice(start + '<!--StartFragment-->'.length, end);
  }
  if (typeof DOMParser !== 'undefined' && /<html[\s>]|<body[\s>]/i.test(html)) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body?.innerHTML ?? html;
  }
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (body?.[1]) return body[1];
  return html;
}

function sanitizeWithDom(html: string): string {
  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, 'text/html');
  const root = doc.getElementById('root');
  if (!root) return '';

  const walk = (node: Node) => {
    const children = Array.from(node.childNodes);
    for (const child of children) {
      if (child.nodeType === Node.COMMENT_NODE) {
        child.parentNode?.removeChild(child);
        continue;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) continue;
      const el = child as HTMLElement;
      walk(el);
      const tag = el.tagName.toLowerCase();
      if (!el.parentNode) continue;
      if (!ALLOWED_TAGS.has(tag)) {
        const parent = el.parentNode;
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
        continue;
      }

      for (const attr of Array.from(el.attributes)) {
        const name = attr.name.toLowerCase();
        if (name.startsWith('on') || !ALLOWED_ATTRS.has(name)) {
          el.removeAttribute(attr.name);
          continue;
        }
        if (name === 'href' && /^\s*javascript:/i.test(attr.value)) {
          el.removeAttribute(attr.name);
          continue;
        }
        if (name === 'style') {
          const cleaned = filterStyle(attr.value);
          if (cleaned) el.setAttribute('style', cleaned);
          else el.removeAttribute('style');
        }
        if (name === 'align') {
          const align = attr.value.toLowerCase();
          if (['left', 'right', 'center', 'justify'].includes(align)) {
            const current = el.getAttribute('style') ?? '';
            if (!/text-align\s*:/i.test(current)) {
              el.setAttribute('style', `${current}${current ? '; ' : ''}text-align: ${align}`);
            }
          }
          el.removeAttribute('align');
        }
      }

      if (tag === 'a') {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    }
  };

  walk(root);
  return root.innerHTML;
}

/** Conserva párrafos, justificación e interlineado; saca scripts y estilos de Word innecesarios. */
export function sanitizeRichHtml(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) return '';
  const fragment = extractClipboardFragment(trimmed);
  const cleaned = stripDangerousServer(fragment);
  if (typeof window === 'undefined') return cleaned;
  return sanitizeWithDom(cleaned);
}

export function htmlToPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function htmlHasContent(html: string, minChars = 20): boolean {
  return htmlToPlainText(html).length >= minChars;
}
