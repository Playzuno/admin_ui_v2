import { createContext, useContext } from "react";

export const SnackbarContext = createContext();

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error(
      "useBusinessInfo must be used within an BusinessInfoProvider"
    );
  }
  return context;
}
