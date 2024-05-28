'use client';
import { CollectiveProvider } from '@/context/collective-context';
import { ContactsProvider } from '@/context/contacts-context';
import { SnackbarProvider } from '@/context/snackbar-context';
import { UserDataProvider } from '@/context/user-context';

export default function Template({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <UserDataProvider>
            <SnackbarProvider>
                <ContactsProvider>
                    <CollectiveProvider>{children}</CollectiveProvider>
                </ContactsProvider>
            </SnackbarProvider>
        </UserDataProvider>
    );
}
