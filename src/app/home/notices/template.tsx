'use client';
import { CollectiveProvider } from '@/context/collective-context';
import { ContactsProvider } from '@/context/contacts-context';
import { SnackbarProvider } from '@/context/snackbar-context';
import { UserDataProvider } from '@/context/user-context';
import { Box, styled } from '@mui/material';

export default function Template({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <RootTemplate>
            <UserDataProvider>
                <SnackbarProvider>
                    <ContactsProvider>
                        <CollectiveProvider>{children}</CollectiveProvider>
                    </ContactsProvider>
                </SnackbarProvider>
            </UserDataProvider>
        </RootTemplate>
    );
}

const RootTemplate = styled(Box)(({ theme }) => ({
    background: '#eeeeee',
}));
