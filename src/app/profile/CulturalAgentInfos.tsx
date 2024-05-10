import { Box } from "@mui/material";
import { CulturalAgentInfosBox } from "./styles";
import { useEffect, useState } from "react";
import enrollmentService from "../api/enrollment";
import { handleDealWithPromise } from "./functions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetSnackbar } from "@/context/snackbar-context";

interface CulturalAgentInfosProps {
  token: string;
  router: AppRouterInstance;
  setSnackbar: SetSnackbar;
}

export default function CulturalAgentInfos({
  token,
  router,
  setSnackbar,
}: CulturalAgentInfosProps) {
  const [agentPF, setAgentPF] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const promise = enrollmentService.getPF(token);
      handleDealWithPromise({ promise, router, setSnackbar });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CulturalAgentInfosBox>
      <Box>Agente cultural Pessoa Física</Box>
      <Box>Agente cultural Pessoa Jurídica</Box>
    </CulturalAgentInfosBox>
  );
}
