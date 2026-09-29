'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getBlPublication } from '@/actions/admin-publicaciones';
import { PublicationForm } from '../publication-form';
import { useUser } from '@/firebase/provider';
import type { CmsPublicationRecord } from '@/lib/bl-cms-types';

export default function EditarPublicacionPage() {
  const params = useParams<{ id: string }>();
  const { user } = useUser();
  const [row, setRow] = useState<CmsPublicationRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user || !params.id) return;
      const token = await user.getIdToken();
      const result = await getBlPublication(token, params.id);
      if (cancelled) return;
      if (!result.ok || !result.data) {
        setError(result.ok ? 'Nota no encontrada.' : result.error);
        return;
      }
      setRow(result.data);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [user, params.id]);

  if (error) return <p className="p-8 text-sm text-red-700">{error}</p>;
  if (!row) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }
  return <PublicationForm mode="edit" initial={row} />;
}
