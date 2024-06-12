import LoadingScreen from '@/components/atoms/loaders/screenLoading';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ButtonGroupStld, ButtonStld, FlexibleBox } from '../[id]/styles';
import { NoticesInfoProps } from '../types';
import FrequentQuestions from './frequentQuestions';
import Legislation from './legislations';
import ProponentManual from './proponentManual';
import Publications from './publications';
import Subscription from './subscription';

export default function NoticesInfo({
    router,
    userPF,
    userPJ,
    isloading,
}: NoticesInfoProps) {
    const searchParams = useSearchParams();
    const [subModule, setSubModule] = useState<1 | 2 | 3 | 4 | 5>(1);

    if (isloading) return <LoadingScreen open />;

    const subModulesKeys = {
        1: (
            <Subscription
                router={router}
                searchParams={searchParams}
                userPF={userPF}
                userPJ={userPJ}
            />
        ),
        2: <Legislation />,
        3: <ProponentManual />,
        4: <Publications />,
        5: <FrequentQuestions />,
    };

    return (
        <FlexibleBox>
            <ButtonGroupStld
                variant="contained"
                aria-label="Basic button group"
            >
                <ButtonStld onClick={() => setSubModule(1)}>
                    Inscrições
                </ButtonStld>
                <ButtonStld onClick={() => setSubModule(2)}>
                    Legislações
                </ButtonStld>
                <ButtonStld onClick={() => setSubModule(3)}>
                    Manual do Proponente
                </ButtonStld>
                <ButtonStld onClick={() => setSubModule(4)}>
                    Publicações
                </ButtonStld>
                <ButtonStld onClick={() => setSubModule(5)}>
                    Perguntas Frequentes
                </ButtonStld>
            </ButtonGroupStld>
            {/* <Info>
                <Typography variant="h6">
                    Você está se inscrevendo no edital: {notice?.name}
                </Typography>
                <Typography variant="body1">
                    leia as observações do edital abaixo <br />
                    {notice?.observations}
                </Typography>
            </Info> */}
            {subModulesKeys[subModule]}
        </FlexibleBox>
    );
}
