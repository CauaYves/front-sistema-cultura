/* eslint-disable prettier/prettier */
import { GridColDef } from '@mui/x-data-grid';
import formatDatetime from '@/utils/formatDatetime';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, IconButton } from '@mui/material';

interface ColumnProps {
    // eslint-disable-next-line no-unused-vars
    setModalEditionOpen: (open: boolean) => void;
    // eslint-disable-next-line no-unused-vars
    handleDeleteCollective: (params: any) => void;
    delLoading: boolean;
    selectedRow: any;
}
const CollectiveCollumns = ({
    setModalEditionOpen,
    handleDeleteCollective,
    delLoading,
    selectedRow,
}: ColumnProps): GridColDef[] => {
    return [
        {
            field: 'edit',
            headerName: 'Editar',
            sortable: false,
            width: 10,
            renderCell: () => (
                <IconButton onClick={() => setModalEditionOpen(true)}>
                    <EditIcon fontSize="small" color="info" />
                </IconButton>
            ),
        },
        {
            field: 'delete',
            headerName: 'Excluir',
            sortable: false,
            width: 70,
            renderCell: (params) => (
                <IconButton onClick={() => handleDeleteCollective(params)}>
                    {delLoading && selectedRow?.id === params.id ? (
                        <CircularProgress size={20} />
                    ) : (
                        <DeleteIcon fontSize="small" color="error" />
                    )}
                </IconButton>
            ),
        },
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'name', headerName: 'Nome', width: 130 },
        {
            field: 'area',
            headerName: 'Área',
            width: 100,
        },
        {
            field: 'opening',
            headerName: 'Data de abertura',
            width: 120,
        },
        {
            field: 'phone',
            headerName: 'contato',
            width: 110,
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 160,
        },
        {
            field: 'address',
            headerName: 'Endereço',
            width: 140,
        },
        {
            field: 'neighboorhood',
            headerName: 'Bairro',
            width: 120,
        },
        {
            field: 'cep',
            headerName: 'CEP',
            width: 90,
        },
        {
            field: 'complement',
            headerName: 'Complemento',
            width: 90,
        },
        {
            field: 'county',
            headerName: 'Município',
            width: 120,
        },
        {
            field: 'responsible',
            headerName: 'Responsável',
            width: 130,
        },
        {
            field: 'createdAt',
            headerName: 'Data de criação',
            width: 170,
            renderCell: (params) => formatDatetime(params.value),
        },
        {
            field: 'updatedAt',
            headerName: 'Última edição',
            width: 170,
            renderCell: (params) => formatDatetime(params.value),
        },
    ];
};

export default CollectiveCollumns;
