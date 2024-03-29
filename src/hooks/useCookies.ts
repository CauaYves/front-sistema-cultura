"use server";
import { cookies } from "next/headers";

export async function createCookie(key: string, value: string) {
  cookies().set(key, value);
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}

export async function getCookie(name: string) {
  const cookiesStored = cookies();
  const cookie = cookiesStored.get(name);
  return `${cookie?.value}`;
}
