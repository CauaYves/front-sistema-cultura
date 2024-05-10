import { Avatar, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { PessoalInformationBox } from "./styles";

type PessoalInformationProps = {
  name: string;
  email: string;
};

export default function PessoalInformation({
  name,
  email,
}: PessoalInformationProps) {
  return (
    <PessoalInformationBox>
      <Avatar sx={{ bgcolor: blue[500], width: 74, height: 74 }}>
        {name[0]}
        {name[1]}
      </Avatar>
      <Typography variant="h5" sx={{ color: "white" }}>
        {name}
      </Typography>
      <Typography variant="body1" sx={{ color: "white" }}>
        {email}
      </Typography>
    </PessoalInformationBox>
  );
}
