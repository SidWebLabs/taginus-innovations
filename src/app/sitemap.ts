import type { MetadataRoute } from "next";
import { verticals } from "@/data/verticals";
import { abs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/donate", priority: 0.4 },
  ].map((p) => ({ url: abs(p.path), lastModified: now, changeFrequency: "monthly" as const, priority: p.priority }));

  const v = verticals.flatMap((vert) => [
    { url: abs(`/${vert.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    ...vert.groups.flatMap((g) => g.items.map((i) => ({ url: abs(`/${vert.slug}/${i.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 }))),
  ]);
  return [...fixed, ...v];
}
