import { classificationService } from '@/app/api/classification';
import { TextFieldWrapper } from '@/app/profile/styles';
import { SaveButton, TextInput } from '@/components/atoms';
import { FilePreview, InfiniteFileInput } from '@/components/molecules';
import { SnackbarState } from '@/context/snackbar-context';
import { cloudflareService } from '@/lib/cloudflare';
import { Alert, Box, Paper, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import ClassificationSelect from './classificationSelectInput';

type CreateClassificationProps = {
    token: string;
    setReloadTable: Dispatch<SetStateAction<boolean>>;
};

export default function CreateClassification({
    token,
    setReloadTable,
}: CreateClassificationProps) {
    const [file, setFile] = useState<File[] | undefined>();
    const [filesNames, setFilesNames] = useState<FilePreview[]>();
    const [snackbar, setSnackbar] = useState<SnackbarState>();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const classificationData = {
                noticeNumber: data.get('noticeNumber') as unknown as string,
                projectNumber: data.get('projectNumber') as unknown as string,
                proponentName: data.get('proponentName') as unknown as string,
                attachments: filesNames,
                cpf: data.get('cpf') as unknown as string,
                situation: data.get('situation') as unknown as string,
                category: data.get('category') as unknown as string,
            };
            const response = await classificationService.post(
                token,
                classificationData,
            );
            console.log('response', response);
            await cloudflareService.uploadFiles(response.signedUrlsList, file);

            setSnackbar({
                message: 'Classificação inserida com sucesso! ',
                open: true,
                severity: 'success',
            });
            setReloadTable((prev) => !prev);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Paper>
            <Box
                component="form"
                sx={{
                    padding: '5px',
                    marginBottom: '10px',
                }}
                onSubmit={handleSubmit}
            >
                <Snackbar
                    onClose={() =>
                        setSnackbar((prev) => ({ ...prev!, open: false }))
                    }
                    open={snackbar?.open}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert severity={snackbar?.severity}>
                        {snackbar?.message}
                    </Alert>
                </Snackbar>
                <TextFieldWrapper>
                    <TextInput label="Edital" name="noticeNumber" />
                    <TextInput label="Categoria" name="category" />
                    <TextInput label="Projeto" name="projectNumber" />
                    <TextInput
                        label="Nome do Proponente"
                        name="proponentName"
                    />
                    <TextInput label="CPF" name="cpf" />
                </TextFieldWrapper>
                <TextFieldWrapper>
                    <ClassificationSelect />
                    <Box sx={{ marginLeft: '10px' }}>
                        <InfiniteFileInput
                            files={file}
                            setFiles={setFile}
                            setFilesNames={setFilesNames}
                            caption="Insira todos os arquivos do proponente"
                        />
                    </Box>
                </TextFieldWrapper>
                <Box
                    sx={{
                        display: 'flex',
                        width: '200px',
                        marginLeft: '10px',
                        justifyContent: 'left',
                    }}
                >
                    <SaveButton type="submit">Salvar</SaveButton>
                </Box>
            </Box>
        </Paper>
    );
}
