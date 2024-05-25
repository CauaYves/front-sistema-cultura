import { Box, Button, ButtonGroup, Paper, Divider } from '@mui/material';
import { useState } from 'react';
import Subscription from './subscription';
import Legislation from './legislation';
import BidderHandbook from './bidderhandbook';
import { useNotices } from '@/context/notices-context';

type subMdlKeys = 'ins' | 'leg' | 'man';

export default function Info() {
    const [subModule, setSubModule] = useState<subMdlKeys>('ins');
    const { setModule } = useNotices();

    const atualSubModule = {
        ins: <Subscription />,
        leg: <Legislation />,
        man: <BidderHandbook />,
    };
    const subModuleComp =
        atualSubModule[subModule as keyof typeof atualSubModule];

    return (
        <Box>
            <Paper sx={{ padding: '10px' }}>
                <ButtonGroup variant="text">
                    <Button onClick={() => setSubModule('ins')}>
                        inscrições
                    </Button>
                    <Button onClick={() => setSubModule('leg')}>
                        legislações
                    </Button>
                    <Button onClick={() => setSubModule('man')}>
                        manual do proponente
                    </Button>
                </ButtonGroup>
                <Divider sx={{ margin: '10px 0px' }} />
                <Box>{subModuleComp}</Box>
                <Box mt="20px">
                    <Button
                        variant="contained"
                        onClick={() => setModule('proposal')}
                    >
                        Iniciar inscrição
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
