// profileFunctions.ts
import { useState, useEffect, FormEvent } from 'react';
import { appLocalStore } from '@/hooks';
import authService from '../api/auth';

export function useSession() {
    const [session, setSession] = useState<any>();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedSession = appLocalStore.get('session');
            if (storedSession) {
                setSession(storedSession.session);
            }
        }
    }, []);

    return session;
}

export function useLoading() {
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoading = () => setLoading(true);
    const handleStopLoading = () => setLoading(false);

    return { loading, handleLoading, handleStopLoading }; // Retorne as funções aqui
}

export function useFormSubmit(
    token: string,
    setSnackbar: Function,
    { handleLoading, handleStopLoading }: any,
) {
    // Adicione handleLoading e handleStopLoading como parâmetros
    const handleOpenSnack = (
        message: string,
        severity: 'error' | 'success',
    ) => {
        setSnackbar({
            message,
            open: true,
            severity,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleLoading(); // Use handleLoading fornecido como parâmetro
        const formValues = new FormData(event.currentTarget);
        const formData: any = {};
        for (const [key, value] of formValues.entries()) {
            formData[key] = value as string;
        }
        const promise = authService.update(token, formData);
        promise
            .then(() => {
                handleOpenSnack('Cadastro alterado com sucesso', 'success');
            })
            .catch(() => {
                handleOpenSnack('Senha incorreta', 'error');
            })
            .finally(() => handleStopLoading()); // Use handleStopLoading fornecido como parâmetro
    };

    return handleSubmit;
}
