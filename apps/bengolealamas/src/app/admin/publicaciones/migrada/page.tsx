'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { adoptLegacyPublication } from '@/actions/admin-publicaciones';
import { useUser } from '@/firebase/provider';

function AdoptarNotaMigradaInner() {
  const router = useRouter();
  const search = useSearchParams();
  const slug = search.get('slug')?.trim() ?? '';
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) return;
      if (!slug) {
        setError('Falta la nota a editar.');
        return;
      }
      const token = await user.getIdToken();
      const result = await adoptLegacyPublication(token, slug);
      if (cancelled) return;
      if (!result.ok || !result.data?.id) {
        setError(result.ok ? 'Nota no encontrada.' : result.error);
        return;
      }
      router.replace(`/admin/publicaciones/${result.data.id}`);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [user, slug, router]);

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-700">{error}</p>
        <Link href="/admin/publicaciones" className="mt-4 inline-block text-sm text-accent hover:underline">
          ← Volver a publicaciones
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <Loader2 className="h-7 w-7 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Abriendo la nota para editarla…</p>
    </div>
  );
}

export default function AdoptarNotaMigradaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      }
    >
      <AdoptarNotaMigradaInner />
    </Suspense>
  );
}
