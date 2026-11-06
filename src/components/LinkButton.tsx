import Link from "next/link";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "ghost" | "dark" };

const styles = {
  primary: "bg-marigold text-field hover:bg-[#ffc233] hover:shadow-[0_10px_24px_-8px_rgba(242,169,0,.8)]",
  ghost: "border border-white/40 text-white hover:border-white hover:bg-white/10",
  dark: "bg-field text-white hover:bg-leaf hover:shadow-[0_10px_24px_-8px_rgba(18,55,42,.6)]",
};

export default function LinkButton({ href, children, variant = "primary" }: Props) {
  const cls = `inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[.98] ${styles[variant]}`;
  if (href.startsWith("mailto:")) return <a href={href} className={cls}>{children}</a>;
  return <Link href={href} className={cls}>{children}</Link>;
}
