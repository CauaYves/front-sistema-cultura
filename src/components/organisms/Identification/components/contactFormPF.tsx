import {
  FormTitleSection,
  fixedTel,
  phoneDdiMask,
  phoneMask,
} from "@/components/atoms";
import { StyledPaper, TextFieldWrapper, StyledTextField } from "../styles";
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
        <MaskedInput
          mask={fixedTel}
          render={(ref, props) => (
            <StyledTextField
              inputRef={ref}
              {...props}
              label="Telefone fixo"
              required
              name="tel"
              fullWidth
              margin="dense"
            />
          )}
        />
        <MaskedInput
          mask={phoneMask}
          render={(ref, props) => (
            <StyledTextField
              inputRef={ref}
              {...props}
              label="Telefone alternativo"
              required
              name="alternativeTel"
              fullWidth
              margin="dense"
              autoComplete="tel"
            />
          )}
        />
      </TextFieldWrapper>
    </StyledPaper>
  );
}
