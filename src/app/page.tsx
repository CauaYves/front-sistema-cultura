'use client';
import { Copyright, cpfMask } from '@/components/atoms';
import { inputProps } from '@/types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import MaskedInput from 'react-text-mask';
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
                    Indica Cultural
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
