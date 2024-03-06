import contactsService from "@/app/api/contacts";
import { useContacts } from "@/context/contacts-context";
import { useSnackbar } from "@/context/snackbar-context";
import { getCookie } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MaskedInput from "react-text-mask";

const flexibleBoxStyles = {
  display: "flex",
  alignItems: "end",
  justifiContent: "space-between",
};

export default function ContactModal({
  close,
}: {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const { contacts, setContacts } = useContacts();
  const { setSnackbar } = useSnackbar();

  const handleStartLoading = () => {
    setLoading(true);
  };
  const handleStopLoading = () => {
    setLoading(false);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStartLoading();
    const data = new FormData(event.currentTarget);
    const body = {
      type: data.get("type") as string,
      number: data.get("number") as string,
      public: data.get("public") === "true",
    };
    if (body.number.includes("_")) {
      handleStopLoading();
      setSnackbar({
        message: "campo incompleto! ",
        severity: "error",
        open: true,
      });
      return;
    }

    const token = await getCookie("token");
    const promise = contactsService.create(body, token);
    promise
      .then((res) => {
        const newContactsList = [...contacts, res.data];
        setContacts(newContactsList);
        setLoading(false);
        close(false);
        setSnackbar({
          message: "contato criado com sucesso! ",
          severity: "success",
          open: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setSnackbar({
          message:
            "erro ao criar contato, verifique os campos e tente novamente! ",
          severity: "error",
          open: true,
        });
      })
      .finally(() => handleStopLoading());
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "50px 50px 20px 50px",
        }}
      >
        <Typography component="h2" variant="h6">
          Criação de contato
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={flexibleBoxStyles}>
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
                  name="number"
                  required
                  label="Número"
                  autoComplete="tel"
                  placeholder="(99) 99999-9999"
                  variant="standard"
                  fullWidth
                  inputProps={{ minLength: 9 }}
                />
              )}
            />
          </Box>
          <Box sx={flexibleBoxStyles}>
            <TextField
              name="type"
              label="Tipo de contato"
              variant="standard"
              placeholder="empresarial, pessoal"
              fullWidth
              margin="normal"
              required
            />
          </Box>
          <Typography
            sx={{
              mt: "10px",
            }}
          >
            Visibilidade:
          </Typography>
          <RadioGroup
            row
            aria-labelledby="studentLabel"
            name="public"
            defaultValue={true}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="privado"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="público"
            />
          </RadioGroup>
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
    </Box>
  );
}
