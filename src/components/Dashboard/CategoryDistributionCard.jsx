import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const categoryData = [
  {
    name: "Slot",
    value: 34,
    color: "#8B3DFF",
  },
  {
    name: "Fish",
    value: 30,
    color: "#5866F6",
  },
  {
    name: "Sport",
    value: 19,
    color: "#F59A00",
  },
  {
    name: "Live",
    value: 12,
    color: "#EC4B7D",
  },
  {
    name: "Others",
    value: 5,
    color: "#9E98C8",
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
  payload,
}) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.56;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const isSmallSlice = payload?.name === "Others";

  return (
    <text
      x={x}
      y={y}
      fill="#FFFFFF"
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: isSmallSlice ? 14 : 12,
        fontWeight: 800,
        letterSpacing: "-0.02em",
      }}>
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
    <div className="min-w-[180px] rounded-3xl border border-[#EDE7FF] bg-white/95 px-4 py-3 shadow-[0_18px_50px_rgba(42,31,92,0.18)] backdrop-blur-xl">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full shadow-[0_0_12px_rgba(139,61,255,0.28)]"
          style={{ backgroundColor: item.color }}
        />

        <span className="text-sm font-bold text-[#14103E]">{item.name}</span>

        <span className="ml-auto text-sm font-extrabold text-[#14103E]">
          {item.value}%
        </span>
      </div>

      {isOthers ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#8C88A8]">
            Included categories
          </p>

          <div className="space-y-1.5">
            {item.breakdown.map((subItem) => (
              <div
                key={subItem.name}
                className="flex items-center justify-between text-sm">
                <span className="text-[#5E5A78]">{subItem.name}</span>

                <span className="font-bold text-[#14103E]">
                  {subItem.value}%
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 border-t border-[#EEE9FF] pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#777294]">Total</span>

              <span className="font-extrabold text-[#14103E]">5%</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm leading-5 text-[#6C6886]">
          {item.name} contributes{" "}
          <span className="font-extrabold text-[#14103E]">{item.value}%</span>{" "}
          of total distribution.
        </p>
      )}
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="h-3.5 w-3.5 rounded-full shadow-[0_4px_12px_rgba(30,20,90,0.16)]"
        style={{ backgroundColor: color }}
      />

      <span className="text-[15px] font-bold text-[#272A38]">{label}</span>
    </div>
  );
}

function CategoryDistributionCard() {
  return (
    <div className="w-full max-w-[372px] self-start rounded-[28px] border border-[#EDE8FF] bg-white px-6 py-5 shadow-[0_10px_30px_rgba(103,76,255,0.10)]">
      <h3 className="text-[22px] font-extrabold tracking-[-0.03em] text-[#120A48]">
        Category Distribution
      </h3>

      <div className="mx-auto mt-4 h-[255px] w-full max-w-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip cursor={false} content={<CategoryTooltip />} />

            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={100}
              startAngle={110}
              endAngle={-260}
              paddingAngle={4}
              cornerRadius={10}
              stroke="none"
              labelLine={false}
              label={renderPieLabel}
              isAnimationActive={true}
              animationBegin={120}
              animationDuration={900}
              animationEasing="ease-out">
              {categoryData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mx-auto mt-1 flex max-w-[300px] flex-wrap items-center justify-center gap-x-4 gap-y-3">
        {categoryData.map((item) => (
          <LegendItem key={item.name} color={item.color} label={item.name} />
        ))}
      </div>
    </div>
  );
}

export default CategoryDistributionCard;
