import { CulturalUser } from "@/types";
import api from "./api";

function createEnrollmentIdentification(formData: CulturalUser, token: string) {
  const promise: any = api.post(`/enrollment/identification`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

export { createEnrollmentIdentification };
