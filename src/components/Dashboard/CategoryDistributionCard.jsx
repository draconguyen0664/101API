import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const categoryData = [
  {
    name: "Slot",
    value: 34,
    color: "#45B764",
  },
  {
    name: "Fish",
    value: 19,
    color: "#F2A000",
  },
  {
    name: "Sport",
    value: 12,
    color: "#E5533D",
  },
  {
    name: "Live",
    value: 30,
    color: "#4D9BE0",
  },
  {
    name: "Others",
    value: 5,
    color: "#D1D5DB",
    breakdown: [
      { name: "Table", value: 2 },
      { name: "Arcade", value: 1.5 },
      { name: "Lottery", value: 1 },
      { name: "Crash", value: 0.5 },
    ],
  },
];

function renderPieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.52;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[15px] font-bold">
      {`${Math.round(percent * 100)}%`}
    </text>
  );
}

function CategoryTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;
  if (!item) return null;

  const isOthers = item.name === "Others";

  return (
    <div className="min-w-[180px] rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
          {item.name}
        </span>
        <span className="ml-auto text-sm font-semibold text-slate-600 dark:text-slate-300">
          {item.value}%
        </span>
      </div>

      {isOthers ? (
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Included categories
          </p>

          <div className="space-y-1.5">
            {item.breakdown.map((subItem) => (
              <div
                key={subItem.name}
                className="flex items-center justify-between text-sm">
                <span className="text-slate-700 dark:text-slate-200">
                  {subItem.name}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {subItem.value}%
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 border-t border-slate-200 pt-2 text-sm dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-600 dark:text-slate-300">
                Total
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                5%
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {item.name} contributes{" "}
          <span className="font-bold">{item.value}%</span> of total
          distribution.
        </p>
      )}
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-4 w-4 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[15px] font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
    </div>
  );
}

function CategoryDistributionCard() {
  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="h-full rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950">
        <h3 className="mb-4 text-[18px] font-bold text-slate-800 dark:text-white">
          Category Distribution
        </h3>

        <div className="mx-auto h-[300px] w-full max-w-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip cursor={false} content={<CategoryTooltip />} />

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={118}
                innerRadius={0}
                paddingAngle={0}
                stroke="#ffffff"
                strokeWidth={2}
                labelLine={false}
                label={renderPieLabel}
                isAnimationActive>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          {categoryData.map((item) => (
            <LegendItem key={item.name} color={item.color} label={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryDistributionCard;
