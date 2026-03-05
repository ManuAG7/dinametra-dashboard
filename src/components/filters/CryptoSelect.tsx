import { useEffect, useMemo, useRef, useState } from "react";

export type CryptoOption = {
  id: string;
  name: string;
  symbol: string;
  image?: string;
};

type Props = {
  label: string;
  value: string;
  options: CryptoOption[];
  onChange: (id: string) => void;

  placeholder?: string;
  disabled?: boolean;
};

export default function CryptoSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Selecciona una cripto",
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(
    () => options.find((o) => o.id === value) ?? null,
    [options, value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;

    return options.filter((o) => {
      const name = o.name.toLowerCase();
      const sym = o.symbol.toLowerCase();
      return name.includes(q) || sym.includes(q);
    });
  }, [options, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

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

  useEffect(() => {
    if (open) {
      //delay para que el input exista
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  function commitSelection(id: string) {
    onChange(id);
    setOpen(false);
  }

  function scrollActiveIntoView(nextIndex: number) {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector<HTMLElement>(`[data-idx="${nextIndex}"]`);
    if (!item) return;

    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    if (itemRect.top < listRect.top) item.scrollIntoView({ block: "nearest" });
    if (itemRect.bottom > listRect.bottom) item.scrollIntoView({ block: "nearest" });
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
      const next = Math.min(activeIndex + 1, filtered.length - 1);
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
      const opt = filtered[activeIndex];
      if (opt) commitSelection(opt.id);
    }
  }

  const buttonText = selected
    ? `${selected.name} (${selected.symbol.toUpperCase()})`
    : placeholder;

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
          {selected?.image ? (
            <img
              src={selected.image}
              alt=""
              className="h-5 w-5 rounded-full"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="h-5 w-5 rounded-full bg-slate-700" />
          )}

          <span className="min-w-0 truncate">{buttonText}</span>
        </span>

        <span className="text-slate-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl bg-slate-950 ring-1 ring-slate-800 shadow-xl">
          <div className="border-b border-slate-800 p-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar (BTC, Ethereum...)"
              className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-cyan-400"
              aria-label="Buscar criptomoneda"
            />
          </div>

          <div
            ref={listRef}
            role="listbox"
            aria-label="Opciones de criptomonedas"
            className="max-h-64 overflow-auto p-1"
          >
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-slate-300">Sin resultados.</div>
            ) : (
              filtered.map((opt, idx) => {
                const isActive = idx === activeIndex;
                const isSelected = opt.id === value;

                return (
                  <button
                    type="button"
                    key={opt.id}
                    role="option"
                    aria-selected={isSelected}
                    data-idx={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => commitSelection(opt.id)}
                    className={[
                      "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left",
                      isActive ? "bg-slate-800/70" : "hover:bg-slate-800/40",
                    ].join(" ")}
                  >
                    {opt.image ? (
                      <img
                        src={opt.image}
                        alt=""
                        className="h-5 w-5 rounded-full"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="h-5 w-5 rounded-full bg-slate-700" />
                    )}

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-white">
                        {opt.name}
                      </span>
                      <span className="block truncate text-xs text-slate-400">
                        {opt.symbol.toUpperCase()}
                      </span>
                    </span>

                    {isSelected && <span className="text-emerald-400">✓</span>}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}