import { Header } from "@/components/Header";
import { ComponentProvider } from "@/context/ComponentContext/ComponentProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ComponentProvider>
      <Header />
      <Component {...pageProps} />
    </ComponentProvider>
  );
}
