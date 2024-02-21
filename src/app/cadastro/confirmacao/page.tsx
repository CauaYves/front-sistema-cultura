"use client";
import {
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Copyright } from "@/components/atoms";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { confirmRegistration } from "../../api";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface SnackbarState {
  message: string;
  severity: "success" | "error" | "info" | "warning"; // Tipando a chave severity
  open: boolean;
}

export default function Confirmacao() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: "",
    severity: "warning",
    open: false,
  });
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const code = data.get("code") as string;
    const promise = confirmRegistration(code);
    promise
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setSnackbar({
          message: res.data,
          open: true,
          severity: "success",
        });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setSnackbar({
          message: `${error.response?.data}`,
          open: true,
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        onClose={handleClose}
        open={snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Image
            src="/login_background.jpg"
            alt="fundo cultural"
            height={100}
            width={150}
            priority
          />
        </Box>
        <Typography component="h1" variant="h6">
          Culturalize
        </Typography>
        <Typography component="h1" variant="body2">
          Insira o código de confirmação enviado ao seu email
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="Código de verificação"
            name="code"
          />

          <LoadingButton
            variant="contained"
            fullWidth
            loading={loading}
            type="submit"
            sx={{ mt: 2, mb: 2 }}
          >
            Verificar
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                Já tem uma conta? entre agora
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
}
