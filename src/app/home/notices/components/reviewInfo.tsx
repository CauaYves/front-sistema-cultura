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
import { ReviewInfoProps } from '../types';

export default function ReviewInfo({
    urlSearchParams,
    notice,
    setSnackbar,
}: ReviewInfoProps) {
    const { transformObject, handleError } = noticeSlugServices;
    const [files, setFiles] = useState<WebFile[][]>([]);
    const [loading, setLoading] = useState(false);
    if (!notice) return <LoadingScreen open />;
    const searchParamsParsed = transformObject(urlSearchParams, notice.id);
    const handleLoading = (bool: boolean) => {
        setLoading(bool);
    };
    async function handleSubmit() {
        const body = searchParamsParsed;
        files.forEach((file) => {
            body.proposal.attachments.push({
                name: file[0].name,
                contentType: file[0].type,
            });
        });
        const sessionJSON = localStorage.getItem('session');
        if (sessionJSON) {
            const { session } = JSON.parse(sessionJSON);
            const { token } = session;
            handleLoading(true);
            const promise = noticeService.createNotice(token, body);
            handleLoading(false);
            promise
                .then(() => {
                    // const signedUrls: WebFile[] = res.data;
                    setSnackbar({
                        message: 'Proposta enviada com sucesso! ',
                        open: true,
                        severity: 'success',
                    });
                    //TODO Enviar arquivos atraves de urls assinadas recebidas
                })
                .catch((error) => {
                    const message = handleError(error);
                    setSnackbar({
                        message,
                        open: true,
                        severity: 'warning',
                    });
                });
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
                                    file={files[index] || []}
                                    caption=""
                                    setFile={setFiles}
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
                <SaveButton loading={loading} onClick={() => handleSubmit()}>
                    Enviar Proposta
                </SaveButton>
            </Box>
        </ReviewBox>
    );
}

const ReviewBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));
