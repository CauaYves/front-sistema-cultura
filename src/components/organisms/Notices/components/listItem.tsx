import { useSnackbar } from '@/context/snackbar-context';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useNoticesService from '../services';
import { StyledBox, StyledBtn, StyledTypo } from '../styles';
import { NoticePreviewList } from '../types';

export default function NoticesListItem({
    id,
    name,
    openingDate,
    endDate,
    router,
    setSelectedModule,
    userPF,
    userPJ,
}: Readonly<NoticePreviewList>) {
    const { formatISODate, isDateGreaterThanToday } = useNoticesService;
    const available = isDateGreaterThanToday(endDate);
    const { setSnackbar } = useSnackbar();

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
