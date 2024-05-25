import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cultura Barra Mansa',
    description: 'sistema de cultura de barra mansa para agentes culturais',
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <meta name="theme-color" content="#317EFB" />
            <body className={inter.className}>{children}</body>
        </html>
    );
}
