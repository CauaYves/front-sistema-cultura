import { Box, Link, Typography } from '@mui/material';

export default function ProponentManual() {
    return (
        <Box sx={{ paddingLeft: '10px', width: '100%' }}>
            <Typography>
                Clique aqui para fazer download do{' '}
                <Link>Manual do proponente</Link>
                [AINDA NÃO IMPLEMENTADO]
            </Typography>
        </Box>
    );
}
