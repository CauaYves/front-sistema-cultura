'use client';
import { Copyright } from '@/components/atoms';
import { inputProps } from '@/types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
    Alert,
    AlertColor,
    Box,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import authService from '../api/auth';

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [requestMessage, setRequestMessage] = React.useState('');
    const [severity, setSeverity] = useState<AlertColor>('warning');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleClose = () => {
        setOpen(false);
    };
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            name: data.get('name') as string,
            cpf: data.get('cpf') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
        };
        setLoading(true);
        const promise = authService.register(userData);
        promise
            .then(() => {
                setSeverity('success');
                setRequestMessage('Cadastro realizado com sucesso!');
                setTimeout(() => {
                    router.push('/cadastro/confirmacao');
                }, 1500);
            })
            .catch((error: AxiosError | any) => {
                console.log(error);
                setSeverity('error');
                setRequestMessage(
                    error.response.status === 400
                        ? `${error.response?.data?.details}`
                        : `${error.response.data}`,
                );
            })
            .finally(() => {
                setLoading(false);
                setOpen(true);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                onClose={handleClose}
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={severity}>{requestMessage} </Alert>
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
                <Typography component="h1" variant="body2">
                    Seja bem vindo à
                </Typography>
                <Typography component="h1" variant="h6">
                    Indica Cultural
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        {...inputProps}
                        name="name"
                        label="Nome"
                        type="name"
                        id="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <MaskedInput
                        mask={[
                            /[0-9]/,
                            /\d/,
                            /\d/,
                            '.',
                            /\d/,
                            /\d/,
                            /\d/,
                            '.',
                            /\d/,
                            /\d/,
                            /\d/,
                            '-',
                            /\d/,
                            /\d/,
                        ]}
                        id="cpf"
                        render={(ref, props) => (
                            <TextField
                                {...props}
                                inputRef={ref}
                                {...inputProps}
                                name="cpf"
                                label="CPF"
                                type="cpf"
                                id="cpf"
                                autoComplete="cpf"
                            />
                        )}
                    />
                    <TextField
                        {...inputProps}
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        {...inputProps}
                        name="password"
                        label="Senha"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <LoadingButton
                        variant="contained"
                        fullWidth
                        loading={loading}
                        type="submit"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        cadastrar
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link href="/" variant="body2">
                                Já tem uma conta? Entre agora
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 2, mb: 4 }} />
        </Container>
    );
}
