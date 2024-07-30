'use client';
import { Copyright } from '@/components/atoms';
import { DataFields, IndicaCulturalApiError } from '@/protocols';
import {
    Alert,
    AlertColor,
    Box,
    Container,
    Snackbar,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import authService from '../api/auth';
import CreateNewPassword from './createNewPassword';
import RecoverEmailBox from './emailBox';

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [requestMessage, setRequestMessage] = React.useState('');
    const [severity, setSeverity] = useState<AlertColor>('warning');
    const [codeAlreadySent, setCodeAlreadySent] = useState(false);
    const [userCPF, setUserCPF] = useState('');

    const firstHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const cpfWithDots = data.get('cpf') as string;

        const cpf = cpfWithDots.replaceAll('/[,-]/g', '');
        setUserCPF(cpf);
        console.log(cpf);
        const promise = authService.recoverPassword(cpf);
        promise
            .then(() => {
                setSeverity('success');
                setRequestMessage('Código enviado com sucesso! ');
                setCodeAlreadySent(true);
            })
            .catch(({ response }: IndicaCulturalApiError<DataFields>) => {
                console.log(response);

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
                    Indica Cultural
                </Typography>
                {codeAlreadySent ? (
                    <CreateNewPassword
                        cpf={userCPF}
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
