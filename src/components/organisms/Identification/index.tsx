import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { FormEvent, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import enrollmentService from "@/app/api/enrollment";
import { appLocalStore, deleteCookie, getCookie } from "@/hooks";
import { AxiosResponse } from "axios";
import { filterErrors } from "@/utils/filterErrorMessages";
import { cepMask, FormTitleSection, phoneMask } from "@/components/atoms";
import "dayjs/locale/pt-br";
import uploadService from "@/app/api/upload";
import Link from "next/link";
import { useSnackbar } from "@/context/snackbar-context";
import { CulturalizeApiError } from "@/protocols";
import PersonIcon from "@mui/icons-material/Person";
import {
  PapersContainer,
  StyledPaper,
  TextFieldWrapper,
  StyledTextField,
  ButtonsContainer,
  SelectFormControl,
} from "./styles";
import CompanyData from "./components/companyData";
import FisicPersonData from "./components/fisicPersonData";
import MaskedInput from "react-text-mask";
import { inputProps } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type IdentificationModulesKey = "PF" | "PJ" | "MEI" | "PJSFL";

interface IdentificationProps {
  router: AppRouterInstance;
}

export default function Indentification({
  router,
}: Readonly<IdentificationProps>) {
  const [fileName, setFileName] = useState<string[]>([]);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useSnackbar();
  const [session, setSession] = useState<any>(null);
  const [proponent, setProponent] = useState<IdentificationModulesKey>("PF");

  useEffect(() => {
    const sessionData = appLocalStore.getData("session");
    setSession(sessionData);
  }, []);
  const handleChange = (event: SelectChangeEvent) => {
    setProponent(event.target.value as IdentificationModulesKey);
  };

  if (!session) {
    return null;
  }
  const { email } = session.session.user;

  const handleStartLoading = () => setLoading(true);

  const handleStopLoading = () => setLoading(false);

  const handleError = (error: CulturalizeApiError) => {
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

  const proponentModule = {
    PF: <FisicPersonData />,
    PJ: <CompanyData />,
    PJSFL: <CompanyData />,
    MEI: <CompanyData />,
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStartLoading();
    const archive: any = file;
    if (Object.keys(archive).length === 0 && archive.constructor === Object) {
      return setSnackbar({
        severity: "warning",
        open: true,
        message: "Inclua o comprovante de residência em arquivo. ",
      });
    }
    const data = new FormData(event.currentTarget);
    const formData: any = {};

    for (const [key, value] of data.entries()) {
      formData[key] = value as string;
    }

    formData.student = Boolean(formData.student === true);
    formData.deficiency = Boolean(formData.deficiency);
    formData.public = formData.public === "on";
    formData.upload = {
      name: fileName[0],
      contentType: archive[0].type,
    };

    const token = await getCookie("token");
    const promise = enrollmentService.post(formData, token);

    promise
      .then((response: AxiosResponse) => {
        setSnackbar({
          open: true,
          severity: "success",
          message: "Cadastro realizado com sucesso!",
        });
        uploadService.upload(file, response.data.signedUrl, archive[0].type);
      })
      .catch((error: CulturalizeApiError) => handleError(error))
      .finally(() => handleStopLoading());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ padding: "10px", background: "#eeeeee" }}
      >
        <Box sx={{ display: "flex" }}>
          <PersonIcon color="info" />
          <Typography variant="h6" component="h2" sx={{ marginRight: "10px" }}>
            Alterar meu perfil
          </Typography>
        </Box>
        <PapersContainer>
          <StyledPaper>
            <FormTitleSection title="Identificação" />
            <TextFieldWrapper>
              <StyledTextField
                type="email"
                name="email"
                disabled
                defaultValue={email}
                label="Usuário"
                fullWidth
              />
            </TextFieldWrapper>
          </StyledPaper>
          <StyledPaper>
            <FormTitleSection title="Tipo de proponente" />

            <SelectFormControl required>
              <InputLabel id="type">Tipo</InputLabel>
              <Select
                labelId="type"
                value={proponent}
                label="Tipo"
                onChange={handleChange}
              >
                <MenuItem value={"PF"}>Pessoa física</MenuItem>
                <MenuItem value={"PJ"}>Pessoa jurídica</MenuItem>
                <MenuItem value={"PJSFL"}>
                  Pessoa jurídica sem fins lucrativos
                </MenuItem>
                <MenuItem value={"MEI"}>MEI</MenuItem>
              </Select>
            </SelectFormControl>
          </StyledPaper>
          {proponentModule[proponent]}

          <StyledPaper>
            <FormTitleSection title="Contato" />
            <TextFieldWrapper>
              <StyledTextField
                type="email"
                name="email"
                defaultValue={email}
                label="E-mail"
                fullWidth
              />
              <MaskedInput
                mask={phoneMask}
                render={(ref, props) => (
                  <StyledTextField
                    {...props}
                    inputRef={ref}
                    name="phone"
                    {...inputProps}
                    label="Telefone"
                    autoComplete="postal-code"
                  />
                )}
              />
            </TextFieldWrapper>
          </StyledPaper>

          <StyledPaper>
            <FormTitleSection title="Endereço" />
            <TextFieldWrapper>
              <MaskedInput
                mask={cepMask}
                render={(ref, props) => (
                  <StyledTextField
                    {...props}
                    inputRef={ref}
                    name="cep"
                    {...inputProps}
                    label="CEP"
                    autoComplete="postal-code"
                  />
                )}
              />
              <StyledTextField
                name="publicPlace"
                label="Logradouro"
                fullWidth
              />
            </TextFieldWrapper>
            <TextFieldWrapper>
              <StyledTextField name="houseNumber" label="Numero" fullWidth />
              <StyledTextField
                name="complement"
                label="Complemento"
                fullWidth
              />
            </TextFieldWrapper>
            <TextFieldWrapper>
              <StyledTextField name="neighboorhod" label="Bairro" fullWidth />
              <StyledTextField name="county" label="Município" fullWidth />
            </TextFieldWrapper>

            <StyledTextField name="uf" label="UF" fullWidth />
          </StyledPaper>
          <StyledPaper>
            <FormTitleSection title="Área de interesse" />
            <Typography variant="body1">Programas</Typography>
            <Typography variant="caption" display="block">
              É importante marcar uma ou mais áreas que deseja receber
              informações ou se inscrever em editais.
            </Typography>
            <FormControlLabel control={<Checkbox />} label="Cultura" />
          </StyledPaper>
        </PapersContainer>
        <ButtonsContainer>
          <Box
            sx={{
              width: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={async () => {
                await deleteCookie("token");
                appLocalStore.removeData("session");
                router.push("/home");
              }}
            >
              Fechar
            </Button>
            <Button variant="outlined">?</Button>

            <LoadingButton type="submit" variant="contained" loading={loading}>
              Salvar
            </LoadingButton>
          </Box>
          <FormControlLabel
            name="public"
            control={<Checkbox />}
            label="Autorizar publicação de dados ao público"
          />
        </ButtonsContainer>
        <Link href="/home/about">Política de privacidade</Link>
      </Box>
    </LocalizationProvider>
  );
}
