import { VisuallyHiddenInput } from '@/components/organisms/Identification/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Typography } from '@mui/material';
import { ChangeEventHandler, useEffect, useState } from 'react';

export type File = {
    name: string;
    lastModified: number;
    lastModifiedDate: number;
    type: string;
    webkitRelativePath: string;
};

export interface WebFile extends File {
    length: number;
}

function FileInput({ files, setFiles, caption }: any) {
    const [inputFiles, setInputFiles] = useState<string[]>([]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const fileList = event.target.files;
        if (fileList) {
            const fileArray = Array.from(fileList);
            setFiles(fileArray);
        }
    };

    const renderFiles = (files: WebFile[]) => {
        if (files && files.length > 0) {
            setInputFiles(files.map((file) => file.name));
        }
    };

    useEffect(() => {
        renderFiles(files);
    }, [files]);

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
