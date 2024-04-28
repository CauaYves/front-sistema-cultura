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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Indentification from "@/components/organisms/Identification";
import SidebarModules from "@/components/molecules/sidebar/modules";
import SubModules from "../../components/molecules/sidebar/sub-modules";
import Localization from "@/components/organisms/Localization";
import Contacts from "@/components/organisms/Contacts";
import { useSnackbar } from "@/context/snackbar-context";
import { Alert, Snackbar } from "@mui/material";
import Collective from "@/components/organisms/Collective";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Notices from "@/components/organisms/Notices";
import LegalActs from "@/components/organisms/LegalActs";
import HomePage from "@/components/organisms/Home";
import ProfileBar from "@/components/molecules/profile";

const drawerWidth: number = 285;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface OrganismObjects {
  [key: string]: React.ReactNode;
}

export type ModulesKey =
  | "homePage"
  | "identification"
  | "myProjects"
  | "counterpart"
  | "noticesClosed"
  | "culturalColective"
  | "notices"
  | "billings"
  | "alreadyIncentived"
  | "searchProject"
  | "queue"
  | "support"
  | "metometer"
  | "about"
  | "advice"
  | "legislation"
  | "cultUnitys"
  | "cultCalendar";

export default function Dashboard() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<ModulesKey>("homePage");
  const [openDrawer, setOpenDrawer] = useState(true);
  const { message, open, severity, setSnackbar } = useSnackbar();

  const organismObjects: OrganismObjects = {
    homePage: <HomePage />,
    identification: (
      <Indentification router={router} setSelectedModule={setSelectedModule} />
    ),
    location: <Localization />,
    contacts: <Contacts />,
    professionalData: <p>professionalData</p>,
    culturalColective: <Collective router={router} />,
    imagesAndLinks: <p>imagesAndLinks</p>,
    documents: <p>documents</p>,
    authorizedUsers: <p>authorizedUsers</p>,
    notices: <Notices />,
    alreadyIncentived: <p>alreadyIncentived</p>,
    searchProject: <p>searchProject</p>,
    queue: <p>queue</p>,
    support: <p>support</p>,
    about: <p>about</p>,
    billings: <p>billings</p>,
    advice: <p>advice</p>,
    legislation: <LegalActs />,
    metometer: <p>metometer</p>,
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleClose = () => {
    setSnackbar({
      message,
      severity,
      open: false,
    });
  };
  return (
    <Box sx={{ display: "flex", background: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <Snackbar
        onClose={handleClose}
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity}>{message} </Alert>
      </Snackbar>
      <CssBaseline />
      <AppBar position="absolute" open={openDrawer} sx={{ maxHeight: "70px" }}>
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
              ...(openDrawer && { display: "none" }),
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
          <ProfileBar router={router} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openDrawer}>
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
          <IconButton onClick={toggleDrawer} aria-label="Toogle sidebar">
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <SidebarModules
          open={openDrawer}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
        />
        <Box>
          <SubModules />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          margin: "100px auto auto auto",
          padding: "10px",
        }}
      >
        {organismObjects[selectedModule]}
      </Box>
    </Box>
  );
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
