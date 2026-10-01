export function naira(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatWhen(ts: number): string {
  return new Date(ts).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function roleLabel(role: string): string {
  switch (role) {
    case "org_admin":
      return "Organization Admin";
    case "company_admin":
      return "Company Admin";
    case "shop_manager":
      return "Shop Manager";
    default:
      return role;
  }
}

export function dashboardPath(role: string): string {
  switch (role) {
    case "org_admin":
      return "/org";
    case "company_admin":
      return "/company";
    case "shop_manager":
      return "/shop";
    default:
      return "/";
  }
}
