'use client';
import { ContactsProvider } from '@/context/contacts-context';
import { SnackbarProvider } from '@/context/snackbar-context';
import { CollectiveProvider } from '@/context/collective-context';
import { NoticesProvider } from '@/context/notices-context';
import { UserDataProvider } from '@/context/user-context';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SnackbarProvider>
            <ContactsProvider>
                <CollectiveProvider>
                    <NoticesProvider>
                        <UserDataProvider>{children}</UserDataProvider>
                    </NoticesProvider>
                </CollectiveProvider>
            </ContactsProvider>
        </SnackbarProvider>
    );
}
