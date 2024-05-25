import { FormTitleSection, cpfMask } from '@/components/atoms';
import { StyledPaper, TextFieldWrapper, StyledTextField } from '../styles';
import MaskedInput from 'react-text-mask';
import { appLocalStore } from '@/hooks';

export default function FisicPersonData() {
    const sessionData = appLocalStore.get('session');

    return (
        <StyledPaper>
            <FormTitleSection title="Pessoa física" />
            <TextFieldWrapper>
                <StyledTextField
                    label="Nome"
                    name="name"
                    sx={{ width: '65%' }}
                    value={sessionData.session.user.name}
                    disabled
                />
                <MaskedInput
                    mask={cpfMask}
                    render={(ref, props) => (
                        <StyledTextField
                            {...props}
                            sx={{ width: '35%' }}
                            inputRef={ref}
                            value={sessionData.session.user.cpf}
                            disabled
                            name="cpf"
                            label="CPF"
                        />
                    )}
                />
            </TextFieldWrapper>
        </StyledPaper>
    );
}
