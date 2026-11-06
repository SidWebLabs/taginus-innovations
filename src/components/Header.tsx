import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { site, mainLinks } from "@/data/site";
import { verticals } from "@/data/verticals";

export default function Header() {
  const verticalLinks = verticals.map((v) => ({ href: `/${v.slug}`, label: v.short }));
  const all = [...verticalLinks, ...mainLinks, { href: "/donate", label: "Donate" }];
  return (
    <header className="sticky top-0 z-40 border-b border-field/10 bg-white/95 backdrop-blur">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
          <Logo />
          <span className="text-lg font-bold leading-tight text-field">
            Taginus <span className="font-medium">Innovations</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {mainLinks.map((l) => (
              <Link key={l.href} href={l.href} className="link-u font-medium text-ink hover:text-leaf">{l.label}</Link>
            ))}
          </nav>
          <Link href="/donate" className="hidden min-h-11 items-center rounded-lg bg-marigold px-4 font-semibold text-field transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffc233] hover:shadow-md sm:inline-flex">
            Donate
          </Link>
          <MobileMenu links={all} />
        </div>
      </div>
      <nav aria-label="Business verticals" className="hidden border-t border-field/10 bg-sage lg:block">
        <ul className="wrap flex flex-wrap gap-x-7 py-2.5 text-sm font-semibold text-field">
          {verticalLinks.map((l) => (
            <li key={l.href}><Link href={l.href} className="link-u hover:text-leaf">{l.label}</Link></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
