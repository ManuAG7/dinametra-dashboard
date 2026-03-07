import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";
import { getMarkets, type CoinRow } from "../services/coingecko.service";

function formatMoney(n: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(n);
}

export default function MarketPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [vs, setVs] = useState<"usd" | "mxn" | "eur">("usd");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 7;
  const FETCH_SIZE = 50; // cuántas monedas traemos una sola vez

  useEffect(() => {
    setPage(1);
  }, [vs, search]);

  const q = useQuery({
    queryKey: ["markets", vs],
    queryFn: () => getMarkets(vs, FETCH_SIZE),
    staleTime: 5 * 60_000,
    gcTime: 15 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: (failCount, err: any) => {
      const status = err?.response?.status;
      if (status === 429) return false;
      return failCount < 1;
    },
    placeholderData: (prev) => prev,
  });

  const coins = q.data ?? [];

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return coins;

    return coins.filter((c) => {
      return (
        c.name.toLowerCase().includes(s) ||
        c.symbol.toLowerCase().includes(s)
      );
    });
  }, [coins, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    return filtered.slice(start, end);
  }, [filtered, page]);

  const handleOpenDashboard = (coin: CoinRow) => {
    // guardamos la moneda seleccionada en cache para reutilizarla en dashboard
    queryClient.setQueryData(["selectedCoin", coin.id, vs], coin);

    navigate(`/dashboard/${coin.id}`, {
      state: { vs },
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <h1 className="text-4xl font-extrabold text-white">Market</h1>
      <p className="mt-1 text-sm text-slate-300">
        Busca una criptomoneda y entra a su dashboard.
      </p>

      {/* Top bar */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl bg-slate-900/60 px-3 py-2 ring-1 ring-slate-800 sm:max-w-md">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar precios de criptomonedas"
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={vs}
            onChange={(e) => setVs(e.target.value as "usd" | "mxn" | "eur")}
            className="rounded-full bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-slate-800 outline-none"
          >
            <option value="usd">USD</option>
            <option value="mxn">MXN</option>
            <option value="eur">EUR</option>
          </select>
        </div>
      </div>

      {/* States */}
      <div className="mt-5">
        {q.isLoading && <LoadingState text="Cargando mercado..." />}

        {q.isError && (
          <ErrorState
            code={(q.error as any)?.response?.status}
            text="No se pudo cargar el mercado. Espera unos segundos antes de reintentar (CoinGecko aplica límite)."
            onRetry={() => q.refetch()}
          />
        )}
      </div>

      {/* Table */}
      {!q.isLoading && !q.isError && (
        <>
          <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-slate-800">
            <div className="overflow-x-auto">
              <table className="min-w-[860px] w-full bg-slate-900/40">
                <thead>
                  <tr className="text-left text-xs font-semibold text-slate-300">
                    <th className="px-4 py-3">Criptomoneda</th>
                    <th className="px-4 py-3">Precio</th>
                    <th className="px-4 py-3">Volumen</th>
                    <th className="px-4 py-3">Cambio (24h)</th>
                    <th className="px-4 py-3">Capitalización</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.map((c) => {
                    const change = c.price_change_percentage_24h ?? 0;
                    const up = change >= 0;

                    return (
                      <tr
                        key={c.id}
                        onClick={() => handleOpenDashboard(c)}
                        className="cursor-pointer border-t border-slate-800 text-sm text-slate-100 hover:bg-slate-900/60"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={c.image}
                              alt=""
                              className="h-8 w-8 rounded-full"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <p className="truncate font-semibold">{c.name}</p>
                              <p className="text-xs text-slate-400">
                                {c.symbol.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 font-semibold">
                          {formatMoney(c.current_price, vs)}
                        </td>

                        <td className="px-4 py-4">
                          {formatMoney(c.total_volume, vs)}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={[
                              "inline-flex items-center gap-1 font-semibold",
                              up ? "text-emerald-400" : "text-rose-400",
                            ].join(" ")}
                          >
                            {Math.abs(change).toFixed(2)}%
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          {formatMoney(c.market_cap, vs)}
                        </td>

                        <td className="px-4 py-4 text-right">
                          <span className="text-emerald-300 font-semibold">
                            Ver dashboard →
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {paginated.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-slate-300"
                      >
                        No hay resultados para esa búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination local */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg bg-slate-900/60 px-3 py-2 text-sm font-semibold text-white ring-1 ring-slate-800 disabled:opacity-50"
            >
              ← Anterior
            </button>

            <div className="text-sm text-slate-300">
              Página <span className="font-semibold text-white">{page}</span> de{" "}
              <span className="font-semibold text-white">{totalPages}</span>
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-lg bg-slate-900/60 px-3 py-2 text-sm font-semibold text-white ring-1 ring-slate-800 disabled:opacity-50"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
}