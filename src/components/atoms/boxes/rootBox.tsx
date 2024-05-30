import { Container, styled } from '@mui/material';
import { ReactNode } from 'react';

export default function RootBox({ children }: { children: ReactNode }) {
    return <MainContainer>{children}</MainContainer>;
}

const MainContainer = styled(Container)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.xl,
}));
