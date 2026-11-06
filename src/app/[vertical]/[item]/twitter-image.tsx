import { getItem, verticals } from "@/data/verticals";
import { renderOg, ogSize } from "@/lib/og";

export const alt = "Taginus Innovations";
export const size = ogSize;
export const contentType = "image/png";
export const generateStaticParams = () =>
  verticals.flatMap((v) => v.groups.flatMap((g) => g.items.map((i) => ({ vertical: v.slug, item: i.slug }))));

export default async function Image({ params }: { params: Promise<{ vertical: string; item: string }> }) {
  const { vertical, item } = await params;
  const r = getItem(vertical, item);
  return renderOg(r?.item.name ?? "Taginus Innovations", r ? `${r.vertical.name} | ${r.group.title}` : "");
}
