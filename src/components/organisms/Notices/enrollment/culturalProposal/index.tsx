import { Box, Button, Paper, TextField } from "@mui/material";

export default function CulturalProposal() {
  return (
    <Box>
      <Paper sx={{ padding: "0px 15px 0px 0px" }}>
        <Box>
          <TextField
            fullWidth
            multiline
            margin="dense"
            label="Nome da proposta"
          />
          <TextField
            fullWidth
            multiline
            margin="dense"
            label="Descrição da proposta e objetivos"
          />
          <TextField fullWidth multiline margin="dense" label="Justificativa" />
          <TextField
            fullWidth
            multiline
            margin="dense"
            label="Data e local da realização"
          />
          <TextField
            fullWidth
            multiline
            margin="dense"
            label="Quantidade de integrantes"
          />
          <TextField
            fullWidth
            multiline
            margin="dense"
            label="da quadrilha junina (categoria A) ou de quadrilhas participantes do festival (categiria B)"
          />
        </Box>
        <Button variant="contained">Enviar</Button>
      </Paper>
    </Box>
  );
}
