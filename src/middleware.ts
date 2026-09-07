import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CANONICAL_HOST = 'adrianbengolea.com.ar';

function requestHost(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-host');
  const raw = forwarded?.split(',')[0]?.trim() || request.headers.get('host') || '';
  return raw.split(':')[0].toLowerCase();
}

export function middleware(request: NextRequest) {
  const host = requestHost(request);
  if (host !== `www.${CANONICAL_HOST}`) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.hostname = CANONICAL_HOST;
  url.protocol = 'https:';
  url.port = '';
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
