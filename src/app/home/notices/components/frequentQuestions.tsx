import { Box, Link } from '@mui/material';

const frequentQuestionsList = [
    {
        title: 'QUANTOS PROJETOS PODEM SER INSCRITOS POR PERÍODO DE INSCRIÇÃO?',
        answer: 'Pessoa física e MEI podem inscrever até três projetos. Pessoa jurídica até cinco projetos, observando os limites de valores, conforme anexo VI DA RES. SECEC Nº 89/2020.',
    },
    {
        title: 'É POSSÍVEL INSCREVER PROJETO SEM DIP?',
        answer: 'Sim, conforme previsto no ART. 4 § 1º DA LEI 8266.',
    },
    {
        title: 'PESSOA FÍSICA TAMBÉM PODE INSCREVER PROJETO?',
        answer: 'Sim, é permitida a inscrição de proponente pessoa física e pessoa jurídica, conforme previsto no ART 8º DA RES.SECEC Nº 89/2020.',
    },
    {
        title: 'MEI PODE INSCREVER PROJETO?',
        answer: 'Sim, no entanto, cabe ressaltar que MEI, apesar de ter CNPJ, para fins de apresentação de projeto cultural a receber incentivo fiscal, é considerado pessoa física, conforme jurisprudência do STJ (RESP 487.995/AP, REL. MIN. NANCY ANDRIGHI, 3ª TURMA, J. 20.04.2006, DJ22.05.2006, P. 191) e parecer da assessoria jurídica (SECEC/ASSJUR) Nº 136/2020/SECEC/ASSJUR, processo Nº SEI - 180007/000813/2020.',
    },
    {
        title: 'PROPONENTE DE OUTRO ESTADO PODE INSCREVER PROJETO?',
        answer: 'Não. Somente proponente do estado do Rio de Janeiro.',
    },
    {
        title: 'QUEM PODE PATROCINAR PROJETOS CULTURAIS?',
        answer: 'Empresas contribuintes de ICMS no estado do Rio de Janeiro, podendo ser matriz ou filial.',
    },
    {
        title: 'COMO A EMPRESA APORTA RECURSOS PARA PATROCÍNIO DE PROJETOS CULTURAIS?',
        answer: 'O aporte é composto do valor destinado para o projeto (LEI ESTADUAL Nº 8.266/2018) mais 1/5 para o Fundo Estadual de Cultura – FEC (LEI ESTADUAL Nº 7.035/2015). A empresa terá restituição de 100% referente ao montante destinado (VALOR DO PROJETO + FEC).',
    },
];

export default function FrequentQuestions() {
    return (
        <Box sx={{ paddingLeft: '10px', width: '100%' }}>
            <ol>
                <li>
                    COMO INSCREVER O PROJETO CULTURAL? O projeto deverá ser
                    inscrito através do sistema desenvolve cultural –{' '}
                    <Link href="/home">Clique aqui</Link>
                </li>
                {frequentQuestionsList.map((question) => {
                    return (
                        <li key={question.title}>
                            {question.title}
                            {question.answer}
                        </li>
                    );
                })}
            </ol>
        </Box>
    );
}
