import { Typography, TextField } from '@mui/material';
import {
    EditingFormProfileContainer,
    TextFieldWrapper,
    ButtonWrapper,
    LoadingButtonSx,
    EditableUserInformationsBox,
} from './styles';
import { useState } from 'react';

type EditableUserInformationsProps = {
    cpf: string;
    email: string;
    name: string;
    handleSubmit: () => void;
    loading: boolean;
};

export default function EditableUserInformations({
    cpf,
    email,
    name,
    handleSubmit,
    loading,
}: EditableUserInformationsProps) {
    const [password, setPassword] = useState('');
    const isInputDisabled = password.length === 0;

    return (
        <EditableUserInformationsBox onSubmit={handleSubmit}>
            <Typography variant="h6">Alterar informações de Usuário</Typography>
            <EditingFormProfileContainer>
                <TextFieldWrapper>
                    <TextField
                        name="name"
                        label="Nome"
                        required
                        fullWidth
                        defaultValue={name}
                    />
                </TextFieldWrapper>
                <TextFieldWrapper>
                    <TextField
                        name="cpf"
                        label="CPF"
                        required
                        fullWidth
                        defaultValue={cpf}
                    />
                </TextFieldWrapper>
                <TextFieldWrapper>
                    <TextField
                        name="email"
                        label="E-mail"
                        required
                        fullWidth
                        defaultValue={email}
                    />
                </TextFieldWrapper>
                <TextFieldWrapper>
                    <TextField
                        name="password"
                        label="Senha atual"
                        required
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </TextFieldWrapper>
            </EditingFormProfileContainer>
            <ButtonWrapper>
                <LoadingButtonSx
                    variant="contained"
                    type="submit"
                    disabled={isInputDisabled}
                    loading={loading}
                >
                    Salvar
                </LoadingButtonSx>
            </ButtonWrapper>
        </EditableUserInformationsBox>
    );
}
