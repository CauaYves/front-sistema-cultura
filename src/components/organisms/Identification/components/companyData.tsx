import { FormTitleSection } from "@/components/atoms";
import { StyledPaper, TextFieldWrapper, StyledTextField } from "../styles";
import MaskedInput from "react-text-mask";
import { cnpjMask } from "@/components/atoms/masks/cnpj";

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
        <MaskedInput
          mask={cnpjMask}
          render={(ref, props) => (
            <StyledTextField
              fullWidth
              {...props}
              inputRef={ref}
              name="cnpj"
              label="CNPJ"
              autoComplete="postal-code"
            />
          )}
        />
      </TextFieldWrapper>
      <TextFieldWrapper>
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
          required
          type="url"
          margin="dense"
        />
      </TextFieldWrapper>
    </StyledPaper>
  );
}
