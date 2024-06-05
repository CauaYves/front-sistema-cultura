import {
    BackButton,
    ButtonBox,
    ButtonWrapper,
    SaveBtn,
    TextInput,
} from '@/components';
import { ProposalInfoProps } from '../types';
import { useSearchParams } from 'next/navigation';
import { noticeSlugServices } from '../[id]/services';
import { NoticesForm } from '../[id]/styles';

export default function ResponsibleInfo({ router }: ProposalInfoProps) {
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

        console.log('Form Data:', formValues);

        incrementAtualStep('2', searchParams, router, formValues);
    }

    return (
        <NoticesForm onSubmit={submitForm}>
            <TextInput name="responsible.name" label="Nome" />
            <TextInput name="responsible.cpf" label="CPF" />
            <TextInput name="responsible.rg" label="RG" />
            <TextInput name="responsible.issuingBody" label="Órgão expedidor" />
            <TextInput name="responsible.email" label="E-mail" />
            <TextInput name="responsible.tel" label="Telefone" />
            <TextInput name="responsible.cep" label="CEP" />
            <TextInput name="responsible.address" label="Endereço" />
            <TextInput name="responsible.number" label="Número" />
            <TextInput name="responsible.complement" label="Complemento" />
            <TextInput name="responsible.neighboorHood" label="Bairro" />
            <TextInput name="responsible.uf" label="UF" />
            <TextInput name="responsible.county" label="Município" />
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
