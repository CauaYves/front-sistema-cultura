import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookiesList = cookies();
  const hasToken = cookiesList.has("token");
  const url = request.url;

  const signInURL = new URL("/", url).toString();
  const homeUrl = new URL("/home", url);

  const actualUrl = url.substring(url.lastIndexOf("/"), url.length);

  if (actualUrl === "/" && hasToken) {
    return NextResponse.redirect(homeUrl);
  } else if (actualUrl === "/home" && !hasToken) {
    return NextResponse.redirect(signInURL);
  } else {
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/"],
};
