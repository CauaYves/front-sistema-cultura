'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ErrorHandler({
    error,
    reset,
}: Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
}>) {
    const router = useRouter();

    useEffect(() => {
        if (error.cause === 'invalid_token') {
            router.push('/');
        }
    }, [error, router]);

    useEffect(() => {
        console.error('Error received:', error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
