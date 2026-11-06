import { site } from "@/data/site";
import { verticals } from "@/data/verticals";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

// /llms.txt - a plain-markdown map of the site for AI assistants (GEO).
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Legal name: ${site.legalName}. Location: ${site.address.locality}, ${site.address.district}, ${site.address.region}, India. Contact: ${site.email}`,
    "",
    `Full content in one file: ${abs("/llms-full.txt")}`,
    "",
    "## Company",
    `- [About](${abs("/about")}): mission, impact, team and careers`,
    `- [Contact](${abs("/contact")}): email, address and enquiry form`,
    `- [Donate](${abs("/donate")}): support research and innovation`,
    "",
    ...verticals.flatMap((v) => [
      `## ${v.name}`,
      `${v.intro}`,
      `- [${v.name} overview](${abs(`/${v.slug}`)})`,
      ...v.groups.flatMap((g) => g.items.map((i) => `- [${i.name}](${abs(`/${v.slug}/${i.slug}`)}): ${i.summary}`)),
      "",
    ]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
