import { deleteCookie, getCookie } from "@/hooks";
import contactsService from "@/app/api/contacts";
import router from "next/router";

export const FetchContacts = async (
  setContacts: any,
  setSnackbar: any
) => {
  const token = await getCookie("token");
  const promise = contactsService.get(token);
  promise
    .then((res) => setContacts(res.data))
    .catch((error) => handleError(error, setSnackbar, deleteCookie, router));
};

export const handleDeleteContact = async (
  params: any,
  setSnackbar: any,
  handleError: any,
  setRefreshTable: any,
  setDelLoading: any
) => {
  const contactId = params.id as string;
  const token = await getCookie("token");
  setDelLoading(true);
  const promise = contactsService.deleteOne(token, contactId);
  promise
    .then(() => {
      setSnackbar({
        message: "Contato excluído com sucesso! ",
        open: true,
        severity: "success",
      });
      setRefreshTable((prev: any) => !prev);
    })
    .catch(() => {
      setSnackbar({
        message: "Falha ao excluir contato. ",
        open: true,
        severity: "error",
      });
    })
    .finally(() => setDelLoading(false));
};

export const handleError = async (
  error: any,
  setSnackbar: any,
  deleteCookie: any,
  router: any
) => {
  if (error.response.status === 401) {
    setSnackbar({
      message: "Token de acesso expirado, faça login novamente! ",
      open: true,
      severity: "warning",
    });
    await deleteCookie("token");
    router.push("/");
  }
};
