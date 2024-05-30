import { FormTitleSection } from '@/components/atoms';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { StyledPaper, SelectFormControl } from '../styles';
import { ProponentFormProps } from '../types';

export default function ProponentForm({
    handleChange,
    proponent,
}: Readonly<ProponentFormProps>) {
    return (
        <StyledPaper>
            <FormTitleSection title="Tipo de proponente" />

            <SelectFormControl required>
                <InputLabel id="type">Tipo</InputLabel>
                <Select
                    labelId="type"
                    value={proponent}
                    label="Tipo"
                    onChange={handleChange}
                >
                    <MenuItem value={'PF'}>Pessoa física</MenuItem>
                    <MenuItem value={'PJ'}>
                        Pessoa jurídica com fins lucrativos
                    </MenuItem>
                    <MenuItem value={'PJSFL'}>
                        Pessoa jurídica sem fins lucrativos
                    </MenuItem>
                    <MenuItem value={'MEI'}>MEI</MenuItem>
                </Select>
            </SelectFormControl>
        </StyledPaper>
    );
}
