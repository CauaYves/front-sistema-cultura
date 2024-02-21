import {
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
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { brazilStates, countries } from "./countrys";
import { DatePicker } from "@mui/x-date-pickers";
import { mobalBreakpoint } from "@/constants";
import "dayjs/locale/pt-br";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

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
  margin: 5px 2.5px;
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

export default function Indentification() {
  const [nacionality, setNacionality] = useState<string>("Brasil");
  const [gender, setGender] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);
  const [uf, setUf] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileList = event.target.files;
    console.log(fileList);
    if (fileList) {
      const fileArray: string[] = [];
      for (let i = 0; i < fileList.length; i++) {
        fileArray.push(fileList[i].name);
      }
      setFiles(fileArray);
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("dados do formulário: ");
    const data = new FormData(event.currentTarget);
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(files);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
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

          <Typography variant="caption" display="block" gutterBottom>
            Identificação
          </Typography>
          <StyledTextField
            type="email"
            name="email"
            required
            label="E-mail"
            autoComplete="email"
          />
          <StyledTextField
            type="name"
            name="codename"
            required
            label="Nome artístico"
            autoComplete="nickname"
          />
          <StyledTextField
            type="name"
            name="mothername"
            label="Nome da mãe"
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
              onChange={(event) => setNacionality(event.target.value as string)}
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
          />
          <Division />
          <Typography variant="caption" display="block" gutterBottom>
            Documentos
          </Typography>
          <QuarterTextField type="text" name="rg" label="RG" required />
          <QuarterTextField
            type="text"
            name="issuingbody"
            label="Orgão expedidor"
            required
          />
          <StyledFormControlForSelect>
            <InputLabel id="uf-label">UF orgão expeditor</InputLabel>
            <Select
              id="uf-label"
              labelId="uf-label"
              label="UF orgão expeditor"
              name="uf"
              value={uf}
              required
              onChange={(event) => setUf(event.target.value as string)}
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
              onChange={(event) => setGender(event.target.value as string)}
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
              label="Raça"
              name="gender"
              required
              value={race}
              onChange={(event) => setRace(event.target.value as string)}
            >
              <MenuItem value="amarela">Amarela</MenuItem>
              <MenuItem value="indigena">Indígena</MenuItem>
              <MenuItem value="branca">Branca</MenuItem>
              <MenuItem value="parda">Parda</MenuItem>
              <MenuItem value="preta">Preta</MenuItem>
              <MenuItem value="none">Prefiro nao responder</MenuItem>
            </Select>
          </StyledFormControlForSelect>
          <Division />
          <Typography variant="caption" display="block" gutterBottom>
            Informações complementares
          </Typography>
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
              name="gender"
              required
              value={education}
              onChange={(event) => setEducation(event.target.value as string)}
            >
              <MenuItem value="fundamental">Fundamental completo</MenuItem>
              <MenuItem value="nonFundamental">Fundamental incompleto</MenuItem>
              <MenuItem value="medium">Médio completo</MenuItem>
              <MenuItem value="nonMedium">Médio incompleto</MenuItem>
              <MenuItem value="superior">Ensino Superior</MenuItem>
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
          <Division />
          <Typography variant="caption" display="block" gutterBottom>
            Endereço
          </Typography>
          <MiddleTextField
            type="text"
            name="address"
            required
            label="Endereço"
            autoComplete="address-line1"
          />
          <QuarterTextField
            type="number"
            name="houseNumber"
            label="Número"
            required
          />
          <QuarterTextField
            type="text"
            name="complement"
            label="Complemento"
            autoComplete="address-line2"
          />
          <MiddleTextField
            type="text"
            name="cep"
            required
            label="CEP"
            autoComplete="postal-code"
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
              Envie o comprovante de residência:{" "}
            </Typography>
            {files.map((file) => {
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
            control={<Checkbox />}
            label="Autorizar publicação de dados ao público"
          />
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
