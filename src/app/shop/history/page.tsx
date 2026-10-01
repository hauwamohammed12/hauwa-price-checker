"use client";

import { Panel } from "@/components/Dashboard";
import { useAuth, useData } from "@/context/AppProviders";
import { formatWhen, naira } from "@/lib/format";

export default function ShopHistoryPage() {
  const { user } = useAuth();
  const { state } = useData();
  const history = state.history.filter((h) => h.shopId === user?.shopId);

  return (
    <Panel>
      <h1 className="m-0 font-display text-3xl font-bold text-forest">Shop price history</h1>
      <p className="mt-2 text-muted">Every price update recorded for this outlet.</p>
      <ul className="mt-5 m-0 list-none space-y-2 p-0">
        {history.map((h) => (
          <li
            key={h.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-paper px-4 py-3"
          >
            <div>
              <strong>{h.name}</strong>
              <p className="m-0 mt-1 text-xs text-muted">
                {formatWhen(h.at)} · by {h.changedBy}
              </p>
            </div>
            <div className="font-semibold text-forest">
              {naira(h.oldPrice)} → {naira(h.newPrice)}
            </div>
          </li>
        ))}
        {history.length === 0 && (
          <li className="rounded-xl bg-paper px-4 py-4 text-muted">No price changes recorded yet.</li>
        )}
      </ul>
    </Panel>
  );
}
