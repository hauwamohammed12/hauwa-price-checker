"use client";

import { useState } from "react";
import { Field, Panel, ghostBtn, inputClass, primaryBtn } from "@/components/Dashboard";
import { useData } from "@/context/AppProviders";

export default function OrgShopsPage() {
  const { state, addShop, updateShop } = useData();
  const [companyId, setCompanyId] = useState(state.companies[0]?.id || "");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="grid gap-5">
      <Panel>
        <h1 className="m-0 font-display text-3xl font-bold text-forest">Shops</h1>
        <p className="mt-2 text-muted">Create outlets under any company in the organization.</p>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!companyId) return;
            addShop({
              companyId,
              name: name.trim(),
              code: code.trim().toUpperCase(),
              address: address.trim(),
              city: city.trim(),
              status: "open",
            });
            setName("");
            setCode("");
            setAddress("");
            setCity("");
          }}
        >
          <Field label="Company">
            <select
              className={inputClass}
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            >
              {state.companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Shop name">
            <input required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Code">
            <input required className={inputClass} value={code} onChange={(e) => setCode(e.target.value)} />
          </Field>
          <Field label="Address">
            <input required className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <Field label="City">
            <input required className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} />
          </Field>
          <div className="flex items-end">
            <button type="submit" className={primaryBtn}>
              Add shop
            </button>
          </div>
        </form>
      </Panel>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="px-2 py-2">Shop</th>
                <th className="px-2 py-2">Company</th>
                <th className="px-2 py-2">Location</th>
                <th className="px-2 py-2">Products</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2" />
              </tr>
            </thead>
            <tbody>
              {state.shops.map((s) => {
                const company = state.companies.find((c) => c.id === s.companyId);
                const products = state.products.filter((p) => p.shopId === s.id).length;
                return (
                  <tr key={s.id} className="border-b border-line/70">
                    <td className="px-2 py-3">
                      <strong>{s.name}</strong>
                      <span className="mt-0.5 block text-xs text-muted">{s.code}</span>
                    </td>
                    <td className="px-2 py-3">{company?.name || "—"}</td>
                    <td className="px-2 py-3">
                      {s.city}
                      <span className="mt-0.5 block text-xs text-muted">{s.address}</span>
                    </td>
                    <td className="px-2 py-3">{products}</td>
                    <td className="px-2 py-3 capitalize">{s.status}</td>
                    <td className="px-2 py-3">
                      <button
                        type="button"
                        className={ghostBtn}
                        onClick={() =>
                          updateShop(s.id, { status: s.status === "open" ? "closed" : "open" })
                        }
                      >
                        {s.status === "open" ? "Close" : "Open"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
