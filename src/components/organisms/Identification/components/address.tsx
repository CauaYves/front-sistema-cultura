import { FormTitleSection, cepMask } from "@/components/atoms";
import { inputProps } from "@/types";
import MaskedInput from "react-text-mask";
import { StyledPaper, TextFieldWrapper, StyledTextField } from "../styles";

export default function AddressForm() {
  return (
    <StyledPaper>
      <FormTitleSection title="Endereço" />
      <TextFieldWrapper>
        <MaskedInput
          mask={cepMask}
          render={(ref, props) => (
            <StyledTextField
              {...props}
              inputRef={ref}
              name="cep"
              {...inputProps}
              label="CEP"
              autoComplete="postal-code"
            />
          )}
        />
        <StyledTextField name="publicPlace" label="Logradouro" fullWidth />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <StyledTextField name="houseNumber" label="Numero" fullWidth />
        <StyledTextField name="complement" label="Complemento" fullWidth />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <StyledTextField
          name="neighboorhod"
          label="Bairro"
          fullWidth
          required
        />
        <StyledTextField name="county" label="Município" fullWidth required />
      </TextFieldWrapper>

      <StyledTextField name="uf" label="UF" fullWidth required />
    </StyledPaper>
  );
}
