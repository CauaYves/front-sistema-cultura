"use client";
import * as React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
  AlertColor,
} from "@mui/material";
import { Copyright } from "@/components/atoms";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createCookie } from "@/hooks";
import authService from "./api/auth";
import { inputProps } from "@/types";
import { CulturalizeApiError } from "@/protocols";
import { useUserData } from "@/context/user-context";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [requestMessage, setRequestMessage] = React.useState("");
  const [severity, setSeverity] = useState<AlertColor>("warning");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    setLoading(true);
    const promise = authService.login(userData);
    promise
      .then((response: AxiosResponse) => {
        setSeverity("success");
        createCookie("token", response.data.token);
        createCookie("userData", JSON.stringify(response.data));
        setRequestMessage("Login efetuado com sucesso!");
        setTimeout(() => router.push("/home"), 1500);
      })
      .catch(({ response }: CulturalizeApiError) => {
        const { status, data } = response;
        let errorMessage = "";

        if (status === 422) {
          errorMessage = `${data}`;
        } else if (status === 404) {
          errorMessage = "Usuário não encontrado";
        } else {
          errorMessage = `${data.details}`;
        }

        setSeverity("error");
        setRequestMessage(errorMessage);
      })

      .finally(() => {
        setLoading(false);
        setOpen(true);
      });
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <Typography component="h1" variant="body2">
          Seja bem vindo à
        </Typography>
        <Typography component="h1" variant="h6">
          Culturalize
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            {...inputProps}
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            {...inputProps}
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar de mim"
          />
          <LoadingButton
            variant="contained"
            fullWidth
            loading={loading}
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            entrar
          </LoadingButton>

          <Grid container>
            <Grid item xs>
              <Link href="/recover-password" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/cadastro" variant="body2">
                Não tem uma conta? Cadastre-se
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
