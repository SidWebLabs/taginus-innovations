import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";
import { getItem, verticals } from "@/data/verticals";
import { abs, breadcrumbLd, itemMeta, webPageLd, ORG_ID } from "@/lib/seo";
import { site } from "@/data/site";

export const dynamicParams = false;
export const generateStaticParams = () =>
  verticals.flatMap((v) => v.groups.flatMap((g) => g.items.map((i) => ({ vertical: v.slug, item: i.slug }))));

type P = { params: Promise<{ vertical: string; item: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { vertical, item } = await params;
  const r = getItem(vertical, item);
  if (!r) return {};
  return itemMeta(r.vertical, r.group, r.item);
}

export default async function ItemPage({ params }: P) {
  const { vertical, item } = await params;
  const r = getItem(vertical, item);
  if (!r) notFound();
  const { vertical: v, group, item: it } = r;
  const path = `/${v.slug}/${it.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: v.name, path: `/${v.slug}` }, { name: it.name, path }];
  const related = group.items.filter((x) => x.slug !== it.slug).slice(0, 4);

  const base = { "@context": "https://schema.org", name: it.name, description: it.summary, url: abs(path) };
  const entity =
    group.kind === "product"
      ? { ...base, "@type": "Product", category: group.title, brand: { "@type": "Brand", name: site.name }, manufacturer: { "@id": ORG_ID } }
      : group.kind === "service"
        ? { ...base, "@type": "Service", serviceType: group.title, provider: { "@id": ORG_ID }, areaServed: { "@type": "Country", name: "India" } }
        : { ...base, "@type": "SoftwareApplication", applicationCategory: "BusinessApplication", operatingSystem: "Web", provider: { "@id": ORG_ID }, featureList: it.features?.map((f) => f.title) };

  return (
    <>
      <div className="banner">
        <div className="wrap py-10 lg:py-14">
          <Breadcrumbs crumbs={crumbs} />
          <p className="mt-4 text-sm font-semibold text-leaf">{group.title}</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-field text-balance sm:text-5xl">{it.name}</h1>
          <p data-speakable className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{it.summary}</p>
          {it.meta && (
            <ul className="mt-5 flex flex-wrap gap-2 text-sm font-medium text-field">
              {it.meta.map((m) => <li key={m} className="rounded-md bg-white px-3 py-1.5">{m}</li>)}
            </ul>
          )}
        </div>
      </div>

      <div className="wrap">
        {it.features && (
          <section data-reveal aria-labelledby="features-h" className="mt-12">
            <h2 id="features-h" className="font-display text-2xl font-bold text-field">Key features</h2>
            <dl className="mt-2 divide-y divide-field/15 border-y border-field/15">
              {it.features.map((f) => (
                <div data-reveal key={f.title} className="grid gap-1 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8">
                  <dt className="font-display text-lg font-semibold text-field">{f.title}</dt>
                  <dd className="max-w-prose text-ink/80">{f.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {v.disclaimer && <p className="mt-8 max-w-3xl rounded-lg border-l-4 border-marigold bg-sage px-4 py-3 text-sm text-ink/80">{v.disclaimer}</p>}

        {related.length > 0 && (
          <section data-reveal aria-labelledby="rel-h" className="mt-12">
            <h2 id="rel-h" className="font-display text-2xl font-bold text-field">More in {group.title}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {related.map((x) => (
                <li key={x.slug}><Link href={`/${v.slug}/${x.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-field/25 px-4 font-medium text-field transition duration-200 hover:-translate-y-0.5 hover:border-leaf hover:bg-sage hover:shadow-md">{x.name}</Link></li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Cta subject={it.name} />
      <JsonLd data={[breadcrumbLd(crumbs), webPageLd({ name: it.name, description: it.summary, path }), entity]} />
    </>
  );
}
