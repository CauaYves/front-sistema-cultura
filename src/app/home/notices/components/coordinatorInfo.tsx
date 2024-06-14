import {
    BackButton,
    ButtonBox,
    ButtonWrapper,
    SaveBtn,
    TextInput,
    cepMask,
    cpfMask,
    phoneMask,
} from '@/components';
import { StyledTextField } from '@/components/organisms/Identification/styles';
import { TextField } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import MaskedInput from 'react-text-mask';
import { noticeSlugServices } from '../[id]/services';
import { NoticesForm } from '../[id]/styles';
import { ProposalInfoProps } from '../types';

export default function CoordinatorInfo({ router }: ProposalInfoProps) {
    const searchParams = useSearchParams();
    const { incrementAtualStep } = noticeSlugServices;

    async function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues: { [key: string]: string } = Object.fromEntries(
            Array.from(formData.entries()).map(([key, value]) => [
                key,
                value.toString(),
            ]),
        );

        incrementAtualStep('3', searchParams, router, formValues);
    }

    return (
        <NoticesForm onSubmit={submitForm}>
            <TextInput name="cord.name" label="Nome" />
            <MaskedInput
                mask={cpfMask}
                render={(ref, props) => (
                    <StyledTextField
                        {...props}
                        inputRef={ref}
                        name="cord.cpf"
                        label="CPF"
                    />
                )}
            />
            <TextInput name="cord.rg" label="RG" />
            <TextInput name="cord.issuingBody" label="Órgão expedidor" />
            <TextInput
                name="cord.email"
                label="E-mail"
                autoComplete="email"
                required
                type="email"
            />
            <MaskedInput
                mask={phoneMask}
                render={(ref, props) => (
                    <TextField
                        {...props}
                        inputRef={ref}
                        name="cord.tel"
                        label="Telefone"
                    />
                )}
            />
            <MaskedInput
                mask={cepMask}
                render={(ref, props) => (
                    <TextField
                        {...props}
                        inputRef={ref}
                        name="cord.cep"
                        label="CEP"
                        autoComplete="postal-code"
                    />
                )}
            />
            <TextInput name="cord.address" label="Endereço" />
            <TextInput name="cord.number" label="Número" />
            <TextInput name="cord.complement" label="Complemento" />
            <TextInput name="cord.neighboorHood" label="Bairro" />
            <TextInput name="cord.uf" label="UF" />
            <TextInput name="cord.county" label="Município" />
            <TextInput
                name="activiesOnLastTwoYears"
                label="Atividades nos últimos dois anos(até 500 caracteres)"
            />
            <ButtonBox>
                <ButtonWrapper>
                    <BackButton onClick={() => router.push('/home')}>
                        Voltar
                    </BackButton>
                    <SaveBtn />
                </ButtonWrapper>
            </ButtonBox>
        </NoticesForm>
    );
}
