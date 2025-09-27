import React from "react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <div className="h-5 w-3 rounded-full bg-pink-500" />
        <div className="flex flex-col items-center gap-1">
          <div className="h-5 w-3 rounded-full bg-blue-500" />
          <div className="h-5 w-3 rounded-full bg-green-500" />
        </div>
        <div className="h-5 w-3 rounded-full bg-yellow-500" />
      </div>{" "}
      <h1 className="text-2xl font-semibold">Resume.AI</h1>
    </div>
  );
};
