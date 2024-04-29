import { FormTitleSection } from "@/components/atoms";
import { StyledPaper, TextFieldWrapper, StyledTextField } from "../styles";
import { phoneDdiMask } from "@/components/atoms/masks/ddiPhone";
import MaskedInput from "react-text-mask";
import { useState } from "react";

export default function ContactFormPJ() {
  return (
    <StyledPaper>
      <FormTitleSection title="Contato" />
      <TextFieldWrapper>
        <StyledTextField
          label="Nome do responsável"
          required
          name="responsible"
          fullWidth
          margin="dense"
        />
        <StyledTextField
          label="Cargo"
          required
          name="job"
          fullWidth
          margin="dense"
        />
      </TextFieldWrapper>

      <TextFieldWrapper>
        <StyledTextField
          label="E-mail"
          required
          name="email"
          fullWidth
          margin="dense"
          sx={{ width: "50%" }}
        />
        <MaskedInput
          mask={phoneDdiMask}
          render={(ref, props) => (
            <StyledTextField
              {...props}
              sx={{ width: "50%" }}
              inputRef={ref}
              name="phone"
              required
              label="Celular"
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
        />
        <StyledTextField
          label="Telefone alternativo"
          required
          name="alternativeTel"
          fullWidth
          margin="dense"
        />
      </TextFieldWrapper>
    </StyledPaper>
  );
}
