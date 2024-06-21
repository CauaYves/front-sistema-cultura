'use client';
import { BackButton } from '@/components';
import RootBox from '@/components/atoms/boxes/rootBox';
import LoadingScreen from '@/components/atoms/loaders/screenLoading';
import StepperComp from '@/components/molecules/stepper';
import { SnackbarState } from '@/context/snackbar-context';
import { appLocalStore } from '@/hooks';
import { CulturalAgentPf, CulturalAgentPj } from '@/types';
import { Alert, Box, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CoordinatorInfo from '../components/coordinatorInfo';
import NoticesInfo from '../components/noticesInfo';
import ProposalInfo from '../components/proposalInfo';
import ResponsibleInfo from '../components/responsibleInfo';
import ReviewInfo from '../components/reviewInfo';
import { Notice, NoticeDetailsProps } from '../types';
import { steps } from './contants';
import { noticeSlugServices } from './services';
import { FlexibleBox } from './styles';

export default function NoticeDetails({
    params,
    searchParams,
}: NoticeDetailsProps) {
    const [details, setDetails] = useState<Notice>();
    const [loading, setLoading] = useState(false);
    const [userPF, setUserPF] = useState<CulturalAgentPf | undefined>();
    const [userPJ, setUserPJ] = useState<CulturalAgentPj | undefined>();
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        message: '',
        severity: 'warning',
        open: false,
    });
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
        3: <CoordinatorInfo router={router} urlSearchParams={searchParams} />,
        4: (
            <ReviewInfo
                urlSearchParams={searchParams}
                notice={details}
                setSnackbar={setSnackbar}
            />
        ),
    };
    const handleClose = () => setSnackbar({ ...snackbar, open: false });
    return (
        <RootBox>
            <Snackbar
                onClose={handleClose}
                open={snackbar.open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
            </Snackbar>
            <FlexibleBox sx={{ display: 'block' }}>
                <StepperComp
                    steps={steps}
                    activeStep={+searchParams.activeStep}
                />
                <Box mt={5}>
                    {pages[searchParams.activeStep as unknown as number]}
                </Box>
                <BackButton
                    sx={{ marginTop: '10px', marginLeft: '15px' }}
                    onClick={() => router.push('/home')}
                >
                    Voltar
                </BackButton>
            </FlexibleBox>
        </RootBox>
    );
}
