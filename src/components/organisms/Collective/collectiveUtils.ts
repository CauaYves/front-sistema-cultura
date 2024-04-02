import collectiveService from "@/app/api/collective";
import { getCookie } from "@/hooks";

export const handleDeleteCollective = async (
  params: any,
  setSnackbar: any,
  handleError: any,
  setRefreshTable: any,
  setDelLoading: any
) => {
  const collectiveId = params.id as string;
  const token = await getCookie("token");
  setDelLoading(true);
  const promise = collectiveService.deleteOne(token, collectiveId);
  promise
    .then(() => {
      setSnackbar({
        message: "Coletivo cultural excluído com sucesso! ",
        open: true,
        severity: "success",
      });
      setRefreshTable((prev: boolean) => !prev);
    })
    .catch((err) => {
      console.log(err);
      setSnackbar({
        message: "Falha ao excluir Coletivo cultural . ",
        open: true,
        severity: "error",
      });
    })
    .finally(() => setDelLoading(false));
};
