'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  getBlMailingSetup,
  listBlMailingLists,
  listBlMailingSendsForPublication,
  shareBlPublicationToLists,
} from '@/actions/admin-mailing-lists';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase/provider';
import type { MailingConfig, MailingListSummary, MailingSendRecord } from '@/lib/bl-mailing-types';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
}

type Props = {
  publicationId: string;
  published: boolean;
};

export function ShareNoteEmail({ publicationId, published }: Props) {
  const { user } = useUser();
  const [lists, setLists] = useState<MailingListSummary[]>([]);
  const [sends, setSends] = useState<MailingSendRecord[]>([]);
  const [config, setConfig] = useState<MailingConfig | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) return;
      setLoading(true);
      const token = await user.getIdToken();
      const [listResult, sendResult, setup] = await Promise.all([
        listBlMailingLists(token),
        listBlMailingSendsForPublication(token, publicationId),
        getBlMailingSetup(token),
      ]);
      if (cancelled) return;
      setLists(listResult.ok ? listResult.data ?? [] : []);
      setSends(sendResult.ok ? sendResult.data ?? [] : []);
      setConfig(setup.ok ? setup.data ?? null : null);
      if (!listResult.ok) setError(listResult.error);
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [user, publicationId]);

  const recipientCount = useMemo(() => {
    const chosen = lists.filter((list) => selected.includes(list.id));
    return chosen.reduce((sum, list) => sum + list.contactCount, 0);
  }, [lists, selected]);

  function toggle(id: string) {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function send() {
    if (!user || sending) return;
    if (!published) {
      setError('Publicá la nota antes de enviarla, así el enlace funciona en el sitio.');
      return;
    }
    if (selected.length === 0) {
      setError('Elegí al menos una lista.');
      return;
    }
    const names = lists.filter((list) => selected.includes(list.id)).map((list) => list.name);
    if (
      !window.confirm(
        `Se va a enviar esta nota a las listas: ${names.join(', ')} (${recipientCount} correos, se unifican duplicados). ¿Enviar ahora?`,
      )
    ) {
      return;
    }
    setSending(true);
    setError(null);
    setNotice(null);
    try {
      const token = await user.getIdToken();
      const result = await shareBlPublicationToLists(token, { publicationId, listIds: selected });
      if (!result.ok || !result.data) {
        setError(result.ok ? 'No se pudo enviar.' : result.error);
        return;
      }
      const failed = result.data.failed ? ` · ${result.data.failed} fallaron` : '';
      setNotice(`Enviados ${result.data.sent} de ${result.data.recipientCount} desde ${result.data.fromEmail}${failed}.`);
      const sendResult = await listBlMailingSendsForPublication(token, publicationId);
      if (sendResult.ok) setSends(sendResult.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="compartir" className="border border-border p-5">
      <h2 className="font-headline text-2xl">Compartir por correo</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Se envía un mail por destinatario (no se ven entre sí) con el título, el extracto y el enlace a la nota.
        Remitente: {config?.fromName ?? 'Bengolea & Lamas'} &lt;
        {config?.fromAddress ?? 'estudio@bengolealamas.com.ar'}&gt;. Las respuestas van a{' '}
        {config?.replyTo ?? 'estudio@bengolealamas.com.ar'}.
      </p>
      {!published ? (
        <p className="mt-3 text-sm text-red-700">Publicá la nota para poder compartirla. El mail incluye el enlace público.</p>
      ) : null}
      {config && !config.resendConfigured ? (
        <p className="mt-3 text-sm text-red-700">Falta RESEND_API_KEY en este entorno. El envío no va a salir.</p>
      ) : null}

      {loading ? (
        <p className="mt-4 text-sm text-muted-foreground">Cargando listas…</p>
      ) : lists.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No hay listas todavía.{' '}
          <Link href="/admin/listas-mail/nueva" className="text-accent hover:underline">
            Crear una lista CSV
          </Link>
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {lists.map((list) => (
            <li key={list.id}>
              <label className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={selected.includes(list.id)}
                  onChange={() => toggle(list.id)}
                  disabled={!published || sending}
                />
                <span>
                  <span className="font-medium">{list.name}</span>
                  <span className="text-muted-foreground">
                    {' '}
                    · {list.contactCount} {list.contactCount === 1 ? 'correo' : 'correos'}
                    {list.description ? ` · ${list.description}` : ''}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button type="button" disabled={!published || sending || selected.length === 0} onClick={() => void send()}>
          {sending ? 'Enviando…' : `Enviar a ${recipientCount || '…'} contactos`}
        </Button>
        <Link href="/admin/listas-mail" className="text-sm text-accent hover:underline">
          Administrar listas
        </Link>
      </div>
      {notice ? <p className="mt-3 text-sm text-accent">{notice}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

      {sends.length > 0 ? (
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Envíos de esta nota</p>
          <ul className="mt-2 divide-y divide-border border border-border text-sm">
            {sends.map((sendRow) => (
              <li key={sendRow.id} className="px-3 py-2">
                {formatDate(sendRow.sentAt)} · {sendRow.sentCount}/{sendRow.recipientCount} ·{' '}
                {sendRow.listNames.join(', ') || 'listas'}
                {sendRow.failedCount ? ` · ${sendRow.failedCount} fallidos` : ''}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
