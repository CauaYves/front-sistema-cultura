import { GridColDef } from "@mui/x-data-grid";
import formatDatetime from "@/utils/formatDatetime";

const collectiveColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 10 },
  { field: "name", headerName: "Nome", width: 130 },
  {
    field: "area",
    headerName: "Área",
    width: 100,
  },
  {
    field: "opening",
    headerName: "Data de abertura",
    width: 120,
  },
  {
    field: "phone",
    headerName: "contato",
    width: 110,
  },
  {
    field: "email",
    headerName: "E-mail",
    width: 160,
  },
  {
    field: "address",
    headerName: "Endereço",
    width: 140,
  },
  {
    field: "neighboorhood",
    headerName: "Bairro",
    width: 120,
  },
  {
    field: "cep",
    headerName: "CEP",
    width: 90,
  },
  {
    field: "complement",
    headerName: "Complemento",
    width: 90,
  },
  {
    field: "county",
    headerName: "Município",
    width: 120,
  },
  {
    field: "responsible",
    headerName: "Responsável",
    width: 130,
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
];

export default collectiveColumns;
