import Link from "next/link";
import React from "react";

export const AuthCard = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center bg-black/40 z-50">
      <div
        className="w-[350px] h-[300px] bg-[var(--color-primary)] shadow p-4
          rounded-lg border-[0.063rem] border-[var(--color-secondary)] flex flex-col justify-between "
      >
        <div className="flex justify-between items-center">
          <p>Logo</p>
          <small>X</small>
        </div>

        <h1 className="text-2xl font-bold flex flex-col">
          <span>Start Checking</span>
          <span className="text-gray-300">Create free account</span>
        </h1>
        <Link
          href="/signup"
          className="w-full h-8 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-md text-sm cursor-pointer flex justify-center items-center "
        >
          Continue with email
        </Link>

        <small>
          By continuing, you agree to the{" "}
          <Link href="" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="" className="underline">
            Privacy Policy
          </Link>
          .
        </small>
      </div>
    </section>
  );
};
