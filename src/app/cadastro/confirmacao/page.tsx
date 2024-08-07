'use client';
import { Copyright } from '@/components/atoms';
import { SnackbarState } from '@/context/snackbar-context';
import { LoadingButton } from '@mui/lab';
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
import { useState } from 'react';
import { confirmationPageService } from './services';

export default function Confirmacao() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        message: '',
        severity: 'warning',
        open: false,
    });

    const { handleSubmit } = confirmationPageService;
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
                    Insira o código de confirmação enviado ao seu email
                </Typography>
                <Box
                    component="form"
                    onSubmit={(event) =>
                        handleSubmit({ event, setLoading, setSnackbar, router })
                    }
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="code"
                        label="Código de verificação"
                        name="code"
                    />
                    <Box>
                        <LoadingButton
                            variant="contained"
                            fullWidth
                            loading={loading}
                            type="submit"
                            sx={{ mt: 1 }}
                        >
                            Verificar
                        </LoadingButton>
                        <Button
                            onClick={() => {
                                router.push('/cadastro/reconfirmar');
                            }}
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Reenviar código de confirmação
                        </Button>
                    </Box>
                    <Grid container>
                        <Grid
                            sx={{
                                display: 'flex',
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
