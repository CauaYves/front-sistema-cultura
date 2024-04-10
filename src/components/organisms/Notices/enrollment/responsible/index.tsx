import {
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  styled,
  Button,
} from "@mui/material";

export default function Responsible() {
  return (
    <Box>
      <Paper sx={{ padding: "10px" }}>
        <Typography variant="body1">
          Insira os dados do Responsável pela execução da proposta cultural
        </Typography>
        <Divider />
        <GridBox>
          <SpacedField label="Nome" />
          <SpacedField label="CPF" />
          <SpacedField label="RG" />
          <SpacedField label="E-mail" />
          <SpacedField label="Celular" />
          <SpacedField label="CEP" />
        </GridBox>
        <Button variant="contained" sx={{ margin: "5px" }}>
          Gravar
        </Button>
      </Paper>
    </Box>
  );
}

const GridBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const SpacedField = styled(TextField)`
  margin: 5px;
`;
