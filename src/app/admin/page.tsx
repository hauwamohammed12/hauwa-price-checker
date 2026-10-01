import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { StatTile } from "@/components/StatTile";
import {
  companies,
  organization,
  orgStats,
  priceHistory,
  shops,
} from "@/lib/data";
import { formatDateTime, naira, stationLabel } from "@/lib/format";

export default function AdminPage() {
  const stats = orgStats();

  return (
    <DashboardShell
      title="Organization Admin"
      subtitle={`${organization.name} · Main administrator`}
      badge="Org"
      nav={[
        { href: "/admin", label: "Overview" },
        { href: "/admin#companies", label: "Companies" },
        { href: "/admin#shops", label: "All shops" },
        { href: "/admin#history", label: "Price changes" },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Companies" value={String(stats.companies)} accent="forest" />
        <StatTile
          label="Shops"
          value={String(stats.shops)}
          hint={`${stats.openShops} open now`}
          accent="gold"
        />
        <StatTile
          label="Products tracked"
          value={String(stats.totalProducts)}
          hint={`${stats.lowStock} low stock`}
        />
        <StatTile
          label="Avg listed price"
          value={naira(stats.avgPrice)}
          accent="clay"
        />
      </div>

      <section id="companies" className="mt-10 scroll-mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Companies / Branches
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Regional companies under {organization.name}
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {companies.map((c) => {
            const branchShops = shops.filter((s) => s.companyId === c.id);
            return (
              <Link
                key={c.id}
                href={`/company/${c.id}`}
                className="group rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--forest)]/40"
              >
                <div className="flex items-start justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--gold-deep)]">
                    {c.code}
                  </p>
                  <span className="rounded-full bg-[var(--forest)]/10 px-2 py-0.5 text-xs font-medium text-[var(--forest)]">
                    {c.status}
                  </span>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold group-hover:text-[var(--forest)]">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {c.city}, {c.state} · {branchShops.length} shops
                </p>
                <p className="mt-4 text-sm">
                  Manager: <span className="font-medium">{c.manager}</span>
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="shops" className="mt-12 scroll-mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
          Stations / Shops
        </h2>
        <p className="mb-4 text-sm text-[var(--muted)]">
          Every selling point across the organization
        </p>
        <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--forest)] text-[#f7f1e4]">
              <tr>
                <th className="px-4 py-3 font-medium">Shop</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Manager</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((s) => {
                const company = companies.find((c) => c.id === s.companyId);
                return (
                  <tr
                    key={s.id}
                    className="border-t border-[var(--line)] hover:bg-[var(--paper)]"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/shop/${s.id}`}
                        className="font-semibold text-[var(--forest)] hover:underline"
                      >
                        {s.name}
                      </Link>
                      <p className="text-xs text-[var(--muted)]">{s.code}</p>
                    </td>
                    <td className="px-4 py-3">{company?.name}</td>
                    <td className="px-4 py-3">{stationLabel(s.stationType)}</td>
                    <td className="px-4 py-3">{s.manager}</td>
                    <td className="px-4 py-3 capitalize">{s.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="history" className="mt-12 scroll-mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
          Recent price changes
        </h2>
        <ul className="mt-4 space-y-3">
          {priceHistory.map((h) => (
            <li
              key={h.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3"
            >
              <div>
                <p className="font-medium">{h.name}</p>
                <p className="text-xs text-[var(--muted)]">
                  {formatDateTime(h.at)} · {h.changedBy}
                </p>
              </div>
              <p className="text-sm">
                <span className="text-[var(--muted)] line-through">
                  {naira(h.oldPrice)}
                </span>
                <span className="mx-2 text-[var(--muted)]">→</span>
                <span className="font-semibold text-[var(--forest)]">
                  {naira(h.newPrice)}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </DashboardShell>
  );
}
