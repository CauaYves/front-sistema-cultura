import { Acordion } from '@/components';
import LoadingScreen from '@/components/atoms/loaders/screenLoading';
import { Button, Link, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { subscriptionInformation } from '../[id]/contants';
import { noticeSlugServices } from '../[id]/services';
import { ButtonBox, FlexibleBox, Info, RightInfo } from '../[id]/styles';
import { NoticesInfoProps } from '../types';

export default function NoticesInfo({
    notice,
    router,
    userPF,
    userPJ,
    isloading,
}: NoticesInfoProps) {
    const searchParams = useSearchParams();
    const { incrementAtualStep } = noticeSlugServices;
    const haveUserPF = !userPF ? true : false;
    const haveUserPJ = !userPJ ? true : false;

    if (isloading) return <LoadingScreen open />;
    return (
        <FlexibleBox>
            <Info>
                <Typography variant="h6">
                    Você está se inscrevendo no edital: {notice?.name}
                </Typography>
                <Typography variant="body1">
                    leia as observações do edital abaixo <br />
                    {notice?.observations}
                </Typography>
            </Info>
            <RightInfo>
                <Typography variant="body1">
                    Escolha como irá se inscrever
                </Typography>
                <ButtonBox>
                    <Button
                        variant="outlined"
                        disabled={haveUserPF}
                        onClick={() =>
                            incrementAtualStep('0', searchParams, router, {
                                culturalAgentId: `${userPF?.id}`,
                                personType: 'pf',
                            })
                        }
                        sx={{ marginRight: '10px' }}
                    >
                        pessoa fisica
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={haveUserPJ}
                        onClick={() =>
                            incrementAtualStep('0', searchParams, router, {
                                culturalAgentId: `${userPJ?.id}`,
                                personType: 'pf',
                            })
                        }
                    >
                        pessoa juridica
                    </Button>
                </ButtonBox>
                <Typography variant="body2">
                    Secretária da Cultura e Economia Criativa do Rio de Janeiro,
                    no uso de suas atribuições legais, e considerando LEI Nº
                    7.035/2015 – Institui o Sistema Estadual de Cultura do
                    Estado do Rio de Janeiro, o Programa Estadual de Fomento e
                    Incentivo a Cultura, bem como às demais legislações
                    aplicadas à matéria, torna público o processo de inscrição e
                    seleção pública que é regulamentada pela{' '}
                    <Link
                        href="http://cultura.rj.gov.br/wp-content/uploads/2020/08/12.08.2020-Resolu%C3%A7%C3%A3o-SECEC-N-89-compilada-Inscri%C3%A7%C3%B5es-de-projetos-culturais.pdf"
                        target="_blank"
                    >
                        Resolução SECEC Nº 89, de julho de 2020
                    </Link>
                </Typography>
                <Acordion items={subscriptionInformation} />
            </RightInfo>
        </FlexibleBox>
    );
}
