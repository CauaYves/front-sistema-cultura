import { VisuallyHiddenInput } from '@/components/organisms/Identification/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Typography } from '@mui/material';
import { ChangeEventHandler, useEffect, useState } from 'react';

function FilesInput({ files, setFiles, caption }: any) {
    const [inputFiles, setInputFiles] = useState<string[]>([]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const fileList = event.target.files;
        if (fileList) {
            setFiles(fileList[0]);
        }
    };

    const renderFiles = (files: File[]) => {
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
            {inputFiles.map((fileName, index) => (
                <Typography key={index} component="p" variant="body2">
                    {fileName}
                </Typography>
            ))}
        </Box>
    );
}
export { FilesInput };
