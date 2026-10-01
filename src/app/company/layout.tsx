"use client";

import { RequireAuth } from "@/components/RequireAuth";
import { DashboardShell } from "@/components/Dashboard";

const nav = [
  { href: "/company", label: "Overview" },
  { href: "/company/shops", label: "Shops" },
  { href: "/company/catalog", label: "Catalog" },
  { href: "/company/history", label: "Price history" },
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={["company_admin"]}>
      <DashboardShell
        title="Company"
        subtitle="Outlet and catalog operations"
        nav={nav}
      >
        {children}
      </DashboardShell>
    </RequireAuth>
  );
}
