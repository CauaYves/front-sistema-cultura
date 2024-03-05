"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mobalBreakpoint } from "@/constants";
import Indentification from "@/components/organisms/Identification";
import SidebarModules from "@/components/molecules/sidebar/modules";
import SubModules from "../../components/molecules/sidebar/sub-modules";
import Localization from "@/components/organisms/Localization";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const OrganismWrapper = styled(Box)`
  padding: 100px 30px;

  @media (max-width: ${mobalBreakpoint}) {
    padding: 100px 0;
  }
`;

interface OrganismObjects {
  [key: string]: React.ReactNode;
}

export type ModulesKey =
  | "identification"
  | "location"
  | "contacts"
  | "professionalData"
  | "culturalColective"
  | "imagesAndLinks"
  | "documents"
  | "authorizedUsers"
  | "notices"
  | "billings"
  | "alreadyIncentived"
  | "searchProject"
  | "queue"
  | "support"
  | "about";

const organismObjects: OrganismObjects = {
  identification: <Indentification />,
  location: <Localization />,
  contacts: <p>contacts</p>,
  professionalData: <p>professionalData</p>,
  culturalColective: <p>culturalColective</p>,
  imagesAndLinks: <p>imagesAndLinks</p>,
  documents: <p>documents</p>,
  authorizedUsers: <p>authorizedUsers</p>,
  notices: <p>notices</p>,
  alreadyIncentived: <p>alreadyIncentived</p>,
  searchProject: <p>searchProject</p>,
  queue: <p>queue</p>,
  support: <p>support</p>,
  about: <p>about</p>,
  billings: <p>billings</p>,
};

export default function Dashboard() {
  const [selectedModule, setSelectedModule] =
    React.useState<ModulesKey>("identification");
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Área do agente cultural
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            px: [1],
          }}
        >
          <Typography variant="h6" component="h1">
            Culturalize
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <SidebarModules
          open={open}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
        />
        <Box>
          <SubModules />
        </Box>
      </Drawer>
      <OrganismWrapper
        sx={{
          padding: "100px 30px",
        }}
      >
        {organismObjects[selectedModule]}
      </OrganismWrapper>
    </Box>
  );
}
