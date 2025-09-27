import React from "react";

export type AuthMode = "login" | "signup" | null
export interface ComponentContextType {
  showAuthCard: boolean;
  setShowAuthCard: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowAuthCard: (mode?: AuthMode) => void;
  authMode: AuthMode;
  dialogRef: React.RefObject<HTMLDivElement|null>
}