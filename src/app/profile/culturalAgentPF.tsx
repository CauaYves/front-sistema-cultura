import { Box, Typography } from "@mui/material";
import {
  BolderText,
  CulturalAgentInfoData,
  CulturalAgentInfosBox,
} from "./styles";
import { useEffect, useState } from "react";
import enrollmentService from "../api/enrollment";
import { handleDealWithPromise } from "./functions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetSnackbar } from "@/context/snackbar-context";
import { CulturalAgentPf } from "@/types";

interface CulturalAgentPFProps {
  token: string;
  router: AppRouterInstance;
  setSnackbar: SetSnackbar;
}

export default function CulturalAgentPF({
  token,
  router,
  setSnackbar,
}: CulturalAgentPFProps) {
  const [agentPF, setAgent] = useState<CulturalAgentPf>();
  console.log(agentPF);
  useEffect(() => {
    const fetchData = async () => {
      const promise = enrollmentService.getPF(token);
      handleDealWithPromise({
        promise,
        router,
        setSnackbar,
        setAgent,
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CulturalAgentInfosBox>
      <CulturalAgentInfoData>
        <Typography variant="h6">Agente cultural Pessoa Física</Typography>

        <Typography>
          Telefone alternativo:{" "}
          <BolderText>{agentPF?.alternativeTel}</BolderText>
        </Typography>
        <Typography>
          cep: <BolderText>{agentPF?.cep}</BolderText>
        </Typography>
        <Typography>
          complemento: <BolderText>{agentPF?.complement}</BolderText>
        </Typography>
        <Typography>
          Município: <BolderText>{agentPF?.county}</BolderText>
        </Typography>
        <Typography>
          cpf: <BolderText>{agentPF?.cpf}</BolderText>
        </Typography>
        <Typography>
          email: <BolderText>{agentPF?.email}</BolderText>
        </Typography>
        <Typography>
          número residência: <BolderText>{agentPF?.houseNumber}</BolderText>
        </Typography>
        <Typography>
          nome: <BolderText>{agentPF?.name}</BolderText>
        </Typography>
        <Typography>
          bairro: <BolderText>{agentPF?.neighboorhood}</BolderText>
        </Typography>
      </CulturalAgentInfoData>
    </CulturalAgentInfosBox>
  );
}
