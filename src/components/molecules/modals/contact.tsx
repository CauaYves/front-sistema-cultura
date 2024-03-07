import contactsService from "@/app/api/contacts";
import { useContacts } from "@/context/contacts-context";
import { useSnackbar } from "@/context/snackbar-context";
import { getCookie } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const flexibleBoxStyles = {
  display: "flex",
  alignItems: "end",
  justifiContent: "space-between",
};
interface EditModalProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  row: any;
}
export default function ContactModal({ close, row }: EditModalProps) {
  const [contact, setContact] = useState<string>("");
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
      id: row.id,
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
          <Box sx={{ ...flexibleBoxStyles, mb: "20px" }}>
            <TextField
              label="Contato"
              name="number"
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
          </Box>
          <Box sx={flexibleBoxStyles}>
            <FormControl fullWidth>
              <InputLabel id="contact-label">Tipo de contato</InputLabel>
              <Select
                id="contact-label"
                labelId="contact-label"
                label="Tipo de contato"
                name="type"
                required
                margin="dense"
                variant="standard"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
              >
                <MenuItem value="Whatsapp">Whatsapp</MenuItem>
                <MenuItem value="E-mail">E-mail</MenuItem>
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="Linkedin">Linkedin</MenuItem>
              </Select>
            </FormControl>
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
