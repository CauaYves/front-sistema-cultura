import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ProfileAppBarProps {
  router: AppRouterInstance;
}

export default function ProfileAppBar({ router }: ProfileAppBarProps) {
  return (
    <AppBar position="absolute" sx={{ maxHeight: "70px" }}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => router.push("/home")}
        >
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
