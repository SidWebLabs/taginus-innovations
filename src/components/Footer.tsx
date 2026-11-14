import Link from "next/link";
import LinkedInLink from "@/components/LinkedInLink";
import { site } from "@/data/site";
import { verticals } from "@/data/verticals";

export default function Footer() {
  const a = site.address;
  return (
    <footer className="mt-20 bg-field text-white/85">
      <div className="wrap grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-white">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm">{site.tagline}</p>
          <address className="mt-5 text-sm not-italic leading-relaxed">
            {site.legalName}<br />{a.street},<br />{a.locality}, District {a.district},<br />{a.region} {a.postalCode}, India
          </address>
        </div>
        <nav aria-label="Footer verticals">
          <p className="font-semibold text-white">What we do</p>
          <ul className="mt-3 space-y-2 text-sm">
            {verticals.map((v) => (
              <li key={v.slug}><Link href={`/${v.slug}`} className="inline-block transition duration-200 hover:translate-x-1 hover:text-marigold">{v.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer company">
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="inline-block transition duration-200 hover:translate-x-1 hover:text-marigold">About us</Link></li>
            <li><Link href="/about#careers" className="inline-block transition duration-200 hover:translate-x-1 hover:text-marigold">Careers</Link></li>
            <li><Link href="/contact" className="inline-block transition duration-200 hover:translate-x-1 hover:text-marigold">Contact</Link></li>
            <li><Link href="/donate" className="inline-block transition duration-200 hover:translate-x-1 hover:text-marigold">Donate</Link></li>
            <li><a href={`mailto:${site.email}`} className="inline-block transition duration-200 hover:translate-x-1 hover:text-marigold">{site.email}</a></li>
            <li className="pt-2"><LinkedInLink href={site.linkedin} variant="dark" /></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {site.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
