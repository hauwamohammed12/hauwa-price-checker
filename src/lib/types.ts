export type Role = "org_admin" | "company_admin" | "shop_manager";

export type Category =
  | "Grains & Staples"
  | "Oils & Condiments"
  | "Household"
  | "Beverages"
  | "Personal Care"
  | "Fresh Produce";

export const CATEGORIES: Category[] = [
  "Grains & Staples",
  "Oils & Condiments",
  "Household",
  "Beverages",
  "Personal Care",
  "Fresh Produce",
];

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  companyId?: string;
  shopId?: string;
}

export interface Company {
  id: string;
  name: string;
  code: string;
  city: string;
  status: "active" | "paused";
  createdAt: number;
}

export interface Shop {
  id: string;
  companyId: string;
  name: string;
  code: string;
  address: string;
  city: string;
  status: "open" | "closed";
  createdAt: number;
}

export interface Product {
  id: string;
  shopId: string;
  companyId: string;
  name: string;
  barcode: string;
  sku: string;
  category: Category;
  unit: string;
  price: number;
  stock: number;
  notes: string;
  updatedAt: number;
}

export interface PriceHistoryEntry {
  id: string;
  at: number;
  productId: string;
  shopId: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  changedBy: string;
}

export interface RecentCheck {
  at: number;
  productId: string;
  shopId: string;
}

export interface AppState {
  companies: Company[];
  shops: Shop[];
  products: Product[];
  users: User[];
  history: PriceHistoryEntry[];
  recent: RecentCheck[];
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string;
  shopId?: string;
}
