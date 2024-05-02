import { FormTitleSection, cpfMask } from "@/components/atoms";
import { StyledPaper, TextFieldWrapper, StyledTextField } from "../styles";
import { inputProps } from "@/types";
import MaskedInput from "react-text-mask";

export default function FisicPersonData() {
  return (
    <StyledPaper>
      <FormTitleSection title="Pessoa física" />
      <TextFieldWrapper>
        <StyledTextField
          label="Nome"
          name="name"
          sx={{ width: "65%" }}
          required
        />
        <MaskedInput
          mask={cpfMask}
          render={(ref, props) => (
            <StyledTextField
              {...props}
              sx={{ width: "35%" }}
              required
              inputRef={ref}
              name="cpf"
              label="CPF"
            />
          )}
        />
      </TextFieldWrapper>
    </StyledPaper>
  );
}
