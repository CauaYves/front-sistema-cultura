import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "@/context/snackbar-context";
import { getCookie, getUserData } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { inputProps, UserData } from "@/types";
import collectiveService from "@/app/api/collective";
import { useCollective } from "@/context/collective-context";
import { CulturalizeApiError } from "@/protocols";
import { filterErrors } from "@/utils/filterErrorMessages";

interface EditModalProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  row: any;
}
export default function CollectiveModal({ close }: Readonly<EditModalProps>) {
  const { collective, setCollective } = useCollective();
  const { setSnackbar } = useSnackbar();
  const [contact, setContact] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    id: "",
    cpf: "",
    email: "",
    emailConfirmed: "",
    name: "",
    token: "",
  });
  useEffect(() => {
    async function fetchData() {
      const userDataCookie = await getUserData();
      setUserData(userDataCookie);
    }
    fetchData();
  }, []);
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStartLoading();
    const data = new FormData(event.currentTarget);
    const formDataObject: { [key: string]: string } = {};

    for (const [key, value] of data.entries()) {
      if (typeof value === "string") {
        formDataObject[key] = value;
      }
    }

    const body = {
      ...formDataObject,
      userId: Number(userData.id),
      responsible: userData.name,
    };

    const token = await getCookie("token");
    const promise = collectiveService.create(body, token);
    promise
      .then((res) => {
        const newCollectiveList = [...collective, res.data];
        setCollective(newCollectiveList);
        setLoading(false);
        close(false);
        setSnackbar({
          message: "Coletivo Cultural criado com sucesso! ",
          severity: "success",
          open: true,
        });
      })
      .catch((error) => handleError(error))
      .finally(() => handleStopLoading());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        sx={{
          padding: "50px 50px 20px 50px",
        }}
      >
        <Typography component="h2" variant="h6">
          Criação de Coletivo Cultural
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="Nome" name="name" {...inputProps} />
          <FormControl {...inputProps}>
            <InputLabel id="area-label">Principal Área Cultural</InputLabel>
            <Select
              id="area-label"
              labelId="area-label"
              label="Principal Área Cultural"
              name="area"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            >
              <MenuItem value="arts">Artes Visuais</MenuItem>
              <MenuItem value="cinema">Audiovisual/Cinema</MenuItem>
              <MenuItem value="circus">Circo</MenuItem>
              <MenuItem value="etnics">
                Manifestações Populares, Tradicionais e Etnicas da Cultura
              </MenuItem>
              <MenuItem value="opera">Ópera</MenuItem>
              <MenuItem value="patrimony">Patrimonio Cultural</MenuItem>
              <MenuItem value="theater">Teatro</MenuItem>
            </Select>
          </FormControl>
          <FormControl {...inputProps}>
            <DatePicker label="Data de abertura" name="opening" disableFuture />
          </FormControl>
          <TextField label="Telefone" name="phone" {...inputProps} />
          <TextField label="E-mail" name="email" {...inputProps} />
          <TextField label="Endereço" name="address" {...inputProps} />
          <TextField label="Bairro" name="neighboorhood" {...inputProps} />
          <TextField
            label="Complemento"
            name="complement"
            {...inputProps}
            required={false}
          />
          <TextField label="CEP" name="cep" {...inputProps} />
          <TextField label="Município" name="county" {...inputProps} />

          <Box
            sx={{
              mt: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={() => close(false)}>cancelar</Button>
            <LoadingButton variant="contained" type="submit" loading={loading}>
              Criar
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
