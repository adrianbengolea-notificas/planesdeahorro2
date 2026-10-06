'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import {
  deleteBlMailingList,
  getBlMailingList,
  importBlMailingListCsv,
  updateBlMailingListMeta,
} from '@/actions/admin-mailing-lists';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase/provider';
import type { MailingListRecord } from '@/lib/bl-mailing-types';
import { mailingContactsToCsv } from '@/lib/parse-mailing-csv';

async function readFileText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  return new TextDecoder('utf-8').decode(buffer);
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
}

export default function ListaMailDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useUser();
  const [row, setRow] = useState<MailingListRecord | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [query, setQuery] = useState('');
  const [csvText, setCsvText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState<'replace' | 'merge' | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user || !params.id) return;
      const token = await user.getIdToken();
      const result = await getBlMailingList(token, params.id);
      if (cancelled) return;
      if (!result.ok || !result.data) {
        setError(result.ok ? 'Lista no encontrada.' : result.error);
        return;
      }
      setRow(result.data);
      setName(result.data.name);
      setDescription(result.data.description);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [user, params.id]);

  const visible = useMemo(() => {
    const contacts = row?.contacts ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) => `${c.email} ${c.name}`.toLowerCase().includes(q));
  }, [query, row]);

  async function saveMeta() {
    if (!user || !row || saving) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    const token = await user.getIdToken();
    const result = await updateBlMailingListMeta(token, row.id, { name, description });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setNotice('Datos de la lista guardados.');
    setRow((current) => (current ? { ...current, name, description } : current));
  }

  async function importCsv(mode: 'replace' | 'merge') {
    if (!user || !row || importing) return;
    if (!csvText.trim()) {
      setError('Pegá o subí un CSV.');
      return;
    }
    if (mode === 'replace' && !window.confirm('Esto reemplaza todos los correos actuales de la lista. ¿Continuar?')) {
      return;
    }
    setImporting(mode);
    setError(null);
    setNotice(null);
    const token = await user.getIdToken();
    const result = await importBlMailingListCsv(token, row.id, { csvText, mode });
    setImporting(null);
    if (!result.ok || !result.data) {
      setError(result.ok ? 'No se pudo importar.' : result.error);
      return;
    }
    const extra = [
      result.data.skipped ? `${result.data.skipped} filas sin mail` : '',
      result.data.duplicatesDropped ? `${result.data.duplicatesDropped} duplicados omitidos` : '',
      result.data.truncated ? 'se recortó al máximo permitido' : '',
    ]
      .filter(Boolean)
      .join(' · ');
    setNotice(`Lista actualizada: ${result.data.contactCount} correos${extra ? ` (${extra})` : ''}.`);
    const refreshed = await getBlMailingList(token, row.id);
    if (refreshed.ok && refreshed.data) setRow(refreshed.data);
    setCsvText('');
  }

  async function onDelete() {
    if (!user || !row || !window.confirm('¿Eliminar esta lista? No se puede deshacer.')) return;
    setDeleting(true);
    const token = await user.getIdToken();
    const result = await deleteBlMailingList(token, row.id);
    setDeleting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push('/admin/listas-mail');
  }

  function downloadCsv() {
    if (!row) return;
    const blob = new Blob([mailingContactsToCsv(row.contacts)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${row.name.replace(/\s+/g, '-').toLowerCase() || 'lista'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (error && !row) return <p className="p-8 text-sm text-red-700">{error}</p>;
  if (!row) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 md:p-10">
      <Link href="/admin/listas-mail" className="text-sm text-accent hover:underline">
        ← Volver
      </Link>
      <div>
        <h1 className="font-headline text-3xl">{row.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {row.contactCount} {row.contactCount === 1 ? 'correo' : 'correos'} · creada {formatDate(row.createdAt)}
          {row.createdByEmail ? ` por ${row.createdByEmail}` : ''}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border border-border px-3 py-2" />
        </label>
        <label className="block text-sm">
          Descripción
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
      </div>
      <Button type="button" variant="outline" disabled={saving} onClick={() => void saveMeta()}>
        {saving ? 'Guardando…' : 'Guardar datos'}
      </Button>

      <div className="border border-border p-4">
        <h2 className="font-headline text-xl">Actualizar CSV</h2>
        <p className="mt-1 text-sm text-muted-foreground">Podés agregar contactos o reemplazar la lista completa.</p>
        <label className="mt-3 inline-flex cursor-pointer items-center border border-border px-3 py-2 text-sm hover:bg-secondary">
          <input
            type="file"
            accept=".csv,.txt,text/csv,text/plain"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = '';
              if (file) void readFileText(file).then(setCsvText);
            }}
          />
          Subir archivo
        </label>
        <textarea
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
          rows={6}
          placeholder="Pegá acá el CSV"
          className="mt-3 w-full border border-border px-3 py-2 font-mono text-xs"
        />
        <div className="mt-3 flex flex-wrap gap-3">
          <Button type="button" disabled={!csvText.trim() || importing !== null} onClick={() => void importCsv('merge')}>
            {importing === 'merge' ? 'Agregando…' : 'Agregar a la lista'}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!csvText.trim() || importing !== null}
            onClick={() => void importCsv('replace')}
          >
            {importing === 'replace' ? 'Reemplazando…' : 'Reemplazar lista'}
          </Button>
        </div>
      </div>

      {notice ? <p className="text-sm text-accent">{notice}</p> : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-wrap items-end justify-between gap-3">
        <label className="block min-w-[240px] flex-1 text-sm">
          Buscar contactos
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="email o nombre"
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
        <Button type="button" variant="outline" size="sm" onClick={downloadCsv}>
          Descargar CSV
        </Button>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay contactos para mostrar.</p>
      ) : (
        <ul className="divide-y divide-border border border-border">
          {visible.slice(0, 400).map((contact) => (
            <li key={contact.email} className="flex flex-wrap justify-between gap-2 px-4 py-2 text-sm">
              <span className="font-mono text-xs md:text-sm">{contact.email}</span>
              <span className="text-muted-foreground">{contact.name || '—'}</span>
            </li>
          ))}
        </ul>
      )}
      {visible.length > 400 ? (
        <p className="text-xs text-muted-foreground">Mostrando 400 de {visible.length}. Usá la búsqueda o descargá el CSV.</p>
      ) : null}

      <Button type="button" variant="outline" disabled={deleting} onClick={() => void onDelete()}>
        {deleting ? 'Eliminando…' : 'Eliminar lista'}
      </Button>
    </div>
  );
}
