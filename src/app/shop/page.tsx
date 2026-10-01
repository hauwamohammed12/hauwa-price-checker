"use client";

import Link from "next/link";
import { Metric, Panel, primaryBtn } from "@/components/Dashboard";
import { useAuth, useData } from "@/context/AppProviders";
import { formatWhen, naira } from "@/lib/format";

export default function ShopOverviewPage() {
  const { user } = useAuth();
  const { state } = useData();
  const shop = state.shops.find((s) => s.id === user?.shopId);
  const company = state.companies.find((c) => c.id === user?.companyId);
  const products = state.products.filter((p) => p.shopId === user?.shopId);
  const lowStock = products.filter((p) => p.stock <= 15).length;
  const history = state.history.filter((h) => h.shopId === user?.shopId);

  return (
    <div className="grid gap-5">
      <Panel>
        <h1 className="m-0 font-display text-3xl font-bold text-forest">
          {shop?.name || "Shop"} desk
        </h1>
        <p className="mt-2 text-muted">
          {company?.name} · {shop?.code} · {shop?.address}, {shop?.city}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Products" value={products.length} />
          <Metric label="Low stock" value={lowStock} />
          <Metric label="Shop status" value={shop?.status === "open" ? "Open" : "Closed"} />
          <Metric label="Price changes" value={history.length} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/shop/products" className={`${primaryBtn} no-underline`}>
            Manage products
          </Link>
          <Link
            href="/shop/checker"
            className="rounded-xl border border-line bg-transparent px-4 py-2.5 text-sm font-semibold text-ink no-underline hover:bg-paper-2"
          >
            Open checker
          </Link>
        </div>
      </Panel>

      <Panel>
        <h2 className="m-0 font-display text-xl font-bold text-forest">Recent price changes</h2>
        <ul className="mt-3 m-0 list-none space-y-2 p-0">
          {history.slice(0, 5).map((h) => (
            <li
              key={h.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-3 text-sm"
            >
              <span>
                <strong>{h.name}</strong>
                <span className="mt-0.5 block text-xs text-muted">{formatWhen(h.at)}</span>
              </span>
              <span className="font-semibold text-forest">
                {naira(h.oldPrice)} → {naira(h.newPrice)}
              </span>
            </li>
          ))}
          {history.length === 0 && (
            <li className="rounded-xl bg-paper px-3 py-3 text-sm text-muted">
              No price changes yet.
            </li>
          )}
        </ul>
      </Panel>
    </div>
  );
}
