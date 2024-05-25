import { Typography } from '@mui/material';
import {
    BolderText,
    CulturalAgentInfoData,
    CulturalAgentInfosBox,
} from './styles';
import { useEffect, useState } from 'react';
import enrollmentService from '../api/enrollment';
import { handleDealWithPromise } from './functions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SetSnackbar } from '@/context/snackbar-context';
import { CulturalAgentPj } from '@/types';
import { FormTitleSection } from '@/components/atoms';

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
    const programs = agentPJ?.programs.forEach((program) => {
        return program + ', ';
    });
    return (
        <CulturalAgentInfosBox>
            <CulturalAgentInfoData>
                <FormTitleSection title="Agente cultural Pessoa Jurídica" />

                <Typography>
                    Telefone alternativo:
                    <BolderText>{agentPJ?.alternativeTel}</BolderText>
                </Typography>
                <Typography>
                    CEP: <BolderText>{agentPJ?.cep}</BolderText>
                </Typography>
                <Typography>
                    CNPJ: <BolderText>{agentPJ?.cnpj}</BolderText>
                </Typography>
                <Typography>
                    Complemento de endereço:{' '}
                    <BolderText>{agentPJ?.complement}</BolderText>
                </Typography>
                <Typography>
                    Município: <BolderText>{agentPJ?.county}</BolderText>
                </Typography>
                <Typography>
                    E-mail: <BolderText>{agentPJ?.email}</BolderText>
                </Typography>
                <Typography>
                    Nome fantasia:{' '}
                    <BolderText>{agentPJ?.fantasyName}</BolderText>
                </Typography>
                <Typography>
                    Número residência:{' '}
                    <BolderText>{agentPJ?.houseNumber}</BolderText>
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
                    Programas:{' '}
                    <BolderText>{programs ? programs : 'Nenhum'}</BolderText>
                </Typography>

                <Typography>
                    Visibilidade dos dados:
                    <BolderText>
                        {agentPJ?.public ? 'Público' : 'Privado'}
                    </BolderText>
                </Typography>

                <Typography>
                    Responsável: <BolderText>{agentPJ?.responsible}</BolderText>
                </Typography>

                <Typography>
                    Razão social:{' '}
                    <BolderText>{agentPJ?.socialReason}</BolderText>
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
