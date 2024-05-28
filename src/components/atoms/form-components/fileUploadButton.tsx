import React, { useRef, ChangeEvent } from 'react';
import Button from '@mui/material/Button';

interface FileUploadButtonProps {
    onChange: any;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onChange();
        }
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <Button variant="contained" onClick={handleClick}>
                Upload File
            </Button>
        </div>
    );
};

export default FileUploadButton;
