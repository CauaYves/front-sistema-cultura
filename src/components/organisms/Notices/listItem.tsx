import {
  Box,
  BoxProps,
  Button,
  colors,
  styled,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dayjs from "dayjs";
import { useNotices } from "@/context/notices-context";

type ListItemProps = {
  title: string;
  opening: string;
  ending: string;
};

interface StyledBox extends BoxProps {
  available: boolean;
}

export default function NoticesListItem({
  title,
  opening,
  ending,
}: Readonly<ListItemProps>) {
  const { setModule } = useNotices();
  function isDateGreaterThanToday(dateString: string) {
    const inputDate = dayjs(dateString, "DD/MM/YYYY");
    const today = dayjs();
    return inputDate.isAfter(today);
  }
  const available = isDateGreaterThanToday(opening);

  return (
    <StyledBox available={available}>
      <StyledTypo>{title}</StyledTypo>
      <StyledTypo>{opening}</StyledTypo>
      <StyledTypo>{ending}</StyledTypo>
      <Button
        variant="contained"
        endIcon={<KeyboardArrowRightIcon />}
        disabled={available}
        onClick={() => {
          setModule("subscription");
        }}
      >
        Inscrever-se
      </Button>
    </StyledBox>
  );
}

const StyledBox = styled(Box)<StyledBox>`
  padding: 10px;
  align-items: center;
  background-color: ${(props) =>
    props.available ? colors.grey[100] : colors.green[50]};
`;

const StyledTypo = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
