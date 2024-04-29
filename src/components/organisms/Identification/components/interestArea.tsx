import { FormTitleSection } from "@/components/atoms";
import { Typography, FormControlLabel, Checkbox } from "@mui/material";
import { StyledPaper } from "../styles";

export default function InterestAreaForm() {
  return (
    <StyledPaper>
      <FormTitleSection title="Área de interesse" />
      <Typography variant="body1">Programas</Typography>
      <Typography variant="caption" display="block">
        É importante marcar uma ou mais áreas que deseja receber informações ou
        se inscrever em editais.
      </Typography>
      <FormControlLabel control={<Checkbox />} label="Cultura" name="cultura" />
    </StyledPaper>
  );
}
