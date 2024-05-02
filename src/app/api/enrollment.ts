import { CulturalUser } from "@/types";
import instance from "./api";

function createPf(formData: CulturalUser, token: string) {
  const promise: any = instance.post(
    `/enrollment/identification-pf`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return promise;
}
function createPj(formData: CulturalUser, token: string) {
  const promise: any = instance.post(
    `/enrollment/identification-pj`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
  createPf,
  createPj,
  get,
};

export default enrollmentService;
