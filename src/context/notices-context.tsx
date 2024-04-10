import React, { createContext, useMemo, useState, useContext } from "react";

export type NoticesKeys = "list" | "subscription" | "proposal" | "enrollment";

type SetModule = React.Dispatch<React.SetStateAction<NoticesKeys>>;

type NoticesContextType = {
  module: string;
  setModule: SetModule;
};

const NoticesContext = createContext<NoticesContextType>({
  module: "list",
  setModule: () => {},
});

export function useNotices() {
  return useContext(NoticesContext);
}

export function NoticesProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [module, setModule] = useState<NoticesKeys>("list");

  const contextData = useMemo(
    () => ({ module, setModule }),
    [module, setModule]
  );

  return (
    <NoticesContext.Provider value={contextData}>
      {children}
    </NoticesContext.Provider>
  );
}

export default NoticesContext;
