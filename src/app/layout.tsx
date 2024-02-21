import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ModuleContextProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cultura Barra Mansa",
  description: "sistema de cultura de barra mansa para agentes culturais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ModuleContextProvider>
        <body className={inter.className}>{children}</body>
      </ModuleContextProvider>
    </html>
  );
}
