import { noticeService } from '@/app/api';
import { FileInput, SaveButton, WebFile } from '@/components';
import LoadingScreen from '@/components/atoms/loaders/screenLoading';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    styled,
} from '@mui/material';
import { useState } from 'react';
import { noticeSlugServices } from '../[id]/services';

export default function ReviewInfo({ urlSearchParams, notice }: any) {
    const { transformObject } = noticeSlugServices;
    const [files, setFiles] = useState<WebFile[][]>([]);

    if (!notice) return <LoadingScreen open />;
    const searchParamsParsed = transformObject(urlSearchParams, notice.id);
    const handleFilesChange = (index: number, newFiles: WebFile[]) => {
        const updatedFiles = [...files];
        updatedFiles[index] = newFiles;
        setFiles(updatedFiles);
    };
    async function handleSubmit() {
        const body = searchParamsParsed;
        files.forEach((file) => {
            body.proposal.attachments.push({
                name: file[0].name,
                contentType: file[0].type,
            });
        });
        console.log(body);
        const sessionJSON = localStorage.getItem('session');
        if (sessionJSON) {
            const { session } = JSON.parse(sessionJSON);
            const { token } = session;
            const response = await noticeService.createNotice(token, body);
            console.log(response);
        }
    }

    return (
        <ReviewBox>
            <Typography>
                Para finalizar a inscrição envie os arquivos abaixo:
            </Typography>
            <List>
                {notice &&
                    notice.uploads.map((upload: string, index: number) => (
                        <ListItem key={index}>
                            <ListItemText primary={upload} />
                            <Box sx={{ background: 'white', width: '20%' }}>
                                <FileInput
                                    files={files[index] || []}
                                    caption=""
                                    setFiles={(newFiles: WebFile[]) =>
                                        handleFilesChange(index, newFiles)
                                    }
                                />
                            </Box>
                            {files[index] ? (
                                <CheckCircleOutlineIcon
                                    sx={{ width: '20%', color: 'green' }}
                                />
                            ) : (
                                <ErrorOutlineIcon
                                    sx={{ width: '20%', color: 'red' }}
                                />
                            )}
                        </ListItem>
                    ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <SaveButton onClick={() => handleSubmit()}>
                    Enviar Proposta
                </SaveButton>
            </Box>
        </ReviewBox>
    );
}

const ReviewBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));
