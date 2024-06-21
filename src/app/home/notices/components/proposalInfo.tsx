import { FormTitleSection, TextInput } from '@/components';
import { useSearchParams } from 'next/navigation';
import { noticeSlugServices } from '../[id]/services';
import { NoticesForm, TextFieldWrapper } from '../[id]/styles';
import { ProposalInfoProps } from '../types';
import FormButtons from './formButtons';

export default function ProposalInfo({ router }: ProposalInfoProps) {
    const searchParams = useSearchParams();
    const { submitForm } = noticeSlugServices;

    return (
        <NoticesForm onSubmit={(e) => submitForm(e, searchParams, router, '1')}>
            <FormTitleSection title="Dados da Proposta" />
            <TextFieldWrapper>
                <TextInput name="name" label="Nome da proposta" fullWidth />
                <TextInput
                    name="executionPlace"
                    label="Local de execução"
                    fullWidth
                />
            </TextFieldWrapper>
            <TextFieldWrapper>
                <TextInput
                    name="description"
                    label="descrição da proposta (até 500 caracteres)"
                    multiline
                />
                <TextInput
                    name="justification"
                    label="Informe a justificativa da proposta (até 500 caracteres)"
                    multiline
                />
            </TextFieldWrapper>
            <TextFieldWrapper>
                <TextInput
                    name="accessDemocratization"
                    label="Descreva as medidas de democratização do acesso da proposta (até 500 caracteres)"
                    multiline
                />
                <TextInput
                    name="publicServed"
                    label="Descreva para qual tipo de público está destinado sua proposta (até 500 caracteres)"
                    multiline
                />
            </TextFieldWrapper>
            <TextFieldWrapper>
                <TextInput
                    name="accessibility"
                    label="Descreva os meios de acessibilidade da proposta (até 500 caracteres)"
                    multiline
                />
            </TextFieldWrapper>
            <FormButtons />
        </NoticesForm>
    );
}
