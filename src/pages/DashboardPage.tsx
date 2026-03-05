// src/pages/DashboardPage.tsx
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import backIcon from "../assets/casa.png";
import { useCoinNow, useMarketChart, useTopCoins } from "../hooks/useCoins";
import "../utils/chart";

import RangeTabs from "../components/filters/RangeTabs";
import FiltersBar from "../components/filters/FiltersBar";
import KpiCard from "../components/cards/KpiCard";
import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";
import EmptyState from "../components/states/EmptyState";
import PriceLineChart from "../components/charts/PriceLineChart";
import VolumeBarChart from "../components/charts/VolumeBarChart";

export default function DashboardPage() {
  const navigate = useNavigate();

  const { coinId: coinIdParam } = useParams();
  const coinId = coinIdParam ?? "bitcoin";

  const [vs, setVs] = useState("usd");
  const [days, setDays] = useState(30);

  // Selector (top coins)
  const topCoins = useTopCoins(vs);
  const coins = useMemo(() => topCoins.data ?? [], [topCoins.data]);

  // Datos actuales (KPIs)
  const coinNow = useCoinNow(coinId, vs);

  // Series para gráficas
  const chart = useMarketChart(coinId, vs, days);

  // Cambio 24h: algunos endpoints lo dan como price_change_percentage_24h_in_currency
  const change24 =
    coinNow.data?.price_change_percentage_24h_in_currency ??
    coinNow.data?.price_change_percentage_24h;

  const changeTone =
    change24 == null ? "neutral" : change24 >= 0 ? "positive" : "negative";

  // Para que el UI no “parpadee” y sea consistente
  const kpiLoading = coinNow.isLoading || coinNow.isFetching;

  // Cambio de cripto dentro del dashboard:
  // IMPORTANT: NO uses setCoinId aquí porque el coinId viene de la URL.
  const handleCoinChange = (nextCoinId: string) => {
    navigate(`/dashboard/${nextCoinId}`);
  };

  const kpiErrorCode =
    (coinNow.error as any)?.response?.status ??
    (coinNow.error as any)?.status ??
    undefined;

  const chartErrorCode =
    (chart.error as any)?.response?.status ??
    (chart.error as any)?.status ??
    undefined;

  return (
    <div className="min-h-screen w-full bg-[#020F2F] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* HEADER */}
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

        {/* FILTERS */}
        <FiltersBar
          coinId={coinId}
          vs={vs}
          coins={coins}
          onCoinChange={handleCoinChange}
          onVsChange={setVs}
        />

        {/* KPI ERROR (IMPORTANTE: antes se veía como “—” sin explicación) */}
        {coinNow.isError && (
          <div className="mt-4">
            <ErrorState
              code={kpiErrorCode}
              text="Error cargando datos de KPIs. Espera unos segundos y reintenta (CoinGecko puede limitar peticiones)."
              onRetry={() => coinNow.refetch()}
            />
          </div>
        )}

        {/* KPIs */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <KpiCard
            title="Precio"
            value={coinNow.data?.current_price}
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
            value={coinNow.data?.market_cap}
            suffix={` ${vs.toUpperCase()}`}
            loading={kpiLoading}
          />
          <KpiCard
            title="Volumen 24h"
            value={coinNow.data?.total_volume}
            suffix={` ${vs.toUpperCase()}`}
            loading={kpiLoading}
          />
        </div>

        {/* CHARTS */}
        <div className="mt-6">
          {/* Loading */}
          {chart.isLoading && <LoadingState text="Cargando gráficas..." />}

          {/* Error */}
          {chart.isError && (
            <ErrorState
              code={chartErrorCode}
              text="Error cargando datos para gráficas. Espera unos segundos antes de reintentar (CoinGecko aplica límite)."
              onRetry={() => chart.refetch()}
            />
          )}

          {/* Empty */}
          {chart.data && chart.data.prices.length === 0 && (
            <EmptyState text="No hay datos en este rango." />
          )}

          {/* OK */}
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