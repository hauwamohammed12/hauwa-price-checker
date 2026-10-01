"use client";

import Link from "next/link";
import { Metric, Panel, primaryBtn } from "@/components/Dashboard";
import { useAuth, useData } from "@/context/AppProviders";
import { formatWhen, naira } from "@/lib/format";

export default function CompanyOverviewPage() {
  const { user } = useAuth();
  const { state } = useData();
  const company = state.companies.find((c) => c.id === user?.companyId);
  const shops = state.shops.filter((s) => s.companyId === user?.companyId);
  const products = state.products.filter((p) => p.companyId === user?.companyId);
  const history = state.history.filter((h) =>
    shops.some((s) => s.id === h.shopId),
  );

  return (
    <div className="grid gap-5">
      <Panel>
        <h1 className="m-0 font-display text-3xl font-bold text-forest">
          {company?.name || "Company"} dashboard
        </h1>
        <p className="mt-2 text-muted">
          {company
            ? `${company.code} · ${company.city} · ${company.status}`
            : "Company profile unavailable."}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Shops" value={shops.length} />
          <Metric label="Open shops" value={shops.filter((s) => s.status === "open").length} />
          <Metric label="Products" value={products.length} />
          <Metric label="Price changes" value={history.length} />
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="m-0 font-display text-xl font-bold text-forest">Your shops</h2>
            <Link href="/company/shops" className={`${primaryBtn} no-underline`}>
              Manage shops
            </Link>
          </div>
          <ul className="m-0 list-none space-y-2 p-0">
            {shops.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-xl bg-paper px-3 py-3 text-sm"
              >
                <span>
                  <strong>{s.name}</strong>
                  <span className="mt-0.5 block text-xs text-muted">
                    {s.code} · {s.city}
                  </span>
                </span>
                <span className="capitalize text-muted">{s.status}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <h2 className="m-0 font-display text-xl font-bold text-forest">Recent price updates</h2>
          <ul className="mt-3 m-0 list-none space-y-2 p-0">
            {history.slice(0, 6).map((h) => (
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
    </div>
  );
}
