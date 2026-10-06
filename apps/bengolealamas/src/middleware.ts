import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CANONICAL_HOST } from '@/config/site';
import { resolveLegacyRedirect } from '@/lib/wix-redirects';

function requestHost(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-host');
  const raw = forwarded?.split(',')[0]?.trim() || request.headers.get('host') || '';
  return raw.split(':')[0].toLowerCase();
}

export function middleware(request: NextRequest) {
  const host = requestHost(request);
  const { pathname } = request.nextUrl;

  // 1) Host canónico: www → apex
  if (host === `www.${CANONICAL_HOST}`) {
    const url = request.nextUrl.clone();
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  // 2) Redirects legacy Wix (/single-post → /publicaciones)
  const legacy = resolveLegacyRedirect(pathname);
  if (legacy) {
    const url = request.nextUrl.clone();
    url.pathname = legacy.to.startsWith('/') ? legacy.to : `/${legacy.to}`;
    url.search = '';
    return NextResponse.redirect(url, legacy.status);
  }

  // 3) Continuar
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
