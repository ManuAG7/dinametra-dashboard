import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import type { MarketChartResponse } from "../../services/coingecko.service";

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

export default function VolumeBarChart({ data, vs, days }: Props) {
  const isMobile = useIsMobile(640);

  const points = data.total_volumes;

  const HOUR_STEP = days === 1 ? (isMobile ? 4 : 2) : 2;

  const sampled =
    days === 1
      ? points.filter(([ts]) => {
          const d = new Date(ts);
          return d.getMinutes() === 0 && d.getHours() % HOUR_STEP === 0;
        })
      : (() => {
          const targetBars = isMobile ? 24 : 40;
          const STEP = Math.ceil(points.length / targetBars);
          return points.filter((_, i) => i % STEP === 0);
        })();

  const timestamps = sampled.map(([ts]) => ts);

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

  const values = sampled.map(([, v]) => v);
  const maxTicks = days === 1 ? (isMobile ? 4 : 8) : isMobile ? 4 : 8;

  return (
    <div className="h-[260px] sm:h-[300px] lg:h-[340px] rounded-xl bg-slate-900 p-4 ring-1 ring-slate-800">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">Volumen</h3>

      <Bar
        data={{
          labels,
          datasets: [
            {
              label: `Volumen (${vs.toUpperCase()})`,
              data: values,
              backgroundColor: "rgba(56,189,248,0.35)",
              borderColor: "#38bdf8",
              borderWidth: 1,
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
          scales: {
            x: {
              ticks: {
                color: "#FFFFFF",
                autoSkip: true,
                maxTicksLimit: maxTicks,
                maxRotation: 0,
                minRotation: 0,
                padding: 8,
              },
              grid: { color: "rgba(255,255,255,0.08)" },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "#FFFFFF",
                padding: 8,
                callback: (value) =>
                  Intl.NumberFormat("en", { notation: "compact" }).format(Number(value)),
              },
              grid: { color: "rgba(255,255,255,0.08)" },
            },
          },
        }}
      />
    </div>
  );
}