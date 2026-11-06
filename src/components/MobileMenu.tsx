"use client";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
        className="min-h-11 rounded-lg border border-field/20 px-4 font-semibold text-field"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="absolute inset-x-0 top-full border-b border-field/10 bg-white shadow-lg">
          <ul className="wrap grid gap-1 py-4 sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 font-medium text-ink transition duration-200 hover:translate-x-1 hover:bg-sage">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
