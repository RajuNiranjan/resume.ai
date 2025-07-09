import "@/styles/globals.css";
import { Footer } from "@/ui-global/Footer";
import { NavBar } from "@/ui-global/NavBar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className=" bg-red-500 sm:bg-blue-500 md:bg-green-500 lg:bg-pink-500 xl:bg-purple-500">
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
