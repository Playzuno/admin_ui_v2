import { createContext, useContext } from "react";

export const BusinessInfoContext = createContext();

export function useBusinessInfo() {
  const context = useContext(BusinessInfoContext);
  if (context === undefined) {
    throw new Error(
      "useBusinessInfo must be used within an BusinessInfoProvider"
    );
  }
  return context;
}
