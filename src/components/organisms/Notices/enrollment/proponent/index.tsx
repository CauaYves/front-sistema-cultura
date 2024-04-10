import { Box, Button, styled, TextField } from "@mui/material";

export default function Proponent() {
  return (
    <Box>
      <GridBox>
        <TextField label="Nome da proposta" margin="dense" />
        <TextField label="Razão social" margin="dense" />
        <TextField label="Nome fantasia da empresa" margin="dense" />
        <TextField label="CNPJ" margin="dense" />
        <TextField label="Inscrição Estadual" margin="dense" />
        <TextField label="Inscrição Municipal" margin="dense" />
        <TextField
          label="CPF do responsável do MEI(Caso seja MEI, se não for, deixe em branco)"
          margin="dense"
        />
      </GridBox>

      <Button variant="contained">Próximo</Button>
    </Box>
  );
}

const GridBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  > div {
    margin-right: 10px;
  }
`;
