type Tone = "neutral" | "positive" | "negative";

type Props = {
  title: string;
  value: number | null | undefined;
  suffix?: string;
  loading?: boolean;
  displayValue?: string;
  tone?: Tone; 
};

function formatFull(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

export default function KpiCard({
  title,
  value,
  suffix = "",
  loading,
  displayValue,
  tone = "neutral",
}: Props) {
  const full = value == null ? "—" : `${formatFull(value)}${suffix}`;

  const shown =
    loading
      ? "..."
      : value == null
        ? "—"
        : displayValue
          ? `${displayValue}${suffix}`
          : `${formatFull(value)}${suffix}`;

  const valueClass =
    tone === "positive"
      ? "text-emerald-400"
      : tone === "negative"
        ? "text-rose-400"
        : "text-white";

  return (
    <div className="group relative rounded-xl bg-slate-900 p-4 ring-1 ring-slate-800">
      <p className="text-sm text-slate-300">{title}</p>

      <p className={`mt-2 truncate text-2xl font-bold ${valueClass}`}>
        {shown}
      </p>

      {!loading && value != null && (
        <div className="pointer-events-none absolute left-4 top-[72px] z-20 hidden max-w-[240px] rounded-lg bg-black/80 px-3 py-2 text-xs text-slate-100 shadow-lg ring-1 ring-white/10 group-hover:block">
          <span className="font-semibold">Valor completo:</span>{" "}
          <span className="text-slate-200">{full}</span>
        </div>
      )}
    </div>
  );
}