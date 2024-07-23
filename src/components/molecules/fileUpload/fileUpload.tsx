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

export type File = {
    name: string;
    lastModified: number;
    lastModifiedDate: Date;
    type: string;
    webkitRelativePath: string;
};

export interface WebFile extends File {
    length: number;
}

export interface FileInputProps {
    file: WebFile[] | undefined;
    setFile: Dispatch<SetStateAction<WebFile[][]>>;
    caption: string;
}

export type FilePreview = {
    contentType: string;
};

function FileInput({ file, setFile, caption }: FileInputProps) {
    const [inputFiles, setInputFiles] = useState<string[]>([]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const fileList = event.target.files;
        if (fileList) {
            const fileArray: WebFile[] = Array.from(fileList).map((file) => ({
                name: file.name,
                lastModified: file.lastModified,
                lastModifiedDate: new Date(file.lastModified),
                type: file.type,
                webkitRelativePath: file.webkitRelativePath,
                length: file.size,
            }));
            setFile([fileArray]);
        }
    };

    const renderFiles = (files: WebFile[] | undefined) => {
        if (files && files.length > 0) {
            setInputFiles(files.map((file) => file.name));
        }
    };

    useEffect(() => {
        renderFiles(file);
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
                Enviar Arquivo
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
            {inputFiles.map((fileName, index) => (
                <Typography key={index} component="p" variant="body2">
                    {fileName}
                </Typography>
            ))}
        </Box>
    );
}

export { FileInput };
