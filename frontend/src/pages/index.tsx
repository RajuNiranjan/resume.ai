import { AuthenticationCard } from "@/components/AuthenticationCard";
import { useComponentContext } from "@/hooks/useComponentContext";
import React from "react";

const Main = () => {
  const { showAuthCard } = useComponentContext();
  return <div>{showAuthCard && <AuthenticationCard />}</div>;
};

export default Main;
