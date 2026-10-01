"use client";

import { useMemo, useState } from "react";
import { useData } from "@/context/AppProviders";
import { formatWhen, naira } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Field, inputClass, Panel, primaryBtn } from "@/components/Dashboard";

export function PriceChecker({
  defaultShopId,
  lockShop = false,
  showShopPicker = true,
}: {
  defaultShopId?: string;
  lockShop?: boolean;
  showShopPicker?: boolean;
}) {
  const { state, findProducts, recordCheck, lastPriceChange } = useData();
  const openShops = useMemo(
    () => state.shops.filter((s) => s.status === "open"),
    [state.shops],
  );
  const [shopId, setShopId] = useState(defaultShopId || openShops[0]?.id || "");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [miss, setMiss] = useState(false);

  const activeShopId = lockShop && defaultShopId ? defaultShopId : shopId;
  const suggestions = query.trim().length >= 2 ? findProducts(query, activeShopId || undefined) : [];
  const change = selected ? lastPriceChange(selected.id) : undefined;
  const shop = state.shops.find((s) => s.id === selected?.shopId);
  const company = state.companies.find((c) => c.id === selected?.companyId);

  function runCheck(value?: string) {
    const hits = findProducts(value ?? query, activeShopId || undefined);
    if (!hits.length) {
      setSelected(null);
      setMiss(true);
      return;
    }
    const product = hits[0];
    setSelected(product);
    setMiss(false);
    setQuery(product.barcode);
    recordCheck(product.id, product.shopId);
  }

  const recentItems = state.recent
    .map((r) => {
      const product = state.products.find((p) => p.id === r.productId);
      if (!product) return null;
      if (activeShopId && product.shopId !== activeShopId) return null;
      return { ...r, product };
    })
    .filter(Boolean)
    .slice(0, 6) as Array<{ at: number; productId: string; shopId: string; product: Product }>;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <Panel className="animate-rise">
        <h2 className="m-0 font-display text-2xl font-bold text-forest">Scan or search a product</h2>
        <p className="mt-2 text-muted">
          Enter a barcode, SKU, or product name. Barcode scanners work in this field.
        </p>

        {showShopPicker && !lockShop && (
          <div className="mt-4 max-w-md">
            <Field label="Shop">
              <select
                className={inputClass}
                value={activeShopId}
                onChange={(e) => {
                  setShopId(e.target.value);
                  setSelected(null);
                  setMiss(false);
                }}
              >
                {openShops.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {s.city}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}

        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            runCheck();
          }}
        >
          <label className="sr-only" htmlFor="price-query">
            Barcode, SKU, or product name
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="price-query"
              className={`${inputClass} flex-1`}
              value={query}
              autoFocus
              placeholder="e.g. 8901234567890 or Golden Rice 25kg"
              onChange={(e) => {
                setQuery(e.target.value);
                setMiss(false);
              }}
            />
            <button type="submit" className={primaryBtn}>
              Check Price
            </button>
          </div>
        </form>

        {suggestions.length > 0 && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-white">
            {suggestions.map((p) => (
              <button
                key={p.id}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between border-0 border-b border-line bg-transparent px-3 py-2.5 text-left text-sm last:border-b-0 hover:bg-paper"
                onClick={() => {
                  setQuery(p.barcode);
                  setSelected(p);
                  setMiss(false);
                  recordCheck(p.id, p.shopId);
                }}
              >
                <span>{p.name}</span>
                <strong className="text-forest">{naira(p.price)}</strong>
              </button>
            ))}
          </div>
        )}

        <div className="mt-5">
          {!selected && !miss && (
            <div className="rounded-2xl border border-dashed border-line bg-paper/60 px-4 py-10 text-center text-muted">
              No item checked yet. Scan a barcode to see the official price.
            </div>
          )}
          {miss && (
            <div className="rounded-2xl border border-dashed border-danger/40 bg-[#fff5f5] px-4 py-8 text-center text-danger">
              No matching product. Try the barcode, SKU, or part of the name.
            </div>
          )}
          {selected && (
            <article className="animate-rise-delay rounded-2xl border border-line bg-gradient-to-br from-white to-paper px-5 py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted">{selected.category}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    selected.stock > 0
                      ? "bg-mint/15 text-forest"
                      : "bg-danger/10 text-danger"
                  }`}
                >
                  {selected.stock > 0 ? "In stock" : "Out of stock"}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">{selected.name}</h3>
              <p className="m-0 mt-2 font-display text-4xl font-bold tracking-tight text-forest">
                {naira(selected.price)}
              </p>
              <p className="mt-1 text-sm text-muted">
                per {selected.unit}
                {change && (
                  <>
                    {" · "}
                    <span className="line-through">{naira(change.oldPrice)}</span>
                    {" → "}
                    <span className="font-semibold text-forest">{naira(change.newPrice)}</span>
                  </>
                )}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Fact label="Barcode" value={selected.barcode} />
                <Fact label="SKU" value={selected.sku} />
                <Fact label="Stock" value={String(selected.stock)} />
                <Fact label="Notes" value={selected.notes || "—"} />
                <Fact label="Shop" value={shop?.name || "—"} />
                <Fact label="Company" value={company?.name || "—"} />
              </div>
            </article>
          )}
        </div>
      </Panel>

      <Panel className="animate-rise-delay-2 h-fit">
        <h3 className="m-0 font-display text-xl font-bold text-forest">Recent checks</h3>
        <ul className="mt-4 list-none space-y-2 p-0">
          {recentItems.length === 0 && (
            <li className="rounded-xl bg-paper px-3 py-3 text-sm text-muted">No checks yet</li>
          )}
          {recentItems.map((item) => (
            <li key={`${item.productId}-${item.at}`}>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-0 bg-paper px-3 py-3 text-left transition hover:bg-paper-2"
                onClick={() => {
                  setSelected(item.product);
                  setQuery(item.product.barcode);
                  setMiss(false);
                }}
              >
                <span>
                  <span className="block text-sm font-semibold">{item.product.name}</span>
                  <span className="text-xs text-muted">{formatWhen(item.at)}</span>
                </span>
                <strong className="text-forest">{naira(item.product.price)}</strong>
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper/80 px-3 py-2">
      <span className="block text-xs uppercase tracking-[0.08em] text-muted">{label}</span>
      <strong className="text-sm">{value}</strong>
    </div>
  );
}
