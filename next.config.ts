import type { NextConfig } from "next";

const prismaEngineFiles = [
  "./node_modules/.prisma/client/**",
  "./node_modules/@prisma/client/**",
];

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma", "nodemailer"],
  outputFileTracingIncludes: {
    "/admin": prismaEngineFiles,
    "/api/staff": prismaEngineFiles,
    "/api/admin/applications/[id]": prismaEngineFiles,
    "/api/admin/reinform": prismaEngineFiles,
    "/api/admin/login": prismaEngineFiles,
    "/api/cron/email": prismaEngineFiles,
    "/api/genitore/[token]": prismaEngineFiles,
    "/api/genitore/conferma/[token]": prismaEngineFiles,
    "/api/revoca/[token]": prismaEngineFiles,
    "/api/rinnovo/[token]": prismaEngineFiles,
    "/genitore/[token]": prismaEngineFiles,
    "/genitore/conferma/[token]": prismaEngineFiles,
    "/revoca/[token]": prismaEngineFiles,
    "/rinnovo/[token]": prismaEngineFiles,
  },
  async redirects() {
    return [
      {
        source: "/liberatorie",
        destination: "/social",
        permanent: true,
      },
      {
        source: "/manifest.json",
        destination: "/manifest.webmanifest",
        permanent: false,
      },
    ];
  },
  async headers() {
    const security = [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    const token = [
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      { key: "Cache-Control", value: "no-store" },
      { key: "Referrer-Policy", value: "no-referrer" },
    ];
    return [
      { source: "/:path*", headers: security },
      { source: "/genitore/:path*", headers: token },
      { source: "/revoca/:path*", headers: token },
      { source: "/rinnovo/:path*", headers: token },
      { source: "/grazie", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
