import { VisuallyHiddenInput } from '@/components/organisms/Identification/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Typography } from '@mui/material';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

export type FilePreview = {
    contentType: string;
    name: string;
};

interface InfiniteFileInput {
    files: File[] | undefined;
    setFiles: Dispatch<SetStateAction<File[] | undefined>>;
    setFilesNames: Dispatch<SetStateAction<FilePreview[] | undefined>>;
    caption: string;
}

function filterFilePreview(fileArray: File[]) {
    const previews = fileArray.map((file) => ({
        contentType: file.type,
        name: file.name,
    }));
    return previews;
}

function InfiniteFileInput({
    files,
    setFiles,
    setFilesNames,
    caption,
}: InfiniteFileInput) {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const fileList = event.target.files;
        if (fileList) {
            const fileArray: File[] = Array.from(fileList);
            const previews = filterFilePreview(fileArray);

            setFilesNames((prevPreviews) => {
                const updatedPreviews = prevPreviews
                    ? [...prevPreviews, ...previews]
                    : previews;
                return updatedPreviews;
            });

            setFiles((prevFiles) => {
                const updatedFiles = prevFiles
                    ? [...prevFiles, ...fileArray]
                    : fileArray;
                return updatedFiles;
            });
        }
    };

    return (
        <Box>
            <Button
                component="label"
                sx={{ marginRight: '10px' }}
                startIcon={<CloudUploadIcon />}
            >
                Enviar Arquivos
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleChange}
                    accept="application/pdf, image/*"
                    multiple
                />
            </Button>
            <Typography component="p" variant="caption">
                {caption}
            </Typography>
            {files &&
                files.map((file, index) => (
                    <Typography key={index} component="p" variant="body2">
                        {file.name}
                    </Typography>
                ))}
        </Box>
    );
}

export { InfiniteFileInput };
