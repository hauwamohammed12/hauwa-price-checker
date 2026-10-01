"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AppProviders";
import { dashboardPath } from "@/lib/format";
import type { Role } from "@/lib/types";

export function RequireAuth({
  roles,
  children,
}: {
  roles: Role[];
  children: React.ReactNode;
}) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!roles.includes(user.role)) {
      router.replace(dashboardPath(user.role));
    }
  }, [ready, user, roles, router]);

  if (!ready || !user || !roles.includes(user.role)) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-muted">
        Checking access…
      </div>
    );
  }

  return <>{children}</>;
}
