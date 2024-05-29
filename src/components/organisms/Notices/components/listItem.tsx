import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { StyledBox, StyledBtn, StyledTypo } from '../styles';
import { NoticePreviewList } from '../types';
import useNoticesService from '../services';

export default function NoticesListItem({
    id,
    name,
    openingDate,
    endDate,
    router,
}: Readonly<NoticePreviewList>) {
    const { formatISODate, isDateGreaterThanToday } = useNoticesService;
    const available = isDateGreaterThanToday(endDate);

    return (
        <StyledBox available={available ? 1 : 0}>
            <StyledTypo>{name}</StyledTypo>
            <StyledTypo>{formatISODate(openingDate)}</StyledTypo>
            <StyledTypo>{formatISODate(endDate)}</StyledTypo>
            <StyledBtn
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                disabled={!available}
                onClick={() => router.push(`/home/notices/${id}`)}
            >
                Ir
            </StyledBtn>
        </StyledBox>
    );
}
