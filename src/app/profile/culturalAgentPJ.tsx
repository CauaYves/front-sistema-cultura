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
import { CulturalAgentPj } from "@/types";

interface CulturalAgentPJProps {
  token: string;
  router: AppRouterInstance;
  setSnackbar: SetSnackbar;
}

export default function CulturalAgentPJ({
  token,
  router,
  setSnackbar,
}: CulturalAgentPJProps) {
  const [agentPJ, setAgent] = useState<CulturalAgentPj>();
  console.log(agentPJ);
  useEffect(() => {
    const fetchData = async () => {
      const promise = enrollmentService.getPJ(token);
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
        <Typography variant="h6">Agente cultural Pessoa Jurídica</Typography>

        <Typography>
          Telefone alternativo:
          <BolderText>{agentPJ?.alternativeTel}</BolderText>
        </Typography>
        <Typography>
          cep: <BolderText>{agentPJ?.cep}</BolderText>
        </Typography>
        <Typography>
          cnpj: <BolderText>{agentPJ?.cnpj}</BolderText>
        </Typography>
        <Typography>
          complement: <BolderText>{agentPJ?.complement}</BolderText>
        </Typography>
        <Typography>
          county: <BolderText>{agentPJ?.county}</BolderText>
        </Typography>
        <Typography>
          E-mail: <BolderText>{agentPJ?.email}</BolderText>
        </Typography>
        <Typography>
          Nome fantasia: <BolderText>{agentPJ?.fantasyName}</BolderText>
        </Typography>
        <Typography>
          Número residência: <BolderText>{agentPJ?.houseNumber}</BolderText>
        </Typography>
        <Typography>
          Cargo: <BolderText>{agentPJ?.job}</BolderText>
        </Typography>
        <Typography>
          Bairro: <BolderText>{agentPJ?.neighboorhood}</BolderText>
        </Typography>

        <Typography>
          Telefone: <BolderText>{agentPJ?.phone}</BolderText>
        </Typography>

        <Typography>
          Programas: <BolderText>{agentPJ?.programs[0]}</BolderText>
        </Typography>

        <Typography>
          Visibilidade dos dados:
          <BolderText>{agentPJ?.public ? "Público" : "Privado"}</BolderText>
        </Typography>

        <Typography>
          Responsável: <BolderText>{agentPJ?.responsible}</BolderText>
        </Typography>

        <Typography>
          Razão social: <BolderText>{agentPJ?.socialReason}</BolderText>
        </Typography>

        <Typography>
          Telefone: <BolderText>{agentPJ?.tel}</BolderText>
        </Typography>

        <Typography>
          UF: <BolderText>{agentPJ?.uf}</BolderText>
        </Typography>

        <Typography>
          Website: <BolderText>{agentPJ?.website}</BolderText>
        </Typography>
      </CulturalAgentInfoData>
    </CulturalAgentInfosBox>
  );
}
