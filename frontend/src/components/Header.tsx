"use client";
import { useComponentContext } from "@/hooks/useComponentContext";
import { Logo } from "@/utils/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Header: React.FC = () => {
  const { handleShowAuthCard } = useComponentContext();
  const pathname = usePathname();
  const hideHeaderRoutes = ["/login", "/signup"];

  if (hideHeaderRoutes.includes(pathname)) return null;

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between px-14 shadow backdrop-blur-2xl">
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>

      <div className="space-x-4">
        <button
          onClick={() => handleShowAuthCard("login")}
          className="text-sm hover:underline cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => handleShowAuthCard("signup")}
          className="rounded-full bg-[var(--color-bg-secondary)] px-3 py-1.5 text-sm text-[var(--color-primary)] hover:opacity-90 cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </header>
  );
};
