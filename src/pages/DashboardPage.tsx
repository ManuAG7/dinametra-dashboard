import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import backIcon from "../assets/casa.png";
import "../utils/chart";

import RangeTabs from "../components/filters/RangeTabs";
import FiltersBar from "../components/filters/FiltersBar";
import KpiCard from "../components/cards/KpiCard";
import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";
import EmptyState from "../components/states/EmptyState";
import PriceLineChart from "../components/charts/PriceLineChart";
import VolumeBarChart from "../components/charts/VolumeBarChart";

import {
  findCoinById,
  getCoinById,
  getMarketChart,
  getMarkets,
  type CoinRow,
} from "../services/coingecko.service";

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { coinId: coinIdParam } = useParams();
  const coinId = coinIdParam ?? "bitcoin";

  const [vs, setVs] = useState<"usd" | "mxn" | "eur">(
    location.state?.vs ?? "usd",
  );
  const [days, setDays] = useState(30);
  const cachedMarkets =
    queryClient.getQueryData<CoinRow[]>(["markets", vs]) ?? [];

  const marketsQuery = useQuery({
    queryKey: ["markets", vs],
    queryFn: () => getMarkets(vs, 50),
    enabled: cachedMarkets.length === 0, // solo si no hay cache
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

  const marketsData = cachedMarkets.length > 0 ? cachedMarkets : (marketsQuery.data ?? []);

  const selectedCoinFromCache =
    queryClient.getQueryData<CoinRow>(["selectedCoin", coinId, vs]) ??
    findCoinById(marketsData, coinId);

  const coinFallback = useQuery({
    queryKey: ["coinByIdFallback", coinId, vs],
    queryFn: () => getCoinById(coinId, vs),
    enabled: !selectedCoinFromCache && !!coinId,
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

  const coinData = selectedCoinFromCache ?? coinFallback.data ?? null;

  const chart = useQuery({
    queryKey: ["marketChart", coinId, vs, days],
    queryFn: () => getMarketChart(coinId, vs, days),
    enabled: !!coinId,
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: (failCount, err: any) => {
      const status = err?.response?.status;
      if (status === 429) return false;
      return failCount < 1;
    },
    placeholderData: (prev) => prev,
  });

  const change24 =
    coinData?.price_change_percentage_24h_in_currency ??
    coinData?.price_change_percentage_24h;

  const changeTone =
    change24 == null ? "neutral" : change24 >= 0 ? "positive" : "negative";

  const kpiLoading =
    (!selectedCoinFromCache && coinFallback.isLoading) ||
    (!coinData && coinFallback.isFetching);

  const kpiErrorCode =
    (coinFallback.error as any)?.response?.status ??
    (coinFallback.error as any)?.status ??
    undefined;

  const chartErrorCode =
    (chart.error as any)?.response?.status ??
    (chart.error as any)?.status ??
    undefined;

  const coinOptions = useMemo(() => {
    return marketsData.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
    }));
  }, [marketsData]);

  const handleCoinChange = (nextCoinId: string) => {
    navigate(`/dashboard/${nextCoinId}`, {
      state: { vs },
    });
  };

  const handleVsChange = (currency: string) => {
    if (currency === "usd" || currency === "mxn" || currency === "eur") {
      setVs(currency);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020F2F] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Regresar al inicio"
              className="mt-1 shrink-0 rounded-lg ring-1 ring-white/10 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            >
              <img
                src={backIcon}
                alt="Volver"
                className="h-10 w-10 object-contain"
              />
            </button>

            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight sm:text-xl">
                Precios y gráficos de criptomonedas en vivo
              </h1>
              <p className="text-sm text-slate-300 sm:text-base">
                Selecciona otra cripto desde el inicio o cambia filtros aquí.
              </p>
            </div>
          </div>
        </header>

        <FiltersBar
          coinId={coinId}
          vs={vs}
          coins={coinOptions}
          onCoinChange={handleCoinChange}
          onVsChange={handleVsChange}
        />

        {!selectedCoinFromCache && coinFallback.isError && (
          <div className="mt-4">
            <ErrorState
              code={kpiErrorCode}
              text="Error cargando datos de KPIs. Espera unos segundos y reintenta."
              onRetry={() => coinFallback.refetch()}
            />
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <KpiCard
            title="Precio"
            value={coinData?.current_price}
            suffix={` ${vs.toUpperCase()}`}
            loading={kpiLoading}
          />
          <KpiCard
            title="Cambio 24h"
            value={change24}
            suffix=" %"
            loading={kpiLoading}
            tone={changeTone}
          />
          <KpiCard
            title="Market Cap"
            value={coinData?.market_cap}
            suffix={` ${vs.toUpperCase()}`}
            loading={kpiLoading}
          />
          <KpiCard
            title="Volumen 24h"
            value={coinData?.total_volume}
            suffix={` ${vs.toUpperCase()}`}
            loading={kpiLoading}
          />
        </div>

        <div className="mt-6">
          {chart.isLoading && <LoadingState text="Cargando gráficas..." />}

          {chart.isError && (
            <ErrorState
              code={chartErrorCode}
              text="Error cargando datos para gráficas. Espera unos segundos antes de reintentar."
              onRetry={() => chart.refetch()}
            />
          )}

          {chart.data && chart.data.prices.length === 0 && (
            <EmptyState text="No hay datos en este rango." />
          )}

          {chart.data && chart.data.prices.length > 0 && (
            <>
              <RangeTabs value={days} onChange={setDays} />

              <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <PriceLineChart data={chart.data} vs={vs} days={days} />
                <VolumeBarChart data={chart.data} vs={vs} days={days} />
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}