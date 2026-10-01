"use client";

import { useMemo, useState } from "react";
import { Field, Panel, inputClass } from "@/components/Dashboard";
import { useAuth, useData } from "@/context/AppProviders";
import { naira } from "@/lib/format";

export default function CompanyCatalogPage() {
  const { user } = useAuth();
  const { state } = useData();
  const shops = state.shops.filter((s) => s.companyId === user?.companyId);
  const [shopFilter, setShopFilter] = useState("");
  const [query, setQuery] = useState("");

  const products = useMemo(() => {
    return state.products
      .filter((p) => p.companyId === user?.companyId)
      .filter((p) => !shopFilter || p.shopId === shopFilter)
      .filter((p) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          p.name.toLowerCase().includes(q) ||
          p.barcode.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      });
  }, [state.products, user?.companyId, shopFilter, query]);

  return (
    <Panel>
      <h1 className="m-0 font-display text-3xl font-bold text-forest">Company catalog</h1>
      <p className="mt-2 text-muted">Read-only view of products across your shops.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Filter by shop">
          <select
            className={inputClass}
            value={shopFilter}
            onChange={(e) => setShopFilter(e.target.value)}
          >
            <option value="">All shops</option>
            {shops.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Search">
          <input
            className={inputClass}
            placeholder="Name, barcode, or SKU"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Field>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="px-2 py-2">Product</th>
              <th className="px-2 py-2">Shop</th>
              <th className="px-2 py-2">Barcode / SKU</th>
              <th className="px-2 py-2">Category</th>
              <th className="px-2 py-2">Price</th>
              <th className="px-2 py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const shop = shops.find((s) => s.id === p.shopId);
              return (
                <tr key={p.id} className="border-b border-line/70">
                  <td className="px-2 py-3 font-medium">{p.name}</td>
                  <td className="px-2 py-3">{shop?.name || "—"}</td>
                  <td className="px-2 py-3">
                    {p.barcode} / {p.sku}
                  </td>
                  <td className="px-2 py-3">{p.category}</td>
                  <td className="px-2 py-3">{naira(p.price)}</td>
                  <td className="px-2 py-3">{p.stock}</td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-2 py-6 text-muted">
                  No products match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
