import { useMemo, useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardSelect from "../Common/DashboardSelect";

const chartDataByFilter = {
  Today: [
    { name: "ALP", value: 38000 },
    { name: "BET", value: 30000 },
    { name: "ECO", value: 32000 },
    { name: "CRY", value: 38000 },
    { name: "FOX", value: 33500 },
  ],
  "This week": [
    { name: "ALP", value: 39500 },
    { name: "BET", value: 31500 },
    { name: "ECO", value: 33800 },
    { name: "CRY", value: 39200 },
    { name: "FOX", value: 34800 },
  ],
  "This month": [
    { name: "ALP", value: 40000 },
    { name: "BET", value: 32600 },
    { name: "ECO", value: 35000 },
    { name: "CRY", value: 39800 },
    { name: "FOX", value: 36200 },
  ],
};

function useDarkModeClass() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    const update = () => {
      setIsDark(root.classList.contains("dark"));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

function CustomTooltip({ active, payload, label, isDark }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={`rounded-2xl border px-3 py-2 shadow-lg ${
        isDark
          ? "border-slate-700 bg-slate-900/95"
          : "border-slate-200 bg-white/95"
      }`}>
      <div
        className={`flex items-center gap-2 text-[13px] ${
          isDark ? "text-slate-300" : "text-slate-500"
        }`}>
        <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-sky-400 to-emerald-400" />
        <span>{label}:</span>
        <span
          className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
          ${payload[0].value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function Top5RevenueClientsCard() {
  const [filter, setFilter] = useState("Today");
  const isDark = useDarkModeClass();

  const data = useMemo(() => {
    return chartDataByFilter[filter] || chartDataByFilter.Today;
  }, [filter]);

  const axisColor = isDark ? "#CBD5E1" : "#334155";
  const gridColor = isDark ? "#334155" : "#e5e7eb";
  const cursorColor = isDark
    ? "rgba(148, 163, 184, 0.10)"
    : "rgba(15, 23, 42, 0.05)";

  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="h-full rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950 dark:shadow-[0_8px_24px_rgba(2,6,23,0.45)]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-[18px] font-bold text-slate-800 dark:text-white">
            Top 5 Revenue Clients
          </h3>

          <div className="w-[110px]">
            <DashboardSelect
              value={filter}
              options={["Today", "This week", "This month"]}
              onChange={setFilter}
            />
          </div>
        </div>

        <div className="mt-3 h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              key={filter}
              data={data}
              barSize={22}
              margin={{ top: 18, right: 8, left: 4, bottom: 6 }}>
              <defs>
                <linearGradient
                  id="clientBarGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0">
                  <stop offset="0%" stopColor="#6aa8ff" />
                  <stop offset="100%" stopColor="#63d7b0" />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke={gridColor}
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                height={36}
                tickMargin={8}
                tick={{ fill: axisColor, fontSize: 12, fontWeight: 600 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[24000, 40000]}
                ticks={[24000, 28000, 32000, 36000, 40000]}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{ fill: axisColor, fontSize: 11 }}
              />

              <Tooltip
                cursor={{ fill: cursorColor }}
                content={<CustomTooltip isDark={isDark} />}
              />

              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out">
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill="url(#clientBarGradient)"
                    animationBegin={index * 120}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Top5RevenueClientsCard;
