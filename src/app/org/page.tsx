"use client";

import Link from "next/link";
import { Metric, Panel, ghostBtn, primaryBtn } from "@/components/Dashboard";
import { useData } from "@/context/AppProviders";
import { formatWhen, naira } from "@/lib/format";

export default function OrgOverviewPage() {
  const { state, resetDemo } = useData();
  const openShops = state.shops.filter((s) => s.status === "open").length;
  const activeCompanies = state.companies.filter((c) => c.status === "active").length;

  return (
    <div className="grid gap-5">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="m-0 font-display text-3xl font-bold text-forest">Organization overview</h1>
            <p className="mt-2 max-w-xl text-muted">
              Monitor companies, shops, catalog size, and recent price changes across the Hauwa
              Mohammed Price Checker network.
            </p>
          </div>
          <button
            type="button"
            className={ghostBtn}
            onClick={() => {
              if (confirm("Reset all demo data to the original seed?")) resetDemo();
            }}
          >
            Reset demo data
          </button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Companies" value={state.companies.length} />
          <Metric label="Active companies" value={activeCompanies} />
          <Metric label="Open shops" value={openShops} />
          <Metric label="Products" value={state.products.length} />
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="m-0 font-display text-xl font-bold text-forest">Companies</h2>
            <Link href="/org/companies" className={`${primaryBtn} no-underline`}>
              Manage
            </Link>
          </div>
          <ul className="m-0 list-none space-y-2 p-0">
            {state.companies.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between rounded-xl bg-paper px-3 py-3 text-sm"
              >
                <span>
                  <strong>{c.name}</strong>
                  <span className="mt-0.5 block text-xs text-muted">
                    {c.code} · {c.city}
                  </span>
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    c.status === "active"
                      ? "bg-mint/15 text-forest"
                      : "bg-line/60 text-muted"
                  }`}
                >
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <h2 className="m-0 font-display text-xl font-bold text-forest">Latest price changes</h2>
          <ul className="mt-3 m-0 list-none space-y-2 p-0">
            {state.history.slice(0, 6).map((h) => (
              <li
                key={h.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-3 text-sm"
              >
                <span>
                  <strong>{h.name}</strong>
                  <span className="mt-0.5 block text-xs text-muted">
                    {formatWhen(h.at)} · {h.changedBy}
                  </span>
                </span>
                <span className="shrink-0 font-semibold text-forest">
                  {naira(h.oldPrice)} → {naira(h.newPrice)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
