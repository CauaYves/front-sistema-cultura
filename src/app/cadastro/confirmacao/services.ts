import authService from '@/app/api/auth';
import { SnackbarState } from '@/context/snackbar-context';
import { AxiosError, AxiosResponse } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';

interface HandleSubmitProps {
    event: React.FormEvent<HTMLFormElement>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSnackbar: Dispatch<SetStateAction<SnackbarState>>;
    router: AppRouterInstance;
}

async function handleSubmit({
    event,
    setLoading,
    setSnackbar,
    router,
}: HandleSubmitProps) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const code = data.get('code') as string;
    const promise = authService.confirmRegistration(code);
    promise
        .then((res: AxiosResponse) => {
            setSnackbar({
                message: res.data,
                open: true,
                severity: 'success',
            });
            setTimeout(() => {
                router.push('/');
            }, 1500);
        })
        .catch((error: AxiosError) => {
            setSnackbar({
                message: `${error.response?.data}`,
                open: true,
                severity: 'error',
            });
        })
        .finally(() => {
            setLoading(false);
        });
}

export const confirmationPageService = {
    handleSubmit,
};
