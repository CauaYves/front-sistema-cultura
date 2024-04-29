import { WebFile } from "@/components/molecules/fileUpload";
import { getCookie } from "@/hooks";
import { CulturalizeApiError } from "@/protocols";
import { filterErrors } from "@/utils/filterErrorMessages";
import { FormEvent } from "react";
import { IdentificationModulesKey } from ".";

export const handleSubmit = async (
  event: FormEvent<HTMLFormElement>,
  file: WebFile | undefined,
  proponent: IdentificationModulesKey,
  setSnackbar: React.Dispatch<React.SetStateAction<any>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  handleStartLoading(setLoading)();
  const archive: any = file;
  if (!file) {
    return setSnackbar({
      message: "Anexe o comprovante de residência",
      open: true,
      severity: "warning",
    });
  }
  const data = new FormData(event.currentTarget);
  const formData: any = {};
  for (const [key, value] of data.entries()) {
    formData[key] = value as string;
  }
  formData.proponent = proponent;
  formData.public = formData.public === "on";
  formData.cultura = formData.cultura === "on";
  formData.upload = {
    name: file?.name,
    contentType: archive[0].type,
  };
  console.log(formData);
  if (formData.proponent !== "PF") {
    console.log("deu nulo");
  }
//   const token = await getCookie("token");
};

export const handleStartLoading =
  (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setLoading(true);
  };

export const handleStopLoading =
  (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setLoading(false);
  };

export const handleError =
  (setSnackbar: React.Dispatch<React.SetStateAction<any>>) =>
  (error: CulturalizeApiError) => {
    let message = "";
    if (error.response.status === 400) {
      message = filterErrors(error);
    } else {
      message = error.response.data.message;
    }
    return setSnackbar({
      open: true,
      severity: "error",
      message: message,
    });
  };
