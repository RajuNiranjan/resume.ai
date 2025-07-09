import { referenceLinks } from "@/ui-global/Footer";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div>
      <header className="w-full h-[3.5rem] ">
        <nav className="flex justify-center items-center h-full gap-8">
          {referenceLinks.map((item, idx) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={idx}
                href={item.path}
                className={`text-[var(--text-primary)] hover:underline transition-all ${
                  isActive ? "underline font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="px-4 py-6">{children}</main>
    </div>
  );
};
