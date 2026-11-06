/* Run: npm run seo:audit  - checks titles / descriptions of every data-driven page. */
import { verticals } from "../src/data/verticals";
import { verticalMeta, itemMeta, BRAND_SUFFIX } from "../src/lib/seo";

type Row = { path: string; title: string; desc: string };
const rows: Row[] = [];
for (const v of verticals) {
  const m = verticalMeta(v);
  rows.push({ path: `/${v.slug}`, title: String(m.title), desc: String(m.description) });
  for (const g of v.groups) for (const i of g.items) {
    const im = itemMeta(v, g, i);
    rows.push({ path: `/${v.slug}/${i.slug}`, title: String(im.title), desc: String(im.description) });
  }
}
const issues: string[] = [];
const seenT = new Map<string, string>(), seenD = new Map<string, string>();
for (const r of rows) {
  const full = r.title + BRAND_SUFFIX;
  if (full.length > 60) issues.push(`TITLE ${full.length} chars (>60): ${r.path}  "${full}"`);
  if (r.title.includes("Taginus Innovations")) issues.push(`TITLE repeats brand: ${r.path}`);
  if (r.desc.length < 70 || r.desc.length > 160) issues.push(`DESC ${r.desc.length} chars: ${r.path}`);
  if (seenT.has(full)) issues.push(`DUPLICATE title: ${r.path} = ${seenT.get(full)}`); else seenT.set(full, r.path);
  if (seenD.has(r.desc)) issues.push(`DUPLICATE description: ${r.path} = ${seenD.get(r.desc)}`); else seenD.set(r.desc, r.path);
}
console.log(`Checked ${rows.length} pages.`);
if (issues.length) { console.log(issues.join("\n")); process.exit(1); }
console.log("All titles and descriptions pass.");
