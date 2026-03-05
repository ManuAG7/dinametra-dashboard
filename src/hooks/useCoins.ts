import { useQuery } from "@tanstack/react-query";
import {
  fetchCoinNow,
  fetchMarketChart,
  fetchTopCoins,
  type CoinMarketItem,
  type MarketChartResponse,
} from "../api/coingecko";

export function useTopCoins(vs: string) {
  return useQuery({
    queryKey: ["topCoins", vs],
    queryFn: () => fetchTopCoins(vs),
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    retry: (failCount, err: any) => {
      const status = err?.response?.status;
      if (status === 429) return false;
      return failCount < 1;
    },
  });
}

export function useCoinNow(coinId: string, vs: string) {
  return useQuery<CoinMarketItem | null>({
    queryKey: ["coinNow", coinId, vs], 
    queryFn: () => fetchCoinNow(coinId, vs),
    enabled: Boolean(coinId && vs),
    staleTime: 20_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev ?? null,
    retry: (failCount, err: any) => {
      const status = err?.response?.status;
      if (status === 429) return false;
      return failCount < 1;
    },
  });
}

export function useMarketChart(coinId: string, vs: string, days: number) {
  return useQuery<MarketChartResponse>({
    queryKey: ["marketChart", coinId, vs, days], 
    queryFn: () => fetchMarketChart(coinId, vs, days),
    enabled: Boolean(coinId && vs && days),
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,

    placeholderData: (prev) =>
      prev ?? { prices: [], total_volumes: [], market_caps: [] },
    retry: (failCount, err: any) => {
      const status = err?.response?.status;
      if (status === 429) return false;
      return failCount < 1;
    },
  });
}