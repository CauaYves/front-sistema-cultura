"use client";
import { ContactsProvider } from "@/context/contacts-context";
import { SnackbarProvider } from "@/context/snackbar-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SnackbarProvider>
      <ContactsProvider>{children}</ContactsProvider>
    </SnackbarProvider>
  );
}
