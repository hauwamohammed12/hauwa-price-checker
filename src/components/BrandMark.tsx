import Link from "next/link";

export function BrandMark({
  href = "/",
  size = "md",
  light = false,
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  light?: boolean;
}) {
  const sizes = {
    sm: "h-9 w-9 text-sm",
    md: "h-12 w-12 text-base",
    lg: "h-16 w-16 text-xl",
  };

  return (
    <Link href={href} className="group inline-flex items-center gap-3">
      <span
        className={`grid place-items-center rounded-2xl bg-[var(--gold)] font-[family-name:var(--font-display)] font-bold text-[var(--forest-deep)] shadow-[0_8px_24px_rgba(196,163,90,0.35)] transition duration-300 group-hover:scale-[1.04] ${sizes[size]}`}
        aria-hidden
      >
        HM
      </span>
      <span className="leading-tight">
        <span
          className={`block font-[family-name:var(--font-display)] font-semibold tracking-tight ${
            light ? "text-[#f7f1e4]" : "text-[var(--ink)]"
          } ${size === "lg" ? "text-2xl md:text-3xl" : size === "sm" ? "text-base" : "text-lg"}`}
        >
          Hauwa Mohammed
        </span>
        <span
          className={`block text-[0.7rem] uppercase tracking-[0.14em] ${
            light ? "text-[#d9c9a0]" : "text-[var(--muted)]"
          }`}
        >
          Price Checker
        </span>
      </span>
    </Link>
  );
}
