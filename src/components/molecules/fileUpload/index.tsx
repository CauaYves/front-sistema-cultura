import { VisuallyHiddenInput } from "@/components/organisms/Identification/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Typography } from "@mui/material";

export default function FileInput({ handleChange, file }: any) {
  return (
    <Box>
      <Button
        component="label"
        role={undefined}
        sx={{
          marginRight: "10px",
        }}
        variant="contained"
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
      {file.map((file: any) => {
        return <Typography key={file}>{file}</Typography>;
      })}
    </Box>
  );
}
