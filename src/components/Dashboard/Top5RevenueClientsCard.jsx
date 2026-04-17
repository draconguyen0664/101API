import { useMemo, useState } from "react";
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

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2 text-[13px] text-slate-500">
        <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-sky-400 to-emerald-400" />
        <span>{label}:</span>
        <span className="font-bold text-slate-800">
          ${payload[0].value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function Top5RevenueClientsCard() {
  const [filter, setFilter] = useState("Today");

  const data = useMemo(() => {
    return chartDataByFilter[filter] || chartDataByFilter.Today;
  }, [filter]);

  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="h-full rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-slate-800">
            Top 5 Revenue Clients
          </h3>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] text-slate-700 outline-none">
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
          </select>
        </div>

        <div className="mt-3 h-[210px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              key={filter}
              data={data}
              barSize={18}
              margin={{ top: 12, right: 0, left: 0, bottom: 0 }}>
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
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#334155", fontSize: 12, fontWeight: 600 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[24000, 40000]}
                ticks={[24000, 28000, 32000, 36000, 40000]}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{ fill: "#334155", fontSize: 11 }}
              />

              <Tooltip
                cursor={{ fill: "rgba(15, 23, 42, 0.05)" }}
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="value"
                radius={[3, 3, 0, 0]}
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
