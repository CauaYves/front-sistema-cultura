"use client";
import React, { useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  CulturalAgentsWrapper,
  ProfileContainer,
  ProfileMainContent,
} from "./styles";
import { useSession, useLoading, useFormSubmit } from "./profileFunctions";
import EditableUserInformations from "./editableInforUserForm";
import PessoalInformation from "./PessoalInformation";
import ProfileAppBar from "./appBar";
import CulturalAgentPJ from "./culturalAgentPJ";
import CulturalAgentPF from "./culturalAgentPF";
import LoadingScreen from "@/components/atoms/loaders/screenLoading";

interface SnackBarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export default function Profile() {
  const router = useRouter();
  const session = useSession();
  const { loading, handleLoading, handleStopLoading } = useLoading();
  const [snackbar, setSnackbar] = useState<SnackBarProps>({
    open: false,
    message: "",
    severity: "warning",
  });

  const handleSubmit = useFormSubmit(session?.token, setSnackbar, {
    handleLoading,
    handleStopLoading,
  });
  if (!session) {
    return <LoadingScreen open={true} />;
  }

  const { token, user } = session;
  const { name, email, cpf } = user;

  const handleClose = () => {
    setSnackbar({
      message: snackbar.message,
      open: false,
      severity: snackbar.severity,
    });
  };

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
