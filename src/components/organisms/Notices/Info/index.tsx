import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import Subscription from "./subscription";
import Legislation from "./legislation";
import BidderHandbook from "./bidderhandbook";
import Publications from "./publications";
import CommonQuestions from "./commonQuestion";

type subMdlKeys = "ins" | "leg" | "man" | "pub" | "pef";

export default function Info() {
  const [subModule, setSubModule] = useState<subMdlKeys>("ins");

  const atualSubModule = {
    ins: <Subscription />,
    leg: <Legislation />,
    man: <BidderHandbook />,
    pub: <Publications />,
    pef: <CommonQuestions />,
  };
  const subModuleComp =
    atualSubModule[subModule as keyof typeof atualSubModule];

  return (
    <Box>
      <Paper sx={{ padding: "10px" }}>
        <Typography variant="body1" sx={{ mb: "10px" }}>
          Arraiá Cultural RJ 4
        </Typography>
        <ButtonGroup variant="text">
          <Button onClick={() => setSubModule("ins")}>inscrições</Button>
          <Button onClick={() => setSubModule("leg")}>legislações</Button>
          <Button onClick={() => setSubModule("man")}>
            manual do proponente
          </Button>
          <Button onClick={() => setSubModule("pub")}>publicações</Button>
          <Button onClick={() => setSubModule("pef")}>
            perguntas frequentes
          </Button>
        </ButtonGroup>
        <Divider />
        <Box>{subModuleComp}</Box>
      </Paper>
    </Box>
  );
}
