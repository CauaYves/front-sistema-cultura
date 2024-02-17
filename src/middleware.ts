import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookiesList = cookies();
  const hasToken = cookiesList.has("token");
  const signInURL = new URL("/", request.url);
  if (!hasToken) {
    return NextResponse.redirect(signInURL.href);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};
