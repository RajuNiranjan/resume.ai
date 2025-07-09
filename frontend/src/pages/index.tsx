import React from "react";
import Hero from "./components/Hero/Hero";
import { Uploader } from "./components/Hero/Uploader";

const HomeScreen = () => {
  return (
    <div className="min-h-screen px-[1rem] xl:px-[14rem] bg-primary ">
      <Hero />
      <Uploader />
    </div>
  );
};

export default HomeScreen;
