import api from "./api";

function confirmRegistration(code: string) {
  const promise: any = api.post(`/auth/confirm-registration?code=${code}`);
  return promise;
}

export { confirmRegistration };
