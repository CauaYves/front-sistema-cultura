"use client";
import { ContactsProvider } from "@/context/contacts-context";
import { SnackbarProvider } from "@/context/snackbar-context";
import { CollectiveProvider } from "@/context/collective-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SnackbarProvider>
      <ContactsProvider>
        <CollectiveProvider>{children}</CollectiveProvider>
      </ContactsProvider>
    </SnackbarProvider>
  );
}
