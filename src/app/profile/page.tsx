"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  PessoalInformationBox,
  ProfileContainer,
  ProfileMainContent,
  EditableUserInformations,
  TextFieldWrapper,
  EditingFormProfileContainer,
  LoadingButtonSx,
  ButtonWrapper,
} from "./styles";
import { blue } from "@mui/material/colors";
import { appLocalStore } from "@/hooks";
import { FormEvent } from "react";

export default function Profile() {
  const router = useRouter();
  const { session } = appLocalStore.getData("session");
  const { id, email, name, cpf } = session.user;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues = new FormData(event.currentTarget);
    const formData: any = {};
    for (const [key, value] of formValues.entries()) {
      formData[key] = value as string;
    }
    console.log(formData);
  };

  return (
    <ProfileContainer>
      <AppBar position="absolute" sx={{ maxHeight: "70px" }}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => router.push("/home")}
          >
            <ArrowBackIcon />
            <Typography component="h4" variant="body1" color="white">
              Voltar
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <ProfileMainContent>
        <PessoalInformationBox>
          <Avatar sx={{ bgcolor: blue[500], width: 74, height: 74 }}>
            {name[0]}
            {name[1]}
          </Avatar>
          <Typography variant="h5" sx={{ color: "white" }}>
            {name}
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            {email}
          </Typography>
        </PessoalInformationBox>
        <EditableUserInformations onSubmit={handleSubmit}>
          <Typography variant="h6">Alterar informações de usuário</Typography>
          <EditingFormProfileContainer>
            <TextFieldWrapper>
              <TextField
                name="name"
                label="Nome"
                required
                fullWidth
                defaultValue={name}
              />
            </TextFieldWrapper>
            <TextFieldWrapper>
              <TextField
                name="cpf"
                label="CPF"
                required
                fullWidth
                defaultValue={cpf}
              />
            </TextFieldWrapper>
            <TextFieldWrapper>
              <TextField
                name="email"
                label="E-mail"
                required
                fullWidth
                defaultValue={email}
              />
            </TextFieldWrapper>
            <TextFieldWrapper>
              <TextField name="password" label="Senha" required fullWidth />
            </TextFieldWrapper>
          </EditingFormProfileContainer>
          <ButtonWrapper>
            <LoadingButtonSx variant="contained" type="submit">
              Salvar
            </LoadingButtonSx>
          </ButtonWrapper>
        </EditableUserInformations>
        <Box></Box>
      </ProfileMainContent>
    </ProfileContainer>
  );
}
