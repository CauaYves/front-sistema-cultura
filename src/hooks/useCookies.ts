"use server";
import { cookies } from "next/headers";

export const setServerCookie = async (
  key: string,
  value: any,
  options = {},
) => {
  const valueStringified = JSON.stringify(value);
  const cookieStore = cookies();
  cookieStore.set(key, valueStringified, {
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    ...options,
  });
};

export const getServerCookie = async (key: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(key);
  return cookie ? JSON.parse(cookie.value) : null;
};

// export const deleteServerCookie = async (key: string) => {
//   const cookieStore = cookies();
//   await cookieStore.delete(key, { path: '/' });
// };

export const cookieKeys = {
  session: "session",
};
