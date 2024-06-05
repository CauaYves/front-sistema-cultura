import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { StyledBox, StyledBtn, StyledTypo } from '../styles';
import { NoticePreviewList } from '../types';
import useNoticesService from '../services';
import { useEffect, useState } from 'react';
import { noticeSlugServices } from '@/app/home/notices/[id]/services';
import { useSnackbar } from '@/context/snackbar-context';
import { CulturalAgentPf, CulturalAgentPj } from '@/types';

export default function NoticesListItem({
    id,
    name,
    openingDate,
    endDate,
    router,
    setSelectedModule,
}: Readonly<NoticePreviewList>) {
    const { formatISODate, isDateGreaterThanToday } = useNoticesService;
    const { getUserPFandPJ } = noticeSlugServices;
    const available = isDateGreaterThanToday(endDate);
    const { setSnackbar } = useSnackbar();
    const [userPF, setUserPF] = useState<CulturalAgentPf | undefined>();
    const [userPJ, setUserPJ] = useState<CulturalAgentPj | undefined>();

    useEffect(() => {
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

        getUserPFandPJ(session.token).then((usersRegistrations) => {
            setUserPF(usersRegistrations[0]);
            setUserPJ(usersRegistrations[1]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function redirect() {
        if (!userPF && !userPJ) {
            setSnackbar({
                message:
                    'Você precisa se cadastrar como agente cultural primeiro! ',
                open: true,
                severity: 'warning',
            });
            return setSelectedModule('identification');
        }
        return router.push(`/home/notices/${id}?activeStep=0`);
    }

    return (
        <StyledBox available={available ? 1 : 0}>
            <StyledTypo>{name}</StyledTypo>
            <StyledTypo>{formatISODate(openingDate)}</StyledTypo>
            <StyledTypo>{formatISODate(endDate)}</StyledTypo>
            <StyledBtn
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                disabled={!available}
                onClick={redirect}
            >
                Ir
            </StyledBtn>
        </StyledBox>
    );
}
