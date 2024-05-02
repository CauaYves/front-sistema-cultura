import { VisuallyHiddenInput } from "@/components/organisms/Identification/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Typography } from "@mui/material";
import { ChangeEventHandler, useEffect, useState } from "react";

export type File = {
  name: string;
  lastModified: number;
  lastModifiedDate: number;
  type: string;
  webkitRelativePath: string; // Corrigido para "webkitRelativePath"
};

export interface WebFile extends File {
  length: number;
}

export default function FileInput({ file, setFile }: any) {
  const [inputFile, setInputFile] = useState("");
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileList = event.target.files;
    if (fileList) {
      setFile(fileList);
    }
  };

  const renderFile = (file: WebFile[]) => {
    if (file) {
      setInputFile(file[0].name);
    }
  };
  useEffect(() => {
    renderFile(file);
  });

  return (
    <Box>
      <Button
        component="label"
        role={undefined}
        sx={{
          marginRight: "10px",
        }}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Enviar Arquivo
        <VisuallyHiddenInput
          type="file"
          onChange={handleChange}
          accept="pdf image/* !mp4 !bat !txt"
        />
      </Button>
      <Typography component="p" variant="caption">
        Envie o comprovante de residência
      </Typography>
      {inputFile}
    </Box>
  );
}
