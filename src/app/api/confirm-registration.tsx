import api from "./api";

function confirmRegistration(code: string) {
  try {
    const promise: any = api.post(`/auth/confirm-registration?code=${code}`);
    return promise;
  } catch (error) {
    return;
  }
}

export { confirmRegistration };
