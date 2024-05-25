'use client';

import { useEffect } from 'react';

export default function ErrorHandler({
    error,
    reset,
}: Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
}>) {
    useEffect(() => {}, [error]);

    return (
        <div>
            <h2>something got wrong</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
