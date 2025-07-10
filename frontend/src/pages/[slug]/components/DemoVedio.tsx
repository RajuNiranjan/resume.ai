import React from "react";

export const DemoVedio = () => {
  return (
    <video width="600" controls className="rounded-xl w-full xl:my-[5rem] ">
      <source src="/videos/sample.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
