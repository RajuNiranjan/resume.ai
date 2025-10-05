"use client";
import { useComponentContext } from "@/hooks/useComponentContext";
import { RootState } from "@/redux/store";
import { Logo } from "@/utils/logo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const hideHeaderRoutes = ["/login", "/signup"];

export const Header: React.FC = () => {
  const { handleShowAuthCard } = useComponentContext();
  const pathname = usePathname();

  const user = useSelector((state: RootState) => state.auth.user);

  if (hideHeaderRoutes.includes(pathname)) return null;

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between px-14 shadow backdrop-blur-2xl">
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>

      {user ? (
        <Image
          src={user?.profile_pic || "/default-profile.png"}
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      ) : (
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
      )}
    </header>
  );
};
