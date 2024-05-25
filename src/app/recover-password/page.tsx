'use client';
import * as React from 'react';
import {
    Box,
    Typography,
    Container,
    Alert,
    Snackbar,
    AlertColor,
} from '@mui/material';
import { Copyright } from '@/components/atoms';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CulturalizeApiError } from '@/protocols';
import authService from '../api/auth';
import RecoverEmailBox from './emailBox';
import CreateNewPassword from './createNewPassword';

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [requestMessage, setRequestMessage] = React.useState('');
    const [severity, setSeverity] = useState<AlertColor>('warning');
    const [codeAlreadySent, setCodeAlreadySent] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const firstHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        setUserEmail(email);
        const promise = authService.recoverPassword(email);
        promise
            .then(() => {
                setSeverity('success');
                setRequestMessage('Código enviado com sucesso! ');
                setCodeAlreadySent(true);
            })
            .catch(({ response }: CulturalizeApiError) => {
                const { status, data } = response;
                let errorMessage = '';

                if (status === 422) {
                    errorMessage = `${data}`;
                } else if (status === 404) {
                    errorMessage = 'Usuário não encontrado! ';
                } else {
                    errorMessage = `${data.details}`;
                }

                setSeverity('error');
                setRequestMessage(errorMessage);
            })

            .finally(() => {
                setLoading(false);
                setOpen(true);
            });
    };

    const secondHandleSubmit = () => {};

    const handleClose = () => {
        setOpen(false);
    };

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
                    Culturalize
                </Typography>
                {codeAlreadySent ? (
                    <CreateNewPassword
                        email={userEmail}
                        secondHandleSubmit={secondHandleSubmit}
                        loading={loading}
                        router={router}
                        setOpen={setOpen}
                        setRequestMessage={setRequestMessage}
                        setSeverity={setSeverity}
                    />
                ) : (
                    <RecoverEmailBox
                        firstHandleSubmit={firstHandleSubmit}
                        loading={loading}
                        router={router}
                    />
                )}
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
