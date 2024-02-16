import { User } from "@/types";
import api from "./api";

function register(body: User) {
  try {
    const promise: any = api.post("/auth/sign-up", body);
    return promise;
  } catch (error) {
    return;
  }
}
export { register };
