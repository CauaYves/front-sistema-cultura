"use client";
import * as React from "react";
import MaskedInput from "react-text-mask";
import { Copyright } from "@/components/atoms";
import {
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Snackbar,
  Alert,
  AlertColor,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { register } from "../api";
import { LoadingButton } from "@mui/lab";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import fundo_cultural from "/public/login_background.jpg";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [requestMessage, setRequestMessage] = React.useState("");
  const [severity, setSeverity] = useState<AlertColor>("warning");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleClose = () => {
    setOpen(false);
  };
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get("name") as string,
      cpf: data.get("cpf") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    setLoading(true);
    const promise = register(userData);
    promise
      .then((data: AxiosResponse) => {
        setSeverity("success");
        console.log(data);
        setRequestMessage("Cadastro realizado com sucesso!");
        setTimeout(() => {
          router.push("/confirmacao");
        }, 1500);
      })
      .catch((error: AxiosError | any) => {
        setSeverity("error");
        setRequestMessage(
          error.response.status === 400
            ? `${error.response?.data?.details}`
            : `${error.response.data}`
        );
      })
      .finally(() => {
        setLoading(false);
        setOpen(true);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        onClose={handleClose}
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity}>{requestMessage} </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{}}>
          <Image src={fundo_cultural} alt="fundo cultural" width={200}></Image>
        </Box>
        <Typography component="h1" variant="body2">
          seja bem vindo à
        </Typography>
        <Typography component="h1" variant="h6">
          Culturalize
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Nome"
            type="name"
            id="name"
            autoComplete="name"
            autoFocus
          />
          <MaskedInput
            mask={[
              /[1-9]/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
            id="cpf"
            render={(ref, props) => (
              <TextField
                {...props}
                inputRef={ref}
                margin="normal"
                required
                fullWidth
                name="cpf"
                label="Cpf"
                type="cpf"
                id="cpf"
                autoComplete="cpf"
              />
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            variant="contained"
            fullWidth
            loading={loading}
            type="submit"
            sx={{ mt: 2, mb: 2 }}
          >
            cadastrar
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
