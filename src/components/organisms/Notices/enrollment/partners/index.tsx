import {
    Box,
    Button,
    MenuItem,
    Select,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Check from '@mui/icons-material/Check';
import Block from '@mui/icons-material/Block';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface Partner {
    id: number;
    name: string;
    cpf: string;
    politicalPosition: boolean;
}

export default function Partners() {
    const [politicalPosition, setPoliticalPosition] = useState('');
    const [partners, setPartners] = useState<Partner[]>([]);
    const [idCounter, setIdCounter] = useState<number>(0);

    const FormStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px',
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const newPartner: Partner = {
            id: idCounter,
            name: data.get('name') as string,
            cpf: data.get('cpf') as string,
            politicalPosition: politicalPosition === 'sim',
        };
        setIdCounter(idCounter + 1); // Incrementa o contador de ID
        setPartners([...partners, newPartner]);
    };

    const handleDelete = (id: number) => {
        setPartners(partners.filter((partner) => partner.id !== id));
    };

    return (
        <Box>
            <Box component="form" onSubmit={handleSubmit} sx={FormStyles}>
                <TextField label="Nome completo" name="name" />
                <TextField label="CPF" name="cpf" />
                <FormControl>
                    <InputLabel id="line-label">
                        Ocupante de cargo Politico?
                    </InputLabel>
                    <Select
                        label="Ocupante de cargo Politico?"
                        value={politicalPosition}
                        onChange={(e) => setPoliticalPosition(e.target.value)}
                    >
                        <MenuItem value="false">Não</MenuItem>
                        <MenuItem value="sim">Sim</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit">
                    Adicionar
                </Button>
            </Box>
            <GridBox>
                <FlexibleBox>
                    <Typography>
                        <strong>Ações</strong>
                    </Typography>
                    <Typography>
                        <strong>Nome</strong>
                    </Typography>
                    <Typography>
                        <strong>CPF</strong>
                    </Typography>
                    <Typography>
                        <strong>Ocupante de cargo político</strong>
                    </Typography>
                </FlexibleBox>
                <Divider />
                {partners.map((p) => {
                    return (
                        <FlexibleBox key={p.id}>
                            <IconButton
                                onClick={() => handleDelete(p.id)}
                                sx={{ width: 'min-content' }}
                            >
                                <Delete color="error" />
                            </IconButton>
                            <Typography>{p.name}</Typography>
                            <Typography>{p.cpf}</Typography>
                            <Typography>
                                {p.politicalPosition ? (
                                    <Check color="success" />
                                ) : (
                                    <Block color="error" />
                                )}
                            </Typography>
                        </FlexibleBox>
                    );
                })}
            </GridBox>
        </Box>
    );
}

const GridBox = styled(Box)`
    display: grid;
    width: 80%;
    margin-top: 50px;
`;
const FlexibleBox = styled(Box)`
    margin: 10px 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; /* Adicionado uma coluna extra para as ações */
    gap: 10px;
    align-items: center;
`;
