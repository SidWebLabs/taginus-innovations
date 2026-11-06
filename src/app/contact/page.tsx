import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { verticals } from "@/data/verticals";
import { breadcrumbLd, pageMeta, abs, ORG_ID } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us in Jath, Sangli",
  description: "Contact Taginus Innovations in Jath, Sangli, Maharashtra for product information, research collaboration, intellectual property support, AI and technology solutions.",
  path: "/contact",
});

export default function Contact() {
  const a = site.address;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  return (
    <>
      <div className="banner">
        <div className="wrap py-10 lg:py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-4 font-display text-4xl font-bold text-field sm:text-5xl">Connect with Taginus Innovations</h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">
            We welcome enquiries from businesses, farmers, researchers, institutions, technology partners and individuals interested in our products, services, research and collaboration opportunities.
          </p>
        </div>
      </div>

      <div className="wrap mt-12 grid gap-12 lg:grid-cols-2">
        <div data-reveal="left" className="space-y-8">
          <section data-reveal aria-labelledby="email-h">
            <h2 id="email-h" className="font-display text-xl font-bold text-field">Email</h2>
            <p className="mt-2 text-ink/80">For business enquiries, product information, research collaborations and service questions.</p>
            <a href={`mailto:${site.email}`} className="mt-2 inline-block break-all font-semibold text-leaf underline underline-offset-4">{site.email}</a>
          </section>
          <section data-reveal aria-labelledby="addr-h">
            <h2 id="addr-h" className="font-display text-xl font-bold text-field">Office address</h2>
            <address className="mt-2 not-italic leading-relaxed text-ink/80">
              {site.legalName}<br />{a.street},<br />{a.locality}, District {a.district},<br />{a.region} &ndash; {a.postalCode}, India
            </address>
          </section>
          <section data-reveal aria-labelledby="li-h">
            <h2 id="li-h" className="font-display text-xl font-bold text-field">LinkedIn</h2>
            <p className="mt-2 text-ink/80">Company updates, innovation highlights and professional opportunities.</p>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block break-all font-semibold text-leaf underline underline-offset-4">linkedin.com/company/taginus-innovations</a>
          </section>
        </div>
        <section data-reveal aria-labelledby="form-h">
          <h2 id="form-h" className="font-display text-xl font-bold text-field">Send an enquiry</h2>
          <div className="mt-4"><EnquiryForm email={site.email} topics={[...verticals.map((v) => v.name), "Collaboration", "Other"]} /></div>
        </section>
      </div>

      <JsonLd data={[breadcrumbLd(crumbs), { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Taginus Innovations", url: abs("/contact"), about: { "@id": ORG_ID } }]} />
    </>
  );
}
