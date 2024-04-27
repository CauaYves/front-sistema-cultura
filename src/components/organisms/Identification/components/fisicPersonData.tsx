import { FormTitleSection } from "@/components/atoms";
import { Box, TextField } from "@mui/material";
import { StyledPaper, TextFieldWrapper, StyledTextField } from "../styles";

export default function FisicPersonData() {
  return (
    <StyledPaper>
      <FormTitleSection title="Pessoa física" />
      <TextFieldWrapper>
        <StyledTextField label="Nome" name="name" sx={{ width: "65%" }} />
        <StyledTextField label="CPF" name="cpf" sx={{ width: "35%" }} />
      </TextFieldWrapper>
    </StyledPaper>
  );
}
