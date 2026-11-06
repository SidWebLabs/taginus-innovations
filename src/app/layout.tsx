import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SwRegister from "@/components/SwRegister";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/data/site";
import { SITE_URL, orgLd } from "@/lib/seo";

const sans = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} | Agri, R&D, IPR & AI in Maharashtra`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  category: "Agriculture and technology",
  referrer: "origin-when-cross-origin",
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: ["Taginus Innovations", "agri inputs India", "agri tech equipment", "patent filing India", "industrial design registration", "GrowGrapeAI", "ProducePomoAI", "QR Pay UPI", "Jath Sangli"],
  alternates: { canonical: "/", languages: { "en-IN": "/", "x-default": "/" } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", title: site.name, description: site.description, url: "/" },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  formatDetection: { telephone: false },
  appleWebApp: { capable: true, title: "Taginus", statusBarStyle: "default" },
  other: { "geo.region": "IN-MH", "geo.placename": "Jath, Sangli, Maharashtra", "geo.country": "IN", "msapplication-TileColor": "#12372a" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#12372a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={sans.variable}>
      <body className="antialiased">
        <a href="#main" className="skip">Skip to content</a>
        <div className="progress" aria-hidden="true" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={orgLd()} />
        <SwRegister />
        <RevealObserver />
      </body>
    </html>
  );
}
