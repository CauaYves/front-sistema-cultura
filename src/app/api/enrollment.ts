import { CulturalUser } from "@/types";
import instance from "./api";

function post(formData: CulturalUser, token: string) {
  const promise: any = instance.post(`/enrollment/identification`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function get(token: string) {
  const promise: any = instance.get(`/enrollment/identification`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

const enrollmentService = {
  post,
  get,
};

export default enrollmentService;
