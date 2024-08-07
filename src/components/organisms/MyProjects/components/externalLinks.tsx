import { Box, Button, Link, Paper } from '@mui/material';
const LINK_CONTRAPARTIDA = 'https://form.jotform.com/241957596455069';
const LINK_PRESTACAO = '#';

export default function ExternalLinks() {
    return (
        <Paper sx={{ marginTop: '10px' }}>
            <Box sx={{ padding: '10px' }}>
                <Button>
                    <Link href={LINK_CONTRAPARTIDA}>
                        Insira a Contrapartida e Execução Cultural
                    </Link>
                </Button>
                <Button>
                    <Link href={LINK_PRESTACAO}>
                        Insira a Prestação de Contas
                    </Link>
                </Button>
            </Box>
        </Paper>
    );
}
