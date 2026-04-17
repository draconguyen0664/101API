import { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const yearlyData = {
  2024: [
    { month: "Jan", ggr: 140, netIncome: 260 },
    { month: "Feb", ggr: 160, netIncome: 500 },
    { month: "Mar", ggr: 200, netIncome: 610 },
    { month: "Apr", ggr: 360, netIncome: 580 },
    { month: "May", ggr: 520, netIncome: 430 },
    { month: "Jun", ggr: 560, netIncome: 400 },
    { month: "Jul", ggr: 540, netIncome: 390 },
    { month: "Aug", ggr: 620, netIncome: 410 },
    { month: "Sep", ggr: 740, netIncome: 290 },
    { month: "Oct", ggr: 780, netIncome: 200 },
    { month: "Nov", ggr: 730, netIncome: 170 },
    { month: "Dec", ggr: 460, netIncome: 160 },
  ],
  2025: [
    { month: "Jan", ggr: 160, netIncome: 320 },
    { month: "Feb", ggr: 170, netIncome: 560 },
    { month: "Mar", ggr: 210, netIncome: 670 },
    { month: "Apr", ggr: 390, netIncome: 600 },
    { month: "May", ggr: 580, netIncome: 440 },
    { month: "Jun", ggr: 610, netIncome: 420 },
    { month: "Jul", ggr: 600, netIncome: 410 },
    { month: "Aug", ggr: 670, netIncome: 430 },
    { month: "Sep", ggr: 790, netIncome: 310 },
    { month: "Oct", ggr: 830, netIncome: 210 },
    { month: "Nov", ggr: 770, netIncome: 175 },
    { month: "Dec", ggr: 480, netIncome: 165 },
  ],
  2026: [
    { month: "Jan", ggr: 180, netIncome: 350 },
    { month: "Feb", ggr: 180, netIncome: 600 },
    { month: "Mar", ggr: 220, netIncome: 700 },
    { month: "Apr", ggr: 420, netIncome: 620 },
    { month: "May", ggr: 620, netIncome: 450 },
    { month: "Jun", ggr: 650, netIncome: 430 },
    { month: "Jul", ggr: 640, netIncome: 420 },
    { month: "Aug", ggr: 720, netIncome: 440 },
    { month: "Sep", ggr: 820, netIncome: 300 },
    { month: "Oct", ggr: 860, netIncome: 190 },
    { month: "Nov", ggr: 800, netIncome: 150 },
    { month: "Dec", ggr: 500, netIncome: 150 },
  ],
  2027: [
    { month: "Jan", ggr: 200, netIncome: 380 },
    { month: "Feb", ggr: 210, netIncome: 620 },
    { month: "Mar", ggr: 260, netIncome: 720 },
    { month: "Apr", ggr: 460, netIncome: 640 },
    { month: "May", ggr: 660, netIncome: 470 },
    { month: "Jun", ggr: 690, netIncome: 450 },
    { month: "Jul", ggr: 680, netIncome: 440 },
    { month: "Aug", ggr: 760, netIncome: 460 },
    { month: "Sep", ggr: 860, netIncome: 330 },
    { month: "Oct", ggr: 900, netIncome: 220 },
    { month: "Nov", ggr: 840, netIncome: 170 },
    { month: "Dec", ggr: 530, netIncome: 160 },
  ],
  2028: [
    { month: "Jan", ggr: 190, netIncome: 360 },
    { month: "Feb", ggr: 205, netIncome: 610 },
    { month: "Mar", ggr: 245, netIncome: 705 },
    { month: "Apr", ggr: 440, netIncome: 635 },
    { month: "May", ggr: 640, netIncome: 460 },
    { month: "Jun", ggr: 675, netIncome: 440 },
    { month: "Jul", ggr: 665, netIncome: 430 },
    { month: "Aug", ggr: 745, netIncome: 450 },
    { month: "Sep", ggr: 845, netIncome: 320 },
    { month: "Oct", ggr: 885, netIncome: 210 },
    { month: "Nov", ggr: 825, netIncome: 165 },
    { month: "Dec", ggr: 520, netIncome: 155 },
  ],
  2029: [
    { month: "Jan", ggr: 210, netIncome: 390 },
    { month: "Feb", ggr: 220, netIncome: 640 },
    { month: "Mar", ggr: 275, netIncome: 735 },
    { month: "Apr", ggr: 470, netIncome: 650 },
    { month: "May", ggr: 690, netIncome: 490 },
    { month: "Jun", ggr: 720, netIncome: 470 },
    { month: "Jul", ggr: 710, netIncome: 455 },
    { month: "Aug", ggr: 790, netIncome: 475 },
    { month: "Sep", ggr: 890, netIncome: 340 },
    { month: "Oct", ggr: 930, netIncome: 230 },
    { month: "Nov", ggr: 870, netIncome: 180 },
    { month: "Dec", ggr: 560, netIncome: 170 },
  ],
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const ggr = payload.find((item) => item.dataKey === "ggr");
  const netIncome = payload.find((item) => item.dataKey === "netIncome");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg">
      <div className="mb-2 text-center text-[14px] font-bold text-slate-600">
        {label}
      </div>

      <div className="space-y-2 text-[14px]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#34a853]" />
          <span className="text-slate-600">GGR:</span>
          <span className="font-bold text-slate-800">
            ${ggr?.value?.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f29900]" />
          <span className="text-slate-600">Net Income:</span>
          <span className="font-bold text-slate-800">
            ${netIncome?.value?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomLegend() {
  return (
    <div className="flex items-center gap-6 pr-2 text-[12px] font-medium text-slate-700">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#34a853]" />
        <span>GGR</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f29900]" />
        <span>Net Income</span>
      </div>
    </div>
  );
}

function YearPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [decadeStart, setDecadeStart] = useState(Math.floor(value / 10) * 10);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
    } else {
      const timeout = setTimeout(() => setMounted(false), 180);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDecadeStart(Math.floor(value / 10) * 10);
  }, [value]);

  const years = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => decadeStart - 1 + index);
  }, [decadeStart]);

  return (
    <div className="relative shrink-0" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] text-slate-700 transition hover:bg-slate-100">
        <span>{value}</span>
        <CalendarDays className="h-4 w-4" />
      </button>

      {mounted && (
        <div
          className={`absolute right-0 top-[calc(100%+8px)] z-50 w-[260px] origin-top-right overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.14)] transition-all duration-200 ${
            open
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-95 opacity-0"
          }`}>
          <div className="flex items-center justify-between border-b border-slate-200 px-3.5 py-3">
            <button
              type="button"
              onClick={() => setDecadeStart((prev) => prev - 10)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50">
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="text-[15px] font-bold text-slate-800">
              {decadeStart} - {decadeStart + 9}
            </div>

            <button
              type="button"
              onClick={() => setDecadeStart((prev) => prev + 10)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-y-3 px-3.5 py-4">
            {years.map((year, index) => {
              const isOutside = index === 0 || index === years.length - 1;
              const isSelected = year === value;

              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    onChange(year);
                    setOpen(false);
                  }}
                  className={`mx-auto flex h-10 w-[72px] items-center justify-center rounded-xl text-[15px] font-medium transition ${
                    isSelected
                      ? "bg-linear-to-r from-sky-400 to-emerald-400 text-white shadow-sm"
                      : isOutside
                        ? "text-slate-400"
                        : "text-slate-800 hover:bg-slate-50"
                  }`}>
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SystemNetIncomeGrowthCard() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const data = yearlyData[selectedYear] || yearlyData[2026];

  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="h-full rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-[18px] font-bold text-slate-800">
            System Net Income Growth
          </h3>

          <div className="flex items-center gap-3">
            <CustomLegend />
            <YearPicker value={selectedYear} onChange={setSelectedYear} />
          </div>
        </div>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              key={selectedYear}
              data={data}
              margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
              onMouseMove={(state) => {
                if (state?.isTooltipActive && state?.activeLabel) {
                  setHoveredMonth(state.activeLabel);
                } else {
                  setHoveredMonth(null);
                }
              }}
              onMouseLeave={() => setHoveredMonth(null)}>
              <defs>
                <linearGradient id="ggrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34a853" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#34a853" stopOpacity={0.02} />
                </linearGradient>

                <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f29900" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#f29900" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#334155", fontSize: 12 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                ticks={[0, 200, 400, 600, 800, 1000]}
                domain={[0, 1000]}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{ fill: "#334155", fontSize: 12 }}
              />

              <Tooltip content={<CustomTooltip />} />

              {hoveredMonth && (
                <ReferenceLine
                  x={hoveredMonth}
                  stroke="#d1d5db"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
              )}

              <Area
                type="monotone"
                dataKey="ggr"
                fill="url(#ggrFill)"
                stroke="transparent"
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              />

              <Area
                type="monotone"
                dataKey="netIncome"
                fill="url(#incomeFill)"
                stroke="transparent"
                isAnimationActive
                animationDuration={1100}
                animationEasing="ease-out"
              />

              <Line
                type="monotone"
                dataKey="ggr"
                stroke="#34a853"
                strokeWidth={2}
                dot={false}
                isAnimationActive
                animationDuration={1000}
                animationEasing="ease-out"
                activeDot={{
                  r: 5,
                  fill: "#34a853",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />

              <Line
                type="monotone"
                dataKey="netIncome"
                stroke="#f29900"
                strokeWidth={2}
                dot={false}
                isAnimationActive
                animationDuration={1200}
                animationEasing="ease-out"
                activeDot={{
                  r: 5,
                  fill: "#f29900",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default SystemNetIncomeGrowthCard;
