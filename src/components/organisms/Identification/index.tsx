import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import MaskedInput from "react-text-mask";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { brazilStates, countries } from "./countrys";
import { mobalBreakpoint } from "@/constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import enrollmentService from "@/app/api/enrollment";
import { getCookie } from "@/hooks";
import { AxiosResponse } from "axios";
import { filterErrors } from "@/utils/filterErrorMessages";
import { cepMask, FormTitleSection } from "@/components/atoms";
import "dayjs/locale/pt-br";
import uploadService from "@/app/api/upload";
import Link from "next/link";
import { useSnackbar } from "@/context/snackbar-context";
import { CulturalizeApiError } from "@/protocols";

export default function Indentification() {
  const [nacionality, setNacionality] = useState<string>("Brasil");
  const [gender, setGender] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [fileName, setFileName] = useState<string[]>([]);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [uf, setUf] = useState<string>("");
  const { setSnackbar } = useSnackbar();

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
  const handleStartLoading = () => setLoading(true);

  const handleStopLoading = () => setLoading(false);

  const handleError = (error: CulturalizeApiError) => {
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
      <Container
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%" }}
      >
        <Box sx={{ height: "100%" }}>
          <Typography
            variant="subtitle1"
            display="block"
            gutterBottom
            component="h2"
          >
            Preencha o formulário a seguir para conseguirmos identificá-lo como
            um agente cultural
          </Typography>

          <FormTitleSection title="Identificação" />
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
            name="naturalness"
            label="Naturalidade"
            required
            placeholder="Rio de Janeiro, Petrópolis"
          />
          <FormTitleSection title="Documentos" />

          <QuarterTextField name="rg" type="number" label="RG" required />
          <QuarterTextField
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
          <FormTitleSection title="Informações complementares" />
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
          <FormTitleSection title="Endereço" />

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
            mask={cepMask}
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
            loading={loading}
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
        </Box>
        <Link href="/home/about">Política de privacidade</Link>
      </Container>
    </LocalizationProvider>
  );
}

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
