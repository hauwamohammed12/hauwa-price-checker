import Link from "next/link";

export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box =
    size === "lg" ? "h-16 w-16 text-xl" : size === "sm" ? "h-10 w-10 text-sm" : "h-12 w-12 text-base";
  return (
    <div
      className={`brand-mark-pulse grid place-items-center rounded-2xl bg-gold font-display font-bold text-forest-deep shadow-[0_8px_24px_rgba(201,162,39,0.35)] ${box}`}
      aria-hidden
    >
      HM
    </div>
  );
}

export function BrandLockup({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <Link href="/" className="flex items-center gap-3 no-underline">
      <BrandMark size={compact ? "sm" : "md"} />
      <div>
        {!compact && (
          <p
            className={`m-0 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
              light ? "text-gold-soft/90" : "text-muted"
            }`}
          >
            Computerized Price Checking System
          </p>
        )}
        <p
          className={`m-0 font-display font-bold leading-tight ${
            compact ? "text-base" : "text-lg sm:text-xl"
          } ${light ? "text-[#f4f7f5]" : "text-ink"}`}
        >
          Hauwa Mohammed Price Checker
        </p>
      </div>
    </Link>
  );
}
