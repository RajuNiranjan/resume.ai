import "@/styles/globals.css";
import { Footer } from "@/ui-global/Footer";
import { NavBar } from "@/ui-global/NavBar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
