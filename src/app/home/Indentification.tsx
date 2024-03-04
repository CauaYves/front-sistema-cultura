import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
  styled,
} from "@mui/material";
import MaskedInput from "react-text-mask";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { brazilStates, countries } from "./countrys";
import { mobalBreakpoint } from "@/constants";
import "dayjs/locale/pt-br";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createEnrollmentIdentification } from "../api";
import { getCookie } from "@/hooks";
import { AxiosResponse } from "axios";
import { filterErrors } from "@/utils/filterErrorMessages";
import { upload } from "../api/upload";
import CustomDivider from "@/components/atoms/divider";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledTextField = styled(TextField)`
  margin: 5px;
  width: 45%;

  @media (max-width: ${mobalBreakpoint}) {
    width: 100%;
  }
`;

const Division = styled(Divider)`
  margin: 10px;
  width: 90%;

  @media (max-width: ${mobalBreakpoint}) {
    width: 100%;
  }
`;

const MiddleTextField = styled(TextField)`
  margin: 5px 2.5px 2.5px 7.5px;
  width: 44.7%;

  @media (max-width: ${mobalBreakpoint}) {
    width: 100%;
  }
`;

const QuarterTextField = styled(TextField)`
  margin: 5px 3.5px;
  width: 22.25%;
  @media (max-width: ${mobalBreakpoint}) {
    width: 100%;
  }
`;

const StyledFormControlForSelect = styled(FormControl)`
  margin: 5px;
  width: 45%;
  @media (max-width: ${mobalBreakpoint}) {
    width: 100%;
  }
`;

const ResponsiveDatePicker = styled(DatePicker)`
  margin: 5px;
  width: 45%;
  @media (max-width: ${mobalBreakpoint}) {
    width: 100%;
  }
`;
interface SnackbarState {
  message: string;
  severity: "success" | "error" | "info" | "warning";
  open: boolean;
}

export default function Indentification() {
  const [nacionality, setNacionality] = useState<string>("Brasil");
  const [gender, setGender] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [fileName, setFileName] = useState<string[]>([]);
  const [file, setFile] = useState({});
  const [uf, setUf] = useState<string>("");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: "",
    severity: "warning",
    open: false,
  });
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileList = event.target.files;

    if (fileList) {
      setFile(fileList);

      const fileArray: string[] = [];
      for (const element of fileList) {
        fileArray.push(element.name);
      }
      setFileName(fileArray);
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    const promise = createEnrollmentIdentification(formData, token);

    promise
      .then((response: AxiosResponse) => {
        console.log(response);
        setSnackbar({
          open: true,
          severity: "success",
          message: "Cadastro realizado com sucesso!",
        });
        upload(file, response.data.signedUrl, archive[0].type);
      })
      .catch((error: any) => {
        let message = "";
        console.log(error);
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
      });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Snackbar
        onClose={handleClose}
        open={snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
      </Snackbar>
      <Container
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%" }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            display="block"
            gutterBottom
            component="h2"
          >
            Preencha o formulário a seguir para conseguirmos identificá-lo como
            um agente cultural
          </Typography>

          <Typography
            variant="caption"
            display="block"
            gutterBottom
            marginTop="10px"
          >
            Identificação
          </Typography>
          <CustomDivider color="#9c9c9c" width="91%" margin="10px 0px" />
          <StyledTextField
            type="email"
            name="email"
            required
            label="E-mail"
            autoComplete="email"
            placeholder="jhonDoe@gmail.com"
          />
          <StyledTextField
            type="name"
            name="codename"
            required
            label="Nome artístico"
            autoComplete="nickname"
            placeholder="Mágico Jhon"
          />
          <StyledTextField
            type="name"
            name="mothername"
            label="Nome da mãe"
            required
            autoComplete="family-name"
          />
          <ResponsiveDatePicker label="Data de nascimento" name="borndate" />
          <StyledFormControlForSelect>
            <InputLabel id="nacionality-label">Nacionalidade</InputLabel>
            <Select
              id="nacionality-label"
              labelId="nacionality-label"
              label="Nacionalidade"
              name="nacionality"
              required
              value={nacionality}
              onChange={(event) => setNacionality(event.target.value)}
            >
              {countries.map((country) => {
                return (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                );
              })}
            </Select>
          </StyledFormControlForSelect>
          <StyledTextField
            type="text"
            name="naturalness"
            label="Naturalidade"
            required
            placeholder="Rio de Janeiro, Petrópolis"
          />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            marginTop="10px"
          >
            Documentos
          </Typography>
          <CustomDivider color="#9c9c9c" width="91%" margin="10px 0px" />
          <MaskedInput
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            render={(ref, props) => (
              <QuarterTextField
                {...props}
                inputRef={ref}
                name="rg"
                label="RG"
                required
              />
            )}
          />
          <QuarterTextField
            type="text"
            name="issuingbody"
            label="Órgão expedidor"
            required
          />
          <StyledFormControlForSelect>
            <InputLabel id="uf-label">UF órgão expedidor</InputLabel>
            <Select
              id="uf-label"
              labelId="uf-label"
              label="UF órgão expedidor"
              name="uf"
              value={uf}
              required
              onChange={(event) => setUf(event.target.value)}
            >
              {brazilStates.map((country) => {
                return (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                );
              })}
            </Select>
          </StyledFormControlForSelect>
          <StyledFormControlForSelect>
            <InputLabel id="gender-label">Gênero</InputLabel>
            <Select
              id="gender-label"
              labelId="gender-label"
              label="Gênero"
              name="gender"
              required
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="outro">Outro</MenuItem>
              <MenuItem value="none">Prefiro não responder</MenuItem>
            </Select>
          </StyledFormControlForSelect>
          <StyledFormControlForSelect>
            <InputLabel id="race-label">Raça</InputLabel>
            <Select
              id="race-label"
              labelId="race-label"
              label="race"
              name="race"
              required
              value={race}
              onChange={(event) => setRace(event.target.value)}
            >
              <MenuItem value="amarela">Amarela</MenuItem>
              <MenuItem value="indigena">Indígena</MenuItem>
              <MenuItem value="branca">Branca</MenuItem>
              <MenuItem value="parda">Parda</MenuItem>
              <MenuItem value="preta">Preta</MenuItem>
              <MenuItem value="none">Prefiro nao responder</MenuItem>
            </Select>
          </StyledFormControlForSelect>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            marginTop="10px"
          >
            Informações complementares
          </Typography>
          <CustomDivider color="#9c9c9c" width="91%" margin="10px 0px" />
          <FormControl required>
            <FormLabel id="studentLabel">É estudante?</FormLabel>
            <RadioGroup row aria-labelledby="studentLabel" name="student">
              <FormControlLabel value={true} control={<Radio />} label="Sim" />
              <FormControlLabel value={false} control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
          <StyledFormControlForSelect>
            <InputLabel id="education-label">Escolaridade</InputLabel>
            <Select
              id="education-label"
              labelId="education-label"
              label="Escolaridade"
              name="education"
              required
              value={education}
              onChange={(event) => setEducation(event.target.value)}
            >
              <MenuItem value="fundamental">Fundamental completo</MenuItem>
              <MenuItem value="nonFundamental">Fundamental incompleto</MenuItem>
              <MenuItem value="medium">Médio completo</MenuItem>
              <MenuItem value="nonMedium">Médio incompleto</MenuItem>
              <MenuItem value="nonSuperior">Superior incompleto</MenuItem>
              <MenuItem value="superior">Superior completo</MenuItem>
              <MenuItem value="none">Não alfabetizado</MenuItem>
            </Select>
          </StyledFormControlForSelect>
          <MiddleTextField
            type="text"
            name="extracurricularCourses"
            label="Cursos extracurriculares"
            placeholder="Exemplo: Udemy, gastronomia 40 horas"
          />
          <MiddleTextField
            type="text"
            name="superiorCourses"
            label="Cursos superiores"
            placeholder="Exemplo: UFRJ, Ciência da computação"
          />
          <FormControl required>
            <FormLabel id="deficiencyLabel">Possui deficiência?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="deficiencyLabel"
              name="deficiency"
              id="deficiencyLabel"
            >
              <FormControlLabel value={true} control={<Radio />} label="Sim" />
              <FormControlLabel value={false} control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            marginTop="10px"
          >
            Endereço
          </Typography>
          <CustomDivider color="#9c9c9c" width="91%" margin="10px 0px" />
          <MiddleTextField
            type="text"
            name="address"
            required
            label="Endereço"
            autoComplete="address-line1"
            placeholder="Nome da rua, Cidade, Estado"
            sx={{
              marginRight: "5px",
            }}
          />
          <QuarterTextField
            type="number"
            name="houseNumber"
            label="Número"
            required
            placeholder="Número da casa ou apartamento"
          />
          <QuarterTextField
            type="text"
            name="complement"
            label="Complemento"
            autoComplete="address-line2"
          />
          <MaskedInput
            mask={[/[1-8]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
            render={(ref, props) => (
              <MiddleTextField
                {...props}
                inputRef={ref}
                type="text"
                name="cep"
                required
                label="CEP"
                autoComplete="postal-code"
              />
            )}
          />
          <Box
            sx={{
              margin: "10px 5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
            }}
          >
            <Button
              component="label"
              role={undefined}
              sx={{
                marginRight: "10px",
              }}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Enviar Arquivo
              <VisuallyHiddenInput
                type="file"
                onChange={handleChange}
                accept="pdf image/* !mp4 !bat !txt"
              />
            </Button>
            <Typography component="p" variant="caption">
              Envie o comprovante de residência
            </Typography>
            {fileName.map((file) => {
              return <Typography key={file}>{file}</Typography>;
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            width: "91.5%",
          }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{
              marginRight: "10px",
            }}
          >
            Salvar
          </LoadingButton>
          <FormControlLabel
            name="public"
            control={<Checkbox />}
            label="Autorizar publicação de dados ao público"
          />

          <Typography variant="body2">
            Ao autorizar a publicação dos meus dados ao público, estou ciente
            que abro mão dos direitos a privacidade de informações confidenciais
            regidas pela{" "}
            <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm">
              lei geral de proteção de dados pessoais (LGPD)
            </a>
            ,após autorizar a publicidade dos seus dados, os dados não sensíveis
            ficarão visíveis a criadores de projetos culturais, tornando assim
            mais fácil a busca por realizadores desse projetos, dados como RG,
            CPF, endereço e data de nascimento{" "}
            <strong>nunca ficarão visíveis</strong>. Mesmo após autorizar a
            publicação dos dados ao público, poderá retirar o seu consentimento
            a qualquer momento na aba [aba] {">"} [opção].
          </Typography>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
