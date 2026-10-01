'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createBlPublication,
  deleteBlPublication,
  updateBlPublication,
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
  const savingNow = saving !== null;

  function onTitle(next: string) {
    setTitle(next);
    if (!slugTouched) setSlug(slugify(next));
  }

  async function saveNote(nextPublished: boolean) {
    if (savingNow || deleting) return;
    if (!user) {
      setError('Ingresá de nuevo para guardar.');
      return;
    }
    const intent = nextPublished ? 'status' : 'draft';
    setSaving(intent);
    setError(null);
    if (nextPublished && !htmlHasContent(body)) {
      setError('El cuerpo de la nota es demasiado corto para publicar.');
      setSaving(null);
      return;
    }
    if (!nextPublished && !htmlHasContent(body, 1)) {
      setError('Escribí al menos un párrafo en el cuerpo para guardar el borrador.');
      setSaving(null);
      return;
    }
    try {
      const token = await user.getIdToken();
      const payload: PublicationPayload = {
        title,
        slug: slug || slugify(title),
        excerpt: excerpt.trim() || title.trim(),
        tags: tagsCsv,
        body,
        author,
        publishDate: new Date(`${publishDate || toDateInput('')}T12:00:00-03:00`).toISOString(),
        published: nextPublished,
        heroImage,
        seoTitle,
        seoDescription,
      };
      const result =
        mode === 'create'
          ? await createBlPublication(token, payload)
          : await updateBlPublication(token, initial!.id, payload);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setPublished(nextPublished);
      const id = mode === 'create' ? result.data?.id : initial?.id;
      router.push(id ? `/admin/publicaciones/${id}` : '/admin/publicaciones');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar la nota.');
    } finally {
      setSaving(null);
    }
  }

  async function onCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !user) return;
    if (file.size > 6 * 1024 * 1024) {
      setCoverError('La imagen supera el máximo de 6 MB.');
      return;
    }
    setUploadingCover(true);
    setCoverError(null);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 25_000);
    try {
      const token = await user.getIdToken();
      const fd = new FormData();
      fd.set('file', file);
      const res = await fetch('/api/admin/publication-cover', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
        signal: controller.signal,
      });
      const payload = (await res.json().catch(() => null)) as { ok?: boolean; url?: string; error?: string } | null;
      if (!res.ok || !payload?.ok || !payload.url) {
        setCoverError(payload?.error || `No se pudo subir la imagen (${res.status}).`);
        return;
      }
      setHeroImage(payload.url);
    } catch (err) {
      setCoverError(
        err instanceof Error && err.name === 'AbortError'
          ? 'La subida tardó demasiado. Probá una imagen más liviana (JPG o WebP).'
          : err instanceof Error
            ? err.message
            : 'No se pudo subir la imagen.',
      );
    } finally {
      window.clearTimeout(timer);
      setUploadingCover(false);
    }
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void saveNote(false);
      }}
      className="mx-auto max-w-4xl space-y-5 p-6 md:p-10"
    >
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
          className="mt-1 w-full border border-border px-3 py-2 font-mono text-sm"
        />
        <span className="mt-1 block text-xs text-muted-foreground">/publicaciones/{slug || '…'}</span>
      </label>
      <label className="block text-sm">
        Extracto
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
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
              disabled={uploadingCover || savingNow}
              onChange={(e) => void onCoverFile(e)}
            />
            {uploadingCover ? 'Subiendo…' : 'Subir archivo'}
          </label>
          {heroImage ? (
            <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setHeroImage('')} disabled={uploadingCover}>
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

      <div className="sticky bottom-0 z-10 -mx-6 flex flex-wrap gap-3 border-t border-border bg-background px-6 py-4 md:-mx-10 md:px-10">
        {published ? (
          <Button type="button" disabled={savingNow || deleting} onClick={() => void saveNote(true)}>
            {saving === 'status' ? 'Guardando…' : 'Guardar cambios'}
          </Button>
        ) : (
          <Button type="button" disabled={savingNow || deleting} onClick={() => void saveNote(false)}>
            {saving === 'draft' ? 'Guardando…' : 'Guardar borrador'}
          </Button>
        )}
        {published ? (
          <Button type="button" variant="outline" disabled={savingNow || deleting} onClick={() => void saveNote(false)}>
            {saving === 'draft' ? 'Actualizando…' : 'Pasar a borrador'}
          </Button>
        ) : (
          <Button type="button" disabled={savingNow || deleting} onClick={() => void saveNote(true)}>
            {saving === 'status' ? 'Publicando…' : 'Publicar'}
          </Button>
        )}
        {published && slug ? (
          <a href={`/publicaciones/${slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center border border-border px-4 py-2 text-sm">
            Ver en el sitio
          </a>
        ) : null}
        {mode === 'edit' ? (
          <Button type="button" variant="outline" onClick={() => void onDelete()} disabled={savingNow || deleting}>
            {deleting ? 'Eliminando…' : 'Eliminar'}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
