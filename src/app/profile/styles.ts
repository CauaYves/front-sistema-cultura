import { LoadingButton } from "@mui/lab";
import { Box, Container, styled } from "@mui/material";

export const ProfileMainContent = styled("div")({
  paddingTop: "120px",
  justifyContent: "center",
  maxWidth: "1200px",
  margin: "auto",
});

export const PessoalInformationBox = styled(Box)({
  borderRadius: "5px",
  padding: "10px",
  border: "1px solid #00000025",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  marginBottom: "10px",

  backgroundImage: "linear-gradient(45deg, #FFFFFF, #1976d2, #FFFFFF)",
});

export const EditableUserInformationsBox = styled("form")(({ theme }) => ({
  borderRadius: "5px",
  padding: "10px",
  border: "1px solid #00000025",
  display: "flex",
  flexDirection: "column",
  minHeight: "180px",
  marginBottom: "10px",

  [theme.breakpoints.down("md")]: {},
}));
export const ProfileContainer = styled(Container)({
  minHeight: "calc(100vh - 80px)",
  minWidth: "100%",
});

export const TextFieldWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "25%",
  margin: "0px 10px 10px 0px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

export const EditingFormProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "10px 0px",

  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const LoadingButtonSx = styled(LoadingButton)({
  width: "100%",
  maxWidth: "300px",
});

export const ButtonWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const CulturalAgentInfosBox = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  padding: "10px",
  border: "1px solid #00000025",
  marginBottom: "10px",

  display: "flex",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },

  div: {
    width: "50%",
  },
  "div:first-of-type": {
    BorderRight: "1px solid #00000025",
  },
}));
