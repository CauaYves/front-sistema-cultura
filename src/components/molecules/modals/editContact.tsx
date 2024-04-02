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

interface EditModalProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  row: any;
}

export default function EditContactModal({
  close,
  row,
}: Readonly<EditModalProps>) {
  const [contact, setContact] = useState<string>(row.type);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    number: row.number,
    type: row.type,
    public: row.public,
  });

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
    const promise = contactsService.editContat(token, body, row.id);

    promise
      .then((res) => {
        const index = contacts.findIndex((contact) => contact.id === row.id);
        const newContactsArr = [...contacts];
        newContactsArr.splice(index, 1);
        newContactsArr.push(res.data);

        setContacts(newContactsArr);
        setLoading(false);
        close(false);
        setSnackbar({
          message: "contato editado com sucesso! ",
          severity: "success",
          open: true,
        });
      })
      .catch(() => {
        setSnackbar({
          message:
            "erro ao editar contato, verifique os campos e tente novamente! ",
          severity: "error",
          open: true,
        });
      })
      .finally(() => handleStopLoading());
  };

  return (
    <Box
      sx={{
        padding: "50px 50px 20px 50px",
      }}
    >
      <Typography component="h2" variant="h6">
        Edição de contato
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box>
          <TextField
            label="Novo contato"
            name="number"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setForm({ ...form, number: e.target.value })}
            value={form.number}
          />
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="contact-label">Tipo de contato</InputLabel>
            <Select
              id="contact-label"
              labelId="contact-label"
              label="Tipo de contato"
              name="type"
              required
              margin="dense"
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
        <Box>
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
            defaultValue={row.public}
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
        </Box>
        <Box
          sx={{
            mt: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => close(false)}>Cancelar</Button>
          <LoadingButton variant="contained" type="submit" loading={loading}>
            Salvar
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}
