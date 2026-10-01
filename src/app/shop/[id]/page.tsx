import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { PriceSearch } from "@/components/PriceSearch";
import { StatTile } from "@/components/StatTile";
import {
  getCompany,
  getProductsByShop,
  getShop,
  priceHistory,
  shopStats,
} from "@/lib/data";
import { formatDateTime, naira, stationLabel } from "@/lib/format";
import { ShopCatalog } from "@/components/ShopCatalog";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shop = getShop(id);
  if (!shop) notFound();

  const company = getCompany(shop.companyId);
  const allProducts = getProductsByShop(shop.id);
  const stats = shopStats(shop.id);
  const history = priceHistory.filter((h) => h.shopId === shop.id);

  return (
    <DashboardShell
      title={shop.name}
      subtitle={`${stationLabel(shop.stationType)} · ${company?.name ?? ""} · ${shop.manager}`}
      badge="Shop"
      nav={[
        { href: `/shop/${shop.id}`, label: "Overview" },
        { href: `/shop/${shop.id}#checker`, label: "Shop checker" },
        { href: `/shop/${shop.id}#catalog`, label: "Catalog" },
        { href: `/company/${shop.companyId}`, label: "← Company" },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Products" value={String(stats.products)} />
        <StatTile
          label="Categories"
          value={String(stats.categories)}
          accent="gold"
        />
        <StatTile
          label="Low stock"
          value={String(stats.lowStock)}
          accent="clay"
        />
        <StatTile
          label="Inventory value"
          value={naira(stats.catalogValue)}
          accent="forest"
        />
      </div>

      <section className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[var(--shadow)]">
        <p className="text-sm text-[var(--muted)]">{shop.address}</p>
        <p className="mt-1 text-sm">
          Status:{" "}
          <span className="font-semibold capitalize text-[var(--forest)]">
            {shop.status}
          </span>
        </p>
      </section>

      <section id="checker" className="mt-10 scroll-mt-8">
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
          Shop price checker
        </h2>
        <p className="mb-6 text-sm text-[var(--muted)]">
          Lookup limited to products at this station.
        </p>
        <PriceSearch shopId={shop.id} compact />
      </section>

      <section id="catalog" className="mt-12 scroll-mt-8">
        <ShopCatalog products={allProducts} />
      </section>

      {history.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Price history
          </h2>
          <ul className="mt-4 space-y-3">
            {history.map((h) => (
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
                  <span className="mx-2">→</span>
                  <span className="font-semibold text-[var(--forest)]">
                    {naira(h.newPrice)}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </DashboardShell>
  );
}
