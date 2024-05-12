import { Button, Dialog, Paper, styled } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "@/context/snackbar-context";
import { useCollective } from "@/context/collective-context";
import { Collective } from "@/types";
import collectiveService from "@/app/api/collective";
import CollectiveModal from "@/components/molecules/modals/collective";
import { CulturalizeApiError } from "@/protocols";
import CollectiveCollumns from "./collumns";
import { handleDeleteCollective } from "./collectiveUtils";
import EditCollectiveModal from "@/components/molecules/modals/editCollective";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { appLocalStore } from "@/hooks";

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
      const session = appLocalStore.get("session");
      const { token } = session.session;
      const promise = collectiveService.get(token);
      promise
        .then((res) => setCollective(res.data))
        .catch((error) => handleError(error));
    };
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCollective, refreshTable]);

  const handleError = async (error: CulturalizeApiError) => {
    if (error.response.status === 401) {
      setSnackbar({
        message: "Token de acesso expirado, faça login novamente! ",
        open: true,
        severity: "warning",
      });
      appLocalStore.remove("session");
      router.push("/");
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
        handleError,
        setRefreshTable,
        setDelLoading
      ),
    delLoading,
    selectedRow,
  });
  return (
    <Paper sx={{ padding: "10px" }}>
      <Button
        onClick={() => setCreationModalOpen(true)}
        variant="outlined"
        sx={{
          margin: "10px 0px",
        }}
      >
        Criar Coletivo Cultural
      </Button>
      <StyledTable
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
        <EditCollectiveModal close={setModalEditionOpen} row={selectedRow} />
      </Dialog>
    </Paper>
  );
}

const StyledTable = styled(DataGrid)`
  width: 100%;
`;
