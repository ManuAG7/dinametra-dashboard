import { useQuery } from "@tanstack/react-query";
import {
  fetchCoinNow,
  fetchMarketChart,
  fetchTopCoins,
  type CoinMarketItem,
  type MarketChartResponse,
} from "../api/coingecko";


function is429(err: any) {
  const status = err?.response?.status;
  return status === 429;
}

function retryOnceUnless429(failCount: number, err: any) {
  if (is429(err)) return false;
  return failCount < 1;
}

export function useTopCoins() {
  return useQuery({
    queryKey: ["topCoins"],
    queryFn: () => fetchTopCoins("usd"),
    staleTime: 30 * 60_000,
    gcTime: 60 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: (failCount, err: any) => {
      const status = err?.response?.status;
      if (status === 429) return false;
      return failCount < 1;
    },
    placeholderData: (prev) => prev,
  });
}

export function useCoinNow(coinId: string, vs: string) {
  return useQuery<CoinMarketItem | null>({
    queryKey: ["coinNow", coinId, vs],
    queryFn: () => fetchCoinNow(coinId, vs),
    enabled: Boolean(coinId && vs),
    staleTime: 2 * 60_000,
    gcTime: 15 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: (prev) => prev ?? null,

    retry: retryOnceUnless429,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
  });
}

export function useMarketChart(coinId: string, vs: string, days: number) {
  return useQuery<MarketChartResponse>({
    queryKey: ["marketChart", coinId, vs, days],
    queryFn: () => fetchMarketChart(coinId, vs, days),
    enabled: Boolean(coinId && vs && days),

    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: (prev) => prev,

    retry: retryOnceUnless429,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
  });
}