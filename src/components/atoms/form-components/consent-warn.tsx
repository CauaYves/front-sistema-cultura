import { Typography } from "@mui/material";

function ConsentWarn() {
  const link =
    "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm";
  return (
    <Typography variant="body2">
      Ao autorizar a publicação dos meus dados ao público, estou ciente que abro
      mão dos direitos a privacidade de informações confidenciais regidas pela{" "}
      <a href={link}>lei geral de proteção de dados pessoais (LGPD)</a>
      ,após autorizar a publicidade dos seus dados, os dados não sensíveis
      ficarão visíveis a criadores de projetos culturais, tornando assim mais
      fácil a busca por realizadores desse projetos, dados como RG, CPF,
      endereço e data de nascimento <strong>nunca ficarão visíveis</strong>.
      Mesmo após autorizar a publicação dos dados ao público, poderá retirar o
      seu consentimento a qualquer momento na aba [aba] {">"} [opção].
    </Typography>
  );
}

export { ConsentWarn };
