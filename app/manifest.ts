import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Leonessa Cup — Candidatura staff",
    short_name: "Leonessa Cup",
    description: "Candidatura allo staff volontario della Leonessa Cup.",
    start_url: "/",
    display: "standalone",
    background_color: "#011674",
    theme_color: "#011674",
    lang: "it",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
