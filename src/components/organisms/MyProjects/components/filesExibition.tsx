import { Box, Paper } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';

export default function FileExibition({
    filesUrlsList,
}: {
    filesUrlsList: string[];
}) {
    useEffect(() => {}, []);
    return (
        <Paper sx={{ marginTop: '10px' }}>
            <Box sx={{ paddingLeft: '10px' }}>
                Arquivos enviados pelo proponente
                {filesUrlsList.map((url, index) => {
                    return (
                        <Box
                            sx={{ display: 'block', paddingLeft: '10px' }}
                            key={index}
                        >
                            <Link href={url} target="_blank">
                                arquivo {index + 1}
                            </Link>
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
}
