'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBlPublication, deleteBlPublication, updateBlPublication, type PublicationPayload } from '@/actions/admin-publicaciones';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/admin/rich-text-editor';
import { TEAM } from '@/config/professionals';
import { useUser } from '@/firebase/provider';
import type { CmsPublicationRecord } from '@/lib/bl-cms-types';
import { formatTagsCsv, parseTags } from '@/lib/publication-tags';
import { htmlHasContent } from '@/lib/sanitize-rich-html';
import { slugify } from '@/lib/slugify';

const AUTHORS = ['Estudio Bengolea & Lamas', ...TEAM.map((p) => p.name)];

type Props = {
  mode: 'create' | 'edit';
  initial?: CmsPublicationRecord;
};

function toDateInput(iso: string): string {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return iso.slice(0, 10);
}

export function PublicationForm({ mode, initial }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [tagsCsv, setTagsCsv] = useState(formatTagsCsv(initial?.tags));
  const [body, setBody] = useState(initial?.body ?? '');
  const [author, setAuthor] = useState(initial?.author || AUTHORS[0]);
  const [publishDate, setPublishDate] = useState(toDateInput(initial?.publishDate ?? ''));
  const [published, setPublished] = useState(initial?.published ?? false);
  const [heroImage, setHeroImage] = useState(initial?.heroImage ?? '');
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? '');
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? '');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const tagPreview = parseTags(tagsCsv);

  function onTitle(next: string) {
    setTitle(next);
    if (!slugTouched) setSlug(slugify(next));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    if (!htmlHasContent(body)) {
      setError('El cuerpo de la nota es demasiado corto.');
      setSaving(false);
      return;
    }
    const token = await user.getIdToken();
    const payload: PublicationPayload = {
      title,
      slug,
      excerpt,
      tags: tagsCsv,
      body,
      author,
      publishDate: new Date(`${publishDate}T12:00:00-03:00`).toISOString(),
      published,
      heroImage,
      seoTitle,
      seoDescription,
    };
    const result =
      mode === 'create'
        ? await createBlPublication(token, payload)
        : await updateBlPublication(token, initial!.id, payload);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const id = mode === 'create' ? result.data?.id : initial?.id;
    router.push(id ? `/admin/publicaciones/${id}` : '/admin/publicaciones');
    router.refresh();
  }

  async function onDelete() {
    if (!user || !initial || !window.confirm('¿Eliminar esta nota? No se puede deshacer.')) return;
    setDeleting(true);
    const token = await user.getIdToken();
    const result = await deleteBlPublication(token, initial.id);
    setDeleting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push('/admin/publicaciones');
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-5 p-6 md:p-10">
      <Link href="/admin/publicaciones" className="text-sm text-accent hover:underline">
        ← Volver
      </Link>
      <h1 className="font-headline text-3xl">{mode === 'create' ? 'Nueva nota' : 'Editar nota'}</h1>

      <label className="block text-sm">
        Título
        <input
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          required
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Slug (URL)
        <input
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          required
          className="mt-1 w-full border border-border px-3 py-2 font-mono text-sm"
        />
        <span className="mt-1 block text-xs text-muted-foreground">/publicaciones/{slug || '…'}</span>
      </label>
      <label className="block text-sm">
        Extracto
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          rows={3}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Etiquetas
        <input
          value={tagsCsv}
          onChange={(e) => setTagsCsv(e.target.value)}
          placeholder="planes de ahorro, consumidor, bancos"
          className="mt-1 w-full border border-border px-3 py-2"
        />
        <span className="mt-1 block text-xs text-muted-foreground">
          Palabras o frases separadas por coma. Podés pegar una lista completa.
        </span>
        {tagPreview.length ? (
          <span className="mt-2 flex flex-wrap gap-1.5">
            {tagPreview.map((tag) => (
              <span key={tag.toLowerCase()} className="border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                {tag}
              </span>
            ))}
          </span>
        ) : null}
      </label>
      <div className="block text-sm">
        <span className="mb-1 block">Cuerpo</span>
        <RichTextEditor value={body} onChange={setBody} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          Autor
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 w-full border border-border bg-background px-3 py-2"
          >
            {AUTHORS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Fecha de publicación
          <input
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            required
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        Imagen de portada (URL o ruta /…)
        <input
          value={heroImage}
          onChange={(e) => setHeroImage(e.target.value)}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Título SEO (opcional)
        <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Descripción SEO (opcional)
        <textarea
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
          rows={2}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Publicada (visible en el sitio)
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Guardando…' : mode === 'create' ? 'Crear nota' : 'Guardar cambios'}
        </Button>
        {mode === 'edit' && published && slug ? (
          <a href={`/publicaciones/${slug}`} target="_blank" rel="noreferrer" className="border border-border px-4 py-2 text-sm">
            Ver en el sitio
          </a>
        ) : null}
        {mode === 'edit' ? (
          <Button type="button" variant="outline" onClick={() => void onDelete()} disabled={deleting}>
            {deleting ? 'Eliminando…' : 'Eliminar'}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
