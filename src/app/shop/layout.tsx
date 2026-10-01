"use client";

import { RequireAuth } from "@/components/RequireAuth";
import { DashboardShell } from "@/components/Dashboard";

const nav = [
  { href: "/shop", label: "Overview" },
  { href: "/shop/products", label: "Products" },
  { href: "/shop/checker", label: "Price checker" },
  { href: "/shop/history", label: "Price history" },
];

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={["shop_manager"]}>
      <DashboardShell title="Shop" subtitle="Floor pricing and stock" nav={nav}>
        {children}
      </DashboardShell>
    </RequireAuth>
  );
}
