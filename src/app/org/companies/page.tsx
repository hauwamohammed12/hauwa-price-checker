"use client";

import { useState } from "react";
import { Field, Panel, ghostBtn, inputClass, primaryBtn } from "@/components/Dashboard";
import { useData } from "@/context/AppProviders";
import { formatWhen } from "@/lib/format";

export default function OrgCompaniesPage() {
  const { state, addCompany, updateCompany } = useData();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="grid gap-5">
      <Panel>
        <h1 className="m-0 font-display text-3xl font-bold text-forest">Companies</h1>
        <p className="mt-2 text-muted">Register and activate companies under Hauwa Mohammed.</p>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-4"
          onSubmit={(e) => {
            e.preventDefault();
            addCompany({
              name: name.trim(),
              code: code.trim().toUpperCase(),
              city: city.trim(),
              status: "active",
            });
            setName("");
            setCode("");
            setCity("");
          }}
        >
          <Field label="Company name">
            <input required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Code">
            <input required className={inputClass} value={code} onChange={(e) => setCode(e.target.value)} />
          </Field>
          <Field label="City">
            <input required className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} />
          </Field>
          <div className="flex items-end">
            <button type="submit" className={primaryBtn}>
              Add company
            </button>
          </div>
        </form>
      </Panel>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Code</th>
                <th className="px-2 py-2">City</th>
                <th className="px-2 py-2">Shops</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Created</th>
                <th className="px-2 py-2" />
              </tr>
            </thead>
            <tbody>
              {state.companies.map((c) => {
                const shops = state.shops.filter((s) => s.companyId === c.id).length;
                return (
                  <tr key={c.id} className="border-b border-line/70">
                    <td className="px-2 py-3 font-medium">{c.name}</td>
                    <td className="px-2 py-3">{c.code}</td>
                    <td className="px-2 py-3">{c.city}</td>
                    <td className="px-2 py-3">{shops}</td>
                    <td className="px-2 py-3 capitalize">{c.status}</td>
                    <td className="px-2 py-3">{formatWhen(c.createdAt)}</td>
                    <td className="px-2 py-3">
                      <button
                        type="button"
                        className={ghostBtn}
                        onClick={() =>
                          updateCompany(c.id, {
                            status: c.status === "active" ? "paused" : "active",
                          })
                        }
                      >
                        {c.status === "active" ? "Pause" : "Activate"}
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
