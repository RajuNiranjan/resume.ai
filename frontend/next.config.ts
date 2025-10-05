import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
        {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
        pathname: "/**", 
      },
    ]
  }
};

export default nextConfig;
