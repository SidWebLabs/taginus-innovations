import { getVertical, verticals } from "@/data/verticals";
import { renderOg, ogSize } from "@/lib/og";

export const alt = "Taginus Innovations";
export const size = ogSize;
export const contentType = "image/png";
export const generateStaticParams = () => verticals.map((v) => ({ vertical: v.slug }));

export default async function Image({ params }: { params: Promise<{ vertical: string }> }) {
  const v = getVertical((await params).vertical);
  return renderOg(v?.name ?? "Taginus Innovations", v?.tagline ?? "");
}
