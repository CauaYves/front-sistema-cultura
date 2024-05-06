import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { appLocalStore } from "@/hooks";
import "dayjs/locale/pt-br";
import Link from "next/link";
import { useSnackbar } from "@/context/snackbar-context";
import PersonIcon from "@mui/icons-material/Person";
import { PapersContainer, StyledPaper } from "./styles";
import CompanyData from "./components/companyData";
import FisicPersonData from "./components/fisicPersonData";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ModulesKey } from "@/app/home/page";
import ContactFormPF from "./components/contactFormPF";
import ContactFormPJ from "./components/contactFormPJ";
import FileInput, { WebFile } from "@/components/molecules/fileUpload";
import { handleSubmit } from "./handleActions";
import IdentificationForm from "./components/Identification";
import ProponentForm from "./components/proponentType";
import AddressForm from "./components/address";
import InterestAreaForm from "./components/interestArea";
import ButtonsContainerComp from "./components/buttonsContainer";

export type IdentificationModulesKey = "PF" | "PJ" | "MEI" | "PJSFL";

export interface IdentificationProps {
  router: AppRouterInstance;
  setSelectedModule: Dispatch<SetStateAction<ModulesKey>>;
}

export default function Indentification({
  router,
  setSelectedModule,
}: Readonly<IdentificationProps>) {
  const [file, setFile] = useState<WebFile[]>();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useSnackbar();
  const [proponent, setProponent] = useState<IdentificationModulesKey>("PF");
  const handleSubmitWrapper = async (event: FormEvent<HTMLFormElement>) => {
    await handleSubmit(event, file, proponent, setSnackbar, setLoading);
  };

  const sessionData = appLocalStore.getData("session");
  const handleChange = (event: SelectChangeEvent) => {
    setProponent(event.target.value as IdentificationModulesKey);
  };

  const proponentModule = {
    PF: <FisicPersonData />,
    PJ: <CompanyData />,
    PJSFL: <CompanyData />,
    MEI: <CompanyData />,
  };

  const contactModule = {
    PF: <ContactFormPF />,
    PJ: <ContactFormPJ />,
    PJSFL: <ContactFormPJ />,
    MEI: <ContactFormPJ />,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        component="form"
        onSubmit={handleSubmitWrapper}
        sx={{ padding: "10px", background: "#eeeeee" }}
      >
        <Box sx={{ display: "flex" }}>
          <PersonIcon color="info" />
          <Typography variant="h6" component="h2" sx={{ marginRight: "10px" }}>
            Alterar meu perfil
          </Typography>
        </Box>
        <PapersContainer>
          <IdentificationForm email={sessionData.session.user.email} />
          <ProponentForm handleChange={handleChange} proponent={proponent} />
          {proponentModule[proponent]}
          {contactModule[proponent]}
          <AddressForm />
          <InterestAreaForm />
          <StyledPaper>
            <FileInput file={file} setFile={setFile} />
          </StyledPaper>
        </PapersContainer>
        <ButtonsContainerComp
          loading={loading}
          setSelectedModule={setSelectedModule}
        />
        <Link href="/home/about">Política de privacidade</Link>
      </Box>
    </LocalizationProvider>
  );
}
