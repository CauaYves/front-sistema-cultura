import { FormTitleSection, cepMask } from '@/components/atoms';
import { inputProps } from '@/types';
import MaskedInput from 'react-text-mask';
import { StyledPaper, TextFieldWrapper, StyledTextField } from '../styles';
import UfSelectInput from '@/components/atoms/ufSelectInput';
import { useState } from 'react';
import CountySelectInput from '@/components/atoms/countySelectInput';

export default function AddressForm() {
    const [uf, setUf] = useState('');
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
                <StyledTextField
                    name="publicPlace"
                    label="Logradouro"
                    fullWidth
                />
            </TextFieldWrapper>
            <TextFieldWrapper>
                <StyledTextField name="houseNumber" label="Numero" fullWidth />
                <StyledTextField
                    name="complement"
                    label="Complemento"
                    fullWidth
                />
            </TextFieldWrapper>

            <TextFieldWrapper>
                <UfSelectInput setUf={setUf} uf={uf} />
                <CountySelectInput uf={uf} />
            </TextFieldWrapper>
            <TextFieldWrapper>
                <StyledTextField
                    name="neighboorhood"
                    label="Bairro"
                    fullWidth
                    required
                />
            </TextFieldWrapper>
        </StyledPaper>
    );
}
