import { Box, styled } from '@mui/material';

export const Info = styled(Box)(({ theme }) => ({
    border: '1px solid #00000025',
    borderRadius: '5px',
    padding: theme.spacing(2),
    width: '48%',
    height: '100%',
}));

export const RightInfo = styled(Box)(({ theme }) => ({
    padding: `0px ${theme.spacing(2)}`,
    width: '48%',
}));

export const FlexibleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    background: '#ffffff',
    padding: theme.spacing(2),
    borderRadius: '5px',
}));

export const NoticesForm = styled('form')(({ theme }) => ({
    background: '#ffffff',
    padding: theme.spacing(2),
    borderRadius: '5px',
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
    margin: `${theme.spacing(2)} 0px`,
}));
