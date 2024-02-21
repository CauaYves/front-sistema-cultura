import { ModulesKey } from "@/app/home/page";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";

interface subModuleProps {
  children: ReactNode;
  tag: string;
  setSelectedModule: React.Dispatch<React.SetStateAction<ModulesKey>>;
  name: ModulesKey;
}

function SubModule({ children, tag, setSelectedModule, name }: subModuleProps) {
  return (
    <ListItemButton
      onClick={() => {
        setSelectedModule(name);
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: "40px",
        }}
      >
        {children}
      </ListItemIcon>
      <ListItemText primary={tag} />
    </ListItemButton>
  );
}
export { SubModule };
