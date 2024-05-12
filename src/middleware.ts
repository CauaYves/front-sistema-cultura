"use client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appLocalStore } from "./hooks";

export async function middleware(request: NextRequest) {
  if (typeof window !== "undefined") {
    const localStorage = appLocalStore.get("session");

    const { session } = localStorage;

    const url = request.url;
    const signInURL = new URL("/", url).toString();
    const homeUrl = new URL("/home", url);
    const actualUrl = url.substring(url.lastIndexOf("/"), url.length);

    if (actualUrl === "/" && session) {
      return NextResponse.redirect(homeUrl);
    } else if (actualUrl === "/home" && !session) {
      return NextResponse.redirect(signInURL);
    } else {
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/home", "/"],
};
