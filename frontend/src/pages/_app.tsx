import { Header } from "@/components/Header";
import { ComponentProvider } from "@/context/ComponentContext/ComponentProvider";
import { fetchUser } from "@/redux/features/authSlice";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(fetchUser());
  }, []);

  return (
    <Provider store={store}>
      <ComponentProvider>
        <Header />
        <Component {...pageProps} />
      </ComponentProvider>
    </Provider>
  );
}
