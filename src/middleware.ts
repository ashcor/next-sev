import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { hostname } = req.nextUrl;

  console.log('Request to', hostname);

  // Check the subdomain
  if (hostname.startsWith('a.')) {
    return NextResponse.redirect(new URL('/a', req.url));
  }

  if (hostname.startsWith('b.')) {
    return NextResponse.redirect(new URL('/b', req.url));
  }

  // Default behavior if no subdomain matches
  return NextResponse.next();
}

// Define the paths where middleware should apply
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
