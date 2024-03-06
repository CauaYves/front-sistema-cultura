import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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

export default function Contacts() {
  const { contacts, setContacts } = useContacts();
  const { setSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
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
  }, [setContacts]);

  const handleCreateContact = () => {
    console.log("Contato criado!");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
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
      width: 170,
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
        <IconButton onClick={handleCreateContact}>
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Excluir",
      sortable: false,
      width: 160,
      renderCell: () => (
        <IconButton onClick={handleCreateContact}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];
  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <Box style={{ width: "100%" }}>
      <Button
        onClick={() => setModalOpen(true)}
        variant="outlined"
        sx={{
          margin: "10px 0px",
        }}
      >
        Criar contato
      </Button>
      {contacts.length === 0 ? (
        <Typography variant="body1" component="h2">
          Você não criou nenhum contato ainda.
        </Typography>
      ) : (
        <DataGrid rows={contacts} columns={columns} />
      )}
      <Dialog open={modalOpen} onClose={handleClose}>
        <ContactModal close={setModalOpen} />
      </Dialog>
    </Box>
  );
}
