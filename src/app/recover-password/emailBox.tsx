import { cpfMask } from '@/components';
import { inputProps } from '@/types';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Link, TextField, Typography } from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FormEventHandler } from 'react';
import MaskedInput from 'react-text-mask';

interface RecoverEmailBoxProps {
    firstHandleSubmit: FormEventHandler<HTMLFormElement>;
    loading: boolean;
    router: AppRouterInstance;
}

export default function RecoverEmailBox({
    firstHandleSubmit,
    loading,
}: Readonly<RecoverEmailBoxProps>) {
    return (
        <Box component="form" onSubmit={firstHandleSubmit} sx={{ mt: 1 }}>
            <Typography variant="body2">
                Insira seu cpf para enviarmos o código de confirmação
            </Typography>
            <MaskedInput
                mask={cpfMask}
                render={(ref, props) => (
                    <TextField
                        {...props}
                        {...inputProps}
                        inputRef={ref}
                        id="cpf"
                        label="CPF"
                        name="cpf"
                        autoComplete="cpf"
                        autoFocus
                    />
                )}
            />
            <LoadingButton
                variant="contained"
                fullWidth
                loading={loading}
                type="submit"
                sx={{ mt: 3, mb: 2 }}
            >
                Enviar
            </LoadingButton>

            <Grid container>
                <Grid item>
                    <Link href="/cadastro" variant="body2">
                        Não tem uma conta? Cadastre-se
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}
