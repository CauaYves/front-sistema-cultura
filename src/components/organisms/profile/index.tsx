import { useEffect, useState } from "react";
import { appLocalStore } from "@/hooks";
import { Avatar } from "@mui/material";
import { cyan } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ProfileBarProps {
  router: AppRouterInstance;
}

export default function ProfileBar({ router }: Readonly<ProfileBarProps>) {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const sessionData = appLocalStore.get("session");
    setSession(sessionData);
  }, []);

  const handleGoToProfilePage = () => {
    router.push("/profile");
  };

  if (!session) {
    return null;
  }

  const { name } = session.session.user;

  return (
    <List component="nav">
      <ListItemButton onClick={handleGoToProfilePage}>
        <ListItemIcon>
          <Avatar sx={{ bgcolor: cyan[500] }}>{name[0]}</Avatar>
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </List>
  );
}
