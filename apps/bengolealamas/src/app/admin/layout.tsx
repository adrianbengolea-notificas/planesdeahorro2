import type { Metadata } from 'next';
import { AdminAuthGate } from './admin-auth-gate';
import { AdminShell } from './admin-shell';
import { FirebaseClientProvider } from '@/firebase/provider';

export const metadata: Metadata = {
  title: 'Administración — Bengolea & Lamas',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <AdminAuthGate>
        <AdminShell>{children}</AdminShell>
      </AdminAuthGate>
    </FirebaseClientProvider>
  );
}
