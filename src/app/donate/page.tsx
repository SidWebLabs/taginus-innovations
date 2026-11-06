import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyButton from "@/components/CopyButton";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Support Our Innovation",
  description: "Contribute to agricultural research, technology development and innovation at Taginus Innovations. Bank transfer and India Post money order details.",
  path: "/donate",
});

export default function Donate() {
  const b = site.bank;
  const a = site.address;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Donate", path: "/donate" }];
  const rows: [string, string, boolean][] = [
    ["Account name", b.accountName, false], ["Bank name", b.bankName, false], ["Branch", b.branch, false],
    ["Account number", b.accountNumber, true], ["IFSC code", b.ifsc, true],
  ];
  return (
    <>
      <div className="banner">
        <div className="wrap py-10 lg:py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-4 font-display text-4xl font-bold text-field sm:text-5xl">Support our innovation</h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">
            Your support can help advance agricultural research, technology development, product innovation and work on real-world challenges. Contributions toward eligible initiatives strengthen R&amp;D, agri-tech, AI-based solutions and innovation activities at {site.legalName}.
          </p>
        </div>
      </div>

      <div className="wrap mt-12 grid gap-12 lg:grid-cols-2">
        <section data-reveal aria-labelledby="bank-h">
          <h2 id="bank-h" className="font-display text-2xl font-bold text-field">Bank transfer</h2>
          <dl className="mt-4 divide-y divide-field/15 border-y border-field/15">
            {rows.map(([k, v, copy]) => (
              <div key={k} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0"><dt className="text-sm text-ink/60">{k}</dt><dd className="break-words font-semibold text-ink">{v}</dd></div>
                {copy && <CopyButton value={v} label={k} />}
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-ink/70">Please verify the beneficiary details before completing a transaction.</p>
        </section>

        <section data-reveal aria-labelledby="po-h">
          <h2 id="po-h" className="font-display text-2xl font-bold text-field">Money order through India Post</h2>
          <p className="mt-4 max-w-prose text-ink/80">Contributions may be sent through India Post, subject to applicable postal rules and prior confirmation. Please contact us before sending a money order.</p>
          <p className="mt-4 font-semibold">Payee: {site.legalName}</p>
          <address className="mt-1 not-italic leading-relaxed text-ink/80">{a.street},<br />{a.locality}, District {a.district},<br />{a.region} &ndash; {a.postalCode}, India</address>
          <h3 className="mt-8 font-display text-lg font-semibold text-field">Questions about contributing?</h3>
          <a href={`mailto:${site.email}`} className="mt-1 inline-block break-all font-semibold text-leaf underline underline-offset-4">{site.email}</a>
        </section>
      </div>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
