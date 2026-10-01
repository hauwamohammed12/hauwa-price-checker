export function StatTile({
  label,
  value,
  hint,
  accent = "forest",
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: "forest" | "gold" | "clay";
}) {
  const accents = {
    forest: "from-[#1f4d3a]/10 to-transparent",
    gold: "from-[#c4a35a]/20 to-transparent",
    clay: "from-[#b85c38]/15 to-transparent",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[var(--shadow)] animate-rise`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accents[accent]}`}
        aria-hidden
      />
      <p className="relative text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
        {label}
      </p>
      <p className="relative mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--ink)]">
        {value}
      </p>
      {hint ? (
        <p className="relative mt-1 text-sm text-[var(--muted)]">{hint}</p>
      ) : null}
    </div>
  );
}
