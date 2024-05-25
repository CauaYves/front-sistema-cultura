import PaddingBox from '@/components/atoms/boxes/paddingBox';
import {
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    RadioGroup,
    MenuItem,
    Typography,
    Radio,
    Select,
    styled,
    TextField,
    Paper,
    Button,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import 'dayjs/locale/pt-br';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { FormTitleSection } from '@/components/atoms';
import FileUploadButton from '@/components/atoms/form-components/fileUploadButton';

export default function LegalActs() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [sphere, setSphere] = useState('');
    const [alteration, setAlteration] = useState('');
    const [types, setTypes] = useState('');
    const fieldProps = {
        margin: '5px',
        marginLeft: '0',
    };
    const handleFileChange = (file: File) => {
        setSelectedFile(file);
        // Faça o que você precisa com o arquivo selecionado aqui
    };
    return (
        <PaddingBox>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="pt-br"
            >
                <FormTitleSection title="Identificação" />

                <TripleDiv>
                    <TextField
                        sx={fieldProps}
                        label="Início da vigência"
                        placeholder="numero/ano"
                    />
                    <FormControl sx={{ width: '20%', marginRight: '5px' }}>
                        <InputLabel id="sphere-label">Esfera</InputLabel>
                        <Select
                            labelId="sphere-label"
                            label="Esfera"
                            name="sphere"
                            value={sphere}
                            onChange={(e) => setSphere(e.target.value)}
                            required
                        >
                            <MenuItem value="Federal">Federal</MenuItem>
                            <MenuItem value="Estadual">Estadual</MenuItem>
                            <MenuItem value="Municipal">Municipal</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: '20%', marginRight: '5px' }}>
                        <InputLabel id="type-label">Tipo</InputLabel>
                        <Select
                            labelId="type-label"
                            label="Tipo"
                            name="type"
                            value={types}
                            onChange={(e) => setTypes(e.target.value)}
                            required
                        >
                            <MenuItem value="Atos Administrativos">
                                Atos Administrativos
                            </MenuItem>
                            <MenuItem value="Decreto">Decreto</MenuItem>
                            <MenuItem value="Edital">Edital</MenuItem>
                            <MenuItem value="Erratas">Erratas</MenuItem>
                            <MenuItem value="Lei Complementar">
                                Lei Complementar
                            </MenuItem>
                            <MenuItem value="Lei Ordinaria">
                                Lei Ordinaria
                            </MenuItem>
                            <MenuItem value="Instituicao Normativa">
                                Instituição Normativa
                            </MenuItem>
                            <MenuItem value="Parecer">Parecer</MenuItem>
                            <MenuItem value="Projeto de Lei">
                                Projeto de Lei
                            </MenuItem>
                            <MenuItem value="Resolucao">Resolução</MenuItem>
                        </Select>
                    </FormControl>
                </TripleDiv>
                <TextField fullWidth sx={fieldProps} label="Natureza" />
                <GridBox>
                    <DatePicker sx={fieldProps} label="Ínicio da vigência" />
                    <DatePicker sx={fieldProps} label="Fim da vigência" />
                    <DatePicker sx={fieldProps} label="Data de aprovação" />
                    <DatePicker sx={fieldProps} label="Data de publicação" />
                </GridBox>
                <TextField
                    fullWidth
                    sx={fieldProps}
                    label="Veículo de publicação"
                />
                <TextField fullWidth sx={fieldProps} label="Resumo da ementa" />
                <TextField fullWidth sx={fieldProps} label="Ementa" multiline />
                <TripleDiv>
                    <Typography>Alteração: </Typography>
                    <RadioGroup
                        row
                        aria-labelledby="studentLabel"
                        name="student"
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="Sim"
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="Não"
                        />
                    </RadioGroup>
                    <FormControl sx={{ width: '20%', marginRight: '10px' }}>
                        <InputLabel id="alteration-label">
                            Tipo de alteração
                        </InputLabel>
                        <Select
                            labelId="alteration-label"
                            label="Tipo de alteração"
                            name="alteration"
                            value={alteration}
                            onChange={(e) => setAlteration(e.target.value)}
                            required
                        >
                            <MenuItem value="Alterada">Alterada</MenuItem>
                            <MenuItem value="Revogada">Revogada</MenuItem>
                        </Select>
                    </FormControl>
                </TripleDiv>
                <Box>
                    <Paper sx={{ padding: '10px' }}>
                        <FormTitleSection title="Ato legal alterado" />
                        <Typography>Anexo do ato legal</Typography>
                        <FileUploadButton onChange={handleFileChange} />
                        {selectedFile && (
                            <p>
                                Arquivo selecionado:{' '}
                                <strong>{selectedFile.name}</strong>
                            </p>
                        )}
                    </Paper>
                </Box>
                <br />
                <Box>
                    <Paper sx={{ padding: '10px' }}>
                        <FormTitleSection title="Ato legal alterado" />
                        <TextField sx={fieldProps} label="numero / ano" />
                        <Button variant="outlined" sx={{ display: 'block' }}>
                            adicionar
                        </Button>
                    </Paper>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '30px 0px 100px 0px',
                    }}
                >
                    <Button variant="contained">Confirmar</Button>
                </Box>
            </LocalizationProvider>
        </PaddingBox>
    );
}

const TripleDiv = styled(Box)`
    display: flex;
    align-items: center;
`;

const GridBox = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;
