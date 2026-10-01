"use client";

import { Panel } from "@/components/Dashboard";
import { useAuth, useData } from "@/context/AppProviders";
import { formatWhen, naira } from "@/lib/format";

export default function CompanyHistoryPage() {
  const { user } = useAuth();
  const { state } = useData();
  const shopIds = new Set(
    state.shops.filter((s) => s.companyId === user?.companyId).map((s) => s.id),
  );
  const history = state.history.filter((h) => shopIds.has(h.shopId));

  return (
    <Panel>
      <h1 className="m-0 font-display text-3xl font-bold text-forest">Price history</h1>
      <p className="mt-2 text-muted">Audit trail of price changes across company shops.</p>
      <ul className="mt-5 m-0 list-none space-y-2 p-0">
        {history.map((h) => {
          const shop = state.shops.find((s) => s.id === h.shopId);
          return (
            <li
              key={h.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-paper px-4 py-3"
            >
              <div>
                <strong>{h.name}</strong>
                <p className="m-0 mt-1 text-xs text-muted">
                  {shop?.name} · {formatWhen(h.at)} · by {h.changedBy}
                </p>
              </div>
              <div className="font-semibold text-forest">
                {naira(h.oldPrice)} → {naira(h.newPrice)}
              </div>
            </li>
          );
        })}
        {history.length === 0 && (
          <li className="rounded-xl bg-paper px-4 py-4 text-muted">No price changes recorded yet.</li>
        )}
      </ul>
    </Panel>
  );
}
