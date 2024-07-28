import { VisuallyHiddenInput } from '@/components/organisms/Identification/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Typography } from '@mui/material';
import {
    ChangeEventHandler,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

type SingleFileInputProps = {
    file: File | undefined;
    setFile: Dispatch<SetStateAction<File | undefined>>;
    caption: string;
};

function SingleFileInput({ file, setFile, caption }: SingleFileInputProps) {
    const [inputFile, setInputFile] = useState<string>();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const fileList = event.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
    };

    const renderFiles = (file: File) => {
        if (file) {
            setInputFile(file.name);
        }
    };

    useEffect(() => {
        if (file) renderFiles(file);
    }, [file]);

    return (
        <Box>
            <Button
                component="label"
                role={undefined}
                sx={{
                    marginRight: '10px',
                }}
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Enviar Arquivos
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleChange}
                    accept="pdf image/* !mp4 !bat !txt"
                    multiple
                />
            </Button>
            <Typography component="p" variant="caption">
                {caption}
            </Typography>
            <Typography component="p" variant="body2">
                {inputFile}
            </Typography>
        </Box>
    );
}
export { SingleFileInput };
