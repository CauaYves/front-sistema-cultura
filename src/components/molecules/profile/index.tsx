import { useUserData } from "@/context/user-context";
import { Avatar, Box, Divider } from "@mui/material";
import { cyan } from "@mui/material/colors";
import Typography from "@mui/material/Typography";


export default function ProfileBar() {
  const { userData } = useUserData();

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: cyan[500] }}>{userData.name[0]}</Avatar>
        <Divider sx={{ margin: "0px 5px" }} />
        <Typography variant="body1">{userData.name}</Typography>
      </Box>
    </Box>
  );
}
