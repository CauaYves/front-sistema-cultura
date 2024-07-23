import { Classification } from '@/types';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

export default function ClassificationExibition({
    classifications,
}: {
    classifications: Classification[];
}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <strong>Edital</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Projeto</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Categoria</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Proponente</strong>
                        </TableCell>
                        <TableCell>
                            <strong>CPF/CNPJ</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Situação</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classifications.map(
                        ({
                            id,
                            noticeNumber,
                            category,
                            cpf,
                            projectNumber,
                            proponentName,
                            situation,
                        }) => {
                            return (
                                <TableRow key={id}>
                                    <TableCell component="th">
                                        {noticeNumber}
                                    </TableCell>
                                    <TableCell>{projectNumber}</TableCell>
                                    <TableCell>{category}</TableCell>
                                    <TableCell>{proponentName}</TableCell>
                                    <TableCell>{cpf}</TableCell>
                                    <TableCell>{situation}</TableCell>
                                </TableRow>
                            );
                        },
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
