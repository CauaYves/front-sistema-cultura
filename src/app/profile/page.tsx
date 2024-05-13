"use client";
import { useRouter } from "next/navigation";
import {
  CulturalAgentsWrapper,
  ProfileContainer,
  ProfileMainContent,
} from "./styles";
import { appLocalStore } from "@/hooks";
import { FormEvent, useEffect, useState } from "react";
import EditableUserInformations from "./editableInforUserForm";
import PessoalInformation from "./PessoalInformation";
import ProfileAppBar from "./appBar";
import { SnackbarState } from "@/context/snackbar-context";
import CulturalAgentPJ from "./culturalAgentPJ";
import CulturalAgentPF from "./culturalAgentPF";
import LoadingScreen from "@/components/atoms/loaders/screenLoading";
import authService from "../api/auth";
import { ApiResponse, CulturalizeApiError } from "@/protocols";
import { Snackbar, Alert } from "@mui/material";

export default function Profile() {
  const router = useRouter();
  const [session, setSession] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "warning",
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSession = appLocalStore.get("session");
      if (storedSession) {
        setSession(storedSession.session);
      }
    }
  }, []);

  if (!session) {
    return <LoadingScreen open={true} />;
  }
  const { token, user } = session;
  const { id, email, name, cpf } = user;

  const handleOpenSnack = (message: string, severity: "error" | "success") => {
    setSnackbar({
      message,
      open: true,
      severity,
    });
  };
  const handleLoading = () => setLoading(true);
  const handleStopLoading = () => setLoading(false);
  const handleClose = () => {
    setSnackbar({
      message: snackbar.message,
      open: false,
      severity: snackbar.severity,
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLoading();
    const formValues = new FormData(event.currentTarget);
    const formData: any = {};
    for (const [key, value] of formValues.entries()) {
      formData[key] = value as string;
    }
    console.log(formData);
    const promise = authService.update(token, formData);
    promise
      .then((res: ApiResponse<string>) => {
        handleOpenSnack("Cadastro alterado com sucesso", "success");
      })
      .catch((error: CulturalizeApiError) => {
        handleOpenSnack("Senha incorreta", "error");
      })
      .finally(() => handleStopLoading());
  };
  console.log(snackbar);

  return (
    <ProfileContainer>
      <Snackbar
        onClose={handleClose}
        open={snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
      </Snackbar>
      <ProfileAppBar router={router} />
      <ProfileMainContent>
        <PessoalInformation name={name} email={email} />
        <EditableUserInformations
          name={name}
          email={email}
          cpf={cpf}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <CulturalAgentsWrapper>
          <CulturalAgentPF
            token={token}
            router={router}
            setSnackbar={setSnackbar}
          />
          <CulturalAgentPJ
            token={token}
            router={router}
            setSnackbar={setSnackbar}
          />
        </CulturalAgentsWrapper>
      </ProfileMainContent>
    </ProfileContainer>
  );
}
