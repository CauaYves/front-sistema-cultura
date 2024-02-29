import { User } from "@/types";
import api from "./api";

function register(body: User) {
  const promise: any = api.post("/auth/sign-up", body);
  return promise;
}
export { register };
