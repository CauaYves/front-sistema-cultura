import { Contact } from "@/types";
import instance from "./api";

function create(body: Contact, token: string) {
  const promise = instance.post("/contact", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function get(token: string) {
  const promise = instance.get("/contact", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function deleteOne(token: string, id: string) {
  const promise = instance.delete(`/contact/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

const contactsService = { create, get, deleteOne };

export default contactsService;
