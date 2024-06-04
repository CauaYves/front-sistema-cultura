import { Box, styled } from '@mui/material';

function ButtonBox({ children }: any) {
    return <StyledBox>{children}</StyledBox>;
}

const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
});

const ButtonWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    button: {
        marginRight: theme.spacing(1),
    },
}));
export { ButtonBox, ButtonWrapper };
