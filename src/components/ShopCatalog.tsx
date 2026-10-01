"use client";

import { useMemo, useState } from "react";
import { ProductTable } from "@/components/ProductTable";
import type { Product } from "@/lib/types";

export function ShopCatalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products],
  );

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.barcode.includes(q)
      );
    });
  }, [products, filter, category]);

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Product catalog
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Manage and review listed prices for this shop
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter catalog…"
            className="min-h-11 rounded-xl border border-[var(--line)] bg-white px-3 text-sm outline-none ring-[var(--gold)] focus:ring-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-h-11 rounded-xl border border-[var(--line)] bg-white px-3 text-sm outline-none ring-[var(--gold)] focus:ring-2"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ProductTable products={filtered} />
    </>
  );
}
