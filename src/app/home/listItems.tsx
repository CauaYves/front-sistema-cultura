import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContactSupport from "@mui/icons-material/ContactSupport";
import ExitToApp from "@mui/icons-material/ExitToApp";
import FolderIcon from "@mui/icons-material/Folder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export const primaryListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <PermIdentityIcon />
      </ListItemIcon>
      <ListItemText primary="Meus Dados" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary="Projetos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ContactSupport />
      </ListItemIcon>
      <ListItemText primary="Suporte" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </>
);
