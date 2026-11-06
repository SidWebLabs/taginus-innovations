import { stats, statsNote } from "@/data/site";
import CountUp from "./CountUp";

export default function Stats() {
  return (
    <section data-reveal aria-labelledby="stats-h" className="wrap mt-20">
      <h2 id="stats-h" className="text-2xl font-bold text-field sm:text-3xl">Innovation portfolio</h2>
      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="group rounded-xl border-l-4 border-marigold bg-sage/60 p-4 transition duration-300 hover:-translate-y-1 hover:bg-sage hover:shadow-lg">
            <dd className="text-4xl font-bold text-field transition-colors group-hover:text-leaf"><CountUp value={Number(s.value)} /></dd>
            <dt className="mt-1 text-sm text-ink/75">{s.label}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-6 max-w-3xl text-sm text-ink/60">{statsNote}</p>
    </section>
  );
}
