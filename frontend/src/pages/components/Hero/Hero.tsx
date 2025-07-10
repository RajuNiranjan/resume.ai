import { anton } from "@/fonts";
import React from "react";

export const Hero = () => {
  const now = new Date();

  const day = now.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  const formattedDate = `${month}, ${day} ${year}`;

  return (
    <div className="min-h-[36rem] w-full flex justify-center items-center  ">
      <div className="flex justify-center items-center flex-col gap-[2rem]">
        <small>Site of the Day - {formattedDate}</small>
        <h1
          className={`${anton.className} text-[var(--text-primary)] text-[3.75rem] sm:text-[5.5rem]  md:text-[5.75rem]  xl:text-[6.75rem] leading-[5rem] `}
        >
          <span className=" text-[3.25rem] sm:text-[4.75rem] md:text-[4.75rem]  xl:text-[6rem] ">
            Resume
          </span>
          .AI
        </h1>
        <small className="font-normal text-[0.95rem] sm:text-[1.25rem] md:text-[1rem] xl:text-[1rem] xl:w-[52rem] text-center  ">
          Tired of generic advice? Our AI Resume Score Checker provides a
          holistic, intelligent analysis of your resume, offering personalized
          insights to unlock its full potential and land your dream job.
        </small>
      </div>
    </div>
  );
};
