'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBlMailingList } from '@/actions/admin-mailing-lists';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase/provider';

async function readFileText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  return new TextDecoder('utf-8').decode(buffer);
}

export default function NuevaListaMailPage() {
  const router = useRouter();
  const { user } = useUser();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [csvText, setCsvText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const text = await readFileText(file);
    setCsvText(text);
    setFileName(file.name);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || saving) return;
    setSaving(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const result = await createBlMailingList(token, { name, description, csvText });
      if (!result.ok || !result.data?.id) {
        setError(result.ok ? 'No se pudo crear la lista.' : result.error);
        return;
      }
      router.push(`/admin/listas-mail/${result.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la lista.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="mx-auto max-w-3xl space-y-5 p-6 md:p-10">
      <Link href="/admin/listas-mail" className="text-sm text-accent hover:underline">
        ← Volver
      </Link>
      <h1 className="font-headline text-3xl">Nueva lista</h1>
      <p className="text-sm text-muted-foreground">
        El CSV puede tener columnas <span className="font-mono">email</span> y <span className="font-mono">nombre</span>
        , o un correo por línea. Excel de Argentina (separado por punto y coma) también sirve.
      </p>
      <label className="block text-sm">
        Nombre de la lista
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Clientes — planes de ahorro"
          className="mt-1 w-full border border-border px-3 py-2"
          required
        />
      </label>
      <label className="block text-sm">
        Descripción (opcional)
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A quién apunta esta lista"
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>
      <div className="block text-sm">
        <span className="mb-1 block">CSV</span>
        <label className="inline-flex cursor-pointer items-center border border-border px-3 py-2 text-sm hover:bg-secondary">
          <input type="file" accept=".csv,.txt,text/csv,text/plain" className="sr-only" onChange={(e) => void onFile(e)} />
          Subir archivo
        </label>
        {fileName ? <span className="ml-3 text-xs text-muted-foreground">{fileName}</span> : null}
        <textarea
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
          rows={10}
          placeholder={'email,nombre\nana@correo.com,Ana Pérez\njuan@correo.com,Juan'}
          className="mt-3 w-full border border-border px-3 py-2 font-mono text-xs"
        />
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <Button type="submit" disabled={saving || !csvText.trim()}>
        {saving ? 'Guardando…' : 'Crear lista'}
      </Button>
    </form>
  );
}
