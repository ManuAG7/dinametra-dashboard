import axios from "axios";

const DEMO_KEY = import.meta.env.VITE_CG_DEMO_KEY; 

export const cg = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 15000,
});

cg.interceptors.request.use((config) => {
  if (DEMO_KEY) {
    config.params = { ...(config.params ?? {}), x_cg_demo_api_key: DEMO_KEY };
  }
  return config;
});

export type CoinMarketItem = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency?: number;
  market_cap: number;
  total_volume: number;
};

export type MarketChartResponse = {
  prices: [number, number][];
  total_volumes: [number, number][];
  market_caps: [number, number][];
};

// Top monedas para selector (top 50)
export async function fetchTopCoins(vs: string) {
  const { data } = await cg.get<CoinMarketItem[]>("/coins/markets", {
    params: {
      vs_currency: vs,
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: false,
    },
  });
  return data;
}

// Datos actuales de una moneda
export async function fetchCoinNow(coinId: string, vs: string) {
  const { data } = await cg.get<CoinMarketItem[]>("/coins/markets", {
    params: { vs_currency: vs, ids: coinId, sparkline: false },
  });
  return data[0] ?? null;
}

// Series para gráficas (precio, volumen, market cap)
export async function fetchMarketChart(coinId: string, vs: string, days: number) {
  const { data } = await cg.get<MarketChartResponse>(`/coins/${coinId}/market_chart`, {
    params: { vs_currency: vs, days },
  });
  return data;
}