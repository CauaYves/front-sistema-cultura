import {
    BackButton,
    ButtonBox,
    ButtonWrapper,
    FormTitleSection,
    SaveBtn,
    TextInput,
    cepMask,
    cpfMask,
    phoneMask,
} from '@/components';
import { StyledPaper } from '@/components/organisms/Identification/styles';
import { useSearchParams } from 'next/navigation';
import MaskedInput from 'react-text-mask';
import { noticeSlugServices } from '../[id]/services';
import { FlexBox, NoticesForm, TextFieldWrapper } from '../[id]/styles';
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
            <FlexBox>
                <StyledPaper>
                    <FormTitleSection title="Dados Pessoais" />
                    <TextFieldWrapper>
                        <TextInput name="cord.name" label="Nome" />
                        <MaskedInput
                            mask={cpfMask}
                            render={(ref, props) => (
                                <TextInput
                                    {...props}
                                    inputRef={ref}
                                    name="cord.cpf"
                                    label="CPF"
                                />
                            )}
                        />
                    </TextFieldWrapper>
                    <TextFieldWrapper>
                        <TextInput name="cord.rg" label="RG" />
                        <TextInput
                            name="cord.issuingBody"
                            label="Órgão expedidor"
                        />
                    </TextFieldWrapper>
                </StyledPaper>

                <StyledPaper>
                    <FormTitleSection title="Contato" />
                    <TextFieldWrapper>
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
                                <TextInput
                                    {...props}
                                    inputRef={ref}
                                    name="cord.tel"
                                    label="Telefone"
                                />
                            )}
                        />
                    </TextFieldWrapper>
                </StyledPaper>
            </FlexBox>

            <FlexBox>
                <StyledPaper>
                    <FormTitleSection title="Endereço" />
                    <TextFieldWrapper>
                        <MaskedInput
                            mask={cepMask}
                            render={(ref, props) => (
                                <TextInput
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
                    </TextFieldWrapper>
                    <TextFieldWrapper>
                        <TextInput name="cord.uf" label="UF" />
                        <TextInput name="cord.county" label="Município" />
                        <TextInput name="cord.complement" label="Complemento" />
                    </TextFieldWrapper>
                    <TextFieldWrapper>
                        <TextInput
                            name="cord.neighboorHood"
                            label="Bairro"
                            sx={{ width: '50%' }}
                        />
                    </TextFieldWrapper>
                </StyledPaper>
                <StyledPaper>
                    <FormTitleSection title="Portfólio" />
                    <TextInput
                        name="activiesOnLastTwoYears"
                        label="Atividades nos últimos dois anos(até 500 caracteres)"
                        multiline
                    />
                </StyledPaper>
            </FlexBox>

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
