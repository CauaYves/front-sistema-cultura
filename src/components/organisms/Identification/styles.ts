import { mobalBreakpoint } from '@/constants';
import { Box, FormControl, Paper, styled, TextField } from '@mui/material';

const FlexibleBox = styled(Box)`
    background-color: red;
`;

const StyledTextField = styled(TextField)`
    margin: 0px 5px 5px 0px;
    max-width: 70%;

    @media (max-width: ${mobalBreakpoint}) {
        max-width: 100%;
        width: 100%;
    }
`;
const TextFieldWrapper = styled(Box)`
    max-width: 100%;
    display: flex;
    @media (max-width: ${mobalBreakpoint}) {
        display: block;
        width: 100%;
        max-width: none;
    }
`;

const StyledPaper = styled(Paper)`
    margin: 10px 5px 10px 0px;
    padding: 10px;
    height: 100%;
    max-width: 48%;
    width: 100%;
    @media (max-width: ${mobalBreakpoint}) {
        width: 100%;
        max-width: none;
    }
`;

const PapersContainer = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 0px 0px;
`;

const ButtonsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
`;

const SelectFormControl = styled(FormControl)`
    margin: 0px 5px 5px 0px;
    max-width: 70%;
    @media (max-width: ${mobalBreakpoint}) {
        width: 100%;
        max-width: none;
    }
`;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export {
    StyledTextField,
    TextFieldWrapper,
    StyledPaper,
    PapersContainer,
    ButtonsContainer,
    VisuallyHiddenInput,
    SelectFormControl,
    FlexibleBox,
};
