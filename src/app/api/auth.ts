import { User } from "@/types";
import instance from "./api";

export type LoginCredentials = {
  email: string;
  password: string;
};

interface RecoverPasswordType extends LoginCredentials {
  code: string;
}

function login(body: LoginCredentials) {
  const promise: any = instance.post("/auth/sign-in", body);
  return promise;
}

function register(body: User) {
  const promise: any = instance.post("/auth/sign-up", body);
  return promise;
}

function confirmRegistration(code: string) {
  const promise: any = instance.post(`/auth/confirm-registration?code=${code}`);
  return promise;
}

function recoverPassword(email: string) {
  const promise = instance.post(`/auth/forgot-password`, { email });
  return promise;
}

function updatePassword(body: RecoverPasswordType) {
  const promise = instance.put("/auth/update-password", body);
  return promise;
}

function getUserData(token: string) {
  const promise = instance.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function update(token: string, body: User) {
  const promise: any = instance.put("/auth/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

const authService = {
  login,
  getUserData,
  register,
  confirmRegistration,
  recoverPassword,
  updatePassword,
  update,
};

export default authService;
