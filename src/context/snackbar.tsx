"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface SnackBarContextProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SnackbarContext = createContext<SnackBarContextProps | undefined>(
  undefined
);

export default SnackbarContext;

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  const contextData = {
    open,
    setOpen,
  };
  return (
    <SnackbarContext.Provider value={contextData}>
      {children}
    </SnackbarContext.Provider>
  );
}
export function useSnackBarContext() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useFileContext deve ser usado dentro de um FileContextProvider"
    );
  }

  return context;
}
