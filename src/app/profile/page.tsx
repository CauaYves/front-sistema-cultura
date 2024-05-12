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
import { useSnackbar } from "@/context/snackbar-context";
import CulturalAgentPJ from "./culturalAgentPJ";
import CulturalAgentPF from "./culturalAgentPF";
import { UserData } from "@/types";

export default function Profile() {
  const [session, setSession] = useState<any>();
  const router = useRouter();
  const { setSnackbar } = useSnackbar();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSession = appLocalStore.get("session");
      if (storedSession) {
        setSession(storedSession.session);
      }
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues = new FormData(event.currentTarget);
    const formData: any = {};
    for (const [key, value] of formValues.entries()) {
      formData[key] = value as string;
    }
    console.log(formData);
  };

  if (!session) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const { token, user } = session;
  const { id, email, name, cpf } = user;

  return (
    <ProfileContainer>
      <ProfileAppBar router={router} />
      <ProfileMainContent>
        <PessoalInformation name={name} email={email} />
        <EditableUserInformations
          name={name}
          email={email}
          cpf={cpf}
          handleSubmit={handleSubmit}
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
