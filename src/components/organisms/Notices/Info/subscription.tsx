import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Subscription() {
    return (
        <Box>
            <Typography variant="body1" sx={{ mb: '10px' }}>
                Inscrições
            </Typography>
            <Typography variant="body1">
                Edital de credenciamento de Pessoas Jurídicas para realização de
                apresentações e festivais de Quadrilhas Juninas, no formato
                presencial, obrigatoriamente no Estado do Rio de Janeiro. A
                previsão desta Chamada é credenciar 115 (cento e quinze)
                proponentes que apresentem propostas adequadas às seguintes
                categorias:
            </Typography>
            <br />
            <Typography variant="body1">
                CATEGORIA A - APRESENTAÇÃO DE QUADRILHA JUNINA, no valor de R$
                50.000,00 (cinquenta mil reais) cada.
            </Typography>
            <Typography variant="body1" mb="20px">
                CATEGORIA B - FESTIVAL DE QUADRILHAS JUNINAS, no valor de R$
                150.000,00 (cento e cinquenta mil reais) cada.
            </Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Sistema de inscrições
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        O cadastramento das propostas culturais será realizado
                        através do Sistema Desenvolve Cultura, mediante Cadastro
                        do Proponente (Pessoa Jurídica) e Cadastro da Proposta
                        Cultural.Para efetuar a inscrição, basta concluir o
                        Cadastro do Proponente (Pessoa Jurídica) e o Cadastro da
                        Proposta Cultural, não sendo necessário o envio físico
                        de qualquer documentação. Informações e esclarecimentos
                        de dúvidas: exemplo@cultura.rj.gov.br
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    Passo a passo
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>
                            <Typography variant="body2">
                                Faça download do Edital e do Manual do
                                Proponente. Leia com atenção os dois documentos.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Tenha em mãos os dados do proponente, do
                                responsável pela execução e da proposta.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Faça o Cadastro do Proponente, selecionando
                                Pessoa Jurídica.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Acesse a página “Inscreva-se” no menu à
                                esquerda.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Selecione “Arraiá Cultural RJ 4”.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Clique em “Iniciar processo de inscrição”.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Preencha o formulário do Cadastro do Proponente
                                e Cadastro da Proposta.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Anexe os documentos obrigatórios.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Clique em &ldquo;Gravar&ldquo; para salvar todos
                                os dados preenchidos.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Acesse a página “Meus Projetos” no menu à
                                esquerda.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Clique em “Finalizar a inscrição” para submeter
                                a inscrição da proposta.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Revise os dados da proposta.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Estando todos os dados completos e corretos,
                                clique em “Enviar projeto para análise”. A
                                inscrição somente será concluída após esta
                                etapa.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Imprima o comprovante de inscrição e os
                                Cadastros do Proponente e da Proposta para seu
                                arquivo.
                            </Typography>
                        </li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Anexos
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        Os modelos dos anexos a serem enviados encontram-se na
                        aba &ldquo;Publicações&ldquo; Obrigatórios:
                    </Typography>
                    <ol>
                        <li>
                            <Typography variant="body2">
                                Cadastro Nacional da Pessoa Jurídica / Ficha de
                                Informações Cadastrais (Cartão de Inscrição
                                Estadual) - CNPJ
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Cópia da Identidade do Responsável pela Execução
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Cópia do CPF do Responsável pela Execução* -
                                CCRE
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Declaração de Direitos Autorais e Autorização de
                                Uso de Conteúdo do Relatório de Execução da
                                Contrapartida - Documento conforme modelo
                                disponível no ANEXO 05
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                DECLARAÇÃO DE PARTICIPAÇÃO DE MENORES DE 18 ANOS
                                (ANEXO 14) -
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                DOCUMENTO DE REPRESENTAÇÃO DA QUADRILHA JUNINA E
                                APRESENTAÇÃO DA PROPOSTA - contendo a
                                identificação e a assinatura dos integrantes
                                da(s) QUADRILHA(S) JUNINA(S), afirmando a
                                representação do PROPONENTE para fins da
                                execução da PROPOSTA CULTURAL inscrita nesta
                                Chamada Emergencial, conforme modelos
                                disponíveis para cada Categoria no ANEXO 04 e
                                ANEXO 05.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Planilha Orçamentária
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Cronograma de execução
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Comprovação de Atuação Cultural - CAC
                            </Typography>
                        </li>
                    </ol>
                    <Typography variant="body1">Opcionais:</Typography>
                    <ol>
                        <li>
                            <Typography variant="body2">
                                Cópia da Ata de Eleição ou Última Alteração
                                Contratual (exceto MEI)
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                CÓPIA SIMPLES DO CONTRATO ou ESTATUTO SOCIAL
                                (exceto para MEI) - Documento que comprove
                                atividade cultural da empresa e seu Responsável
                                Legal (exceto para MEI).
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Declaração de Uso do Nome Social
                            </Typography>
                        </li>
                    </ol>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
