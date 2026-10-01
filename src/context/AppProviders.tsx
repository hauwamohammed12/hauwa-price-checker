"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dashboardPath } from "@/lib/format";
import { createSeedState, SESSION_KEY, STORAGE_KEY } from "@/lib/seed";
import type {
  AppState,
  Company,
  PriceHistoryEntry,
  Product,
  SessionUser,
  Shop,
  User,
} from "@/lib/types";

interface AuthContextValue {
  user: SessionUser | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
}

interface DataContextValue {
  state: AppState;
  ready: boolean;
  resetDemo: () => void;
  addCompany: (input: Omit<Company, "id" | "createdAt">) => void;
  updateCompany: (id: string, patch: Partial<Company>) => void;
  addShop: (input: Omit<Shop, "id" | "createdAt">) => void;
  updateShop: (id: string, patch: Partial<Shop>) => void;
  addUser: (input: Omit<User, "id">) => { ok: true } | { ok: false; error: string };
  updateUser: (id: string, patch: Partial<User>) => void;
  saveProduct: (
    input: Omit<Product, "id" | "updatedAt"> & { id?: string },
    changedBy: string,
  ) => void;
  deleteProduct: (id: string) => void;
  recordCheck: (productId: string, shopId: string) => void;
  findProducts: (query: string, shopId?: string) => Product[];
  lastPriceChange: (productId: string) => PriceHistoryEntry | undefined;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const DataContext = createContext<DataContextValue | null>(null);

function loadState(): AppState {
  if (typeof window === "undefined") return createSeedState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed.products?.length && parsed.companies?.length) return parsed;
    }
  } catch {
    /* seed */
  }
  return createSeedState();
}

function loadSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(createSeedState);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setUser(loadSession());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  useEffect(() => {
    if (!ready) return;
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user, ready]);

  const login = useCallback(
    (email: string, password: string) => {
      const found = state.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
      );
      if (!found) return { ok: false as const, error: "Invalid email or password." };
      const session: SessionUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        companyId: found.companyId,
        shopId: found.shopId,
      };
      setUser(session);
      return { ok: true as const };
    },
    [state.users],
  );

  const logout = useCallback(() => setUser(null), []);

  const resetDemo = useCallback(() => {
    const seeded = createSeedState();
    setState(seeded);
    setUser(null);
  }, []);

  const addCompany = useCallback((input: Omit<Company, "id" | "createdAt">) => {
    setState((prev) => ({
      ...prev,
      companies: [
        { ...input, id: `c${Date.now()}`, createdAt: Date.now() },
        ...prev.companies,
      ],
    }));
  }, []);

  const updateCompany = useCallback((id: string, patch: Partial<Company>) => {
    setState((prev) => ({
      ...prev,
      companies: prev.companies.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const addShop = useCallback((input: Omit<Shop, "id" | "createdAt">) => {
    setState((prev) => ({
      ...prev,
      shops: [{ ...input, id: `s${Date.now()}`, createdAt: Date.now() }, ...prev.shops],
    }));
  }, []);

  const updateShop = useCallback((id: string, patch: Partial<Shop>) => {
    setState((prev) => ({
      ...prev,
      shops: prev.shops.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  }, []);

  const addUser = useCallback((input: Omit<User, "id">) => {
    let result: { ok: true } | { ok: false; error: string } = { ok: true };
    setState((prev) => {
      if (prev.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
        result = { ok: false, error: "A user with that email already exists." };
        return prev;
      }
      return {
        ...prev,
        users: [{ ...input, id: `u${Date.now()}` }, ...prev.users],
      };
    });
    return result;
  }, []);

  const updateUser = useCallback((id: string, patch: Partial<User>) => {
    setState((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === id ? { ...u, ...patch } : u)),
    }));
  }, []);

  const saveProduct = useCallback(
    (input: Omit<Product, "id" | "updatedAt"> & { id?: string }, changedBy: string) => {
      setState((prev) => {
        const id = input.id || `p${Date.now()}`;
        const existing = prev.products.find((p) => p.id === id);
        const next: Product = { ...input, id, updatedAt: Date.now() };
        let history = prev.history;
        if (existing && existing.price !== next.price) {
          history = [
            {
              id: `h${Date.now()}`,
              at: Date.now(),
              productId: id,
              shopId: next.shopId,
              name: next.name,
              oldPrice: existing.price,
              newPrice: next.price,
              changedBy,
            },
            ...history,
          ];
        }
        const products = existing
          ? prev.products.map((p) => (p.id === id ? next : p))
          : [next, ...prev.products];
        return { ...prev, products, history };
      });
    },
    [],
  );

  const deleteProduct = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, []);

  const recordCheck = useCallback((productId: string, shopId: string) => {
    setState((prev) => ({
      ...prev,
      recent: [
        { at: Date.now(), productId, shopId },
        ...prev.recent.filter((r) => !(r.productId === productId && r.shopId === shopId)),
      ].slice(0, 10),
    }));
  }, []);

  const findProducts = useCallback(
    (query: string, shopId?: string) => {
      const term = query.trim().toLowerCase();
      if (!term) return [];
      const pool = shopId ? state.products.filter((p) => p.shopId === shopId) : state.products;
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
            p.barcode.toLowerCase().includes(term) ||
            p.sku.toLowerCase().includes(term),
        )
        .slice(0, 12);
    },
    [state.products],
  );

  const lastPriceChange = useCallback(
    (productId: string) =>
      state.history
        .filter((h) => h.productId === productId)
        .sort((a, b) => b.at - a.at)[0],
    [state.history],
  );

  const authValue = useMemo(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout],
  );

  const dataValue = useMemo(
    () => ({
      state,
      ready,
      resetDemo,
      addCompany,
      updateCompany,
      addShop,
      updateShop,
      addUser,
      updateUser,
      saveProduct,
      deleteProduct,
      recordCheck,
      findProducts,
      lastPriceChange,
    }),
    [
      state,
      ready,
      resetDemo,
      addCompany,
      updateCompany,
      addShop,
      updateShop,
      addUser,
      updateUser,
      saveProduct,
      deleteProduct,
      recordCheck,
      findProducts,
      lastPriceChange,
    ],
  );

  return (
    <AuthContext.Provider value={authValue}>
      <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AppProviders");
  return ctx;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within AppProviders");
  return ctx;
}

export function useRequireRole(roles: SessionUser["role"][]) {
  const { user, ready } = useAuth();
  return {
    ready,
    allowed: Boolean(user && roles.includes(user.role)),
    user,
    redirectTo: user ? dashboardPath(user.role) : "/login",
  };
}

export { dashboardPath };
