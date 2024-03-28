import { Button, Dialog, IconButton, styled } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCookie, getCookie } from "@/hooks";
import { AxiosError } from "axios";
import { useSnackbar } from "@/context/snackbar-context";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { useCollective } from "@/context/collective-context";
import { Collective } from "@/types";
import columns from "./collumns";
import collectiveService from "@/app/api/collective";
import CollectiveModal from "@/components/molecules/modals/collective";

interface TableCollectiveRow extends Collective {
  createdAt: string;
  updatedAt: string;
}

export default function CulturalCollective() {
  const { collective, setCollective } = useCollective();
  const { setSnackbar } = useSnackbar();
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState<TableCollectiveRow>();
  const [creationModalOpen, setCreationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchContact = async () => {
      const token = await getCookie("token");
      const promise = collectiveService.get(token);
      promise
        .then((res) => setCollective(res.data))
        .catch((error) => handleError(error));
    };
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCollective]);

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
  const handleClose = () => {
    setCreationModalOpen(false);
  };
  return (
    <div>
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
        <CollectiveModal close={setCreationModalOpen} row={selectedRow} />
      </Dialog>
    </div>
  );
}

const StyledTable = styled(DataGrid)`
  width: 100%;
`;
