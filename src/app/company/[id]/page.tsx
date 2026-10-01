import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { ProductTable } from "@/components/ProductTable";
import { StatTile } from "@/components/StatTile";
import {
  companyStats,
  getCompany,
  getProductsByCompany,
  getShopsByCompany,
} from "@/lib/data";
import { naira, stationLabel } from "@/lib/format";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = getCompany(id);
  if (!company) notFound();

  const branchShops = getShopsByCompany(company.id);
  const products = getProductsByCompany(company.id).slice(0, 40);
  const stats = companyStats(company.id);

  return (
    <DashboardShell
      title={company.name}
      subtitle={`${company.city}, ${company.state} · Manager: ${company.manager}`}
      badge="Company"
      nav={[
        { href: `/company/${company.id}`, label: "Overview" },
        { href: `/company/${company.id}#shops`, label: "Shops" },
        { href: `/company/${company.id}#catalog`, label: "Catalog" },
        { href: "/admin", label: "← Org admin" },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Shops" value={String(stats.shops)} hint={`${stats.openShops} open`} />
        <StatTile label="Products" value={String(stats.products)} accent="gold" />
        <StatTile label="Low stock" value={String(stats.lowStock)} accent="clay" />
        <StatTile
          label="Inventory value"
          value={naira(stats.catalogValue)}
          accent="forest"
        />
      </div>

      <section id="shops" className="mt-10 scroll-mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
          Stations / Shops
        </h2>
        <p className="mb-4 text-sm text-[var(--muted)]">
          Selling points under {company.code}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {branchShops.map((s) => (
            <Link
              key={s.id}
              href={`/shop/${s.id}`}
              className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--forest)]/40"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--gold-deep)]">
                  {s.code}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                    s.status === "open"
                      ? "bg-[var(--forest)]/10 text-[var(--forest)]"
                      : "bg-[#b85c38]/15 text-[#9a3412]"
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                {s.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{s.address}</p>
              <p className="mt-3 text-sm">
                {stationLabel(s.stationType)} · {s.manager}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="catalog" className="mt-12 scroll-mt-8">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-semibold">
          Branch catalog snapshot
        </h2>
        <ProductTable products={products} showShop />
      </section>
    </DashboardShell>
  );
}
