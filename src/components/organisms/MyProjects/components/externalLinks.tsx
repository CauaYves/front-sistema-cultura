import { Box, Button, Link, Paper } from '@mui/material';
const LINK_CONTRAPARTIDA = 'https://form.jotform.com/241957596455069';

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
