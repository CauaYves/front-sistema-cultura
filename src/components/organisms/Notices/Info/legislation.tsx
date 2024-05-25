import { Box, Link, Typography } from '@mui/material';

export default function Legislation() {
    return (
        <Box>
            <Typography variant="body1">Legislações</Typography>
            <ol>
                <li>
                    <Typography variant="body2">
                        <Link href="http://alerjln1.alerj.rj.gov.br/contlei.nsf/e9589b9aabd9cac8032564fe0065abb4/d9efbccd9957bb9483257e8a005fc958?opendocument#:~:text=institui%20o%20sistema%20estadual%20de,do%20plano%20estadual%20de%20cultura.">
                            Lei Estadual nº 7.035, de 7 de julho de 2015
                        </Link>{' '}
                        – Institui o sistema estadual de cultura do estado do
                        rio de janeiro, o programa estadual de fomento e
                        incentivo a cultura, e apresenta como anexo único as
                        diretrizes e estratégias do plano estadual de cultura.
                    </Typography>
                </li>
                <li>
                    <Typography variant="body2">
                        <Link href="https://legislacao.fazenda.rj.gov.br/wcc/?web_id=wcc292110">
                            Decreto Estadual nº 45.419, de 19 de outubro de 2015
                        </Link>{' '}
                        – Regulamenta o Capítulo I, do Título II, da Lei
                        Estadual n.º 7.035, de 07 de julho de 2015, que institui
                        o Sistema Estadual de Cultura do Estado do Rio de
                        Janeiro, o Programa Estadual de Fomento e Incentivo à
                        Cultura, e apresenta como anexo único as diretrizes e
                        estratégias do Plano Estadual de Cultura, e dá outras
                        providências.
                    </Typography>
                </li>
                <li>
                    <Typography variant="body2">
                        <Link href="https://legislacao.fazenda.rj.gov.br/wcc/?web_id=wcc42000007460">
                            Decreto Estadual n° 46.981, de 19 de março de 2020
                        </Link>{' '}
                        – Regulamenta o Fundo Estadual De Cultura, e dá Outras
                        Providências.
                    </Typography>
                </li>
            </ol>
        </Box>
    );
}
