
export function formatDateTime(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleString("en-NG");
}

export function naira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

export function stationLabel(station: string) {
  return station ? station.charAt(0).toUpperCase() + station.slice(1) : "Unknown Station";
}
