'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { getBlCaseIntake, getBlIntakeAttachmentSignedUrl, updateBlCaseIntake } from '@/actions/admin-consultas';
import { Button } from '@/components/ui/button';
import { TEAM } from '@/config/professionals';
import { useUser } from '@/firebase/provider';
import { BL_INTAKE_STATUSES, type BlCaseIntakeRow, formatBlIntakeStatus } from '@/lib/bl-intake-status';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' });
}

function whatsappHref(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 8) return null;
  const withCountry = digits.startsWith('54') ? digits : `54${digits.replace(/^0/, '')}`;
  return `https://wa.me/${withCountry}`;
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{value}</dd>
    </div>
  );
}

export function ConsultaDetailClient({ id }: { id: string }) {
  const { user } = useUser();
  const [row, setRow] = useState<BlCaseIntakeRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) return;
      setLoading(true);
      const token = await user.getIdToken();
      const result = await getBlCaseIntake(token, id);
      if (cancelled) return;
      if (!result.ok || !result.data) {
        setError(result.ok ? 'Consulta no encontrada.' : result.error);
        setLoading(false);
        return;
      }
      setRow(result.data);
      setStatus(result.data.status);
      setAssignedTo(result.data.assignedTo);
      setInternalNotes(result.data.internalNotes);
      if (!result.data.read) {
        await updateBlCaseIntake(token, id, { read: true });
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [user, id]);

  async function save(extra?: { archived?: boolean }) {
    if (!user) return;
    setSaving(true);
    setMessage(null);
    const token = await user.getIdToken();
    const result = await updateBlCaseIntake(token, id, {
      status,
      assignedTo,
      internalNotes,
      ...extra,
    });
    setSaving(false);
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    setMessage('Guardado.');
    if (extra?.archived !== undefined && row) {
      setRow({ ...row, archived: extra.archived });
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !row) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-700">{error || 'No encontrada.'}</p>
        <Link href="/admin/consultas" className="mt-4 inline-block text-sm text-accent hover:underline">
          ← Volver
        </Link>
      </div>
    );
  }

  const wa = whatsappHref(row.telefono);

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <Link href="/admin/consultas" className="text-sm text-accent hover:underline">
        ← Volver a consultas
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl">{row.nombre || 'Consulta'}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate(row.createdAt)} · {formatBlIntakeStatus(row.status)}
            {row.posibleUrgencia ? ' · Urgencia marcada por el asistente' : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {row.email ? (
            <a
              href={`mailto:${encodeURIComponent(row.email)}?subject=${encodeURIComponent(`Consulta — ${row.nombre}`)}`}
              className="border border-border px-3 py-2 text-sm hover:bg-secondary"
            >
              Escribir email
            </a>
          ) : null}
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="border border-border px-3 py-2 text-sm hover:bg-secondary">
              WhatsApp
            </a>
          ) : null}
        </div>
      </div>

      {row.archivosAdjuntos.length ? (
        <section className="mt-8 border border-border p-6">
          <h2 className="font-headline text-xl">Archivos adjuntos</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {row.archivosAdjuntos.map((file) => (
              <li key={file.path}>
                <button
                  type="button"
                  className="text-accent hover:underline"
                  onClick={async () => {
                    if (!user) return;
                    const token = await user.getIdToken();
                    const result = await getBlIntakeAttachmentSignedUrl(token, file.path);
                    if (!result.ok || !result.data) {
                      setMessage(result.ok ? 'No se pudo abrir el archivo.' : result.error);
                      return;
                    }
                    window.open(result.data, '_blank', 'noopener,noreferrer');
                  }}
                >
                  {file.fileName}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-8 border border-border p-6">
        <h2 className="font-headline text-xl">Gestión interna</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            Estado
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full border border-border bg-background px-3 py-2"
            >
              {BL_INTAKE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {formatBlIntakeStatus(s)}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Asignado a
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="mt-1 w-full border border-border bg-background px-3 py-2"
            >
              <option value="">Sin asignar</option>
              {TEAM.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="mt-4 block text-sm">
          Notas internas
          <textarea
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            rows={4}
            className="mt-1 w-full border border-border bg-background px-3 py-2"
          />
        </label>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => void save()} disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar'}
          </Button>
          <Button type="button" variant="outline" onClick={() => void save({ archived: !row.archived })} disabled={saving}>
            {row.archived ? 'Desarchivar' : 'Archivar'}
          </Button>
          {message ? <span className="text-sm text-muted-foreground">{message}</span> : null}
        </div>
      </section>

      <dl className="mt-8 grid gap-6 border border-border p-6 md:grid-cols-2">
        <Field label="Email" value={row.email} />
        <Field label="Teléfono" value={row.telefono} />
        <Field label="Localidad" value={row.localidad} />
        <Field label="Provincia" value={row.provincia} />
        <Field label="Área jurídica probable" value={row.areaJuridicaProbable} />
        <Field label="Contraparte" value={row.contraparte} />
        <div className="md:col-span-2">
          <Field label="Resumen del caso" value={row.resumenCaso} />
        </div>
        <div className="md:col-span-2">
          <Field label="Cronología" value={row.cronologiaRelevante} />
        </div>
        <Field label="Documentación" value={row.documentacionDisponible} />
        <Field label="Reclamos realizados" value={row.reclamosRealizados} />
        <Field label="Notificaciones" value={row.notificacionesRecibidas} />
        <Field label="Plazos o urgencias" value={row.plazosOUrgencias} />
        <div className="md:col-span-2">
          <Field label="Pretensión" value={row.pretensionConsultante} />
        </div>
        <div className="md:col-span-2">
          <Field label="Observaciones de IA" value={row.observacionesIA} />
        </div>
        <div className="md:col-span-2">
          <Field label="Transcripción / resumen ampliado" value={row.transcripcionResumen} />
        </div>
        {row.detalleUrgencia ? (
          <div className="md:col-span-2">
            <Field label="Detalle de urgencia" value={row.detalleUrgencia} />
          </div>
        ) : null}
      </dl>
    </div>
  );
}
