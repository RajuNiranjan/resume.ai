
import { ComponentContext } from '@/context/ComponentContext/ComponentContext'
import  { useContext } from 'react'

export const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error("useComponentContext must be used within a ComponentProvider");
  }
  return context;
};