import { useUserData } from '@/context/user-context';
import { appLocalStore } from '@/hooks';
import { CulturalizeApiError, DataFields } from '@/protocols';
import { AlertColor } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import authService from './api/auth';

const useSignInHandlers = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('warning');
    const [showPassword, setShowPassword] = useState(false);
    const { setUserData } = useUserData();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email') as string,
            password: data.get('password') as string,
        };
        setLoading(true);
        authService
            .login(userData)
            .then((response: AxiosResponse) => {
                setSeverity('success');
                const sessionData = response.data;
                appLocalStore.create('session', response.data);
                document.cookie = `session=${JSON.stringify(sessionData)}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
                delete response.data.user.emailConfirmed;
                const userData = {
                    token: response.data.token,
                    ...response.data.user,
                };
                setUserData(userData);
                setRequestMessage('Login efetuado com sucesso!');
                setTimeout(() => router.push('/home'), 1500);
            })
            .catch(({ response }: CulturalizeApiError<DataFields>) => {
                const { status, data } = response;
                let errorMessage = '';

                if (status === 422) {
                    errorMessage = `${data}`;
                } else if (status === 404) {
                    errorMessage = 'Usuário não encontrado';
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

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        loading,
        open,
        requestMessage,
        severity,
        showPassword,
        handleSubmit,
        handleTogglePasswordVisibility,
        handleClose,
    };
};

export default useSignInHandlers;
