import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Taginus Innovations",
    short_name: "Taginus",
    description: "Agri inputs, agri tech, R&D, intellectual property, AI and technology from Jath, Sangli, Maharashtra.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#12372a",
    lang: "en-IN",
    categories: ["business", "productivity", "education"],
    icons: [
      { src: "/icons/Logo.JPEG", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/Logo.JPEG", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/Logo.JPEG", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
