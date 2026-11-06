import Link from "next/link";
import type { Item } from "@/data/verticals";

export default function ItemRow({ vertical, item, index = 0 }: { vertical: string; item: Item; index?: number }) {
  return (
    <li data-reveal style={{ "--d": `${Math.min(index, 5) * 70}ms` } as React.CSSProperties} className="group grid gap-2 py-5 transition-[background-color,padding] duration-300 hover:bg-sage/70 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8 md:hover:px-4">
      <h3 className="text-xl font-semibold text-field">
        <Link href={`/${vertical}/${item.slug}`} className="link-u hover:text-leaf">{item.name}</Link>
      </h3>
      <div>
        <p className="max-w-prose leading-relaxed text-ink/80">{item.summary}</p>
        {item.meta && (
          <ul className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-field">
            {item.meta.map((m) => <li key={m} className="rounded-md bg-sage px-2.5 py-1 transition-colors group-hover:bg-white">{m}</li>)}
          </ul>
        )}
      </div>
    </li>
  );
}
