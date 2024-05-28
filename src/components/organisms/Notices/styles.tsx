import styled from '@emotion/styled';
import {
    Box,
    BoxProps,
    Button,
    Paper,
    Typography,
    colors,
} from '@mui/material';
interface StyledBoxProps extends BoxProps {
    available: number;
}

export const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    div {
        display: grid;
        grid-template-columns: 1.3fr 1fr 1fr 0.7fr;
        margin: 5px 0px;
    }
`;

export const StrongTypo = styled(Typography)`
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const StyledBox = styled(Box)<StyledBoxProps>`
    padding: 10px;
    align-items: center;
    background-color: ${(props) =>
        props.available ? colors.green[50] : colors.grey[100]};
`;

export const StyledTypo = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const StyledBtn = styled(Button)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
