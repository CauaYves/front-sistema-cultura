import api from "./api";

export type LoginCredentials = {
  email: string;
  password: string;
};

function login(body: LoginCredentials) {
  try {
    const promise: any = api.post("/auth/sign-in", body);
    return promise;
  } catch (error) {
    return;
  }
}

export { login };
