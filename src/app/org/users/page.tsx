"use client";

import { useState } from "react";
import { Field, Panel, inputClass, primaryBtn } from "@/components/Dashboard";
import { useData } from "@/context/AppProviders";
import { roleLabel } from "@/lib/format";
import type { Role } from "@/lib/types";

export default function OrgUsersPage() {
  const { state, addUser } = useData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("company_admin");
  const [companyId, setCompanyId] = useState(state.companies[0]?.id || "");
  const [shopId, setShopId] = useState("");
  const [message, setMessage] = useState("");

  const shopsForCompany = state.shops.filter((s) => s.companyId === companyId);

  return (
    <div className="grid gap-5">
      <Panel>
        <h1 className="m-0 font-display text-3xl font-bold text-forest">Users</h1>
        <p className="mt-2 text-muted">Invite organization, company, and shop staff accounts.</p>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            const result = addUser({
              name: name.trim(),
              email: email.trim(),
              password,
              role,
              companyId:
                role === "company_admin" || role === "shop_manager" ? companyId : undefined,
              shopId: role === "shop_manager" ? shopId || shopsForCompany[0]?.id : undefined,
            });
            if (!result.ok) {
              setMessage(result.error);
              return;
            }
            setMessage("User added.");
            setName("");
            setEmail("");
            setPassword("");
          }}
        >
          <Field label="Full name">
            <input required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <input
              required
              type="text"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field label="Role">
            <select
              className={inputClass}
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value="org_admin">Organization Admin</option>
              <option value="company_admin">Company Admin</option>
              <option value="shop_manager">Shop Manager</option>
            </select>
          </Field>
          {(role === "company_admin" || role === "shop_manager") && (
            <Field label="Company">
              <select
                className={inputClass}
                value={companyId}
                onChange={(e) => {
                  setCompanyId(e.target.value);
                  setShopId("");
                }}
              >
                {state.companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          )}
          {role === "shop_manager" && (
            <Field label="Shop">
              <select
                className={inputClass}
                value={shopId || shopsForCompany[0]?.id || ""}
                onChange={(e) => setShopId(e.target.value)}
              >
                {shopsForCompany.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
          )}
          <div className="sm:col-span-2 flex items-center gap-3">
            <button type="submit" className={primaryBtn}>
              Add user
            </button>
            {message && <p className="m-0 text-sm text-muted">{message}</p>}
          </div>
        </form>
      </Panel>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Email</th>
                <th className="px-2 py-2">Role</th>
                <th className="px-2 py-2">Assignment</th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((u) => {
                const company = state.companies.find((c) => c.id === u.companyId);
                const shop = state.shops.find((s) => s.id === u.shopId);
                return (
                  <tr key={u.id} className="border-b border-line/70">
                    <td className="px-2 py-3 font-medium">{u.name}</td>
                    <td className="px-2 py-3">{u.email}</td>
                    <td className="px-2 py-3">{roleLabel(u.role)}</td>
                    <td className="px-2 py-3 text-muted">
                      {shop?.name || company?.name || "Organization-wide"}
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
