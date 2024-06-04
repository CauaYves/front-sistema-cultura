import { Button, Link, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { noticeSlugServices } from '../[id]/services';
import { FlexibleBox, Info, RightInfo } from '../[id]/styles';
import { NoticesInfoProps } from '../types';
import LoadingScreen from '@/components/atoms/loaders/screenLoading';

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
                <Button
                    disabled={haveUserPF}
                    onClick={() =>
                        incrementAtualStep('0', searchParams, router, {
                            culturalAgentId: `${userPF?.id}`,
                            personType: 'pf',
                        })
                    }
                >
                    pessoa fisica
                </Button>
                <Button
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
                {isloading ? (
                    <LoadingScreen open />
                ) : (
                    <>
                        {haveUserPF && !isloading && (
                            <Typography>
                                Você não possui um cadastro de agente cultural
                                como pessoa física, acesse a página de
                                <Link href="/home">
                                    {' '}
                                    inscrição {'>'} Meus Dados {'>'}{' '}
                                    Identificação
                                </Link>{' '}
                                e crie.
                            </Typography>
                        )}
                        {haveUserPJ && !isloading && (
                            <Typography>
                                Você não possui um cadastro de agente cultural
                                como pessoa juridica, acesse a página de
                                <Link href="/home">
                                    {' '}
                                    inscrição {'>'} Meus Dados {'>'}{' '}
                                    Identificação
                                </Link>{' '}
                                e crie.
                            </Typography>
                        )}
                    </>
                )}
            </RightInfo>
        </FlexibleBox>
    );
}
