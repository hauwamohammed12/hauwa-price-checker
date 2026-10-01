import Link from "next/link";
import { BrandLockup } from "@/components/Brand";
import { PriceChecker } from "@/components/PriceChecker";

export default function CheckPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-line/80 bg-panel/90 px-4 py-3 shadow-[var(--shadow)]">
        <BrandLockup compact />
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-xl px-3 py-2 text-sm font-medium text-muted no-underline hover:text-ink"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="rounded-xl bg-forest px-3 py-2 text-sm font-semibold text-[#f4f7f5] no-underline"
          >
            Staff sign in
          </Link>
        </div>
      </header>
      <PriceChecker />
      <footer className="pb-4 text-center text-sm text-muted">
        Hauwa Mohammed Price Checker · Official store prices
      </footer>
    </div>
  );
}
