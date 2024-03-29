import { GridColDef } from "@mui/x-data-grid";
import { IconButton, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDatetime from "@/utils/formatDatetime";

interface ColumnProps {
  setModalEditionOpen: (open: boolean) => void;
  handleDeleteContact: (params: any) => void;
  delLoading: boolean;
  selectedRow: any;
}

const Columns = ({
  setModalEditionOpen,
  handleDeleteContact,
  delLoading,
  selectedRow,
}: ColumnProps): GridColDef[] => {
  return [
    { field: "id", headerName: "ID", width: 10 },
    { field: "type", headerName: "Tipo de contato", width: 130 },
    {
      field: "public",
      headerName: "Público",
      width: 70,
      renderCell: (params) =>
        params.value ? (
          <DoDisturbIcon color="error" />
        ) : (
          <CheckIcon color="success" />
        ),
    },
    {
      field: "number",
      headerName: "Contato",
      width: 290,
    },
    {
      field: "createdAt",
      headerName: "Data de criação",
      width: 170,
      renderCell: (params) => formatDatetime(params.value),
    },
    {
      field: "updatedAt",
      headerName: "Última edição",
      width: 170,
      renderCell: (params) => formatDatetime(params.value),
    },

    {
      field: "edit",
      headerName: "Editar",
      sortable: false,
      width: 70,
      renderCell: () => (
        <IconButton onClick={() => setModalEditionOpen(true)}>
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Excluir",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteContact(params)}>
          {delLoading && selectedRow?.id === params.id ? (
            <CircularProgress size={20} />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      ),
    },
  ];
};

export default Columns;
