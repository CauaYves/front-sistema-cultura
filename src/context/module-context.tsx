"use client";
import * as React from "react";
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
    <ModuleContext.Provider value={contextData}>
      {children}
    </ModuleContext.Provider>
  );
}

export { ModuleContext };
