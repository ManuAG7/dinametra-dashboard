// import axios from "axios";


// export const cg = axios.create({
//   baseURL: import.meta.env.VITE_COINGECKO_BASE_URL,
//   timeout: 15000,
// });

// export type CoinMarketItem = {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
//   current_price: number;
//   price_change_percentage_24h: number;
//   price_change_percentage_24h_in_currency?: number;
//   market_cap: number;
//   total_volume: number;
// };

// export type MarketChartResponse = {
//   prices: [number, number][];
//   total_volumes: [number, number][];
//   market_caps: [number, number][];
// };

// // Top monedas para selector (top 50)
// export async function fetchTopCoins(vs: string) {
//   const { data } = await cg.get<CoinMarketItem[]>("/coins/markets", {
//     params: {
//       vs_currency: vs,
//       order: "market_cap_desc",
//       per_page: 50,
//       page: 1,
//       sparkline: false,
//     },
//   });
//   return data;
// }

// // Datos actuales de una moneda
// export async function fetchCoinNow(coinId: string, vs: string) {
//   const { data } = await cg.get<CoinMarketItem[]>("/coins/markets", {
//     params: { vs_currency: vs, ids: coinId, sparkline: false },
//   });
//   return data[0] ?? null;
// }

// // Series para gráficas (precio, volumen, market cap)
// export async function fetchMarketChart(coinId: string, vs: string, days: number) {
//   const { data } = await cg.get<MarketChartResponse>(`/coins/${coinId}/market_chart`, {
//     params: { vs_currency: vs, days },
//   });
//   return data;
// }