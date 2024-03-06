import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import Help from "@mui/icons-material/Help";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/hooks";

export default function SubModules() {
  const router = useRouter();

  return (
    <React.Fragment>
      <ListItemButton
        onClick={async () => {
          await deleteCookie("token");
          router.push("/");
        }}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        <ListItemText primary="Suporte" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Sobre" />
      </ListItemButton>
    </React.Fragment>
  );
}
