const steps = [
  { h: "Identify the problem", p: "Start from a real challenge faced by farmers, researchers or industry." },
  { h: "Review prior art", p: "Study literature and existing patents so the idea builds on what is known." },
  { h: "Develop the concept", p: "Turn the idea into a design, formulation or platform concept." },
  { h: "Plan experiments", p: "Set up laboratory and field work to test the concept properly." },
  { h: "Evaluate prototypes", p: "Assess performance, safety and suitability, with market evaluation where relevant." },
  { h: "Document and protect", p: "Prepare technical documentation and choose the right IP protection pathway." },
];

export default function Journey() {
  return (
    <section data-reveal aria-labelledby="journey-h" className="wrap mt-20">
      <h2 id="journey-h" className="text-2xl font-bold text-field sm:text-3xl">From idea to documented innovation</h2>
      <p className="mt-3 max-w-prose leading-relaxed text-ink/80">
        Every project at Taginus Innovations follows the same research-led path, from the first problem statement to protected, documented work.
      </p>
      <ol className="journey mt-10 grid gap-8 lg:grid-cols-6 lg:gap-5">
        {steps.map((s, i) => (
          <li key={s.h} style={{ "--i": i } as React.CSSProperties} className="group relative pl-9 lg:pl-0 lg:pt-9">
            <span className="journey-dot" aria-hidden="true" />
            <p className="text-sm font-semibold text-leaf">Step {i + 1}</p>
            <h3 className="mt-0.5 text-lg font-semibold text-field transition-colors group-hover:text-leaf">{s.h}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink/75">{s.p}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
