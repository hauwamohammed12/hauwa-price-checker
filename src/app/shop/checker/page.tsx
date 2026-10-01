"use client";

import { PriceChecker } from "@/components/PriceChecker";
import { useAuth } from "@/context/AppProviders";

export default function ShopCheckerPage() {
  const { user } = useAuth();
  return (
    <PriceChecker
      defaultShopId={user?.shopId}
      lockShop
      showShopPicker={false}
    />
  );
}
