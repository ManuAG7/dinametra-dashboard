type RangeOption = { label: string; days: number };

type Props = {
  value: number;
  onChange: (days: number) => void;
};

const RANGES: RangeOption[] = [
  { label: "1 día", days: 1 },
  { label: "1 semana", days: 7 },
  { label: "1 mes", days: 30 },
  { label: "1 año", days: 365 },
];

export default function RangeTabs({ value, onChange }: Props) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 pb-4">
      <span className="text-sm text-slate-300"></span>

      <div className="flex flex-wrap gap-2">
        {RANGES.map((r) => {
          const active = r.days === value;

          return (
            <button
              key={r.days}
              type="button"
              onClick={() => onChange(r.days)}
              className={[
                "rounded-full px-3 py-1 text-sm ring-1 transition ",
                active
                  ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/40"
                  : "bg-slate-900 text-slate-200 ring-slate-700 hover:bg-slate-800/60",
              ].join(" ")}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}