'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createBlPublication,
  deleteBlPublication,
  updateBlPublication,
  uploadBlPublicationCover,
  type PublicationPayload,
} from '@/actions/admin-publicaciones';
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
  const [saving, setSaving] = useState<'draft' | 'status' | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);
  const tagPreview = parseTags(tagsCsv);
  const busy = saving !== null || deleting || uploadingCover;

  function onTitle(next: string) {
    setTitle(next);
    if (!slugTouched) setSlug(slugify(next));
  }

  async function saveNote(nextPublished: boolean, intent: 'draft' | 'status') {
    if (!user || busy) return;
    setSaving(intent);
    setError(null);
    if (!htmlHasContent(body)) {
      setError('El cuerpo de la nota es demasiado corto.');
      setSaving(null);
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
      published: mode === 'create' ? false : nextPublished,
      heroImage,
      seoTitle,
      seoDescription,
    };
    const result =
      mode === 'create'
        ? await createBlPublication(token, payload)
        : await updateBlPublication(token, initial!.id, payload);
    setSaving(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setPublished(mode === 'create' ? false : nextPublished);
    const id = mode === 'create' ? result.data?.id : initial?.id;
    router.push(id ? `/admin/publicaciones/${id}` : '/admin/publicaciones');
    router.refresh();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await saveNote(published, 'draft');
  }

  async function onCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !user) return;
    setUploadingCover(true);
    setCoverError(null);
    const token = await user.getIdToken();
    const fd = new FormData();
    fd.set('file', file);
    const result = await uploadBlPublicationCover(token, fd);
    setUploadingCover(false);
    if (!result.ok) {
      setCoverError(result.error);
      return;
    }
    setHeroImage(result.data?.url ?? '');
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
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-headline text-3xl">{mode === 'create' ? 'Nueva nota' : 'Editar nota'}</h1>
        <p className={`text-sm ${published ? 'text-accent' : 'text-muted-foreground'}`}>
          {mode === 'create' || !published ? 'Borrador — no visible en el sitio' : 'Publicada — visible en el sitio'}
        </p>
      </div>

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
      <div className="block text-sm">
        <span className="mb-1 block">Imagen de portada</span>
        {heroImage ? (
          <div className="mb-3 overflow-hidden border border-border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt="" className="max-h-56 w-full object-cover" />
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center border border-border px-3 py-2 text-sm hover:bg-secondary">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              disabled={busy}
              onChange={(e) => void onCoverFile(e)}
            />
            {uploadingCover ? 'Subiendo…' : 'Subir archivo'}
          </label>
          {heroImage ? (
            <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setHeroImage('')} disabled={busy}>
              Quitar
            </button>
          ) : null}
        </div>
        <input
          value={heroImage}
          onChange={(e) => setHeroImage(e.target.value)}
          placeholder="O pegá una URL / ruta /…"
          className="mt-3 w-full border border-border px-3 py-2"
        />
        {coverError ? <p className="mt-1 text-xs text-red-700">{coverError}</p> : null}
        <span className="mt-1 block text-xs text-muted-foreground">JPG, PNG o WebP, hasta 6 MB.</span>
      </div>
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
      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={busy}>
          {saving === 'draft' ? 'Guardando…' : mode === 'create' ? 'Guardar borrador' : 'Guardar cambios'}
        </Button>
        {mode === 'edit' ? (
          <Button type="button" variant="outline" disabled={busy} onClick={() => void saveNote(!published, 'status')}>
            {saving === 'status' ? 'Actualizando…' : published ? 'Pasar a borrador' : 'Publicar'}
          </Button>
        ) : null}
        {mode === 'edit' && published && slug ? (
          <a href={`/publicaciones/${slug}`} target="_blank" rel="noreferrer" className="border border-border px-4 py-2 text-sm">
            Ver en el sitio
          </a>
        ) : null}
        {mode === 'edit' ? (
          <Button type="button" variant="outline" onClick={() => void onDelete()} disabled={busy}>
            {deleting ? 'Eliminando…' : 'Eliminar'}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
