import { classificationService } from '@/app/api/classification';
import LoadingScreen from '@/components/atoms/loaders/screenLoading';
import { Classification } from '@/types';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateClassification from './components/createClassification';
import ClassificationExibition from './components/exibitionClassification';
import FileExibition from './components/filesExibition';

export default function MyProjects() {
    const [classifications, setClassification] = useState<Classification[]>();
    const [filesUrlsList, setFilesUrlsList] = useState<string[]>(['']);
    const [token, setToken] = useState<string>('');
    const [reloadTable, setReloadTable] = useState<boolean>(false);

    async function fetchClassification() {
        const sessionJSON = localStorage.getItem('session');
        if (sessionJSON) {
            const { session } = JSON.parse(sessionJSON);
            const { token } = session;
            setToken(token);
            const response =
                await classificationService.getAllClassificationAndFiles(token);
            setFilesUrlsList(response.urlsList);
            setClassification(response.userClassifications);
        }
    }
    useEffect(() => {
        fetchClassification();
    }, [reloadTable]);
    if (!classifications) return <LoadingScreen open />;
    return (
        <Box>
            <CreateClassification
                token={token}
                setReloadTable={setReloadTable}
            />
            <ClassificationExibition classifications={classifications} />
            <FileExibition filesUrlsList={filesUrlsList} />
        </Box>
    );
}
