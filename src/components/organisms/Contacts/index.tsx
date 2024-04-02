import React, { useState, useEffect } from "react";
import { Button, Dialog, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContacts } from "@/context/contacts-context";
import { useSnackbar } from "@/context/snackbar-context";
import ContactModal from "@/components/molecules/modals/contact";
import EditContactModal from "@/components/molecules/modals/editContact";
import ContactColumns from "./collumns";
import {
  FetchContacts,
  handleDeleteContact,
  handleError,
} from "./contactUtils";

export default function Contacts() {
  const { contacts, setContacts } = useContacts();
  const { setSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalEditionOpen, setModalEditionOpen] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [refreshTable, setRefreshTable] = useState<boolean>(false);

  useEffect(() => {
    FetchContacts(setContacts, setSnackbar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setContacts, refreshTable]);

  const handleCloseEditModal = () => {
    setModalEditionOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const columns = ContactColumns({
    setModalEditionOpen,
    handleDeleteContact: (params: any) =>
      handleDeleteContact(
        params,
        setSnackbar,
        handleError,
        setRefreshTable,
        setDelLoading
      ),
    delLoading,
    selectedRow,
  });

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
        <ContactModal close={setModalOpen} row={selectedRow} />
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
