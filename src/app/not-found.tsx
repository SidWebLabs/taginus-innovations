import type { Metadata } from "next";
import LinkButton from "@/components/LinkButton";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-field">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-ink/80">The page may have moved. Try the home page or contact us.</p>
      <div className="mt-8 flex justify-center gap-3"><LinkButton href="/" variant="dark">Home</LinkButton><LinkButton href="/contact" variant="dark">Contact</LinkButton></div>
    </div>
  );
}
