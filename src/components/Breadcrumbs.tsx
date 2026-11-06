import Link from "next/link";

export default function Breadcrumbs({ crumbs }: { crumbs: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
      <ol className="flex flex-wrap items-center gap-x-2">
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === crumbs.length - 1 ? <span aria-current="page" className="font-medium text-ink">{c.name}</span> : <Link href={c.path} className="underline-offset-4 hover:underline">{c.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
