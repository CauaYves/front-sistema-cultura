import { FormTitleSection } from "@/components/atoms";
import { StyledPaper, TextFieldWrapper, StyledTextField } from "../styles";
import { phoneDdiMask } from "@/components/atoms/masks/ddiPhone";
import MaskedInput from "react-text-mask";

export default function ContactFormPF() {
  return (
    <StyledPaper>
      <FormTitleSection title="Contato" />
      <TextFieldWrapper>
        <StyledTextField
          label="E-mail"
          required
          name="email"
          fullWidth
          margin="dense"
          autoComplete="email"
        />
        <MaskedInput
          mask={phoneDdiMask}
          render={(ref, props) => (
            <StyledTextField
              {...props}
              sx={{ width: "50%" }}
              inputRef={ref}
              name="phone"
              label="Celular"
              required
              autoComplete="tel"
            />
          )}
        />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <StyledTextField
          label="Telefone fixo"
          required
          name="tel"
          fullWidth
          margin="dense"
          autoComplete="tel"
        />
        <StyledTextField
          label="Telefone alternativo"
          required
          name="alternativeTel"
          fullWidth
          margin="dense"
          autoComplete="tel"
        />
      </TextFieldWrapper>
    </StyledPaper>
  );
}
