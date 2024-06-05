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

export default function ProposalInfo({ router }: ProposalInfoProps) {
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
        incrementAtualStep('1', searchParams, router, formValues);
    }

    return (
        <NoticesForm onSubmit={submitForm}>
            <TextInput name="name" label="Nome da proposta" multiline />
            <TextInput
                name="executionPlace"
                label="Local de execução"
                multiline
            />
            <TextInput
                name="description"
                label="descrição da proposta (até 500 caracteres)"
            />
            <TextInput
                name="justification"
                label="Informe a justificativa da proposta (até 500 caracteres)"
                multiline
            />
            <TextInput
                name="accessibility"
                label="Descreva os meios de acessibilidade da proposta (até 500 caracteres)"
                multiline
            />
            <TextInput
                name="accessDemocratization"
                label="Descreva as medidas de democratização do acesso da proposta (até 500 caracteres)"
                multiline
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
