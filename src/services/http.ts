import axios from "axios";

const baseURL = import.meta.env.VITE_COINGECKO_BASE_URL;
const demoKey = import.meta.env.VITE_COINGECKO_DEMO_KEY;

export const http = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.request.use((config) => {
  if (demoKey) {
    config.params = {
      ...(config.params ?? {}),
      x_cg_demo_api_key: demoKey,
    };
  }

  return config;
});