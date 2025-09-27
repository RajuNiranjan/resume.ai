import { createContext } from "react";
import { ComponentContextType } from "@/types/componentContextProps";

export const ComponentContext = createContext<ComponentContextType>({
  showAuthCard: false,
  setShowAuthCard: () => {},
  handleShowAuthCard: ()=>{},
  authMode: "login",
  dialogRef: {current:null}
});