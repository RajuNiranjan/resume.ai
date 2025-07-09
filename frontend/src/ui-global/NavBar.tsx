import { anton } from "@/fonts";
import Link from "next/link";
import { useState, useEffect } from "react";

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0  right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "pt-4 px-4" : "py-4"
      }`}
    >
      <div
        className={`max-w-6xl bg-black/10 mx-auto transition-all duration-500 ease-in-out ${
          isScrolled
            ? " backdrop-blur-xs shadow-xs rounded-2xl px-6 py-3"
            : "bg-transparent px-4 sm:px-6 lg:px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1
              className={` ${
                anton.className
              } font-anton  font-bold transition-all duration-300 ${
                isScrolled ? "text-2xl " : "text-4xl "
              }`}
            >
              .AI
            </h1>
          </Link>
        </div>
      </div>
    </nav>
  );
};
