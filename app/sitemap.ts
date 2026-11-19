import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.leonessacup.app";
  return ["/", "/privacy", "/privacy/minori", "/social", "/termini", "/cookie"].map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
