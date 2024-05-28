import React, { useEffect, useState } from 'react';
import { SelectFormControl } from '@/components/organisms/Identification/styles';
import { InputLabel, Select, MenuItem } from '@mui/material';
import ibgeService, { County } from '@/app/api/ibge';

interface CountySelectInputProps {
    uf: string;
}

export default function CountySelectInput({ uf }: CountySelectInputProps) {
    const [counties, setCounties] = useState<County[]>([]);
    const [value, setValue] = useState('');
    useEffect(() => {
        async function getCounties() {
            if (!uf) return;
            try {
                const counties = await ibgeService.getCounties(uf);
                setCounties(counties);
            } catch (error) {
                console.error('Error fetching Counties:', error);
            }
        }

        getCounties();
    }, [uf]);

    return (
        <SelectFormControl fullWidth required>
            <InputLabel id="county-select-label">Município</InputLabel>
            <Select
                labelId="county-select-label"
                id="county-select"
                label="Município"
                name="county"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <MenuItem value="">
                    <em>Nenhum</em>
                </MenuItem>
                {counties.map((county) => (
                    <MenuItem key={county.id} value={county.nome}>
                        {county.nome}
                    </MenuItem>
                ))}
            </Select>
        </SelectFormControl>
    );
}
