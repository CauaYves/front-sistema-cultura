import { FormTitleSection } from "@/components/atoms";
import { Box, TextField } from "@mui/material";
import { StyledPaper, TextFieldWrapper, StyledTextField } from "../styles";

export default function CompanyData() {
  return (
    <StyledPaper>
      <FormTitleSection title="Dados da Empresa" />
      <TextFieldWrapper>
        <StyledTextField
          label="Razão social"
          required
          name="socialReason"
          fullWidth
          margin="dense"
        />
        <StyledTextField
          label="CNPJ"
          required
          name="cnpj"
          fullWidth
          margin="dense"
        />
        <StyledTextField
          label="Nome fantasia"
          required
          name="fantasyName"
          fullWidth
          margin="dense"
        />
        <StyledTextField
          label="Website"
          name="website"
          fullWidth
          margin="dense"
        />
      </TextFieldWrapper>
    </StyledPaper>
  );
}
