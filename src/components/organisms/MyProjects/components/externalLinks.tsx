import { Box, Button, Link, Paper } from '@mui/material';
const LINK_CONTRAPARTIDA = 'http://www.indicacultural.com.br/Contrapartida';

export default function ExternalLinks() {
    return (
        <Paper sx={{ marginTop: '10px' }}>
            <Box
                sx={{
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button variant="contained">
                    <Link href={LINK_CONTRAPARTIDA} sx={{ color: '#FFFFFF' }}>
                        Insira a Contrapartida e Execução Cultural
                    </Link>
                </Button>
            </Box>
        </Paper>
    );
}
