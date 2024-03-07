import { User } from "@/types";
import instance from "./api";

export type LoginCredentials = {
  email: string;
  password: string;
};

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

const authService = {
  login,
  register,
  confirmRegistration,
};

export default authService;
