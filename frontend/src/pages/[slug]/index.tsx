import React from "react";
import { Layout } from "./components/layout";
import { inter } from "@/fonts";
import { useRouter } from "next/router";
import { AboutUs } from "./components/AboutUs";

const contentMap: Record<string, { title: string; content: JSX.Element }> = {
  "about-us": {
    title: "Learn more About Us",
    content: <AboutUs />,
  },
  features: {
    title: "Explore Our Features",
    content: <AboutUs />,
  },
  "terms-of-services": {
    title: "Terms of Service",
    content: <AboutUs />,
  },
  policy: {
    title: "Policy Information",
    content: <AboutUs />,
  },
  privacy: {
    title: "Privacy Policy",
    content: <AboutUs />,
  },
  blog: {
    title: "Our Blog",
    content: <AboutUs />,
  },
  "demo-vedio": {
    title: "Watch the Demo Video",
    content: <AboutUs />,
  },
};

const ReferenceLinksScreen = () => {
  const { query, isReady } = useRouter();
  const slug = query.slug as string;

  if (!isReady || !slug) return null; // Prevents render until router is ready

  const content = contentMap[slug];

  if (!content) {
    return (
      <Layout>
        <div className="px-[14rem] py-[6rem] text-center">
          <h1 className={`${inter.className} text-[3rem] font-bold`}>
            Page Not Found
          </h1>
          <p className="text-lg mt-4 text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <div className="px-[14rem] py-[6rem]">
      <Layout>
        <h1
          className={`${inter.className} font-semibold tracking-wider text-[8rem] leading-[10rem] text-center mb-12`}
        >
          {content.title}
        </h1>
        {content.content}
      </Layout>
    </div>
  );
};

export default ReferenceLinksScreen;
