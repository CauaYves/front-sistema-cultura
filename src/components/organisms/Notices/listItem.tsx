import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import dayjs from 'dayjs';
import { StyledBox, StyledBtn, StyledTypo } from './styles';
import { NoticePreviewList } from '.';

export default function NoticesListItem({
    name,
    openingDate,
    endDate,
}: Readonly<NoticePreviewList>) {
    function isDateGreaterThanToday(dateString: string): boolean {
        const inputDate = dayjs(dateString);
        const today = dayjs();
        console.log(inputDate.isAfter(today));
        return inputDate.isAfter(today);
    }
    function formatISODate(ISODate: string) {
        const slicedDate = ISODate.slice(0, 10);
        const year = slicedDate.slice(0, 4);
        const month = slicedDate.slice(5, 7);
        const day = slicedDate.slice(8, 10);
        const formatedDate = `${day}/${month}/${year}`;
        return formatedDate;
    }

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
            >
                Ir
            </StyledBtn>
        </StyledBox>
    );
}
