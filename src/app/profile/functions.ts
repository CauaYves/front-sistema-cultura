import { SetSnackbar } from '@/context/snackbar-context';
import { ApiResponse, CulturalizeApiError } from '@/protocols';
import { CulturalAgentPf, CulturalAgentPj } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface HandleDealWithPromiseProps {
    promise: any;
    router: AppRouterInstance;
    setSnackbar: SetSnackbar;
    setAgent: any;
}

export const handleDealWithPromise = ({
    promise,
    router,
    setSnackbar,
    setAgent,
}: HandleDealWithPromiseProps) => {
    promise
        .then((res: ApiResponse<CulturalAgentPf | CulturalAgentPj>) => {
            setAgent(res.data);
        })
        .catch((error: CulturalizeApiError) => {
            console.log(error);
            if (!error.response) return;
            if (error.response.status === 401) {
                setSnackbar({
                    message: 'token de acesso expirado, faça login novamente! ',
                    open: true,
                    severity: 'warning',
                });
                router.push('/');
            }
        });
};
