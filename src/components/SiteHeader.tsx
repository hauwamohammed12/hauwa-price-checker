import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  return (
    <header
      className={`relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 ${
        solid ? "" : ""
      }`}
    >
      <BrandMark href="/" light={!solid} size="md" />
      <nav className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/check"
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            solid
              ? "text-[var(--ink)] hover:bg-[var(--forest)]/10"
              : "text-[#efe6d2] hover:bg-white/10"
          }`}
        >
          Check price
        </Link>
        <Link
          href="/admin"
          className={`hidden rounded-full px-4 py-2 text-sm font-medium transition sm:inline-flex ${
            solid
              ? "text-[var(--ink)] hover:bg-[var(--forest)]/10"
              : "text-[#efe6d2] hover:bg-white/10"
          }`}
        >
          Admin
        </Link>
        <Link
          href="/login"
          className="rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--forest-deep)] shadow-[0_8px_20px_rgba(196,163,90,0.35)] transition hover:-translate-y-0.5"
        >
          Staff login
        </Link>
      </nav>
    </header>
  );
}
