import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const topCoins = useTopCoins(vs);
  const coins = useMemo(() => topCoins.data ?? [], [topCoins.data]);

  const coinNow = useCoinNow(coinId, vs);
  const chart = useMarketChart(coinId, vs, days);

  const change24 =
    coinNow.data?.price_change_percentage_24h_in_currency ??
    coinNow.data?.price_change_percentage_24h;

  const changeTone =
    change24 == null ? "neutral" : change24 >= 0 ? "positive" : "negative";

  const handleCoinChange = (nextCoinId: string) => {
    navigate(`/dashboard/${nextCoinId}`);
  };

  return (
    <div className="min-h-screen bg-[#020F2F] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Regresar al inicio"
            >
              <img
                src={backIcon}
                alt="Volver"
                className="h-10 w-10 object-contain"
              />
            </button>

            <div className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
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
          coins={coins}
          onCoinChange={handleCoinChange}
          onVsChange={setVs}
        />

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <KpiCard
            title="Precio"
            value={coinNow.data?.current_price}
            suffix={` ${vs.toUpperCase()}`}
            loading={coinNow.isLoading}
          />
          <KpiCard
            title="Cambio 24h"
            value={change24}
            suffix=" %"
            loading={coinNow.isLoading}
            tone={changeTone}
          />
          <KpiCard
            title="Market Cap"
            value={coinNow.data?.market_cap}
            suffix={` ${vs.toUpperCase()}`}
            loading={coinNow.isLoading}
          />
          <KpiCard
            title="Volumen 24h"
            value={coinNow.data?.total_volume}
            suffix={` ${vs.toUpperCase()}`}
            loading={coinNow.isLoading}
          />
        </div>

        <div className="mt-6">
          {chart.isLoading && <LoadingState text="Cargando gráficas..." />}

          {chart.isError && (
            <ErrorState
              code={(chart.error as any)?.response?.status}
              text="Error cargando datos para gráficas. Espera unos segundos antes de reintentar (CoinGecko aplica límite)."
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