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

export default function ResponsibleInfo({ router }: ProposalInfoProps) {
    const searchParams = useSearchParams();
    const { submitForm } = noticeSlugServices;

    return (
        <NoticesForm onSubmit={(e) => submitForm(e, searchParams, router, '2')}>
            <FlexBox>
                <StyledPaper>
                    <FormTitleSection title="Dados Pessoais" />
                    <TextFieldWrapper>
                        <TextInput
                            name="res.name"
                            label="Nome"
                            sx={{ maxWidth: '400px' }}
                        />
                        <MaskedInput
                            mask={cpfMask}
                            render={(ref, props) => (
                                <TextInput
                                    {...props}
                                    inputRef={ref}
                                    name="res.cpf"
                                    label="CPF"
                                />
                            )}
                        />
                    </TextFieldWrapper>
                    <TextFieldWrapper>
                        <TextInput name="res.rg" label="RG" />
                        <TextInput
                            name="res.issuingBody"
                            label="Órgão expedidor"
                        />
                    </TextFieldWrapper>
                </StyledPaper>
                <StyledPaper>
                    <FormTitleSection title="Contato" />
                    <TextFieldWrapper>
                        <MaskedInput
                            mask={phoneMask}
                            render={(ref, props) => (
                                <TextInput
                                    {...props}
                                    inputRef={ref}
                                    name="res.tel"
                                    label="Telefone"
                                />
                            )}
                        />
                        <TextInput
                            name="res.email"
                            label="E-mail"
                            autoComplete="email"
                            required
                            type="email"
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
                                    name="res.cep"
                                    label="CEP"
                                    autoComplete="postal-code"
                                />
                            )}
                        />
                        <TextInput name="res.address" label="Endereço" />
                        <TextInput name="res.number" label="Número" />
                    </TextFieldWrapper>
                    <TextFieldWrapper>
                        <TextInput name="res.uf" label="UF" />
                        <TextInput name="res.county" label="Município" />
                        <TextInput name="res.complement" label="Complemento" />
                    </TextFieldWrapper>
                    <TextFieldWrapper>
                        <TextInput
                            name="res.neighboorHood"
                            label="Bairro"
                            sx={{ width: '50%' }}
                        />
                    </TextFieldWrapper>
                </StyledPaper>
                <StyledPaper>
                    <FormTitleSection title="Portfólio" />

                    <TextInput
                        multiline
                        name="activiesOnLastTwoYears"
                        label="Atividades nos últimos dois anos(até 500 caracteres)"
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
