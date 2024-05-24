import { WebFile } from "@/components/molecules/fileUpload";
import { filterErrors } from "@/utils/filterErrorMessages";
import { FormEvent } from "react";
import { IdentificationModulesKey } from ".";
import enrollmentService from "@/app/api/enrollment";
import { SnackbarState } from "@/context/snackbar-context";
import uploadService, { uploadResponseData } from "@/app/api/upload";
import { appLocalStore } from "@/hooks";

export const handleSubmit = async (
  event: FormEvent<HTMLFormElement>,
  file: WebFile[] | undefined,
  proponent: IdentificationModulesKey,
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  event.preventDefault();
  handleStartLoading(setLoading)();

  if (!file) {
    return setSnackbar({
      message: "Anexe o comprovante de residência",
      open: true,
      severity: "warning",
    });
  }

  const formData = createFormData(event, file, proponent);
  const session = appLocalStore.get("session");
  const { token } = session;

  const createEnrollment =
    proponent !== "PF"
      ? enrollmentService.createPj
      : enrollmentService.createPf;

  try {
    const res = await createEnrollment(formData, token);
    uploadFileAndShowSnackbar(
      file,
      res.data.signedUrl,
      setSnackbar,
      setLoading,
    );
  } catch (error) {
    handleError(setSnackbar, error);
  } finally {
    handleStopLoading(setLoading)();
  }
};

const createFormData = (
  event: FormEvent<HTMLFormElement>,
  file: WebFile[],
  proponent: IdentificationModulesKey,
) => {
  const data = new FormData(event.currentTarget);
  const formData: any = {};
  for (const [key, value] of data.entries()) {
    formData[key] = value as string;
  }
  delete formData.cultura;
  formData.proponent = proponent;
  formData.public = formData.public === "on";
  formData.programs = [formData.cultura === "on " ? "cultura" : ""];
  formData.upload = {
    name: file[0].name,
    contentType: file[0].type,
  };
  return formData;
};

const uploadFileAndShowSnackbar = async (
  file: WebFile[],
  signedUrl: string,
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  uploadService.upload(file, signedUrl, file[0].type);
  setSnackbar({
    message: "cadastro criado com sucesso!",
    open: true,
    severity: "success",
  });
};

export const handleStartLoading =
  (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setLoading(true);
  };

export const handleStopLoading =
  (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setLoading(false);
  };

export const handleError = (
  setSnackbar: React.Dispatch<React.SetStateAction<any>>,
  error: any,
) => {
  let message = "";
  if (error.response.status === 400) {
    message = filterErrors(error);
  } else {
    message = error.response.data;
  }
  return setSnackbar({
    open: true,
    severity: "warning",
    message: message,
  });
};
