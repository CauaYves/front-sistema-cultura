"use client";
import { ContactsProvider } from "@/context/contacts-context";
import { SnackbarProvider } from "@/context/snackbar-context";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
