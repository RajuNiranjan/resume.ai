import { AuthenticationCard } from "@/components/AuthenticationCard";
import { useComponentContext } from "@/hooks/useComponentContext";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const { showAuthCard } = useComponentContext();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("user", user);

  return <div>{showAuthCard && !user && <AuthenticationCard />}</div>;
};

export default Main;
