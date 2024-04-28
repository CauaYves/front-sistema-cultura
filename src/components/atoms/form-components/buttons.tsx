import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Button, colors } from "@mui/material";

const SaveButton = styled(LoadingButton)({
  backgroundColor: `${colors.green[700]}`,
  borderColor: `${colors.green[500]}`,
  "&:hover": {
    backgroundColor: `${colors.green[800]}`,
    borderColor: `${colors.green[800]}`,
    boxShadow: "none",
  },
});

const HelpButton = styled(Button)({
  backgroundColor: `${colors.yellow[700]}`,
  borderColor: `${colors.yellow[500]}`,
  color: "white",
  "&:hover": {
    backgroundColor: `${colors.yellow[800]}`,
    borderColor: `${colors.yellow[800]}`,
    boxShadow: "none",
  },
});

const BackButton = styled(Button)({
  backgroundColor: `${colors.grey[700]}`,
  borderColor: `${colors.grey[500]}`,
  color: "white",
  "&:hover": {
    backgroundColor: `${colors.grey[800]}`,
    borderColor: `${colors.grey[800]}`,
    boxShadow: "none",
  },
});
export { SaveButton, HelpButton, BackButton };
