import type { Faq as F } from "@/data/verticals";

export default function Faq({ faqs, title = "Frequently asked questions" }: { faqs: F[]; title?: string }) {
  return (
    <section data-reveal aria-labelledby="faq-h" className="wrap mt-16">
      <h2 id="faq-h" className="font-display text-2xl font-bold text-field sm:text-3xl">{title}</h2>
      <div className="mt-6 max-w-3xl divide-y divide-field/15 border-y border-field/15">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
              {f.q}
              <span aria-hidden="true" className="text-xl text-leaf transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 max-w-prose leading-relaxed text-ink/80">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
