import api from "./api";

export type LoginCredentials = {
  email: string;
  password: string;
};

function login(body: LoginCredentials) {
  const promise: any = api.post("/auth/sign-in", body);
  return promise;
}

export { login };
