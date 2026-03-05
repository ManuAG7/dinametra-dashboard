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

export function useTopCoins(vs: string) {
  return useQuery({
    queryKey: ["topCoins", vs],
    queryFn: () => fetchTopCoins(vs),
    enabled: Boolean(vs),


    staleTime: 10 * 60_000, // 10 min
    gcTime: 30 * 60_000,    // 30 min

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: retryOnceUnless429,
    placeholderData: (prev) => prev,
  });
}

export function useCoinNow(coinId: string, vs: string) {
  return useQuery<CoinMarketItem | null>({
    queryKey: ["coinNow", coinId, vs],
    queryFn: () => fetchCoinNow(coinId, vs),
    enabled: Boolean(coinId && vs),


    staleTime: 60_000,
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