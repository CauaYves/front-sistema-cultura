import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    Button,
    Typography,
    colors,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { noticeSlugServices } from '../[id]/services';
import {
    AccordionSummaryStld,
    ButtonBox,
    RightInfo,
    StyledBox,
} from '../[id]/styles';
import { SubscriptionProps } from '../types';

export default function Subscription({
    router,
    userPF,
    userPJ,
    searchParams,
}: SubscriptionProps) {
    const haveUserPF = !userPF ? true : false;
    const haveUserPJ = !userPJ ? true : false;
    const { incrementAtualStep } = noticeSlugServices;
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <RightInfo>
            <Typography variant="body1">
                Para enviar um proposta a este edital, clique em uma das opções
                abaixo para selecionar uma das formas de ingresso
            </Typography>
            <ButtonBox>
                <Button
                    variant="outlined"
                    disabled={haveUserPF}
                    onClick={() =>
                        incrementAtualStep('0', searchParams, router, {
                            culturalAgentId: `${userPF?.id}`,
                            personType: 'pf',
                        })
                    }
                    sx={{ marginRight: '10px' }}
                >
                    pessoa fisica
                </Button>
                <Button
                    variant="outlined"
                    disabled={haveUserPJ}
                    onClick={() =>
                        incrementAtualStep('0', searchParams, router, {
                            culturalAgentId: `${userPJ?.id}`,
                            personType: 'pf',
                        })
                    }
                >
                    pessoa juridica
                </Button>
            </ButtonBox>
            <Typography variant="body2">
                Secretária da Cultura e Economia Criativa do Rio de Janeiro, no
                uso de suas atribuições legais, e considerando LEI Nº 7.035/2015
                – Institui o Sistema Estadual de Cultura do Estado do Rio de
                Janeiro, o Programa Estadual de Fomento e Incentivo a Cultura,
                bem como às demais legislações aplicadas à matéria, torna
                público o processo de inscrição e seleção pública que é
                regulamentada pela
                <Link
                    href="http://cultura.rj.gov.br/wp-content/uploads/2020/08/12.08.2020-Resolu%C3%A7%C3%A3o-SECEC-N-89-compilada-Inscri%C3%A7%C3%B5es-de-projetos-culturais.pdf"
                    target="_blank"
                >
                    Resolução SECEC Nº 89, de julho de 2020
                </Link>
            </Typography>
            <StyledBox>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummaryStld
                        expandIcon={
                            <ExpandMoreIcon sx={{ color: colors.blue[600] }} />
                        }
                        aria-controls={`panel1-content`}
                        id={`panel1-header`}
                    >
                        Sistema de Inscrições
                    </AccordionSummaryStld>
                    <AccordionDetails>
                        <Typography variant="body2">
                            O cadastramento de projetos será realizado através
                            do Sistema Culturalize (Pessoa Física ou Pessoa
                            Jurídica) e Inscrição de Projeto Para efetuar a
                            inscrição de projetos, basta concluir o
                            cadastramento do proponente e do projeto, não sendo
                            necessário o envio físico de qualquer documentação.
                            Endereço de email: lic.certifica@cultura.rj.gov.br
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <AccordionSummaryStld
                        expandIcon={
                            <ExpandMoreIcon sx={{ color: colors.blue[600] }} />
                        }
                        aria-controls={`panel2-content`}
                        id={`panel2-header`}
                    >
                        Passo a passo
                    </AccordionSummaryStld>
                    <AccordionDetails>
                        <ul>
                            <li>Faça download do Manual do Proponente</li>
                            <li>
                                Tenha em mãos os dados do proponente e do
                                projeto
                            </li>
                            <li>Faça o Cadastro do Proponente</li>
                            <li>
                                Selecione o perfil do proponente (pessoa física
                                ou pessoa jurídica)
                            </li>
                            <li>
                                Depois acesse “Iniciar processo de inscrição”
                            </li>
                            <li>
                                Anexe os Documentos Obrigatórios e a
                                Documentação Complementar
                            </li>
                            <li>
                                Clique em {'Concluir'} para enviar a inscrição
                                do projeto;
                            </li>
                            <li>
                                Imprima o comprovante de inscrição e os
                                cadastros do proponente e do projeto para seu
                                arquivo
                            </li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Typography mt={2} mb={2}>
                    Anexos obrigatórios
                </Typography>
                <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <AccordionSummaryStld
                        expandIcon={
                            <ExpandMoreIcon sx={{ color: colors.blue[600] }} />
                        }
                        aria-controls={`panel3-content`}
                        id={`panel3-header`}
                    >
                        Documentação do Proponente Pessoa Física
                    </AccordionSummaryStld>
                    <AccordionDetails>
                        <ol>
                            <li>RG e CPF;</li>
                            <li>
                                Comprovante de residência dos últimos 3 (três)
                                meses;
                            </li>
                            <li>
                                Certidão negativa ou positiva com efeitos de
                                negativa da Procuradoria Geral do Estado;
                            </li>
                            <li>
                                Certidão de Regularidade Fiscal emitida pela
                                Secretaria de Estado de Fazenda e Planejamento;
                            </li>
                            <li>
                                Certidão Negativa de Débitos Trabalhistas
                                (CNDT);
                            </li>
                            <li>
                                Certidão Negativa de Débitos Relativos aos
                                Tributos Federais e à Dívida Ativa da União;
                            </li>
                        </ol>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel4'}
                    onChange={handleChange('panel4')}
                >
                    <AccordionSummaryStld
                        expandIcon={
                            <ExpandMoreIcon sx={{ color: colors.blue[600] }} />
                        }
                        aria-controls={`panel4-content`}
                        id={`panel4-header`}
                    >
                        Documentação do Proponente Pessoa Jurídica
                    </AccordionSummaryStld>
                    <AccordionDetails>
                        <ol>
                            <li>
                                Cópia do Contrato Social ou Estatuto Social com
                                última alteração/última ata;
                            </li>
                            <li>
                                Cópia do RG e CPF do dirigente ou representante
                                legal do proponente;
                            </li>
                            <li>
                                Comprovante de inscrição e de situação cadastral
                                no CNPJ;
                            </li>
                            <li>
                                Certificado de regularidade de situação relativa
                                ao FGTS;
                            </li>
                            <li>
                                Certidão negativa ou positiva com efeitos de
                                negativa da Procuradoria Geral do Estado;
                            </li>
                            <li>
                                Certidão de Regularidade Fiscal emitida pela
                                Secretaria de Estado de Fazenda e Planejamento;
                            </li>
                            <li>
                                Certidão Negativa de Débitos Trabalhistas
                                (CNDT);
                            </li>
                            <li>
                                Certidão Negativa de Débitos Relativos aos
                                Tributos Federais e à Dívida Ativa da União
                            </li>
                        </ol>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel5'}
                    onChange={handleChange('panel5')}
                >
                    <AccordionSummaryStld
                        expandIcon={
                            <ExpandMoreIcon sx={{ color: colors.blue[600] }} />
                        }
                        aria-controls={`panel5-content`}
                        id={`panel5-header`}
                    >
                        Documentação do Projeto – Modelos em downloads
                    </AccordionSummaryStld>
                    <AccordionDetails>
                        <ol>
                            <li>
                                <Link
                                    target="_blank"
                                    href="https://drive.google.com/file/d/12JtAS2Rx-BuQjBp8EbEyFWIopb2A_KVV/view"
                                >
                                    Planilha orçamentária
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target="_blank"
                                    href="https://drive.google.com/file/d/1xF8jyF9huCHkcTgfJq0QIa9SUZBKByOj/view"
                                >
                                    Cronograma
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target="_blank"
                                    href="https://drive.google.com/file/d/1wkvJoQS1cx3qy5V6c5bCjLCOtsCQL-7H/view"
                                >
                                    Plano de distribuição
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target="_blank"
                                    href="https://drive.google.com/file/d/1h5pnAEtIq2ZvyzVd5Vij8jfiTI_xCepJ/view"
                                >
                                    Plano de divulgação
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target="_blank"
                                    href="https://drive.google.com/file/d/1o59g9IdeUJf5gzeK1C6U4LeM3G93uPup/view"
                                >
                                    Plano Metodológico (Projetos Continuados e
                                    Projetos acima de R$ 1,5 milhão)
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target="_blank"
                                    href="https://drive.google.com/file/d/13j4KxlZKl3C_ZBDhka_5ex6XbgqhB-X3/view"
                                >
                                    Declaração de intenção de patrocínio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target="_blank"
                                    href="https://drive.google.com/file/d/1M1juh4EHR6yRRyaTRaKKkBI3EuSI_cAZ/view"
                                >
                                    Declaração de patrocínio
                                </Link>
                            </li>
                        </ol>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel6'}
                    onChange={handleChange('panel6')}
                >
                    <AccordionSummaryStld
                        expandIcon={
                            <ExpandMoreIcon sx={{ color: colors.blue[600] }} />
                        }
                        aria-controls={`panel6-content`}
                        id={`panel6-header`}
                    >
                        Documentação do Projeto
                    </AccordionSummaryStld>
                    <AccordionDetails>
                        <ol>
                            <li>
                                Documentos que comprovem a anuência de artistas
                                envolvidos no projeto;
                            </li>
                            <li>
                                Autorização dos órgãos competentes para a
                                liberação de espaço, no caso de projeto que se
                                realize em locais públicos;
                            </li>
                            <li>
                                Documentos que comprovem a anuência de espaços
                                culturais privados, tais como teatros, casas de
                                shows, centros culturais e afins, no caso de
                                projeto que se realize nesses espaços;
                            </li>
                            <li>
                                Contrato de agenciamento, no caso de projeto que
                                preveja despesas relativas à captação de
                                recursos, acompanhado de contrato social e
                                currículo da empresa prestadora do serviço, ou
                                documentação de identificação (RG e CPF) e
                                currículo da pessoa física contratada;
                            </li>
                            <li>
                                Autorização dos órgãos responsáveis pelo
                                tombamento ou preservação, no caso de obra de
                                restauração e conservação;
                            </li>
                            <li>
                                Autorização do proprietário, no caso de
                                aquisição de obras, coleções e acervos e
                                projetos de obra de restauração de patrimônio
                                tombado;
                            </li>
                            <li>
                                Autorização da instituição pública que irá
                                receber a doação de obras, coleções e acervos
                                através da Lei Estadual de Incentivo à Cultura;
                            </li>
                            <li>
                                Autorização dos proprietários dos direitos
                                autorais e conexos pertinentes à realização do
                                projeto cultural, quando for o caso;
                            </li>
                            <li>
                                Documento de posse ou de direito de uso do
                                imóvel, no caso de implantação de equipamento
                                cultural;
                            </li>
                            <li>
                                Inventário acompanhado de laudo técnico, no caso
                                de aquisição de obras, coleções e acervos;
                            </li>
                            <li>
                                Planejamento metodológico de formação cultural,
                                no caso de projeto que envolva atividades de
                                formação na área de Cultura;
                            </li>
                            <li>
                                No caso de receita líquida totalmente revertida
                                para o espaço de realização do projeto, conforme
                                previsto no item 8.3.2, deverá ser apresentado
                                contrato demonstrando os acordos entre as
                                partes.;
                            </li>
                            <li>
                                Contrato de locação de imóvel, registrado em
                                cartório, no caso de despesa prevista para
                                projetos de programação anual e/ou manutenção de
                                equipamento cultural;
                            </li>
                            <li>
                                Todos os projetos de produção audiovisual
                                financiados com recursos públicos federais
                                geridos pela ANCINE deverão anexar o orçamento
                                aprovado no campo documentação complementar da
                                ficha de inscrição do projeto;
                            </li>
                            <li>
                                Anteprojeto da obra contendo, no mínimo, planta
                                de situação, plantas de todos os pavimentos,
                                planta de cobertura, corte transversal e
                                longitudinal e fachadas diferenciando partes a
                                demolir, a manter e a construir no caso de
                                projetos de obras de restauração de patrimônio
                                tombado;
                            </li>
                            <li>
                                Memorial descritivo, diagnóstico do estado de
                                conservação do bem, incluindo mapeamento de
                                danos no caso de projetos de obras de
                                restauração de patrimônio tombado;
                            </li>
                        </ol>
                    </AccordionDetails>
                </Accordion>
            </StyledBox>
        </RightInfo>
    );
}
