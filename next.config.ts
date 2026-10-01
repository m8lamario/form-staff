import type { NextConfig } from "next";

const prismaEngineFiles = [
  "./node_modules/.prisma/client/**",
  "./node_modules/@prisma/client/**",
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  outputFileTracingIncludes: {
    "/admin": prismaEngineFiles,
    "/api/staff": prismaEngineFiles,
  },
};

export default nextConfig;
