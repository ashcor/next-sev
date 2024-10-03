import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

    console.log('Host', req.nextUrl.host);
    console.log('Hostname', req.nextUrl.hostname);
    console.log('Href', req.nextUrl.href);
    console.log('Origin', req.nextUrl.origin);
    console.log('Pathname', req.nextUrl.pathname);
    console.log('Search', req.nextUrl.search);
    console.log('BasePath', req.nextUrl.basePath);
    console.log('BuildId', req.nextUrl.buildId);

    return NextResponse.next();
}

// Define the paths where middleware should apply
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
