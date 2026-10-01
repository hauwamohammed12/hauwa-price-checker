import { getShop } from "@/lib/data";
import { naira } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductTable({
  products,
  showShop = false,
}: {
  products: Product[];
  showShop?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow)]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[var(--forest)] text-[#f7f1e4]">
          <tr>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Barcode / SKU</th>
            {showShop ? <th className="px-4 py-3 font-medium">Shop</th> : null}
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Unit</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const shop = getShop(p.shopId);
            const low = p.stock < 15;
            return (
              <tr
                key={p.id}
                className="border-t border-[var(--line)] transition hover:bg-[var(--paper)]"
              >
                <td className="px-4 py-3 font-medium text-[var(--ink)]">
                  {p.name}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  <span className="block">{p.barcode}</span>
                  <span className="text-xs">{p.sku}</span>
                </td>
                {showShop ? (
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {shop?.name ?? "—"}
                  </td>
                ) : null}
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 capitalize">{p.unit}</td>
                <td className="px-4 py-3 font-semibold text-[var(--forest)]">
                  {naira(p.price)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      low
                        ? "rounded-full bg-[#b85c38]/15 px-2 py-0.5 font-medium text-[#9a3412]"
                        : ""
                    }
                  >
                    {p.stock}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {products.length === 0 ? (
        <p className="p-8 text-center text-[var(--muted)]">No products found.</p>
      ) : null}
    </div>
  );
}
