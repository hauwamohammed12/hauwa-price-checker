import type {
  Company,
  Organization,
  PriceHistoryEntry,
  Product,
  Shop,
} from "./types";

export const organization: Organization = {
  id: "org-hm",
  name: "Hauwa Mohammed",
  tagline: "Computerized Price Checking System",
  adminName: "Hauwa Mohammed",
};

export const companies: Company[] = [
  {
    id: "co-abuja",
    name: "HM Retail Abuja",
    code: "HM-ABJ",
    city: "Abuja",
    state: "FCT",
    manager: "Aisha Bello",
    phone: "+234 803 111 2201",
    status: "active",
  },
  {
    id: "co-kano",
    name: "HM Retail Kano",
    code: "HM-KAN",
    city: "Kano",
    state: "Kano",
    manager: "Yusuf Ibrahim",
    phone: "+234 803 111 2202",
    status: "active",
  },
  {
    id: "co-lagos",
    name: "HM Retail Lagos",
    code: "HM-LOS",
    city: "Lagos",
    state: "Lagos",
    manager: "Funke Adeyemi",
    phone: "+234 803 111 2203",
    status: "active",
  },
];

export const shops: Shop[] = [
  {
    id: "shop-gw",
    companyId: "co-abuja",
    name: "Gwarinpa Station",
    code: "ABJ-GW",
    address: "Plot 12, 1st Avenue, Gwarinpa, Abuja",
    stationType: "supermarket",
    manager: "Chinedu Okafor",
    status: "open",
  },
  {
    id: "shop-wuse",
    companyId: "co-abuja",
    name: "Wuse Market Shop",
    code: "ABJ-WU",
    address: "Shop 44, Zone 5, Wuse, Abuja",
    stationType: "market-stall",
    manager: "Halima Sani",
    status: "open",
  },
  {
    id: "shop-sabon",
    companyId: "co-kano",
    name: "Sabon Gari Station",
    code: "KAN-SG",
    address: "Block C, Sabon Gari Market, Kano",
    stationType: "supermarket",
    manager: "Musa Abdullahi",
    status: "open",
  },
  {
    id: "shop-nassarawa",
    companyId: "co-kano",
    name: "Nassarawa Kiosk",
    code: "KAN-NS",
    address: "Nassarawa GRA, Kano",
    stationType: "kiosk",
    manager: "Zainab Musa",
    status: "open",
  },
  {
    id: "shop-ikeja",
    companyId: "co-lagos",
    name: "Ikeja City Mall Shop",
    code: "LOS-IK",
    address: "Ground Floor, Ikeja City Mall, Lagos",
    stationType: "supermarket",
    manager: "Tunde Bakare",
    status: "open",
  },
  {
    id: "shop-lekki",
    companyId: "co-lagos",
    name: "Lekki Warehouse Outlet",
    code: "LOS-LK",
    address: "Km 18, Lekki-Epe Expressway, Lagos",
    stationType: "warehouse",
    manager: "Grace Okonkwo",
    status: "maintenance",
  },
];

const categories = [
  "Grains & Staples",
  "Oils & Condiments",
  "Household",
  "Beverages",
  "Personal Care",
  "Fresh Produce",
] as const;

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const catalogTemplate: Omit<Product, "id" | "shopId" | "updatedAt">[] = [
  {
    name: "Golden Penny Rice 25kg",
    barcode: "8901234567890",
    sku: "GPR-25",
    category: categories[0],
    unit: "bag",
    price: 48500,
    stock: 42,
    notes: "Parboiled long grain",
  },
  {
    name: "Mama Gold Semovita 10kg",
    barcode: "8901234567891",
    sku: "MGS-10",
    category: categories[0],
    unit: "bag",
    price: 12800,
    stock: 30,
  },
  {
    name: "Dangote Sugar 50kg",
    barcode: "8901234567892",
    sku: "DGS-50",
    category: categories[0],
    unit: "bag",
    price: 72000,
    stock: 18,
  },
  {
    name: "Kings Vegetable Oil 5L",
    barcode: "8901234567893",
    sku: "KVO-5",
    category: categories[1],
    unit: "bottle",
    price: 9800,
    stock: 55,
  },
  {
    name: "Devon King's Oil 3L",
    barcode: "8901234567894",
    sku: "DKO-3",
    category: categories[1],
    unit: "bottle",
    price: 6400,
    stock: 40,
  },
  {
    name: "Maggi Star Cubes 400g",
    barcode: "8901234567895",
    sku: "MSC-400",
    category: categories[1],
    unit: "pack",
    price: 2150,
    stock: 80,
  },
  {
    name: "Indomie Chicken 70g x 40",
    barcode: "8901234567896",
    sku: "IND-40",
    category: categories[0],
    unit: "carton",
    price: 8900,
    stock: 64,
  },
  {
    name: "Peak Milk Powder 400g",
    barcode: "8901234567897",
    sku: "PMK-400",
    category: categories[3],
    unit: "tin",
    price: 3450,
    stock: 36,
  },
  {
    name: "Bournvita 500g",
    barcode: "8901234567898",
    sku: "BVT-500",
    category: categories[3],
    unit: "tin",
    price: 4200,
    stock: 22,
  },
  {
    name: "Always Ultra 16 pads",
    barcode: "8901234567899",
    sku: "ALU-16",
    category: categories[4],
    unit: "pack",
    price: 2650,
    stock: 28,
  },
  {
    name: "Omo Detergent 900g",
    barcode: "8901234567800",
    sku: "OMO-900",
    category: categories[2],
    unit: "pack",
    price: 1850,
    stock: 70,
  },
  {
    name: "Hypo Bleach 1L",
    barcode: "8901234567801",
    sku: "HYP-1",
    category: categories[2],
    unit: "bottle",
    price: 1450,
    stock: 33,
  },
  {
    name: "Tomatoes (local) 1kg",
    barcode: "LOC-TOM-1",
    sku: "TOM-1",
    category: categories[5],
    unit: "kg",
    price: 1800,
    stock: 12,
    notes: "Price may vary daily",
  },
  {
    name: "Onions 1kg",
    barcode: "LOC-ONI-1",
    sku: "ONI-1",
    category: categories[5],
    unit: "kg",
    price: 1400,
    stock: 20,
  },
  {
    name: "Coca-Cola PET 50cl x 12",
    barcode: "8901234567802",
    sku: "COK-12",
    category: categories[3],
    unit: "pack",
    price: 3600,
    stock: 48,
  },
];

/** Slight price/stock variance per shop for realism */
function shopVariance(shopIndex: number, base: number, kind: "price" | "stock") {
  if (kind === "price") {
    const factors = [1, 0.98, 1.03, 1.01, 0.97, 1.05];
    return Math.round(base * factors[shopIndex % factors.length]);
  }
  const factors = [1, 0.7, 1.2, 0.85, 1.1, 0.4];
  return Math.max(0, Math.round(base * factors[shopIndex % factors.length]));
}

export const products: Product[] = shops.flatMap((shop, shopIndex) =>
  catalogTemplate.map((item, i) => ({
    ...item,
    id: `${shop.id}-p${i + 1}`,
    shopId: shop.id,
    price: shopVariance(shopIndex, item.price, "price"),
    stock: shopVariance(shopIndex, item.stock, "stock"),
    updatedAt: daysAgo((i + shopIndex) % 9),
  })),
);

export const priceHistory: PriceHistoryEntry[] = [
  {
    id: "h1",
    productId: "shop-gw-p1",
    shopId: "shop-gw",
    name: "Golden Penny Rice 25kg",
    oldPrice: 46000,
    newPrice: 48500,
    at: daysAgo(3),
    changedBy: "Chinedu Okafor",
  },
  {
    id: "h2",
    productId: "shop-gw-p4",
    shopId: "shop-gw",
    name: "Kings Vegetable Oil 5L",
    oldPrice: 9200,
    newPrice: 9800,
    at: daysAgo(1),
    changedBy: "Chinedu Okafor",
  },
  {
    id: "h3",
    productId: "shop-sabon-p1",
    shopId: "shop-sabon",
    name: "Golden Penny Rice 25kg",
    oldPrice: 47000,
    newPrice: 47530,
    at: daysAgo(2),
    changedBy: "Musa Abdullahi",
  },
  {
    id: "h4",
    productId: "shop-ikeja-p8",
    shopId: "shop-ikeja",
    name: "Peak Milk Powder 400g",
    oldPrice: 3200,
    newPrice: 3347,
    at: daysAgo(4),
    changedBy: "Tunde Bakare",
  },
];

export const CATEGORIES = [...categories];

export function getCompany(id: string) {
  return companies.find((c) => c.id === id);
}

export function getShop(id: string) {
  return shops.find((s) => s.id === id);
}

export function getShopsByCompany(companyId: string) {
  return shops.filter((s) => s.companyId === companyId);
}

export function getProductsByShop(shopId: string) {
  return products.filter((p) => p.shopId === shopId);
}

export function getProductsByCompany(companyId: string) {
  const ids = new Set(getShopsByCompany(companyId).map((s) => s.id));
  return products.filter((p) => ids.has(p.shopId));
}

export function searchProducts(
  query: string,
  opts?: { shopId?: string; companyId?: string },
) {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  let pool = products;
  if (opts?.shopId) pool = pool.filter((p) => p.shopId === opts.shopId);
  else if (opts?.companyId) pool = getProductsByCompany(opts.companyId);

  const exact = pool.filter(
    (p) =>
      p.barcode.toLowerCase() === term ||
      p.sku.toLowerCase() === term ||
      p.name.toLowerCase() === term,
  );
  if (exact.length) return exact;

  return pool
    .filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.barcode.includes(term) ||
        p.category.toLowerCase().includes(term),
    )
    .slice(0, 24);
}

export function orgStats() {
  const openShops = shops.filter((s) => s.status === "open").length;
  const totalProducts = products.length;
  const avgPrice =
    products.reduce((sum, p) => sum + p.price, 0) / Math.max(products.length, 1);
  const lowStock = products.filter((p) => p.stock < 15).length;
  return {
    companies: companies.length,
    shops: shops.length,
    openShops,
    totalProducts,
    avgPrice,
    lowStock,
    recentChanges: priceHistory.length,
  };
}

export function companyStats(companyId: string) {
  const branchShops = getShopsByCompany(companyId);
  const branchProducts = getProductsByCompany(companyId);
  return {
    shops: branchShops.length,
    openShops: branchShops.filter((s) => s.status === "open").length,
    products: branchProducts.length,
    lowStock: branchProducts.filter((p) => p.stock < 15).length,
    catalogValue: branchProducts.reduce((s, p) => s + p.price * p.stock, 0),
  };
}

export function shopStats(shopId: string) {
  const list = getProductsByShop(shopId);
  return {
    products: list.length,
    lowStock: list.filter((p) => p.stock < 15).length,
    outOfStock: list.filter((p) => p.stock === 0).length,
    catalogValue: list.reduce((s, p) => s + p.price * p.stock, 0),
    categories: new Set(list.map((p) => p.category)).size,
  };
}
