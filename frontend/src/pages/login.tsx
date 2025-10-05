import { Logo } from "@/utils/logo";
import Link from "next/link";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { RootState, store } from "@/redux/store";
import { useSelector } from "react-redux";
import { fetchUser } from "@/redux/features/authSlice";

const Login = () => {
  const { checkEmailExist, login } = useAuth();
  const { authError, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (step === 1) {
        if (!formData.email) {
          setError("Email is required");
          return;
        }

        const emailExists = await checkEmailExist({ email: formData.email });
        if (emailExists) {
          setError("Email does not exist");
          return;
        }

        setStep(2);
      } else if (step === 2) {
        if (!formData.password) {
          setError("Password is required");
          return;
        }

        await login(formData);
        store.dispatch(fetchUser());
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string }>;
      console.error("Login/Error:", axiosError);
      setError(axiosError.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <section className="flex flex-col md:grid md:grid-cols-2 p-4 h-screen w-full">
      {/* Left side */}
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-full max-w-[360px] h-max space-y-6 px-4">
          <Logo />
          <h1 className="text-xl font-medium">
            {step === 1 ? "Login" : "Enter Password"}
          </h1>

          <form
            onSubmit={handleContinue}
            className="grid grid-cols-1 space-y-6"
          >
            {/* Email */}
            <div className="grid gap-1">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                autoFocus
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="john@doe.com"
                disabled={step === 2}
                className="placeholder:text-xs border-b focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Password */}
            {step >= 2 && (
              <div className="grid gap-1">
                <label className="text-sm" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  autoFocus
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
            <small>
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

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-9 rounded-md flex justify-center items-center bg-[var(--color-secondary)] text-[var(--color-primary)] text-sm disabled:opacity-60"
            >
              {isLoading ? "Please wait..." : step === 1 ? "Continue" : "Login"}
            </button>

            {/* Signup */}
            <small className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium underline">
                Sign Up
              </Link>
            </small>
          </form>
        </div>
      </div>

      {/* Right side (image/color block) */}
      <div className="hidden md:block bg-amber-200 w-full h-full rounded-md"></div>
    </section>
  );
};

export default Login;
