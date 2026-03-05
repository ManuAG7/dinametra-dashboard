import { useEffect, useMemo, useRef, useState } from "react";

export type CurrencyOption = {
  value: string;   // "usd" | "mxn" | "eur"
  label: string;   // "USD"
  sublabel?: string; // "Dólar"
  icon?: string;   // "🇺🇸"
};

type Props = {
  label: string;
  value: string;
  options: CurrencyOption[];
  onChange: (v: string) => void;
  disabled?: boolean;
};

export default function CurrencySelect({
  label,
  value,
  options,
  onChange,
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value],
  );

  useEffect(() => {
    if (!open) return;

    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  function commitSelection(v: string) {
    onChange(v);
    setOpen(false);
  }

  function scrollActiveIntoView(nextIndex: number) {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector<HTMLElement>(`[data-idx="${nextIndex}"]`);
    item?.scrollIntoView({ block: "nearest" });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        if (!disabled) setOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(activeIndex + 1, options.length - 1);
      setActiveIndex(next);
      scrollActiveIntoView(next);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.max(activeIndex - 1, 0);
      setActiveIndex(next);
      scrollActiveIntoView(next);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) commitSelection(opt.value);
    }
  }

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <label className="mb-1 block text-sm text-slate-300">{label}</label>

      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded-lg bg-slate-900 px-3 py-2 text-left text-white outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="text-lg leading-none">{selected?.icon ?? "💱"}</span>
          <span className="min-w-0 truncate">
            {selected ? `${selected.label} — ${selected.sublabel ?? ""}` : "Selecciona moneda"}
          </span>
        </span>

        <span className="text-slate-400">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl bg-slate-950 ring-1 ring-slate-800 shadow-xl">
          <div
            ref={listRef}
            role="listbox"
            aria-label="Opciones de moneda"
            className="max-h-56 overflow-auto p-1"
          >
            {options.map((opt, idx) => {
              const isActive = idx === activeIndex;
              const isSelected = opt.value === value;

              return (
                <button
                  type="button"
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  data-idx={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => commitSelection(opt.value)}
                  className={[
                    "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left",
                    isActive ? "bg-slate-800/70" : "hover:bg-slate-800/40",
                  ].join(" ")}
                >
                  <span className="text-lg leading-none">{opt.icon ?? ""}</span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-white">{opt.label}</span>
                    {opt.sublabel && (
                      <span className="block truncate text-xs text-slate-400">
                        {opt.sublabel}
                      </span>
                    )}
                  </span>

                  {isSelected && <span className="text-emerald-400">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}