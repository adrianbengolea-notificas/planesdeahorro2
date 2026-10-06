'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail } from 'lucide-react';
import { getBlMailingSetup, listBlMailingLists } from '@/actions/admin-mailing-lists';
import { buttonVariants } from '@/components/ui/button';
import { useUser } from '@/firebase/provider';
import type { MailingConfig, MailingListSummary } from '@/lib/bl-mailing-types';
import { cn } from '@/lib/utils';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
}

export function ListasMailClient() {
  const { user } = useUser();
  const [rows, setRows] = useState<MailingListSummary[]>([]);
  const [config, setConfig] = useState<MailingConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) return;
      setLoading(true);
      const token = await user.getIdToken();
      const [lists, setup] = await Promise.all([listBlMailingLists(token), getBlMailingSetup(token)]);
      if (cancelled) return;
      if (!lists.ok) {
        setError(lists.error);
        setRows([]);
      } else {
        setError(null);
        setRows(lists.data ?? []);
      }
      setConfig(setup.ok ? setup.data ?? null : null);
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
          <h1 className="font-headline text-3xl">Listas de mail</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Subí CSV con destinatarios (clientes, colegas, prensa). Después, desde cada nota publicada, elegís a qué
            lista enviarla por Resend.
          </p>
        </div>
        <Link href="/admin/listas-mail/nueva" className={cn(buttonVariants())}>
          Nueva lista
        </Link>
      </div>

      <div className="mt-8 border border-border bg-secondary/30 p-4 text-sm">
        <p className="flex items-center gap-2 font-medium">
          <Mail className="h-4 w-4" />
          Remitente
        </p>
        <p className="mt-2 text-muted-foreground">
          Los envíos salen como{' '}
          <span className="font-medium text-foreground">
            {config?.fromName ?? 'Bengolea & Lamas'} &lt;{config?.fromAddress ?? 'estudio@bengolealamas.com.ar'}&gt;
          </span>
          . Las respuestas van a {config?.replyTo ?? 'estudio@bengolealamas.com.ar'}.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Remitente institucional <span className="font-mono">estudio@bengolealamas.com.ar</span>. El DNS del dominio está
          en Wix; hay que cargar los registros DKIM/SPF que da Resend (subdominio <span className="font-mono">send</span>
          ) sin tocar el correo de Google del estudio.
        </p>
        {config && !config.resendConfigured ? (
          <p className="mt-3 text-sm text-red-700">Resend no está configurado todavía: falta la API key en este entorno.</p>
        ) : null}
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : error ? (
        <p className="mt-8 text-sm text-red-700">{error}</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Todavía no hay listas. Creá una y pegá o subí un CSV.</p>
      ) : (
        <ul className="mt-8 divide-y divide-border border border-border">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">
                  {row.contactCount} {row.contactCount === 1 ? 'correo' : 'correos'}
                  {row.description ? ` · ${row.description}` : ''} · actualizada {formatDate(row.updatedAt)}
                </p>
              </div>
              <Link href={`/admin/listas-mail/${row.id}`} className="text-sm font-medium text-accent hover:underline">
                Abrir
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
