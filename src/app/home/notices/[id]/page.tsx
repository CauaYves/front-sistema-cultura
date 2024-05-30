'use client';
import RootBox from '@/components/atoms/boxes/rootBox';
import StepperComp from '@/components/molecules/stepper';
import { appLocalStore } from '@/hooks';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Notice, NoticeDetailsProps } from '../types';
import LoadingScreen from '@/components/atoms/loaders/screenLoading';
import NoticesInfo from '../components/noticesInfo';
import { useRouter } from 'next/navigation';
import { noticeSlugServices } from './services';
import { steps } from '../components/steps';
import { CulturalAgentPf, CulturalAgentPj } from '@/types';

export default function NoticeDetails({
    params,
    searchParams,
}: NoticeDetailsProps) {
    const [details, setDetails] = useState<Notice>();
    const [loading, setLoading] = useState(false);
    const [userPF, setUserPF] = useState<CulturalAgentPf | undefined>();
    const [userPJ, setUserPJ] = useState<CulturalAgentPj | undefined>();
    const { session } = appLocalStore.get('session');
    const { calculateAtualStep, getNoticeDetails, getUserPFandPJ } =
        noticeSlugServices;
    const router = useRouter();

    const handleLoading = (bool: boolean) => setLoading(bool);

    useEffect(() => {
        getUserPFandPJ(session.token).then((usersRegistrations) => {
            setUserPF(usersRegistrations[0]);
            setUserPJ(usersRegistrations[1]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session.token]);

    useEffect(() => {
        getNoticeDetails(params.id, session.token, setDetails, handleLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    if (loading) return <LoadingScreen open={true} />;
    return (
        //Cada tela deve ser exibida com base no activeStep recebido pela url
        <RootBox>
            <StepperComp
                steps={steps}
                activeStep={calculateAtualStep(searchParams.personType)}
            />
            <Box mt={5}>
                {searchParams.culturalAgentId ? (
                    ''
                ) : (
                    //proxima tela será aqui
                    <NoticesInfo
                        notice={details}
                        urlSearchParams={searchParams}
                        router={router}
                        userPF={userPF}
                        userPJ={userPJ}
                        isloading={loading}
                    />
                )}
            </Box>
        </RootBox>
    );
}
