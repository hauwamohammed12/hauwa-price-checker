"use client";

import { useMemo, useState } from "react";
import { getShop, searchProducts } from "@/lib/data";
import { naira } from "@/lib/format";
import type { Product } from "@/lib/types";

export function PriceSearch({
  shopId,
  companyId,
  compact = false,
}: {
  shopId?: string;
  companyId?: string;
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [recent, setRecent] = useState<Product[]>([]);

  const results = useMemo(() => {
    if (!submitted) return [];
    return searchProducts(submitted, { shopId, companyId });
  }, [submitted, shopId, companyId]);

  const primary = results[0] ?? null;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSubmitted(q);
    const found = searchProducts(q, { shopId, companyId });
    if (found[0]) {
      setRecent((prev) => {
        const next = [found[0], ...prev.filter((p) => p.id !== found[0].id)];
        return next.slice(0, 6);
      });
    }
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-8"}>
      <form onSubmit={onSubmit} className="animate-rise">
        <label htmlFor="price-query" className="sr-only">
          Barcode, SKU, or product name
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="price-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            autoComplete="off"
            placeholder="Scan barcode or type product name…"
            className="min-h-14 flex-1 rounded-2xl border border-[var(--line)] bg-white/90 px-5 text-lg text-[var(--ink)] outline-none ring-[var(--gold)] transition placeholder:text-[var(--muted)] focus:ring-2"
          />
          <button
            type="submit"
            className="min-h-14 rounded-2xl bg-[var(--forest)] px-8 text-base font-semibold text-[#f7f1e4] shadow-[0_12px_30px_rgba(31,77,58,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--forest-deep)]"
          >
            Check Price
          </button>
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Tip: barcode scanners work in this field — press Enter after scanning.
        </p>
      </form>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article
          className={`min-h-[220px] rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[var(--shadow)] animate-rise-delay sm:p-8 ${
            primary ? "" : "grid place-items-center"
          }`}
          aria-live="polite"
        >
          {!submitted ? (
            <p className="text-center text-[var(--muted)]">
              No item checked yet. Scan a barcode to see the official price.
            </p>
          ) : !primary ? (
            <p className="text-center text-[var(--muted)]">
              No product matched “{submitted}”. Try another barcode or name.
            </p>
          ) : (
            <ResultCard product={primary} />
          )}
        </article>

        <aside className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)]/80 p-6 shadow-[var(--shadow)] animate-rise-delay-2">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--ink)]">
            Recent checks
          </h3>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-[var(--muted)]">
              Your latest lookups will appear here.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recent.map((p) => {
                const shop = getShop(p.shopId);
                return (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-[var(--ink)]">{p.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        {shop?.name ?? p.shopId} · {p.sku}
                      </p>
                    </div>
                    <p className="font-[family-name:var(--font-display)] font-semibold text-[var(--forest)]">
                      {naira(p.price)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      </div>

      {results.length > 1 ? (
        <div className="rounded-[1.75rem] border border-[var(--line)] bg-white/60 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
            Other matches
          </h3>
          <ul className="divide-y divide-[var(--line)]">
            {results.slice(1).map((p) => {
              const shop = getShop(p.shopId);
              return (
                <li
                  key={p.id}
                  className="flex cursor-pointer items-center justify-between gap-3 py-3 transition hover:bg-[var(--paper)]"
                  onClick={() => {
                    setQuery(p.barcode);
                    setSubmitted(p.barcode);
                  }}
                >
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {shop?.name} · {p.sku}
                    </p>
                  </div>
                  <span className="font-semibold text-[var(--forest)]">
                    {naira(p.price)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ResultCard({ product }: { product: Product }) {
  const shop = getShop(product.shopId);
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--gold-deep)]">
        Official price
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
        {product.name}
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {shop?.name} · {product.category} · {product.unit}
      </p>
      <p className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--forest)] sm:text-6xl">
        {naira(product.price)}
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-[var(--muted)]">SKU</dt>
          <dd className="font-medium">{product.sku}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Barcode</dt>
          <dd className="font-medium">{product.barcode}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Stock</dt>
          <dd className="font-medium">{product.stock}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Updated</dt>
          <dd className="font-medium">
            {new Date(product.updatedAt).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
            })}
          </dd>
        </div>
      </dl>
      {product.notes ? (
        <p className="mt-4 rounded-xl bg-[var(--paper)] px-3 py-2 text-sm text-[var(--muted)]">
          {product.notes}
        </p>
      ) : null}
    </div>
  );
}
