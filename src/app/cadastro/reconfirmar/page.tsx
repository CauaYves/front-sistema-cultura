'use client';
import authService from '@/app/api/auth';
import { Copyright, cpfMask } from '@/components';
import { SnackbarState } from '@/context/snackbar-context';
import { inputProps } from '@/types';
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    Link,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import MaskedInput from 'react-text-mask';

export default function ReesendConfirmationCode() {
    const router = useRouter();
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        message: '',
        severity: 'warning',
        open: false,
    });

    async function resendCode(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const cpf = data.get('cpf') as string;
        const promise = authService.recicleConfirmationCode(cpf);
        promise
            .then((res) => {
                setSnackbar({
                    message: res.data,
                    open: true,
                    severity: 'success',
                });
                router.push('/cadastro/confirmacao');
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setSnackbar({
                        message: 'CPF não encontrado',
                        open: true,
                        severity: 'error',
                    });
                }
            });
    }

    const handleClose = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                onClose={handleClose}
                open={snackbar.open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
            </Snackbar>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Image
                        src="/login_background.jpg"
                        alt="fundo cultural"
                        height={100}
                        width={150}
                        priority
                    />
                </Box>
                <Typography component="h1" variant="h6">
                    Indica Cultural
                </Typography>
                <Typography component="h1" variant="body2">
                    Insira o seu CPF para enviarmos um novo código de
                    confirmação
                </Typography>
                <Box
                    component="form"
                    sx={{ width: '100%' }}
                    onSubmit={(event) => resendCode(event)}
                >
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
                    <Box>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ mt: 1 }}
                        >
                            Receber código
                        </Button>
                    </Box>
                    <Grid container>
                        <Grid
                            sx={{
                                display: 'flex',
                                mt: 2,
                            }}
                        >
                            <Link href="/" variant="body2">
                                Já tem uma conta? entre agora
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 2, mb: 4 }} />
        </Container>
    );
}
