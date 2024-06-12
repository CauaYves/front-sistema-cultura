import { Box, CssBaseline, styled } from '@mui/material';
import { ReactNode } from 'react';

export default function RootBox({ children }: { children: ReactNode }) {
    return (
        <MainContainer>
            <CssBaseline />
            {children}
        </MainContainer>
    );
}

const MainContainer = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.xl,
    background: '#eeee',
    margin: 'auto',
    minHeight: '100vh',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));
