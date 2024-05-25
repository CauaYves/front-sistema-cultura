import collectiveService from '@/app/api/collective';
import { appLocalStore } from '@/hooks';

export const handleDeleteCollective = async (
    params: any,
    setSnackbar: any,
    setRefreshTable: any,
    setDelLoading: any,
) => {
    const collectiveId = params.id as string;
    const session = appLocalStore.get('session');
    const { token } = session;

    setDelLoading(true);
    const promise = collectiveService.deleteOne(token, collectiveId);
    promise
        .then(() => {
            setSnackbar({
                message: 'Coletivo cultural excluído com sucesso! ',
                open: true,
                severity: 'success',
            });
            setRefreshTable((prev: boolean) => !prev);
        })
        .catch(() => {
            setSnackbar({
                message: 'Falha ao excluir Coletivo cultural . ',
                open: true,
                severity: 'error',
            });
        })
        .finally(() => setDelLoading(false));
};
