import instance from "./api";

function create(body: any, token: string) {
  const promise = instance.post("/collective", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function update(body: any, token: string, collectiveId: number | string) {
  const promise = instance.put(`/collective/${collectiveId}`, body, {
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

function deleteOne(token: string, id: string) {
  const promise = instance.delete(`/collective/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

const collectiveService = { create, get, deleteOne, update };

export default collectiveService;
