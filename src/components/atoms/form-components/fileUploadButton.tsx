import React, { useRef, ChangeEvent } from "react";
import Button from "@mui/material/Button";

interface FileUploadButtonProps {
  onChange: (file: File) => void;
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
      onChange(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button variant="contained" onClick={handleClick}>
        Upload File
      </Button>
    </div>
  );
};

export default FileUploadButton;
