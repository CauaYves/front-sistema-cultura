/* eslint-disable prettier/prettier */
import collectiveService from '@/app/api/collective';
import CollectiveModal from '@/components/molecules/modals/collective';
import EditCollectiveModal from '@/components/molecules/modals/editCollective';
import { useCollective } from '@/context/collective-context';
import { useSnackbar } from '@/context/snackbar-context';
import { appLocalStore } from '@/hooks';
import { DataFields, IndicaCulturalApiError } from '@/protocols';
import { Collective } from '@/types';
import { Button, Dialog, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';
import { handleDeleteCollective } from './collectiveUtils';
import CollectiveCollumns from './collumns';

interface TableCollectiveRow extends Collective {
    createdAt: string;
    updatedAt: string;
}

interface CulturalColl {
    router: AppRouterInstance;
}

export default function CulturalCollective({ router }: Readonly<CulturalColl>) {
    const { collective, setCollective } = useCollective();
    const { setSnackbar } = useSnackbar();
    const [selectedRow, setSelectedRow] = useState<TableCollectiveRow>();
    const [creationModalOpen, setCreationModalOpen] = useState<boolean>(false);
    const [modalEditionOpen, setModalEditionOpen] = useState<boolean>(false);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);
    const [delLoading, setDelLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchContact = async () => {
            const session = appLocalStore.get('session');
            const { token } = session.session;
            const promise = collectiveService.get(token);
            promise
                .then((res) => setCollective(res.data))
                .catch((error) => handleError(error));
        };
        fetchContact();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCollective, refreshTable]);

    const handleError = async (error: IndicaCulturalApiError<DataFields>) => {
        if (error.response.status === 401) {
            setSnackbar({
                message: 'Token de acesso expirado, faça login novamente! ',
                open: true,
                severity: 'warning',
            });
            appLocalStore.remove('session');
            router.push('/');
        }
    };
    const handleClose = () => setCreationModalOpen(false);
    const handleCloseEditModal = () => setModalEditionOpen(false);

    const columns = CollectiveCollumns({
        setModalEditionOpen,
        handleDeleteCollective: (params: any) =>
            handleDeleteCollective(
                params,
                setSnackbar,
                setRefreshTable,
                setDelLoading,
            ),
        delLoading,
        selectedRow,
    });
    return (
        <Paper sx={{ padding: '10px' }}>
            <Button
                onClick={() => setCreationModalOpen(true)}
                variant="outlined"
                sx={{
                    margin: '10px 0px',
                }}
            >
                Criar Coletivo Cultural
            </Button>
            <DataGrid
                rows={collective}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 15 },
                    },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
                onCellClick={(cell) => {
                    setSelectedRow(cell.row);
                }}
            />
            <Dialog open={creationModalOpen} onClose={handleClose}>
                <CollectiveModal close={setCreationModalOpen} />
            </Dialog>
            <Dialog open={modalEditionOpen} onClose={handleCloseEditModal}>
                <EditCollectiveModal
                    close={setModalEditionOpen}
                    row={selectedRow}
                />
            </Dialog>
        </Paper>
    );
}
