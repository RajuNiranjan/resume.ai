import { Logo } from "@/utils/logo";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <section className="grid grid-cols-2 p-2 h-screen w-full">
      <div className="w-full h-full  flex justify-center items-center">
        <div className="w-[350px] h-max space-y-6 ">
          <Logo />
          <h1 className="text-xl font-medium">SignUp</h1>
          <form action="" className="grid grid-cols-1 space-y-6">
            <div className="grid grid-cols-1 gap-1 w-full">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@doe.com"
                className="placeholder:text-xs border-b focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-1 w-full">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="placeholder:text-xs border-b focus:outline-none"
              />
            </div>
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
            <button className="w-full h-8 rounded-md flex justify-center items-center bg-[var(--color-secondary)] text-[var(--color-primary)] text-sm ">
              Continue
            </button>
            <small className="text-center">
              Already have an Account?{" "}
              <Link href="/login" className="font-medium underline">
                Login
              </Link>
            </small>
          </form>
        </div>
      </div>
      <div className="bg-amber-200 w-full h-full rounded-md"></div>
    </section>
  );
};

export default SignUp;
