import { site, homeFaqs } from "@/data/site";
import { verticals } from "@/data/verticals";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

// /llms-full.txt - the complete site content as one markdown document for AI assistants (GEO).
export function GET() {
  const L: string[] = [
    `# ${site.name}`, "", `> ${site.description}`, "",
    `Legal name: ${site.legalName}`,
    `Address: ${site.address.street}, ${site.address.locality}, District ${site.address.district}, ${site.address.region} ${site.address.postalCode}, India`,
    `Email: ${site.email}`, `LinkedIn: ${site.linkedin}`,
    `Founder: ${site.founder.name}, ${site.founder.role}`, "",
    "## Frequently asked questions", "",
    ...homeFaqs.flatMap((f) => [`**${f.q}**`, f.a, ""]),
  ];
  for (const v of verticals) {
    L.push(`## ${v.name}`, "", v.intro, "", `Page: ${abs(`/${v.slug}`)}`, "");
    for (const g of v.groups) {
      L.push(`### ${g.title}`, "");
      for (const i of g.items) {
        L.push(`#### ${i.name}`, i.summary, `URL: ${abs(`/${v.slug}/${i.slug}`)}`);
        if (i.meta) L.push(`Records: ${i.meta.join("; ")}`);
        if (i.features) L.push("Features:", ...i.features.map((f) => `- ${f.title}: ${f.text}`));
        L.push("");
      }
    }
    if (v.disclaimer) L.push(`Note: ${v.disclaimer}`, "");
    L.push(...v.faqs.flatMap((f) => [`**${f.q}**`, f.a, ""]));
  }
  return new Response(L.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
