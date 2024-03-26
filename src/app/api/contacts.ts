import { Contact } from "@/types";
import instance from "./api";

function create(body: Omit<Contact, "id">, token: string) {
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

function editContat(token: string, body: Contact, contactId: string) {
  const promise = instance.put(`/contact/${contactId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

const contactsService = { create, get, deleteOne, editContat };

export default contactsService;
