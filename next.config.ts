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
    "/api/admin/applications/[id]": prismaEngineFiles,
    "/api/genitore/[token]": prismaEngineFiles,
    "/api/genitore/conferma/[token]": prismaEngineFiles,
    "/api/revoca/[token]": prismaEngineFiles,
    "/genitore/[token]": prismaEngineFiles,
    "/genitore/conferma/[token]": prismaEngineFiles,
    "/revoca/[token]": prismaEngineFiles,
  },
  async redirects() {
    return [
      {
        source: "/liberatorie",
        destination: "/social",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
