"use client";

import { RequireAuth } from "@/components/RequireAuth";
import { DashboardShell } from "@/components/Dashboard";

const nav = [
  { href: "/org", label: "Overview" },
  { href: "/org/companies", label: "Companies" },
  { href: "/org/shops", label: "Shops" },
  { href: "/org/users", label: "Users" },
];

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={["org_admin"]}>
      <DashboardShell
        title="Organization"
        subtitle="Hauwa Mohammed network control"
        nav={nav}
      >
        {children}
      </DashboardShell>
    </RequireAuth>
  );
}
