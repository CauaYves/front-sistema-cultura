import ModuleContext from "@/context/module-context";
import { useContext } from "react";

export function UseModuleContext() {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error(
      "UseModuleContext deve ser usado dentro de um ModuleContextProvider"
    );
  }

  return context;
}
