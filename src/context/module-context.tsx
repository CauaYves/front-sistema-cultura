"use client";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  | "alreadyIncentived"
  | "searchProject"
  | "queue"
  | "support"
  | "about";

export interface moduleContextProps {
  selectedModule: ModulesKey;
  setSelectedModule: React.Dispatch<React.SetStateAction<ModulesKey>>;
}

const ModuleContext = React.createContext<moduleContextProps | string>(
  "identification"
);

export function ModuleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedModule, setSelectedModule] =
    React.useState<ModulesKey>("identification");

  const contextData: moduleContextProps = {
    selectedModule,
    setSelectedModule,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ModuleContext.Provider value={contextData}>
        {children}
      </ModuleContext.Provider>
    </LocalizationProvider>
  );
}

export { ModuleContext };
