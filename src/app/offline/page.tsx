import type { Metadata } from "next";
import LinkButton from "@/components/LinkButton";

export const metadata: Metadata = { title: "You are offline", robots: { index: false, follow: false } };

export default function Offline() {
  return (
    <div className="wrap py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-field">You&rsquo;re offline</h1>
      <p className="mx-auto mt-4 max-w-md text-ink/80">This page isn&rsquo;t saved on your device yet. Reconnect to the internet and try again.</p>
      <div className="mt-8"><LinkButton href="/" variant="dark">Back to home</LinkButton></div>
    </div>
  );
}
