"use client";

import { useMemo, useState } from "react";
import { useAuth, useData } from "@/context/AppProviders";
import { CATEGORIES, type Product } from "@/lib/types";
import { naira } from "@/lib/format";
import {
  Field,
  ghostBtn,
  inputClass,
  Panel,
  primaryBtn,
} from "@/components/Dashboard";

export function ProductManager({
  shopId,
  companyId,
}: {
  shopId: string;
  companyId: string;
}) {
  const { user } = useAuth();
  const { state, saveProduct, deleteProduct } = useData();
  const products = useMemo(
    () => state.products.filter((p) => p.shopId === shopId),
    [state.products, shopId],
  );

  const empty = {
    name: "",
    barcode: "",
    sku: "",
    category: CATEGORIES[0],
    unit: "",
    price: "",
    stock: "",
    notes: "",
  };

  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | undefined>();
  const [filter, setFilter] = useState("");

  const filtered = products.filter((p) => {
    const q = filter.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.barcode.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  function fill(p: Product) {
    setEditId(p.id);
    setForm({
      name: p.name,
      barcode: p.barcode,
      sku: p.sku,
      category: p.category,
      unit: p.unit,
      price: String(p.price),
      stock: String(p.stock),
      notes: p.notes,
    });
  }

  function reset() {
    setEditId(undefined);
    setForm(empty);
  }

  return (
    <div className="grid gap-5">
      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="m-0 font-display text-2xl font-bold text-forest">
              {editId ? "Update product" : "Add product"}
            </h2>
            <p className="mt-1 text-sm text-muted">Manage shop catalog and official prices.</p>
          </div>
          {editId && (
            <button type="button" className={ghostBtn} onClick={reset}>
              Clear form
            </button>
          )}
        </div>

        <form
          className="mt-4 grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            saveProduct(
              {
                id: editId,
                shopId,
                companyId,
                name: form.name.trim(),
                barcode: form.barcode.trim(),
                sku: form.sku.trim(),
                category: form.category,
                unit: form.unit.trim(),
                price: Number(form.price),
                stock: Number(form.stock),
                notes: form.notes.trim(),
              },
              user?.name || "Staff",
            );
            reset();
          }}
        >
          <Field label="Name">
            <input
              required
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Barcode">
            <input
              required
              className={inputClass}
              value={form.barcode}
              onChange={(e) => setForm({ ...form, barcode: e.target.value })}
            />
          </Field>
          <Field label="SKU">
            <input
              required
              className={inputClass}
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
          </Field>
          <Field label="Category">
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as Product["category"] })
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Unit">
            <input
              required
              className={inputClass}
              placeholder="bag, litre, piece"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            />
          </Field>
          <Field label="Price (₦)">
            <input
              required
              type="number"
              min={0}
              step="0.01"
              className={inputClass}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </Field>
          <Field label="Stock">
            <input
              required
              type="number"
              min={0}
              className={inputClass}
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </Field>
          <Field label="Notes">
            <input
              className={inputClass}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <button type="submit" className={primaryBtn}>
              {editId ? "Update product" : "Save product"}
            </button>
          </div>
        </form>
      </Panel>

      <Panel>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="m-0 font-display text-xl font-bold text-forest">Shop catalog</h3>
          <input
            className={`${inputClass} max-w-xs`}
            placeholder="Filter products…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="px-2 py-2 font-semibold">Product</th>
                <th className="px-2 py-2 font-semibold">Barcode</th>
                <th className="px-2 py-2 font-semibold">Price</th>
                <th className="px-2 py-2 font-semibold">Stock</th>
                <th className="px-2 py-2 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-line/70">
                  <td className="px-2 py-3 font-medium">{p.name}</td>
                  <td className="px-2 py-3">{p.barcode}</td>
                  <td className="px-2 py-3">{naira(p.price)}</td>
                  <td className="px-2 py-3">{p.stock}</td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <button type="button" className={ghostBtn} onClick={() => fill(p)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className={ghostBtn}
                        onClick={() => {
                          if (confirm("Delete this product?")) deleteProduct(p.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-2 py-6 text-muted">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
