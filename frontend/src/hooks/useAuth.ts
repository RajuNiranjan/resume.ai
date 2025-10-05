import { axiosInstance } from "@/utils/axiosInstance";
import {
  authFullFilled,
  authPending,
  authRejected,
  checkEmailFullFilled,
  checkEmailPending,
  checkEmailRejected,
} from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export interface SignupTypes {
  username: string;
  email: string;
  password: string;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export const useAuth = () => {
  const authDispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Utility to extract error message safely
 const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const detail = error.response?.data?.detail;
    return typeof detail === "string"
      ? detail
      : detail
      ? JSON.stringify(detail)
      : "Something went wrong";
  }
  return "Something went wrong";
};

  // Check if email exists
  const checkEmailExist = async ({ email }: { email: string }) => {
    authDispatch(checkEmailPending());
    try {
      const res = await axiosInstance.get("/auth/check-email-exists", {
        params: { email },
      });

      if (res.data.email_exists) {
        authDispatch(checkEmailRejected(String(res.data.email_exists)));
        return false;
      }

      authDispatch(checkEmailFullFilled());
      return true;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      authDispatch(checkEmailRejected(message));
      return false;
    }
  };

  // Signup
  const signup = async (formData: SignupTypes) => {
    authDispatch(authPending());
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      authDispatch(authFullFilled(res.data));
      router.push("/login");
      return res.data;
    } catch (error: unknown) {
  const message = getErrorMessage(error);
  authDispatch(authRejected(message));
}
  };

  // Login
 const login = async (formData: LoginTypes) => {
  authDispatch(authPending());
  try {
    const res = await axiosInstance.post("/auth/login", formData);
    authDispatch(authFullFilled(res.data));
    router.push("/"); 
    return res.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    authDispatch(authRejected(message));
  }
};


  return { checkEmailExist, signup, login };
};
