import { Box, styled } from '@mui/material';

export const Info = styled(Box)(({ theme }) => ({
    border: '1px solid #00000025',
    borderRadius: '5px',
    padding: theme.spacing(2),
    width: '45%',
}));

export const RightInfo = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    width: '45%',
}));

export const FlexibleBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}));

export const NoticesForm = styled('form')(({ theme }) => ({
    background: '#ffffff',
    padding: theme.spacing(2),
    borderRadius: '5px',
}));
