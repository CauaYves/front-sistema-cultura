import authService from '@/app/api/auth';
import { noticePreviewService } from '@/app/api/noticePreview';
import { noticeSlugServices } from '@/app/home/notices/[id]/services';
import LoadingScreen from '@/components/atoms/loaders/screenLoading';
import { useSnackbar } from '@/context/snackbar-context';
import { CulturalAgentPf, CulturalAgentPj } from '@/types';
import { useEffect, useState } from 'react';
import NoticesList from './components/list';
import useNoticesService from './services';
import { NoticePreviewList, NoticesProps } from './types';

export default function Notices({ router, setSelectedModule }: NoticesProps) {
    const [noticeList, setNoticeList] = useState<NoticePreviewList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { handleSetIsLoading } = useNoticesService;
    const { getUserPFandPJ } = noticeSlugServices;
    const { setSnackbar } = useSnackbar();
    const [userPF, setUserPF] = useState<CulturalAgentPf | undefined>();
    const [userPJ, setUserPJ] = useState<CulturalAgentPj | undefined>();

    useEffect(() => {
        handleSetIsLoading(setIsLoading, true);
        const sessionJSON = localStorage.getItem('session');

        if (!sessionJSON) {
            setSnackbar({
                message: 'token expirado, faça login novamente',
                open: true,
                severity: 'warning',
            });

            return router.push('/');
        }
        const { session } = JSON.parse(sessionJSON);
        async function checkIfTokenIsValid() {
            const response = await authService.checkToken(session.token);
            if (response !== 'OK') {
                router.push('/');
            }
        }
        checkIfTokenIsValid();
        const fetchUserPFandPJ = getUserPFandPJ(session.token).then(
            (usersRegistrations) => {
                setUserPF(usersRegistrations[0]);
                setUserPJ(usersRegistrations[1]);
            },
        );

        const fetchNoticesPreviews = noticePreviewService
            .get('Volta Redonda')
            .then((fetchedNoticePrevieList) => {
                setNoticeList(fetchedNoticePrevieList);
            });

        Promise.all([fetchUserPFandPJ, fetchNoticesPreviews])
            .then(() => {
                handleSetIsLoading(setIsLoading, false);
            })
            .catch(() => {
                setSnackbar({
                    message:
                        'Erro ao carregar dados, tente novamente mais tarde',
                    open: true,
                    severity: 'error',
                });
                handleSetIsLoading(setIsLoading, false);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? <LoadingScreen open /> : ''}
            <NoticesList
                notices={noticeList}
                router={router}
                isLoading={isLoading}
                setSelectedModule={setSelectedModule}
                userPJ={userPJ}
                userPF={userPF}
            />
        </>
    );
}
