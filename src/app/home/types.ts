import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface OrganismObjects {
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
