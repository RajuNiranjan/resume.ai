import React, { JSX } from "react";
import { Layout } from "./components/layout";
import { inter } from "@/fonts";
import { useRouter } from "next/router";
import { AboutUs } from "./components/AboutUs";
import { DemoVedio } from "./components/DemoVedio";
import { Features } from "./components/Features";
import { TermsOfServices } from "./components/TermsOfServices";
import { Policy } from "./components/Policy";
import { Privacy } from "./components/Privacy";
import { Blogs } from "./components/Blogs";

const contentMap: Record<string, { title: string; content: JSX.Element }> = {
  "about-us": { title: "Learn more About Us", content: <AboutUs /> },
  features: { title: "Explore Our Features", content: <Features /> },
  "terms-of-services": {
    title: "Terms of Service",
    content: <TermsOfServices />,
  },
  policy: { title: "Policy Information", content: <Policy /> },
  privacy: { title: "Privacy Policy", content: <Privacy /> },
  blog: { title: "Our Blog", content: <Blogs /> },
  "demo-vedio": { title: "Watch the Demo Video", content: <DemoVedio /> },
};

const ReferenceLinksScreen = () => {
  const { query, isReady } = useRouter();
  const slug = query.slug as string;

  if (!isReady || !slug) return null;

  const content = contentMap[slug];

  if (!content) {
    return (
      <Layout>
        <div className=" px-[1rem] xl:px-[14rem] py-[6rem] text-center">
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
    <div className=" px-[1rem] xl:px-[14rem] py-[6rem]">
      <Layout>
        <h1
          className={`${inter.className} uppercase font-semibold tracking-wider text-[2.65rem] leading-[3.74rem] xl:text-[8rem] xl:leading-[10rem] text-center mb-12`}
        >
          {content.title}
        </h1>
        {content.content}
      </Layout>
    </div>
  );
};

export default ReferenceLinksScreen;
