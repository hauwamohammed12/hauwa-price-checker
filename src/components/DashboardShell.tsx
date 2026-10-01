"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./BrandMark";

export function DashboardShell({
  title,
  subtitle,
  nav,
  children,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  nav: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-[var(--forest)] text-[#f7f1e4]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <BrandMark href="/" light size="sm" />
          <div className="text-right">
            {badge ? (
              <span className="mb-1 inline-block rounded-full bg-[var(--gold)]/20 px-3 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-[var(--gold)]">
                {badge}
              </span>
            ) : null}
            <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold sm:text-2xl">
              {title}
            </h1>
            <p className="text-sm text-[#d9c9a0]">{subtitle}</p>
          </div>
        </div>
        <nav
          className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6"
          aria-label="Dashboard"
        >
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "#");
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--gold)] font-semibold text-[var(--forest-deep)]"
                    : "text-[#efe6d2] hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/check"
            className="ml-auto shrink-0 rounded-full px-4 py-2 text-sm text-[#d9c9a0] hover:bg-white/10"
          >
            Public checker
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
