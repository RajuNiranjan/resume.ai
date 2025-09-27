import React, { useEffect, useRef, useState } from "react";
import { ComponentContext } from "./ComponentContext";
import { AuthMode, ComponentContextType } from "@/types/componentContextProps";

interface ComponentProviderProps {
  children: React.ReactNode;
}

export const ComponentProvider: React.FC<ComponentProviderProps> = ({
  children,
}) => {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutSide = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      setShowAuthCard(false);
    }
  };

  useEffect(() => {
    if (showAuthCard) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [showAuthCard]);

  const handleShowAuthCard = (mode?: AuthMode) => {
    if (mode) setAuthMode(mode);
    setShowAuthCard((prev) => !prev);
  };

  const contextValues: ComponentContextType = {
    showAuthCard,
    setShowAuthCard,
    handleShowAuthCard,
    authMode,
    dialogRef,
  };

  return (
    <ComponentContext.Provider value={contextValues}>
      {children}
    </ComponentContext.Provider>
  );
};
