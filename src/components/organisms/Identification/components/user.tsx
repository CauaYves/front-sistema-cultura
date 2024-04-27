import { FormTitleSection } from "@/components/atoms";
import { StyledPaper, StyledTextField, TextFieldWrapper } from "../styles";

export default function IdentificationUserBox({
  email,
}: Readonly<{ email: string }>) {
  return (
    <StyledPaper sx={{ width: "40%" }}>
      <FormTitleSection title="Identificação" />
      <TextFieldWrapper>
        <StyledTextField
          name="email"
          disabled
          defaultValue={email}
          label="Usuário"
        />
      </TextFieldWrapper>
    </StyledPaper>
  );
}
