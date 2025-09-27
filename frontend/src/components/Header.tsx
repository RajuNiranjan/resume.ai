import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="h-16 w-full shadow flex justify-between items-center px-14 ">
      <div>
        <h1 className="font-bold text-2xl">Resume.AI</h1>
      </div>
      <div className="space-x-4">
        <Link href="/login" className="text-sm">
          Login
        </Link>
        <Link
          href="/signup"
          className="h-5 w-max px-2 py-1.5 bg-[var(--color-bg-secondary)] text-[var(--color-primary)] rounded-full text-sm"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};
