import Link from "next/link";
import type { Metadata } from "next";
import LinkButton from "@/components/LinkButton";
import HeroVisual from "@/components/HeroVisual";
import Journey from "@/components/Journey";
import Stats from "@/components/Stats";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";
import { site, homeFaqs } from "@/data/site";
import { verticals, countItems } from "@/data/verticals";
import { faqLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Agri, R&D, IPR & AI in Maharashtra` },
  alternates: { canonical: "/", languages: { "en-IN": "/", "x-default": "/" } },
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Home() {
  const nodes = verticals.map((v) => ({ label: v.short, href: `/${v.slug}` }));
  return (
    <>
      <section className="relative overflow-hidden bg-field bg-[url(/images/hero-field.svg)] bg-cover bg-bottom text-white">
        <div className="wrap relative grid gap-8 pb-10 pt-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:pb-14 lg:pt-16">
          <div>
            <h1 className="hero-in text-4xl font-extrabold leading-[1.06] text-balance sm:text-5xl lg:text-6xl" style={d(0)}>
              Engineering ideas. Advancing agriculture. Enabling innovation.
            </h1>
            <p data-speakable className="hero-in mt-6 max-w-prose text-lg leading-relaxed text-white/85" style={d(150)}>{site.description}</p>
            <div className="hero-in mt-8 flex flex-wrap gap-3" style={d(300)}>
              <LinkButton href="/contact">Talk to our team</LinkButton>
              <LinkButton href="/about" variant="ghost">About the company</LinkButton>
            </div>
          </div>
          <div className="hero-in" style={d(250)}>
            <HeroVisual nodes={nodes} />
            <p className="mt-1 text-center text-xs text-white/60">Seven verticals, one innovation path. Select a point to explore.</p>
          </div>
        </div>

        <nav aria-label="Business verticals" className="relative border-t border-white/15 bg-field/70 backdrop-blur-sm">
          <ul className="wrap grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            {verticals.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}`} className="group block h-full border-white/10 px-3 py-4 transition duration-300 hover:bg-marigold hover:text-field sm:border-l">
                  <span className="block font-semibold leading-tight">{v.short}</span>
                  <span className="mt-1 block text-xs text-white/60 transition-colors group-hover:text-field/80">{countItems(v)} {countItems(v) === 1 ? "offering" : "offerings"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section data-reveal aria-labelledby="what-h" className="wrap mt-20">
        <h2 id="what-h" className="text-2xl font-bold text-field sm:text-3xl">What we do</h2>
        <div className="mt-6 divide-y divide-field/15 border-y border-field/15">
          {verticals.map((v, i) => (
            <article key={v.slug} data-reveal style={d(Math.min(i, 3) * 60)} className="group grid gap-3 py-6 transition-[background-color,padding] duration-300 hover:bg-sage/70 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8 md:hover:px-4">
              <div>
                <h3 className="text-xl font-semibold text-field">
                  <Link href={`/${v.slug}`} className="link-u hover:text-leaf">{v.name}</Link>
                </h3>
                <p className="mt-1 text-ink/75">{v.tagline}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-x-4 gap-y-1.5 text-sm">
                {v.groups.flatMap((g) => g.items).map((it) => (
                  <li key={it.slug}><Link href={`/${v.slug}/${it.slug}`} className="link-u text-leaf hover:text-field">{it.name}</Link></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <Journey />
      <Stats />
      <Faq faqs={homeFaqs} />
      <Cta />
      <JsonLd data={faqLd(homeFaqs)} />
    </>
  );
}
