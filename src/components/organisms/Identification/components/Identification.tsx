import { FormTitleSection } from '@/components/atoms';
import { StyledPaper, TextFieldWrapper, StyledTextField } from '../styles';

export default function IdentificationForm({
    email,
}: Readonly<{ email: string }>) {
    return (
        <StyledPaper>
            <FormTitleSection title="Identificação" />
            <TextFieldWrapper>
                <StyledTextField
                    type="email"
                    name="email"
                    disabled
                    defaultValue={email}
                    label="Usuário"
                    fullWidth
                />
            </TextFieldWrapper>
        </StyledPaper>
    );
}
