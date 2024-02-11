import api from "./api";

export type LoginCredentials = {
  email: string;
  password: string;
};

async function login(body: LoginCredentials) {
  try {
    const promise = await api.post("/auth/sign-in", body);
    return promise.data;
  } catch (_error) {
    return;
  }
}

export { login };
