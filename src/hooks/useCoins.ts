import { useQuery } from "@tanstack/react-query";
import { fetchCoinNow, fetchMarketChart, fetchTopCoins } from "../api/coingecko";

export function useTopCoins(vs: string) {
  return useQuery({
    queryKey: ["topCoins", vs],
    queryFn: () => fetchTopCoins(vs),
    staleTime: 1000 * 60 * 10, // 10 min
    retry: 2,
  });
}

export function useCoinNow(coinId: string, vs: string) {
  return useQuery({
    queryKey: ["coinNow", coinId, vs],
    queryFn: () => fetchCoinNow(coinId, vs),
    enabled: !!coinId,
    staleTime: 1000 * 30, // 30s
    retry: 2,
  });
}

export function useMarketChart(coinId: string, vs: string, days: number) {
  return useQuery({
    queryKey: ["marketChart", coinId, vs, days],
    queryFn: () => fetchMarketChart(coinId, vs, days),
    enabled: !!coinId && !!vs && !!days,
    staleTime: 1000 * 60, // 1 min
    retry: 2,
  });
}