import React, { useEffect, useState } from 'react';
import { SelectFormControl } from '@/components/organisms/Identification/styles';
import { InputLabel, Select, MenuItem } from '@mui/material';
import ibgeService, { UF } from '@/app/api/ibge';

interface UFSelectInputProps {
  uf: string;
  setUf: React.Dispatch<React.SetStateAction<string>>;
}

export default function UfSelectInput({ uf, setUf }: UFSelectInputProps) {
  const [ufs, setUfs] = useState<UF[]>([]);

  useEffect(() => {
    async function getUfs() {
      try {
        const ufs = await ibgeService.getUFs();
        setUfs(ufs);
      } catch (error) {
        console.error('Error fetching UFs:', error);
      }
    }
    getUfs();
  }, []);

  return (
    <SelectFormControl fullWidth required>
      <InputLabel id="uf-select-label">Estado</InputLabel>
      <Select
        labelId="uf-select-label"
        id="uf-select"
        label="Estado"
        name="uf"
        value={uf}
        onChange={(e) => setUf(e.target.value)}
      >
        <MenuItem value="">
          <em>Nenhum</em>
        </MenuItem>
        {ufs.map((uf) => (
          <MenuItem key={uf.id} value={uf.id}>
            {uf.nome}
          </MenuItem>
        ))}
      </Select>
    </SelectFormControl>
  );
}
