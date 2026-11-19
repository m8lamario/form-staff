import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/genitore", "/revoca", "/grazie", "/rinnovo"],
    },
    sitemap: "https://www.leonessacup.app/sitemap.xml",
  };
}
