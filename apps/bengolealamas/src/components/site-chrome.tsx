'use client';

import { usePathname } from 'next/navigation';
import { FloatingSocial } from '@/components/floating-social';
import { SiteHeader } from '@/components/site-header';
import { WixFooterStrip } from '@/components/wix-footer-strip';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  const showContactDock = !pathname.startsWith('/contanos-tu-caso');

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <WixFooterStrip />
      {showContactDock ? <FloatingSocial /> : null}
    </>
  );
}
