"use client";
import { useRouter } from "next/navigation";
import { ProfileContainer, ProfileMainContent } from "./styles";
import { appLocalStore, getCookie } from "@/hooks";
import { FormEvent, useEffect, useState } from "react";
import EditableUserInformations from "./editableInforUserForm";
import PessoalInformation from "./PessoalInformation";
import ProfileAppBar from "./appBar";
import CulturalAgentInfos from "./CulturalAgentInfos";
import { useSnackbar } from "@/context/snackbar-context";

export default function Profile() {
  const router = useRouter();
  const { session } = appLocalStore.getData("session");
  const { id, email, name, cpf } = session.user;
  const [token, setToken] = useState("");
  const { setSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const cookieToken = await getCookie("token");
      setToken(cookieToken);
    };
    fetchData();
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

  return (
    <ProfileContainer>
      <ProfileAppBar router={router} />
      <ProfileMainContent>
        <PessoalInformation name={name} email={email} />
        <EditableUserInformations
          name={name}
          email={name}
          cpf={cpf}
          handleSubmit={handleSubmit}
        />
        <CulturalAgentInfos
          token={token}
          router={router}
          setSnackbar={setSnackbar}
        />
      </ProfileMainContent>
    </ProfileContainer>
  );
}
