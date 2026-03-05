import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import type { MarketChartResponse } from "../../api/coingecko";

type Props = {
  data: MarketChartResponse;
  vs: string;
  days: number;
};

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function useIsMobile(breakpointPx = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpointPx;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const onChange = () => setIsMobile(mq.matches);

    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpointPx]);

  return isMobile;
}

export default function PriceLineChart({ data, vs, days }: Props) {
  const isMobile = useIsMobile(640);

  const timestamps = data.prices.map(([ts]) => ts);
  const labels =
    days === 1
      ? timestamps.map((ts) => {
          const d = new Date(ts);
          return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
        })
      : timestamps.map((ts) => {
          const d = new Date(ts);
          return `${d.getDate()}/${d.getMonth() + 1}`; 
        });

  const values = data.prices.map(([, v]) => v);
  const maxTicks = days === 1 ? (isMobile ? 4 : 8) : isMobile ? 4 : 8;
  const hourStep = isMobile ? 4 : 3;

  return (
    <div className="h-[260px] sm:h-[300px] lg:h-[340px] rounded-xl bg-slate-900 p-4 ring-1 ring-slate-800">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">Precio</h3>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: `Precio (${vs.toUpperCase()})`,
              data: values,
              borderColor: "#22c55e",
              backgroundColor: "rgba(34,197,94,0.15)",
              pointRadius: 0,
              tension: 0.25,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { left: 6, right: 12, top: 6, bottom: 12 } },
          plugins: {
            legend: { display: true, labels: { color: "#FFFFFF" } },
            tooltip: { enabled: true },
          },
          interaction: { mode: "index", intersect: false },
          scales: {
            x: {
              ticks: {
                color: "#FFFFFF",
                padding: 8,
                autoSkip: days !== 1,
                maxTicksLimit: maxTicks,
                maxRotation: 0,
                minRotation: 0,

                callback: (_value, index) => {
                  if (days !== 1) return labels[index] as any;
                  const ts = timestamps[index];
                  const d = new Date(ts);
                  if (d.getMinutes() !== 0) return "";
                  return d.getHours() % hourStep === 0 ? labels[index] : "";
                },
              },
              grid: { color: "rgba(255,255,255,0.08)" },
            },
            y: {
              ticks: { color: "#FFFFFF", padding: 8 },
              grid: { color: "rgba(255,255,255,0.08)" },
            },
          },
        }}
      />
    </div>
  );
}