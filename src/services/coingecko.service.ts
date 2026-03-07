import { http } from "./http";

export type CoinRow = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_24h_in_currency?: number;
};

export type MarketChartResponse = {
  prices: [number, number][];
  total_volumes: [number, number][];
  market_caps: [number, number][];
};


export async function getMarkets(vs: string, perPage = 50) {
  const { data } = await http.get<CoinRow[]>("/coins/markets", {
    params: {
      vs_currency: vs,
      order: "market_cap_desc",
      per_page: perPage,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h",
    },
  });

  return data;
}

export function findCoinById(coins: CoinRow[], coinId: string) {
  return coins.find((coin) => coin.id === coinId) ?? null;
}

export async function getCoinById(coinId: string, vs: string) {
  const { data } = await http.get<CoinRow[]>("/coins/markets", {
    params: {
      vs_currency: vs,
      ids: coinId,
      sparkline: false,
      price_change_percentage: "24h",
    },
  });

  return data[0] ?? null;
}

export async function getMarketChart(
  coinId: string,
  vs: string,
  days: number,
) {
  const { data } = await http.get<MarketChartResponse>(
    `/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: vs,
        days,
      },
    },
  );

  return data;
}