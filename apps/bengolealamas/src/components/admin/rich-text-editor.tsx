'use client';

import { useEffect, useRef } from 'react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Underline,
} from 'lucide-react';
import { sanitizeRichHtml } from '@/lib/sanitize-rich-html';
import { cn } from '@/lib/utils';

type Props = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
};

function runCommand(command: string, value?: string) {
  document.execCommand('styleWithCSS', false, 'true');
  document.execCommand(command, false, value);
}

function applyLineHeight(value: string) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  let node: Node | null = sel.anchorNode;
  if (node?.nodeType === Node.TEXT_NODE) node = node.parentElement;
  const block = (node as HTMLElement | null)?.closest('p,div,h1,h2,h3,h4,li,blockquote') as HTMLElement | null;
  if (!block) {
    runCommand('formatBlock', 'p');
    applyLineHeight(value);
    return;
  }
  block.style.lineHeight = value;
}

export function RichTextEditor({ value, onChange, className }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  useEffect(() => {
    if (!editorRef.current || seeded.current) return;
    editorRef.current.innerHTML = value?.trim() ? value : '<p><br></p>';
    seeded.current = true;
  }, [value]);

  function emit() {
    const html = editorRef.current?.innerHTML ?? '';
    onChange(sanitizeRichHtml(html));
  }

  function command(name: string, value?: string) {
    runCommand(name, value);
    emit();
  }

  function onPaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    const incoming = html ? sanitizeRichHtml(html) : text.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');
    document.execCommand('insertHTML', false, incoming || '<p><br></p>');
    emit();
  }

  return (
    <div className={cn('border border-border bg-background', className)}>
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-secondary/40 p-2">
        <ToolbarButton label="Negrita" onClick={() => command('bold')}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Cursiva" onClick={() => command('italic')}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Subrayado" onClick={() => command('underline')}>
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton label="Título" onClick={() => command('formatBlock', '<h2>')}>
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Subtítulo" onClick={() => command('formatBlock', '<h3>')}>
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Lista" onClick={() => command('insertUnorderedList')}>
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Lista numerada" onClick={() => command('insertOrderedList')}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton label="Alinear izquierda" onClick={() => command('justifyLeft')}>
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Centrar" onClick={() => command('justifyCenter')}>
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Alinear derecha" onClick={() => command('justifyRight')}>
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Justificar" onClick={() => command('justifyFull')}>
          <AlignJustify className="h-4 w-4" />
        </ToolbarButton>
        <label className="ml-1 flex items-center gap-1 text-xs text-muted-foreground">
          Interlineado
          <select
            className="border border-border bg-background px-1.5 py-1 text-xs text-foreground"
            defaultValue="1.6"
            onChange={(e) => {
              applyLineHeight(e.target.value);
              emit();
            }}
          >
            <option value="1.15">Compacto</option>
            <option value="1.6">Normal</option>
            <option value="1.8">Holgado</option>
            <option value="2">Doble</option>
          </select>
        </label>
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        aria-label="Cuerpo de la nota"
        className="publication-prose min-h-[360px] px-4 py-3 text-base outline-none [&_a]:text-accent [&_h2]:mt-6 [&_h2]:font-headline [&_h2]:text-xl [&_h3]:mt-5 [&_h3]:font-headline [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
        onInput={emit}
        onBlur={emit}
        onPaste={onPaste}
      />
      <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
        Pegá desde Word o Google Docs: se conservan justificación, interlineado y párrafos.
      </p>
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center text-foreground hover:bg-background"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
