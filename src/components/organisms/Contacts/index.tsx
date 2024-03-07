import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import contactsService from "@/app/api/contacts";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCookie, getCookie } from "@/hooks";
import { useContacts } from "@/context/contacts-context";
import { AxiosError } from "axios";
import { useSnackbar } from "@/context/snackbar-context";
import ContactModal from "@/components/molecules/modals/contact";
import { useRouter } from "next/navigation";
import formatDatetime from "@/utils/formatDatetime";
import CircularProgress from "@mui/material/CircularProgress";
import EditContactModal from "@/components/molecules/modals/editContact";

export type TableContactRow = {
  id: number;
  number: string;
  public: boolean;
  type: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export default function Contacts() {
  const { contacts, setContacts } = useContacts();
  const { setSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalEditionOpen, setModalEditionOpen] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<TableContactRow>();
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContact = async () => {
      const token = await getCookie("token");
      const promise = contactsService.get(token);
      promise
        .then((res) => setContacts(res.data))
        .catch((error) => handleError(error));
    };
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setContacts, refreshTable]);

  //TODO colocar esse handleError na função de manipulação de error do nextjs
  const handleError = async (error: AxiosError) => {
    if (error.response?.status === 401) {
      setSnackbar({
        message: "Token de acesso expirado, faça login novamente! ",
        open: true,
        severity: "warning",
      });
      await deleteCookie("token");
      router.push("/");
    }
  };

  const handleDeleteContact = async (params: GridRenderCellParams) => {
    const contactId = params.id as string;
    const token = await getCookie("token");
    handleDelLoading();
    const promise = contactsService.deleteOne(token, contactId);
    promise
      .then(() => {
        setSnackbar({
          message: "Contato excluído com sucesso! ",
          open: true,
          severity: "success",
        });
        setRefreshTable(!refreshTable);
      })
      .catch(() => {
        setSnackbar({
          message: "Falha ao excluir contato. ",
          open: true,
          severity: "error",
        });
      })
      .finally(() => handleStopDelLoading());
  };
  const handleDelLoading = () => {
    setDelLoading(true);
  };
  const handleStopDelLoading = () => {
    setDelLoading(false);
  };

  const handleOpenEditModal = () => {
    setModalEditionOpen(true);
  };
  const handleCloseEditModal = () => {
    setModalEditionOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const columns: GridColDef[] = [
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

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <Button
        onClick={() => setModalOpen(true)}
        variant="outlined"
        sx={{
          margin: "10px 0px",
        }}
      >
        Criar contato
      </Button>
      <StyledTable
        rows={contacts}
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
      <Dialog open={modalOpen} onClose={handleClose}>
        <ContactModal close={setModalOpen} />
      </Dialog>
      <Dialog open={modalEditionOpen} onClose={handleCloseEditModal}>
        <EditContactModal close={setModalEditionOpen} row={selectedRow} />
      </Dialog>
    </div>
  );
}

const StyledTable = styled(DataGrid)`
  width: 100%;
`;
