'use client';
import * as React from 'react';
import {
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    InputAdornment,
    IconButton,
    Alert,
    Snackbar,
} from '@mui/material';
import { Copyright } from '@/components/atoms';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Image from 'next/image';
import { inputProps } from '@/types';
import useSignInHandlers from './services';

export default function SignIn() {
    const {
        loading,
        open,
        requestMessage,
        severity,
        showPassword,
        handleSubmit,
        handleTogglePasswordVisibility,
        handleClose,
    } = useSignInHandlers();

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                onClose={handleClose}
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={severity}>{requestMessage}</Alert>
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
                    Culturalize
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        {...inputProps}
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lembrar de mim"
                    />
                    <LoadingButton
                        variant="contained"
                        fullWidth
                        loading={loading}
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        entrar
                    </LoadingButton>

                    <Grid container>
                        <Grid item xs>
                            <Link href="/recover-password" variant="body2">
                                Esqueceu a senha?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/cadastro" variant="body2">
                                Não tem uma conta? Cadastre-se
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
