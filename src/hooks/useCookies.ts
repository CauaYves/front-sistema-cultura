"use server";
import { cookies } from "next/headers";

export async function createCookie(key: string, value: string) {
  cookies().set(key, value);
}

export async function deleteCookie({ name }: { name: string }) {
  cookies().delete(name);
}

export async function getCookie({ name }: { name: string }) {
  const cookiesStored = cookies();
  return cookiesStored.get(name);
}
