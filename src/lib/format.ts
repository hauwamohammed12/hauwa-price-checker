// src/lib/format.ts - COMPLETE FIX
export function naira(amount: any): string {
  const num = typeof amount === 'string'? parseFloat(amount) : (amount?? 0);
  const value = isNaN(num as number)? 0 : (num as number);
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
}
export function formatCurrency(amount: any): string { return naira(amount); }
export function formatWhen(date: any): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  const diffMins = Math.floor((Date.now() - d.getTime())/60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins/60)}h ago`;
  return d.toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' });
}
export function format(value: any): string {
  if (value == null) return '';
  if (value instanceof Date) return formatWhen(value);
  if (typeof value === 'number') return naira(value);
  return String(value);
}
export function roleLabel(role: any): string {
  if (!role) return '';
  const map: any = { admin: 'Admin', org_admin: 'Organization Admin', company_admin: 'Company Admin', manager: 'Manager', staff: 'Staff', user: 'User', customer: 'Customer' };
  const key = String(role).toLowerCase();
  return map[key] || String(role).replace(/_/g, ' ');
}
export const formatPrice = naira;
export const formatDate = formatWhen;
export const formatNaira = naira;
