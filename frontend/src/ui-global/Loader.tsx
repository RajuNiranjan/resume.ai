import { inter } from "@/fonts";
import React, { useEffect, useState } from "react";

export const Loader = () => {
  const [symbols, setSymbols] = useState("");

  useEffect(() => {
    const chars = ["=", "+", "x", "+", "+", "x"];
    const interval = setInterval(() => {
      const randomStr = Array.from(
        { length: 10 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
      setSymbols(randomStr);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full fixed z-50 flex justify-center items-center bg-black/30">
      <h1
        className={` ${inter.className} leading-1  text-2xl text-black animate-pulse`}
      >
        {symbols}
      </h1>
    </div>
  );
};
