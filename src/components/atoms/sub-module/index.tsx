import { useTheme } from "@mui/material/styles";
import { ModulesKey } from "@/app/home/page";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";

interface SubModuleProps {
  children: ReactNode;
  tag: string;
  selectedModule: string;
  setSelectedModule: React.Dispatch<React.SetStateAction<ModulesKey>>;
  name: ModulesKey;
}

function SubModule({
  children,
  tag,
  selectedModule,
  setSelectedModule,
  name,
}: Readonly<SubModuleProps>) {
  const theme = useTheme();
  const backgroundColor =
    selectedModule === name ? theme.palette.primary.light : "inherit";

  return (
    <ListItemButton
      sx={{
        background: backgroundColor,
        "&:hover": {
          background: theme.palette.primary.light,
        },
      }}
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
