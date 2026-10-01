"use client";

import { ProductManager } from "@/components/ProductManager";
import { useAuth } from "@/context/AppProviders";

export default function ShopProductsPage() {
  const { user } = useAuth();
  if (!user?.shopId || !user.companyId) {
    return <p className="text-muted">This account is not linked to a shop.</p>;
  }
  return <ProductManager shopId={user.shopId} companyId={user.companyId} />;
}
