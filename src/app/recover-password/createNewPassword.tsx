import { inputProps } from "@/types";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  TextField,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  AlertColor,
} from "@mui/material";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import authService from "../api/auth";
import { CulturalizeApiError } from "@/protocols";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface CreateNewPasswordProps {
  email: string;
  secondHandleSubmit: FormEventHandler<HTMLFormElement>;
  loading: boolean;
  router: AppRouterInstance;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRequestMessage: Dispatch<SetStateAction<string>>;
  setSeverity: Dispatch<SetStateAction<AlertColor>>;
}
export default function CreateNewPassword({
  email,
  secondHandleSubmit,
  loading,
  router,
  setOpen,
  setRequestMessage,
  setSeverity,
}: Readonly<CreateNewPasswordProps>) {
  const [inputError, setInputError] = useState<boolean | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const checkIfPasswordAreEqual = (password1: string, password2: string) => {
    if (password1 !== password2) return false;
    return true;
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToogleInputError = (bool: boolean) => {
    setInputError(bool);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const code = data.get("code") as string;
    const password1 = data.get("password") as string;
    const password2 = data.get("confirmPassword") as string;

    const body = {
      code,
      password: password1,
      email,
    };

    const passwordAreEquals = checkIfPasswordAreEqual(password1, password2);
    console.log(passwordAreEquals);
    if (!passwordAreEquals) {
      setInputError(false);
      return;
    } else {
      setInputError(undefined);
    }
    const promise = authService.updatePassword(body);

    promise
      .then((res) => {
        if (res.status === 200) {
          setOpen(true);
          setSeverity("success");
          setRequestMessage("Senha atualizada com sucesso! ");
          setTimeout(() => {
            router.push("/");
          }, 300);
        }
      })
      .catch((error: CulturalizeApiError) => {
        setOpen(true);
        setSeverity("error");
        setRequestMessage("Código de confirmação não confere! ");
      });
  };
  console.log(inputError);
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        {...inputProps}
        id="code"
        label="Código de confirmação"
        name="code"
        autoComplete="username"
        autoFocus
      />
      <TextField
        {...inputProps}
        error={inputError === false}
        name="password"
        label="Nova senha"
        autoComplete="new-password"
        type={showPassword ? "text" : "password"}
        id="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility1"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...inputProps}
        error={inputError === false}
        helperText={`${inputError ? "Senhas não coincidem" : ""}`}
        name="confirmPassword"
        label="Confirme a senha"
        autoComplete="new-password"
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility2"
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
        sx={{ mt: 3, mb: 2 }}
      >
        Enviar
      </LoadingButton>

      <Grid container>
        <Grid item>
          <Link href="/cadastro" variant="body2">
            Não tem uma conta? Cadastre-se
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
