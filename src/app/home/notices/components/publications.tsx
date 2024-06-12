import { Box, Link, Typography } from '@mui/material';

export default function Publications() {
    return (
        <Box sx={{ paddingLeft: '10px', width: '100%' }}>
            <Typography>
                São todos os documentos que fundamentam os critérios de
                participação do Programa de Incentivo a Cultura do estado do Rio
                de Janeiro.
            </Typography>
            <ol>
                <li>Projetos aprovados/reprovados</li>
                <Typography>2020</Typography>
                <Link>04/05</Link>, <Link>03/07</Link>, <Link>22/07</Link>,
                <Link>04/09</Link>, <Link>15/09</Link>, <Link>24/09</Link>,
                <Link>14/10</Link>, <Link>22/10</Link>, <Link>17/11</Link>,
                <Link>26/11</Link>, <Link>02/12</Link>, <Link>22/12</Link>,
                <Link>23/12</Link>
                <Typography>2021</Typography>
                <Link>01/03</Link>
                <Link>12/03</Link>
                <Link>24/03</Link>
                <li>Projetos incentivados</li>
                <Typography>2020</Typography>
                <Typography>2021</Typography>
                <Typography>2022</Typography>
                <Typography>2023</Typography>
                <Link>23/01</Link>, <Link>24/01</Link>, <Link>17/02</Link>,
                <Link>02/03</Link>, <Link>16/06</Link>, <Link>10/07</Link>,
                <Link>17/07</Link>, <Link>06/08</Link>, <Link>28/09</Link>,
                <Link>01/10</Link>, <Link>23/10</Link>, <Link>03/11</Link>,
                <Link>17/11</Link>, <Link>24/11</Link>, <Link>27/11</Link>,{' '}
                <br />
                <Link>04/12</Link>, <Link>08/12</Link>, <Link>09/12</Link>,
                <Link>11/12</Link>, <Link>15/12</Link>, <Link>18/12</Link>,
                <Link>23/12</Link>, <Link>28/12</Link>, <Link>29/12</Link>
            </ol>
        </Box>
    );
}
