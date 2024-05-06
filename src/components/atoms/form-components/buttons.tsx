import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Button, colors } from "@mui/material";

const SaveButton = styled(LoadingButton)({
  backgroundColor: "white",
  border: `1px solid ${colors.green[600]}`,
  color: `${colors.green[600]}`,
  "&:hover": {
    backgroundColor: `${colors.green[700]}`,
    borderColor: `${colors.green[700]}`,
    color: `white`,
  },
});

const HelpButton = styled(Button)({
  backgroundColor: "white",
  border: `1px solid ${colors.yellow[600]}`,
  color: `${colors.yellow[600]}`,
  "&:hover": {
    backgroundColor: `${colors.yellow[700]}`,
    borderColor: `${colors.yellow[700]}`,
    color: `white`,
  },
});

const BackButton = styled(Button)({
  backgroundColor: "white",
  border: `1px solid ${colors.grey[700]}`,
  color: `${colors.grey[600]}`,
  "&:hover": {
    backgroundColor: `${colors.grey[700]}`,
    borderColor: `${colors.grey[700]}`,
    color: `white`,
  },
});
export { SaveButton, HelpButton, BackButton };
