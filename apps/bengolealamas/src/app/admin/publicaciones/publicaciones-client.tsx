'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { listBlPublications, setBlPublicationPublished } from '@/actions/admin-publicaciones';
import { Button, buttonVariants } from '@/components/ui/button';
import { useUser } from '@/firebase/provider';
import type { CmsPublicationRecord } from '@/lib/bl-cms-types';
import { formatTagsCsv } from '@/lib/publication-tags';
import { cn } from '@/lib/utils';

function formatDate(iso: string): string {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

export function PublicacionesClient() {
  const { user } = useUser();
  const [rows, setRows] = useState<CmsPublicationRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) return;
      setLoading(true);
      const token = await user.getIdToken();
      const result = await listBlPublications(token);
      if (cancelled) return;
      if (!result.ok) {
        setError(result.error);
        setRows([]);
      } else {
        setError(null);
        setRows(result.data ?? []);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const hay = [row.title, row.slug, row.author, formatTagsCsv(row.tags)].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [query, rows]);

  async function togglePublished(row: CmsPublicationRecord) {
    if (!user || togglingId) return;
    setTogglingId(row.id);
    setError(null);
    const token = await user.getIdToken();
    const result = await setBlPublicationPublished(token, row.id, !row.published);
    setTogglingId(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const nextId = result.data?.id ?? row.id;
    setRows((current) =>
      current.map((item) =>
        item.id === row.id || item.slug === row.slug
          ? { ...item, id: nextId, origin: 'cms', published: !row.published }
          : item,
      ),
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl">Publicaciones</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Todas las notas del sitio, incluidas las migradas de Wix. Al editarlas podés etiquetarlas, cambiar la
            portada y publicar o pasarlas a borrador.
          </p>
        </div>
        <Link href="/admin/publicaciones/nuevo" className={cn(buttonVariants())}>
          Nueva nota
        </Link>
      </div>

      <label className="mt-8 block text-sm">
        Buscar
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Título, etiqueta, autor o URL"
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : error ? (
        <p className="mt-8 text-sm text-red-700">{error}</p>
      ) : visible.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          {rows.length === 0 ? 'Todavía no hay notas.' : 'Ninguna nota coincide con la búsqueda.'}
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-border border border-border">
          {visible.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-muted-foreground">
                  {row.published ? 'Publicada' : 'Borrador'}
                  {row.origin === 'legacy' ? ' · migrada' : ''} · {formatDate(row.publishDate)} · /{row.slug}
                  {row.tags?.length ? ` · ${formatTagsCsv(row.tags)}` : ''}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={togglingId === row.id}
                  onClick={() => void togglePublished(row)}
                >
                  {togglingId === row.id ? 'Actualizando…' : row.published ? 'Pasar a borrador' : 'Publicar'}
                </Button>
                <Link href={`/admin/publicaciones/${encodeURIComponent(row.id)}`} className="text-sm font-medium text-accent hover:underline">
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
