'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { listBlCaseIntakes } from '@/actions/admin-consultas';
import { useUser } from '@/firebase/provider';
import { type BlCaseIntakeRow, formatBlIntakeStatus } from '@/lib/bl-intake-status';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
}

export function ConsultasClient() {
  const { user } = useUser();
  const [rows, setRows] = useState<BlCaseIntakeRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [archive, setArchive] = useState('active');
  const [read, setRead] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) return;
      setLoading(true);
      const token = await user.getIdToken();
      const result = await listBlCaseIntakes(token);
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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (archive === 'active' && row.archived) return false;
      if (archive === 'archived' && !row.archived) return false;
      if (status !== 'all' && row.status !== status) return false;
      if (read === 'unread' && row.read) return false;
      if (!q) return true;
      const blob = `${row.nombre} ${row.email} ${row.telefono} ${row.areaJuridicaProbable} ${row.localidad}`.toLowerCase();
      return blob.includes(q);
    });
  }, [rows, status, archive, read, search]);

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <h1 className="font-headline text-3xl">Consultas del asistente</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Casos recibidos por el chat de «Contanos tu caso». El mail sigue llegando; acá queda el historial.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar nombre, email, área…"
          className="border border-border bg-background px-3 py-2 text-sm outline-none ring-accent focus:ring-1 md:col-span-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="all">Todos los estados</option>
          <option value="pendiente de revisión">Pendiente</option>
          <option value="en análisis">En análisis</option>
          <option value="aceptado">Aceptado</option>
          <option value="rechazado">Rechazado</option>
          <option value="derivado">Derivado</option>
          <option value="cerrado">Cerrado</option>
        </select>
        <select
          value={archive}
          onChange={(e) => setArchive(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="active">Activas</option>
          <option value="archived">Archivadas</option>
          <option value="all">Todas</option>
        </select>
      </div>
      <div className="mt-3">
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={read === 'unread'} onChange={(e) => setRead(e.target.checked ? 'unread' : 'all')} />
          Solo sin leer
        </label>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : error ? (
        <p className="mt-8 text-sm text-red-700">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No hay consultas con esos filtros.</p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-3 font-medium">Fecha</th>
                <th className="px-3 py-3 font-medium">Consultante</th>
                <th className="px-3 py-3 font-medium">Área</th>
                <th className="px-3 py-3 font-medium">Estado</th>
                <th className="px-3 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((row) => (
                <tr key={row.id} className={row.read ? 'bg-background' : 'bg-accent/5'}>
                  <td className="px-3 py-3 align-top text-muted-foreground">{formatDate(row.createdAt)}</td>
                  <td className="px-3 py-3 align-top">
                    <div className="font-medium">{row.nombre || '—'}</div>
                    <div className="text-xs text-muted-foreground">{row.email}</div>
                    {row.posibleUrgencia ? (
                      <span className="mt-1 inline-block text-xs font-semibold text-red-700">Urgencia</span>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 align-top">{row.areaJuridicaProbable || '—'}</td>
                  <td className="px-3 py-3 align-top">{formatBlIntakeStatus(row.status)}</td>
                  <td className="px-3 py-3 align-top text-right">
                    <Link href={`/admin/consultas/${row.id}`} className="text-sm font-medium text-accent hover:underline">
                      Abrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
