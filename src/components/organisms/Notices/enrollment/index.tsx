import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import Proponent from "./proponent";
import Partners from "./partners";
type enrollModuleKeys = "pro" | "soc" | "dad" | "res";

export default function Enrollment() {
  const [enrollModule, setEnrollModule] = useState<enrollModuleKeys>("pro");
  const modules = {
    pro: <Proponent />,
    soc: <Partners />,
    res: <p>resormações socioeconomicas</p>,
    dad: <p>Dados da proposta cultural</p>,
  };
  const selectedModule = modules[enrollModule as keyof typeof modules];

  return (
    <Box>
      <ButtonGroup>
        <Button onClick={() => setEnrollModule("pro")}>Proponente</Button>
        <Button onClick={() => setEnrollModule("soc")}>Sócios</Button>
        <Button onClick={() => setEnrollModule("res")}>
          Responsável pela execução
        </Button>
        <Button onClick={() => setEnrollModule("dad")}>
          Dados da proposta cultural
        </Button>
      </ButtonGroup>
      <Box>{selectedModule}</Box>
    </Box>
  );
}
