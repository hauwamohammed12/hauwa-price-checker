export function roleLabel(role: string): string {
  const map: Record<string, string> = {
    admin: "Admin",
    manager: "Manager",
    owner: "Owner",
    staff: "Staff",
    user: "User",
    shop: "Shop",
  };
  return map[role?.toLowerCase()] || role || "User";
}
export function formatPrice(price: number | string): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}
export function formatDate(date: string | Date): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
}
export const format = formatPrice;
