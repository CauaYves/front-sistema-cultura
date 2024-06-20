import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('session');
    const tokenLength = +token?.value.length!;
    if (tokenLength < 3) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/profile'],
};
