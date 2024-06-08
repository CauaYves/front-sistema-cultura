import {
    BackButton,
    ButtonBox,
    ButtonWrapper,
    SaveBtn,
    TextInput,
} from '@/components';
import { useSearchParams } from 'next/navigation';
import { noticeSlugServices } from '../[id]/services';
import { NoticesForm } from '../[id]/styles';
import { ProposalInfoProps } from '../types';

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
            <TextInput name="res.name" label="Nome" />
            <TextInput name="res.cpf" label="CPF" />
            <TextInput name="res.rg" label="RG" />
            <TextInput name="res.issuingBody" label="Órgão expedidor" />
            <TextInput name="res.email" label="E-mail" />
            <TextInput name="res.tel" label="Telefone" />
            <TextInput name="res.cep" label="CEP" />
            <TextInput name="res.address" label="Endereço" />
            <TextInput name="res.number" label="Número" />
            <TextInput name="res.complement" label="Complemento" />
            <TextInput name="res.neighboorHood" label="Bairro" />
            <TextInput name="res.uf" label="UF" />
            <TextInput name="res.county" label="Município" />
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
