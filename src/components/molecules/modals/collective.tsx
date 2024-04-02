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
import { Collective, inputProps, UserData } from "@/types";
import collectiveService from "@/app/api/collective";
import { useCollective } from "@/context/collective-context";
import { CulturalizeApiError } from "@/protocols";
import { filterErrors } from "@/utils/filterErrorMessages";
import MaskedInput from "react-text-mask";

interface EditModalProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
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

  const getFormData = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const body: Omit<Collective, "id"> = {
      name: data.get("name") as unknown as string,
      area: data.get("area") as unknown as string,
      opening: data.get("opening") as unknown as string,
      phone: data.get("phone") as unknown as string,
      email: data.get("email") as unknown as string,
      address: data.get("address") as unknown as string,
      neighboorhood: data.get("neighboorhood") as unknown as string,
      cep: data.get("cep") as unknown as string,
      complement: data.get("complement") as unknown as string,
      county: data.get("county") as unknown as string,
      responsible: userData.name,
      userId: userData.id as unknown as number,
    };

    return body;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStartLoading();

    const body = await getFormData(event);
    if (body.cep.includes("_") || body.phone.includes("_")) {
      handleStopLoading();
      return setSnackbar({
        message: "CEP ou Telefone incompletos! ",
        severity: "warning",
        open: true,
      });
    }
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
              <MenuItem value="Artes Visuais">Artes Visuais</MenuItem>
              <MenuItem value="Audiovisual/Cinema">Audiovisual/Cinema</MenuItem>
              <MenuItem value="Circo">Circo</MenuItem>
              <MenuItem value="Manifestações Populares">
                Manifestações Populares
              </MenuItem>
              <MenuItem value="Ópera">Ópera</MenuItem>
              <MenuItem value="Patrimonio Cultural">
                Patrimonio Cultural
              </MenuItem>
              <MenuItem value="Teatro">Teatro</MenuItem>
            </Select>
          </FormControl>
          <FormControl {...inputProps}>
            <DatePicker label="Data de abertura" name="opening" disableFuture />
          </FormControl>
          <MaskedInput
            mask={[
              "(",
              /\d/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            render={(ref, props) => (
              <TextField
                {...props}
                inputRef={ref}
                name="phone"
                {...inputProps}
                label="Telefone"
                autoComplete="postal-code"
              />
            )}
          />
          <TextField label="Telefone" name="phone" {...inputProps} />
          <TextField label="E-mail" name="email" {...inputProps} type="email" />
          <TextField label="Endereço" name="address" {...inputProps} />
          <TextField label="Bairro" name="neighboorhood" {...inputProps} />
          <TextField
            label="Complemento"
            name="complement"
            {...inputProps}
            required={false}
          />
          <MaskedInput
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
            render={(ref, props) => (
              <TextField
                {...props}
                inputRef={ref}
                name="cep"
                {...inputProps}
                label="CEP"
                autoComplete="postal-code"
              />
            )}
          />
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
