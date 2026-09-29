'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2, Lock, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useFirestore, useUser } from '@/firebase/provider';
import { firebaseConfig } from '@/firebase/config';

function AdminLoginCard() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    if (!auth) {
      setError('Todavía se está conectando el acceso. Probá de nuevo en unos segundos.');
      setSubmitting(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('Email o contraseña incorrectos.');
      } else if (code === 'auth/too-many-requests') {
        setError('Demasiados intentos. Probá más tarde.');
      } else {
        setError('No se pudo iniciar sesión.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/40 p-6">
      <div className="w-full max-w-md border border-border bg-background p-8">
        <div className="mb-6 flex items-center gap-2 text-primary">
          <Lock className="h-5 w-5" />
          <h1 className="font-headline text-2xl">Panel del estudio</h1>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Ingresá con la misma cuenta de administrador. Debe existir en{' '}
          <span className="font-mono text-xs">admin_users</span>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent focus:ring-1"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={submitting}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent focus:ring-1"
            />
          </div>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ingresando…
              </>
            ) : (
              'Ingresar'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

function NotAdminCard({
  userEmail,
  userUid,
  verifyError,
}: {
  userEmail: string | null;
  userUid: string;
  verifyError: string | null;
}) {
  const auth = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/40 p-6">
      <div className="w-full max-w-md border border-border bg-background p-8">
        <div className="mb-4 flex items-center gap-2 text-primary">
          <ShieldOff className="h-5 w-5" />
          <h1 className="font-headline text-2xl">Sin permisos</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Tu cuenta está autenticada, pero no figura en{' '}
          <span className="font-mono text-xs">admin_users</span> (proyecto{' '}
          <span className="font-mono text-[11px]">{firebaseConfig.projectId}</span>).
        </p>
        <p className="mt-4 rounded-sm bg-muted/60 p-3 text-xs text-muted-foreground">
          Email: {userEmail ?? '—'}
          <br />
          UID: <span className="break-all font-mono">{userUid}</span>
        </p>
        {verifyError ? (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {verifyError}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-2">
          <Button variant="outline" onClick={() => auth && signOut(auth)}>
            Cerrar sesión
          </Button>
          <Link href="/" className="text-center text-sm text-accent hover:underline">
            Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isAdminVerified, setIsAdminVerified] = useState<boolean | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsAdminVerified(null);
      setVerifyError(null);
      return;
    }

    let cancelled = false;
    setIsAdminVerified(null);
    setVerifyError(null);

    const run = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = (await res.json()) as { admin?: boolean; error?: string };
        if (cancelled) return;
        if (res.ok) {
          setIsAdminVerified(data.admin === true);
          return;
        }
        if (res.status === 503) {
          if (!firestore) {
            setVerifyError(data.error ?? 'No se pudo verificar el permiso en el servidor.');
            setIsAdminVerified(false);
            return;
          }
          const snap = await getDoc(doc(firestore, 'admin_users', user.uid));
          if (cancelled) return;
          setIsAdminVerified(snap.exists());
          if (!snap.exists()) setVerifyError(data.error ?? 'No se pudo verificar el permiso en el servidor.');
          return;
        }
        setIsAdminVerified(false);
      } catch (err) {
        console.error('Verificación admin B&L:', err);
        if (cancelled) return;
        try {
          if (!firestore) throw new Error('Firestore no disponible');
          const snap = await getDoc(doc(firestore, 'admin_users', user.uid));
          if (!cancelled) setIsAdminVerified(snap.exists());
        } catch {
          if (!cancelled) {
            setVerifyError('No se pudo verificar el permiso. Probá de nuevo.');
            setIsAdminVerified(false);
          }
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [user, firestore]);

  if (!user) return <AdminLoginCard />;

  if (isAdminVerified === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Verificando permisos" />
      </div>
    );
  }

  if (!isAdminVerified) {
    return <NotAdminCard userEmail={user.email} userUid={user.uid} verifyError={verifyError} />;
  }

  return <>{children}</>;
}
