'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { listBlPublications } from '@/actions/admin-publicaciones';
import { buttonVariants } from '@/components/ui/button';
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

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl">Publicaciones</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Notas nuevas del CMS. Las migradas de Wix siguen en el sitio hasta que las reemplaces con el mismo slug.
          </p>
        </div>
        <Link href="/admin/publicaciones/nuevo" className={cn(buttonVariants())}>
          Nueva nota
        </Link>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : error ? (
        <p className="mt-8 text-sm text-red-700">{error}</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Todavía no hay notas en el CMS.</p>
      ) : (
        <ul className="mt-8 divide-y divide-border border border-border">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-muted-foreground">
                  {row.published ? 'Publicada' : 'Borrador'} · {formatDate(row.publishDate)} · /{row.slug}
                  {row.tags?.length ? ` · ${formatTagsCsv(row.tags)}` : ''}
                </p>
              </div>
              <Link href={`/admin/publicaciones/${row.id}`} className="text-sm font-medium text-accent hover:underline">
                Editar
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
