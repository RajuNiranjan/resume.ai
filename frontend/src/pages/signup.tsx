import { Logo } from "@/utils/logo";
import Link from "next/link";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SignUp = () => {
  const { signup, checkEmailExist } = useAuth();
  const { isLoading, authError } = useSelector(
    (state: RootState) => state.auth
  );

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (step === 1) {
        if (!formData.email) {
          setError("Email is required");
          return;
        }
        const emailAvailable = await checkEmailExist({ email: formData.email });
        if (!emailAvailable) {
          setError("Email already exists");
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (!formData.username) {
          setError("Username is required");
          return;
        }
        setStep(3);
      } else if (step === 3) {
        if (!formData.password) {
          setError("Password is required");
          return;
        }
        await signup(formData);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string }>;
      console.error("SignUp error:", axiosError);
      setError(
        axiosError.response?.data?.detail ||
          "Something went wrong, please try again."
      );
    }
  };

  return (
    <section className="flex flex-col md:grid md:grid-cols-2 p-4 h-screen w-full">
      {/* Left side */}
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-full max-w-[360px] space-y-6 px-4">
          <Logo />
          <h1 className="text-xl font-medium">
            {step === 1
              ? "Sign Up"
              : step === 2
              ? "Almost there"
              : "Create Password"}
          </h1>

          <form onSubmit={handleContinue} className="grid space-y-6">
            {/* Email */}
            <div className="grid gap-1">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoFocus
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={step > 1}
                placeholder="john@doe.com"
                className="placeholder:text-xs border-b focus:outline-none disabled:opacity-60"
              />
            </div>

            {/* Username */}
            {step >= 2 && (
              <div className="grid gap-1">
                <label className="text-sm" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  autoFocus
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  disabled={step > 2}
                  placeholder="johndoe"
                  className="placeholder:text-xs border-b focus:outline-none disabled:opacity-60"
                />
              </div>
            )}

            {/* Password */}
            {step >= 3 && (
              <div className="grid gap-1">
                <label className="text-sm" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoFocus
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="********"
                  className="placeholder:text-xs border-b focus:outline-none"
                />
              </div>
            )}

            {/* Terms */}
            <small className="text-xs leading-tight">
              By continuing, you agree to the{" "}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
              .
            </small>

            {/* Errors */}
            {(error || authError) && (
              <p className="text-red-500 text-xs">
                {error ||
                  (typeof authError === "string"
                    ? authError
                    : JSON.stringify(authError))}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-9 rounded-md flex justify-center items-center bg-[var(--color-secondary)] text-[var(--color-primary)] text-sm disabled:opacity-60 transition-all"
            >
              {isLoading
                ? "Please wait..."
                : step === 3
                ? "Create Account"
                : "Continue"}
            </button>

            {/* Login link */}
            <small className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium underline">
                Login
              </Link>
            </small>
          </form>
        </div>
      </div>

      {/* Right side color block */}
      <div className="hidden md:block bg-amber-200 w-full h-full rounded-md"></div>
    </section>
  );
};

export default SignUp;
