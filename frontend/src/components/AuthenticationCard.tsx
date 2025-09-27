import { useComponentContext } from "@/hooks/useComponentContext";
import { Logo } from "@/utils/logo";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const AuthenticationCard = () => {
  const { handleShowAuthCard, authMode, dialogRef } = useComponentContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const isLogin = authMode === "login";

  return (
    <section
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-[9999]"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        className={`
          w-[350px] h-[auto] max-h-[90vh] bg-[var(--color-primary)] shadow-lg p-6
          rounded-lg border border-[var(--color-secondary)] flex flex-col justify-between gap-4
          transform transition-all duration-300 ease-in
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <div className="flex justify-between items-center">
          <Logo />
          <button
            onClick={() => handleShowAuthCard(null)}
            className="text-gray-500 hover:text-gray-700 font-bold text-xl cursor-pointer"
            aria-label="Close authentication card"
          >
            ×
          </button>
        </div>
        <h1 className="text-lg font-semibold flex flex-col">
          <span>Start Checking</span>
          <span className="text-gray-300 text-xl">
            {isLogin ? "Log in to your account" : "Create free account"}
          </span>
        </h1>

        <Link
          href={isLogin ? "/login" : "/signup"}
          className="w-full h-10 bg-[var(--color-secondary)] text-[var(--color-primary)] 
            rounded-md text-sm cursor-pointer flex justify-center items-center font-medium hover:bg-gray-800 transition"
        >
          Continue with email
        </Link>
        <p className="text-xs text-gray-500 mt-2">
          By continuing, you agree to the{" "}
          <Link href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
};
