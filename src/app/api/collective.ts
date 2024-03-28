import instance from "./api";

function create(body: any, token: string) {
  const promise = instance.post("/collective", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function get(token: string) {
  const promise = instance.get("/collective", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

const collectiveService = { create, get };

export default collectiveService;
