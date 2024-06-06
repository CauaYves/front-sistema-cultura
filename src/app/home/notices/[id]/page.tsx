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
import ProposalInfo from '../components/proposalInfo';
import ResponsibleInfo from '../components/responsibleInfo';
import { BackButton } from '@/components';
import { FlexibleBox } from './styles';

export default function NoticeDetails({
    params,
    searchParams,
}: NoticeDetailsProps) {
    const [details, setDetails] = useState<Notice>();
    const [loading, setLoading] = useState(false);
    const [userPF, setUserPF] = useState<CulturalAgentPf | undefined>();
    const [userPJ, setUserPJ] = useState<CulturalAgentPj | undefined>();
    const router = useRouter();
    const { session } = appLocalStore.get('session');
    const { getNoticeDetails, getUserPFandPJ } = noticeSlugServices;
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

    if (loading) return <LoadingScreen open />;

    const pages: { [key: number]: JSX.Element } = {
        0: (
            <NoticesInfo
                notice={details}
                router={router}
                userPF={userPF}
                userPJ={userPJ}
                isloading={loading}
            />
        ),
        1: <ProposalInfo router={router} urlSearchParams={searchParams} />,
        2: <ResponsibleInfo router={router} urlSearchParams={searchParams} />,
    };

    return (
        <RootBox>
            <FlexibleBox sx={{ display: 'block' }}>
                <StepperComp
                    steps={steps}
                    activeStep={+searchParams.activeStep}
                />
                <Box mt={5}>
                    {pages[searchParams.activeStep as unknown as number]}
                </Box>
                <BackButton sx={{ marginTop: '10px', marginLeft: '15px' }}>
                    Voltar
                </BackButton>
            </FlexibleBox>
        </RootBox>
    );
}
