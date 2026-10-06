'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { ClipboardList, FileText, LayoutDashboard, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase/provider';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/admin', label: 'Inicio', icon: LayoutDashboard },
  { href: '/admin/consultas', label: 'Consultas', icon: ClipboardList },
  { href: '/admin/publicaciones', label: 'Publicaciones', icon: FileText },
  { href: '/admin/listas-mail', label: 'Listas de mail', icon: Mail },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/admin';
  const auth = useAuth();
  const { user } = useUser();

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-background md:flex md:flex-col">
        <div className="border-b border-border px-5 py-5">
          <Link href="/admin">
            <Image
              src="/brand/logo.jpg"
              alt="Bengolea & Lamas"
              width={220}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Administración
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const active =
              item.href === '/admin' ? pathname === '/admin' : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 text-sm transition-colors',
                  active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <p className="mb-3 truncate text-xs text-muted-foreground" title={user?.email ?? undefined}>
            {user?.email}
          </p>
          <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => auth && signOut(auth)}>
            Cerrar sesión
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3 md:hidden">
          <Link href="/admin" className="text-sm font-medium">
            Admin B&L
          </Link>
          <div className="flex flex-wrap gap-3 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-accent">
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
