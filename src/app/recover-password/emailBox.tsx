import { inputProps } from '@/types';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Grid, Link, Typography } from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FormEventHandler } from 'react';

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
                Insira seu email para enviarmos o código de confirmação
            </Typography>
            <TextField
                {...inputProps}
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
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
