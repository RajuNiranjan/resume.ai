import { anton } from "@/fonts";
import Link from "next/link";
import React from "react";

export const referenceLinks = [
  { name: "About Us", path: "/about-us" },
  { name: "Features", path: "/features" },
  { name: "Terms of Services", path: "/terms-of-services" },
  { name: "Policy", path: "/policy" },
  { name: "Privacy", path: "/privacy" },
  { name: "Blog", path: "/blog" },
  { name: "Demo Video", path: "/demo-vedio" },
];

export const Footer = () => {
  return (
    <footer className="w-full px-[1rem] xl:px-[14rem] py-[6rem] min-h-[30rem]">
      {/* Logo / Brand */}
      <Link
        href="/"
        className={`${anton.className} text-4xl text-[var(--text-primary)] tracking-wider`}
      >
        .AI
      </Link>

      {/* Links */}
      <div className="py-[4rem] border-b border-dashed border-[var(--text-primary)]">
        <div className="flex flex-wrap gap-x-[1rem]  xl:gap-8 md:gap-12">
          {referenceLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className="text-[var(--text-primary)] hover:underline text-base transition font-normal "
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-sm text-[var(--text-primary)]">
        &copy; {new Date().getFullYear()} Resume.AI. All rights reserved.
      </div>
    </footer>
  );
};
