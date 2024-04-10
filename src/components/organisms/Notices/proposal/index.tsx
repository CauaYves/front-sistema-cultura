import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControlLabel, styled } from "@mui/material";
import { useNotices } from "@/context/notices-context";

export default function Proposal() {
  const { setModule } = useNotices();
  const line1 = "CATEGORIA A - APRESENTAÇÃO DE QUADRILHA JUNINA";
  const line2 = "CATEGORIA B - FESTIVAL DE QUADRILHAS JUNINAS";
  const commitment =
    "Pela presente Declaração, o PROPONENTE aceita que a inscrição pressupõe a prévia e integral aceitação das normas do regulamento do Edital de Credenciamento 01/2024 “ARRAIÁ CULTURAL RJ 4” e de seus respectivos anexos. Além disso, assume a responsabilidade pelo acompanhamento das publicações no Diário Oficial do Estado do Rio de Janeiro (DOERJ) e no endereço eletrônico da Secretaria de Estado de Cultura e Economia Criativa (SECEC). Da mesma forma, o PROPONENTE autoriza à SECEC a utilização e compartilhamento interno, dentre os setores desta Secretaria, dos dados de contato (e-mail e telefone) informados no cadastro do proponente para fins exclusivos de comunicação acerca de ações de finalidades cultural e artística, com fundamento na Lei nº 13.853, de 8 de julho de 2019 (Lei Geral de Proteção de Dados).";
  return (
    <Box>
      <Paper sx={{ padding: "0px 20px 20px 0px" }}>
        <GridBox>
          <FormControl required sx={{ margin: "5px" }}>
            <InputLabel id="line-label">Linha</InputLabel>
            <Select labelId="line-label" label="Linha">
              <MenuItem value={line1}>{line1}</MenuItem>
              <MenuItem value={line2}>{line2}</MenuItem>
            </Select>
          </FormControl>
          <StyledTextField required label="Nome da proposta cultural" />
          <StyledTextField required label="Razão social do proponente" />
          <StyledTextField required label="CNPJ" />
          <StyledTextField required label="CPF do Responsável" />
          <StyledTextField required label="E-mail" />
        </GridBox>
        <Box>
          <ul>
            <li>
              <Typography variant="subtitle1">
                Termo de compromisso de adimplência*
              </Typography>
            </li>
          </ul>
          <Typography variant="subtitle2">
            No presente termo, o PROPONENTE declara que assume o compromisso de
            estar adimplente junto aos órgãos e entidades integrantes da
            Administração Pública Estadual, no ato da contratação.
          </Typography>
          <FormControlLabel
            control={<Checkbox />}
            label="Por ser verdadeiro, firmo o presente Termo, obrigando-me e por meus sucessores a qualquer título."
          />
          <ul>
            <li>
              <Typography variant="subtitle1">
                Termo de compromisso de adimplência*
              </Typography>
            </li>
          </ul>
          <Typography variant="subtitle2">{commitment}</Typography>
          <FormControlLabel
            control={<Checkbox />}
            label="Por ser verdadeira, firmo a presente Declaração, obrigando-me e por meus sucessores a qualquer título."
          />
        </Box>
        <Button variant="contained" onClick={() => setModule("enrollment")}>
          Cadastrar
        </Button>
      </Paper>
    </Box>
  );
}

const StyledTextField = styled(TextField)`
  margin: 5px;
`;

const GridBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
