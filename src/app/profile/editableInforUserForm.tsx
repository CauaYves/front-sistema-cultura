import { handleSubmit } from "@/components/organisms/Identification/handleActions";
import { Typography, TextField } from "@mui/material";
import {
  EditingFormProfileContainer,
  TextFieldWrapper,
  ButtonWrapper,
  LoadingButtonSx,
  EditableUserInformationsBox,
} from "./styles";
import { FormEvent } from "react";

type EditableUserInformationsProps = {
  cpf: string;
  email: string;
  name: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function EditableUserInformations({
  cpf,
  email,
  name,
  handleSubmit,
}: EditableUserInformationsProps) {
  return (
    <EditableUserInformationsBox onSubmit={handleSubmit}>
      <Typography variant="h6">Alterar informações de Usuário</Typography>
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
    </EditableUserInformationsBox>
  );
}
