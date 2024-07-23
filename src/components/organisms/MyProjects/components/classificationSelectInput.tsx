import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { SelectFormControl } from '../../Identification/styles';

export default function ClassificationSelect() {
    const possibleSituations = [
        'Selecionado Cota',
        'Selecionado Item 10.5',
        'Selecionado Ampla Concorrência',
        'Desclassificado',
        'Desclassificado',
        'Desclassificado item 10.4.1',
        'Classificado/Suplente',
        'Classificado/Despriorizado',
        'Classificado/Despriozado 10.2.2',
        'Inabilitado Item 4.4',
    ];
    const [value, setValue] = useState('');
    return (
        <SelectFormControl required sx={{ marginLeft: '10px' }} fullWidth>
            <InputLabel id="situation-select-label">Situação</InputLabel>
            <Select
                fullWidth
                labelId="situation-select-label"
                id="situation-select"
                label="Município"
                name="situation"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <MenuItem value="">
                    <em>Nenhum</em>
                </MenuItem>
                {possibleSituations.map((situation, index) => (
                    <MenuItem key={index} value={situation}>
                        {situation}
                    </MenuItem>
                ))}
            </Select>
        </SelectFormControl>
    );
}
