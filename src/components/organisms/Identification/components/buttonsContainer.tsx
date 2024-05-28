import {
    BackButton,
    HelpButton,
    SaveButton,
} from '@/components/atoms/form-components/buttons';
import { Box, FormControlLabel, Checkbox } from '@mui/material';
import { ButtonsContainer } from '../styles';
import { Dispatch, SetStateAction } from 'react';
import { ModulesKey } from '@/app/home/types';

interface ButtonsContainerCompProps {
    setSelectedModule: Dispatch<SetStateAction<ModulesKey>>;
    loading: boolean;
}

export default function ButtonsContainerComp({
    setSelectedModule,
    loading,
}: Readonly<ButtonsContainerCompProps>) {
    return (
        <ButtonsContainer>
            <Box
                sx={{
                    width: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <BackButton onClick={async () => setSelectedModule('homePage')}>
                    Fechar
                </BackButton>
                <HelpButton variant="outlined">?</HelpButton>

                <SaveButton type="submit" variant="contained" loading={loading}>
                    Salvar
                </SaveButton>
            </Box>
            <FormControlLabel
                name="public"
                control={<Checkbox />}
                label="Autorizar publicação de dados ao público"
            />
        </ButtonsContainer>
    );
}
