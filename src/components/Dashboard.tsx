"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandLockup } from "@/components/Brand";
import { useAuth } from "@/context/AppProviders";
import { roleLabel } from "@/lib/format";

interface NavItem {
  href: string;
  label: string;
}

export function DashboardShell({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle: string;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6">
      <header className="hero-band flex flex-col gap-4 rounded-3xl px-5 py-4 text-[#f4f7f5] shadow-[var(--shadow)] sm:flex-row sm:items-center sm:justify-between">
        <BrandLockup light compact />
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-sm">
            <p className="m-0 font-semibold">{user?.name}</p>
            <p className="m-0 text-[#d7e6dd]">{user ? roleLabel(user.role) : ""}</p>
          </div>
          <Link
            href="/check"
            className="rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-[#f4f7f5] no-underline transition hover:bg-white/20"
          >
            Public checker
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="cursor-pointer rounded-xl border-0 bg-gold px-3 py-2 text-sm font-semibold text-forest-deep"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-3xl border border-line/80 bg-panel/90 p-3 shadow-[var(--shadow)]">
          <p className="m-0 px-2 pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {title}
          </p>
          <p className="m-0 px-2 pb-3 text-sm text-muted">{subtitle}</p>
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-3 py-2.5 text-sm font-medium no-underline transition ${
                    active
                      ? "bg-forest text-[#f4f7f5]"
                      : "text-ink hover:bg-paper-2"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-line/80 bg-panel/95 p-5 shadow-[var(--shadow)] ${className}`}
    >
      {children}
    </section>
  );
}

export function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-line bg-paper/70 px-4 py-3">
      <p className="m-0 text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</p>
      <p className="m-0 mt-1 font-display text-2xl font-bold text-forest">{value}</p>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
      <span>{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/25";

export const primaryBtn =
  "cursor-pointer rounded-xl border-0 bg-forest px-4 py-2.5 text-sm font-semibold text-[#f4f7f5] transition hover:bg-forest-deep disabled:opacity-50";

export const ghostBtn =
  "cursor-pointer rounded-xl border border-line bg-transparent px-3 py-2 text-sm font-semibold text-ink transition hover:bg-paper-2";
