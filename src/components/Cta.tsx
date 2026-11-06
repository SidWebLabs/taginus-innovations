import LinkButton from "./LinkButton";
import { site } from "@/data/site";

export default function Cta({ subject }: { subject?: string }) {
  const href = subject ? `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${subject}`)}` : "/contact";
  return (
    <section data-reveal className="wrap mt-16">
      <div className="rounded-2xl bg-field px-6 py-10 text-white sm:px-10">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Let&rsquo;s collaborate</h2>
        <p className="mt-3 max-w-xl text-white/80">
          We welcome enquiries from businesses, farmers, researchers, institutions and technology partners.
        </p>
        <div className="mt-6"><LinkButton href={href}>{subject ? `Enquire about ${subject}` : "Contact our team"}</LinkButton></div>
      </div>
    </section>
  );
}
