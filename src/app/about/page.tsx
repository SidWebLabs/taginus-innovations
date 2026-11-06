import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Stats from "@/components/Stats";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbLd, pageMeta, abs, ORG_ID } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us and Our Mission",
  description: "Taginus Innovations (OPC) Pvt. Ltd. is a multidisciplinary innovation and technology company in Jath, Sangli, working across seven verticals in agriculture, research, IP and AI.",
  path: "/about",
});

const mission = [
  "Develop innovative agricultural products, tools and technologies.",
  "Advance pesticide research, formulation development and crop protection approaches.",
  "Build AI-powered platforms that support agricultural information and decision-making.",
  "Enable intellectual property protection and innovation management.",
  "Encourage collaboration among researchers, farmers, businesses and technology professionals.",
  "Translate promising ideas into practical applications with measurable value.",
];

const areas = [
  { h: "Agricultural research and pesticide innovation", p: "Research into crop protection approaches, pesticide formulation and pest management for pests such as white grubs, fruit flies, mealybugs, thrips, aphids and whiteflies, plus concepts for nematodes and crop diseases. Product efficacy, crop suitability, safety and regulatory compliance must be established for each formulation before commercial recommendations are made." },
  { h: "AI-powered agricultural solutions", p: "GrowGrapeAI and ProducePomoAI make crop observations and data-driven insights more accessible to growers. Actual outcomes depend on data quality, field conditions, platform capabilities and farmer adoption." },
  { h: "Agricultural equipment and product design", p: "Concepts and designs for harvesting tools, applicators, traps and other farm-use technologies that address practical operational challenges." },
  { h: "Intellectual property and research", p: "Patent-related services, industrial design registration support, technical documentation and research-oriented development." },
];

export default function About() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  return (
    <>
      <div className="banner">
        <div className="wrap py-10 lg:py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-4 font-display text-4xl font-bold text-field sm:text-5xl">About Taginus Innovations</h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">
            {site.legalName} is a multidisciplinary innovation and technology company focused on agriculture, agri-tech, research and development, intellectual property, artificial intelligence, digital technology and innovation engagement. It turns practical challenges into technology-driven opportunities through research, product development, engineering and scientific innovation.
          </p>
        </div>
      </div>

      <div className="wrap">
        <section data-reveal aria-labelledby="mission-h" className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <h2 id="mission-h" className="font-display text-2xl font-bold text-field">Our mission</h2>
          <div>
            <p className="max-w-prose leading-relaxed text-ink/80">To develop practical, research-driven and technology-enabled solutions that contribute to agricultural progress, scientific advancement and digital transformation. We aim to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/80">{mission.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
        </section>

        <section data-reveal aria-labelledby="impact-h" className="mt-12">
          <h2 id="impact-h" className="font-display text-2xl font-bold text-field">Impact</h2>
          <div className="mt-2 divide-y divide-field/15 border-y border-field/15">
            {areas.map((a) => (
              <div data-reveal key={a.h} className="grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8">
                <h3 className="font-display text-lg font-semibold text-field">{a.h}</h3>
                <p className="max-w-prose leading-relaxed text-ink/80">{a.p}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Stats />

      <section data-reveal aria-labelledby="team-h" className="wrap mt-16">
        <h2 id="team-h" className="font-display text-2xl font-bold text-field">Team</h2>
        <div className="mt-4 max-w-2xl">
          <p className="font-display text-xl font-semibold text-field">{site.founder.name}</p>
          <p className="text-sm font-medium text-leaf">{site.founder.role}</p>
          <p className="mt-2 leading-relaxed text-ink/80">{site.founder.bio}</p>
        </div>
      </section>

      <section data-reveal id="careers" aria-labelledby="careers-h" className="wrap mt-16 scroll-mt-32">
        <h2 id="careers-h" className="font-display text-2xl font-bold text-field">Careers</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-ink/80">
          Career opportunities are coming soon. We aim to build a collaborative environment for people interested in research, technology, product development and innovation, across agriculture, agri-tech, engineering and design, R&amp;D, intellectual property, AI and software development. Revisit this section for openings, internships and collaborations.
        </p>
      </section>

      <Cta />
      <JsonLd data={[
        breadcrumbLd(crumbs),
        { "@context": "https://schema.org", "@type": "AboutPage", name: "About Taginus Innovations", url: abs("/about"), about: { "@id": ORG_ID } },
        { "@context": "https://schema.org", "@type": "Person", name: site.founder.name, jobTitle: site.founder.role, worksFor: { "@id": ORG_ID } },
      ]} />
    </>
  );
}
