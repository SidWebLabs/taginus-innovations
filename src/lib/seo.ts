import type { Metadata } from "next";
import { site } from "@/data/site";
import { verticals, type Faq, type Group, type Item, type Vertical } from "@/data/verticals";

/** Priority: explicit env > Netlify URL > Cloudflare Pages URL > localhost. Set NEXT_PUBLIC_SITE_URL to your real domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || process.env.CF_PAGES_URL || "http://localhost:3000").replace(/\/$/, "");
export const abs = (path = "/") => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);
export const ORG_ID = `${SITE_URL}/#organization`;
export const LAST_MOD = new Date().toISOString().slice(0, 10);

if (process.env.NODE_ENV === "production" && SITE_URL.includes("localhost")) {
  console.warn("[seo] NEXT_PUBLIC_SITE_URL is not set: canonical URLs and the sitemap will point to localhost.");
}

/* ---------- length-safe titles and descriptions ---------- */
export const BRAND_SUFFIX = ` | ${site.name}`; // appended by the layout title template
export const TITLE_BUDGET = 60 - BRAND_SUFFIX.length;
const LOCAL = `${site.name}, ${site.address.locality}, ${site.address.region}.`;

export function trimDesc(s: string, max = 158) {
  if (s.length <= max) return s;
  const dot = s.lastIndexOf(". ", max - 1);
  if (dot >= 90) return s.slice(0, dot + 1);
  const cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return cut.slice(0, sp > 100 ? sp : max - 1).replace(/[,.;:\s]+$/, "") + "\u2026";
}
export const padDesc = (s: string) => (s.length < 110 ? `${s} ${LOCAL}` : s);
export const fitDesc = (s: string) => trimDesc(padDesc(s));

/* ---------- metadata builders ---------- */
export function pageMeta(o: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  return {
    title: o.title,
    description: o.description,
    keywords: o.keywords,
    alternates: { canonical: o.path, languages: { "en-IN": o.path, "x-default": o.path } },
    openGraph: { title: o.title, description: o.description, url: o.path, type: "website", siteName: site.name, locale: "en_IN" },
    twitter: { card: "summary_large_image", title: o.title, description: o.description },
  };
}

export const verticalTitle = (v: Vertical) => v.seoTitle ?? v.name;
export function verticalMeta(v: Vertical): Metadata {
  return pageMeta({
    title: verticalTitle(v),
    description: fitDesc(v.description),
    path: `/${v.slug}`,
    keywords: [v.name, ...v.groups.map((g) => g.title), site.name, "Jath Sangli Maharashtra"],
  });
}

export function itemTitle(v: Vertical, i: Item) {
  if (i.seoTitle) return i.seoTitle;
  const withVertical = `${i.name} \u2013 ${v.short}`;
  return withVertical.length <= TITLE_BUDGET ? withVertical : i.name;
}
export function itemMeta(v: Vertical, g: Group, i: Item): Metadata {
  return pageMeta({
    title: itemTitle(v, i),
    description: fitDesc(i.summary),
    path: `/${v.slug}/${i.slug}`,
    keywords: [i.name, v.name, g.title, site.name, "Jath Sangli Maharashtra"],
  });
}

/* ---------- JSON-LD ---------- */
export const breadcrumbLd = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** WebPage with speakable markup (voice assistants / answer engines read the h1 + [data-speakable] summary). */
export const webPageLd = (o: { type?: string; name: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": o.type ?? "WebPage",
  "@id": `${abs(o.path)}#webpage`,
  url: abs(o.path),
  name: o.name,
  description: o.description,
  inLanguage: "en-IN",
  dateModified: LAST_MOD,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-speakable]"] },
});

export const orgLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": ORG_ID,
      name: site.name,
      legalName: site.legalName,
      alternateName: ["Taginus", "Taginus Innovation"],
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: abs("/icons/Logo.JPEG"), width: 512, height: 512 },
      image: abs("/icons/Logo.JPEG"),
      email: site.email,
      description: site.description,
      slogan: site.tagline,
      sameAs: [site.linkedin],
      areaServed: { "@type": "Country", name: "India" },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.role },
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: site.email, areaServed: "IN", availableLanguage: ["English"] },
      knowsAbout: ["Agriculture", "Agri inputs", "Agricultural engineering", "Pesticide research", "Intellectual property", "Patent filing", "Industrial design registration", "Artificial intelligence in agriculture", "UPI payments"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${site.name} verticals`,
        itemListElement: verticals.map((v) => ({ "@type": "OfferCatalog", name: v.name, description: v.description, url: abs(`/${v.slug}`) })),
      },
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: site.name, publisher: { "@id": ORG_ID }, inLanguage: "en-IN" },
  ],
});
