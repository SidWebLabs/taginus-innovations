import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemRow from "@/components/ItemRow";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";
import { getVertical, verticals } from "@/data/verticals";
import { abs, breadcrumbLd, faqLd, verticalMeta, webPageLd } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => verticals.map((v) => ({ vertical: v.slug }));

type P = { params: Promise<{ vertical: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const v = getVertical((await params).vertical);
  if (!v) return {};
  return verticalMeta(v);
}

export default async function VerticalPage({ params }: P) {
  const v = getVertical((await params).vertical);
  if (!v) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: v.name, path: `/${v.slug}` }];
  const items = v.groups.flatMap((g) => g.items);

  return (
    <>
      <div className="banner">
        <div className="wrap py-10 lg:py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-4 font-display text-4xl font-bold text-field text-balance sm:text-5xl">{v.name}</h1>
          <p data-speakable className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{v.intro}</p>
        </div>
      </div>

      <div className="wrap">
        {v.groups.map((g) => {
          const id = g.title.replace(/\W+/g, "-").toLowerCase();
          return (
            <section key={g.title} aria-labelledby={id} className="mt-12">
              <h2 id={id} className="font-display text-2xl font-bold text-field">{g.title}</h2>
              <ul className="mt-2 divide-y divide-field/15 border-y border-field/15">
                {g.items.map((i, n) => <ItemRow key={i.slug} vertical={v.slug} item={i} index={n} />)}
              </ul>
            </section>
          );
        })}
        {v.disclaimer && <p className="mt-8 max-w-3xl rounded-lg border-l-4 border-marigold bg-sage px-4 py-3 text-sm text-ink/80">{v.disclaimer}</p>}
      </div>

      <Faq faqs={v.faqs} />
      <Cta subject={v.name} />
      <JsonLd data={[
        breadcrumbLd(crumbs),
        faqLd(v.faqs),
        {
          ...webPageLd({ type: "CollectionPage", name: v.name, description: v.description, path: `/${v.slug}` }),
          mainEntity: { "@type": "ItemList", itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, url: abs(`/${v.slug}/${i.slug}`) })) },
        },
      ]} />
    </>
  );
}
