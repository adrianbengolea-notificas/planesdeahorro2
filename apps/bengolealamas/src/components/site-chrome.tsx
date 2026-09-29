'use client';

import { usePathname } from 'next/navigation';
import { FloatingCaseIntake } from '@/components/floating-case-intake';
import { FloatingSocial } from '@/components/floating-social';
import { SiteHeader } from '@/components/site-header';
import { WixFooterStrip } from '@/components/wix-footer-strip';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  const showCaseIntakeFab = pathname !== '/contanos-tu-caso';

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <WixFooterStrip />
      <FloatingSocial />
      {showCaseIntakeFab ? <FloatingCaseIntake /> : null}
    </>
  );
}
