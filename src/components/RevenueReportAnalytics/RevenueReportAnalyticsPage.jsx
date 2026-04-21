import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from "lucide-react";

const clientBaseRows = [
  {
    label: "CLT71",
    numberOfBets: 1240,
    currency: "USD",
    totalBetAmount: 180000,
    totalBetWinLoss: 180000,
    validBetAmount: 175000,
    profitLossGGR: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerFee: 0,
    providerCost: 0,
    providerFeeRate: "-",
    netIncome: 0,
  },
  {
    label: "CLT73",
    numberOfBets: 532,
    currency: "USD",
    totalBetAmount: 92000,
    totalBetWinLoss: 92000,
    validBetAmount: 91000,
    profitLossGGR: -1200,
    systemRevenue: -240,
    clientRate: "20%",
    providerFee: -132,
    providerCost: -132,
    providerFeeRate: "11%",
    netIncome: -108,
  },
  {
    label: "CLT73",
    numberOfBets: 90,
    currency: "USD",
    totalBetAmount: 5000,
    totalBetWinLoss: 5000,
    validBetAmount: 5000,
    profitLossGGR: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerFee: 0,
    providerCost: 0,
    providerFeeRate: "-",
    netIncome: 0,
  },
  {
    label: "AABB88",
    numberOfBets: 760,
    currency: "USD",
    totalBetAmount: 120000,
    totalBetWinLoss: 120000,
    validBetAmount: 118000,
    profitLossGGR: 4200,
    systemRevenue: 840,
    clientRate: "20%",
    providerFee: 462,
    providerCost: 462,
    providerFeeRate: "11%",
    netIncome: 378,
  },
  {
    label: "HD007",
    numberOfBets: 310,
    currency: "EUR",
    totalBetAmount: 45000,
    totalBetWinLoss: 45000,
    validBetAmount: 44200,
    profitLossGGR: 650,
    systemRevenue: 130,
    clientRate: "20%",
    providerFee: 71,
    providerCost: 71,
    providerFeeRate: "11%",
    netIncome: 58,
  },
  {
    label: "CL023",
    numberOfBets: 980,
    currency: "USD",
    totalBetAmount: 210000,
    totalBetWinLoss: 210000,
    validBetAmount: 204000,
    profitLossGGR: 9300,
    systemRevenue: 1860,
    clientRate: "20%",
    providerFee: 1023,
    providerCost: 1023,
    providerFeeRate: "11%",
    netIncome: 837,
  },
  {
    label: "TG200",
    numberOfBets: 420,
    currency: "VND",
    totalBetAmount: 65000,
    totalBetWinLoss: 65000,
    validBetAmount: 63500,
    profitLossGGR: -1800,
    systemRevenue: -360,
    clientRate: "20%",
    providerFee: -198,
    providerCost: -198,
    providerFeeRate: "11%",
    netIncome: -162,
  },
  {
    label: "RD025",
    numberOfBets: 1500,
    currency: "VND",
    totalBetAmount: 300000,
    totalBetWinLoss: 300000,
    validBetAmount: 292000,
    profitLossGGR: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerFee: 0,
    providerCost: 0,
    providerFeeRate: "-",
    netIncome: 0,
  },
  {
    label: "CP026",
    numberOfBets: 660,
    currency: "USD",
    totalBetAmount: 98000,
    totalBetWinLoss: 98000,
    validBetAmount: 95800,
    profitLossGGR: 3200,
    systemRevenue: 640,
    clientRate: "20%",
    providerFee: 352,
    providerCost: 352,
    providerFeeRate: "11%",
    netIncome: 288,
  },
];

const coreProviderBaseRows = [
  {
    label: "WALA88",
    numberOfBets: 1240,
    currency: "USD",
    totalBetAmount: 180000,
    totalBetWinLoss: 180000,
    validBetAmount: 175000,
    profitLossGGR: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerCost: 0,
    providerFeeRate: "-",
    netIncome: 0,
  },
  {
    label: "MARBLEF1",
    numberOfBets: 532,
    currency: "USD",
    totalBetAmount: 92000,
    totalBetWinLoss: 92000,
    validBetAmount: 91000,
    profitLossGGR: -1200,
    systemRevenue: -240,
    clientRate: "20%",
    providerCost: -132,
    providerFeeRate: "11%",
    netIncome: -108,
  },
  {
    label: "HEO",
    numberOfBets: 90,
    currency: "USD",
    totalBetAmount: 5000,
    totalBetWinLoss: 5000,
    validBetAmount: 5000,
    profitLossGGR: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerCost: 0,
    providerFeeRate: "-",
    netIncome: 0,
  },
  {
    label: "PAX",
    numberOfBets: 760,
    currency: "USD",
    totalBetAmount: 120000,
    totalBetWinLoss: 120000,
    validBetAmount: 118000,
    profitLossGGR: 4200,
    systemRevenue: 840,
    clientRate: "20%",
    providerCost: 462,
    providerFeeRate: "11%",
    netIncome: 378,
  },
  {
    label: "AGVC",
    numberOfBets: 310,
    currency: "EUR",
    totalBetAmount: 45000,
    totalBetWinLoss: 45000,
    validBetAmount: 44200,
    profitLossGGR: 650,
    systemRevenue: 130,
    clientRate: "20%",
    providerCost: 71,
    providerFeeRate: "11%",
    netIncome: 58,
  },
  {
    label: "CL023",
    numberOfBets: 980,
    currency: "USD",
    totalBetAmount: 210000,
    totalBetWinLoss: 210000,
    validBetAmount: 204000,
    profitLossGGR: 9300,
    systemRevenue: 1860,
    clientRate: "20%",
    providerCost: 1023,
    providerFeeRate: "11%",
    netIncome: 837,
  },
  {
    label: "WALA88",
    numberOfBets: 420,
    currency: "VND",
    totalBetAmount: 65000,
    totalBetWinLoss: 65000,
    validBetAmount: 63500,
    profitLossGGR: -1800,
    systemRevenue: -360,
    clientRate: "20%",
    providerCost: -198,
    providerFeeRate: "11%",
    netIncome: -162,
  },
  {
    label: "MARBLEF1",
    numberOfBets: 1500,
    currency: "VND",
    totalBetAmount: 300000,
    totalBetWinLoss: 300000,
    validBetAmount: 292000,
    profitLossGGR: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerCost: 0,
    providerFeeRate: "-",
    netIncome: 0,
  },
  {
    label: "HEO",
    numberOfBets: 660,
    currency: "USD",
    totalBetAmount: 98000,
    totalBetWinLoss: 98000,
    validBetAmount: 95800,
    profitLossGGR: 3200,
    systemRevenue: 640,
    clientRate: "20%",
    providerCost: 352,
    providerFeeRate: "11%",
    netIncome: 288,
  },
];

const providerBaseRows = [
  {
    label: "PG Soft",
    numberOfBets: 1180,
    currency: "USD",
    totalBetAmount: 175000,
    totalBetWinLoss: 175000,
    validBetAmount: 170000,
    profitLossGGR: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerCost: 0,
    providerFeeRate: "-",
    netIncome: 0,
  },
  {
    label: "Pragmatic Play",
    numberOfBets: 680,
    currency: "USD",
    totalBetAmount: 108000,
    totalBetWinLoss: 108000,
    validBetAmount: 103000,
    profitLossGGR: 3600,
    systemRevenue: 720,
    clientRate: "20%",
    providerCost: 396,
    providerFeeRate: "11%",
    netIncome: 324,
  },
  {
    label: "JILI",
    numberOfBets: 420,
    currency: "USD",
    totalBetAmount: 76000,
    totalBetWinLoss: 76000,
    validBetAmount: 74200,
    profitLossGGR: -1500,
    systemRevenue: -300,
    clientRate: "20%",
    providerCost: -165,
    providerFeeRate: "11%",
    netIncome: -135,
  },
  {
    label: "Habanero",
    numberOfBets: 350,
    currency: "EUR",
    totalBetAmount: 52000,
    totalBetWinLoss: 52000,
    validBetAmount: 50000,
    profitLossGGR: 780,
    systemRevenue: 156,
    clientRate: "20%",
    providerCost: 86,
    providerFeeRate: "11%",
    netIncome: 70,
  },
  {
    label: "NetEnt",
    numberOfBets: 930,
    currency: "USD",
    totalBetAmount: 195000,
    totalBetWinLoss: 195000,
    validBetAmount: 190500,
    profitLossGGR: 8800,
    systemRevenue: 1760,
    clientRate: "20%",
    providerCost: 968,
    providerFeeRate: "11%",
    netIncome: 792,
  },
];

const gameBaseRows = [
  {
    label: "WALA88",
    numberOfBets: 980,
    currency: "USD",
    totalBetAmount: 160000,
    totalBetWinLoss: 160000,
    validBetAmount: 156000,
    profitLossGGR: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerCost: 0,
    providerFeeRate: "-",
    netIncome: 0,
  },
  {
    label: "MARBLEF1",
    numberOfBets: 620,
    currency: "USD",
    totalBetAmount: 99000,
    totalBetWinLoss: 99000,
    validBetAmount: 96000,
    profitLossGGR: -1200,
    systemRevenue: -240,
    clientRate: "20%",
    providerCost: -132,
    providerFeeRate: "11%",
    netIncome: -108,
  },
  {
    label: "HEO",
    numberOfBets: 540,
    currency: "USD",
    totalBetAmount: 84000,
    totalBetWinLoss: 84000,
    validBetAmount: 81200,
    profitLossGGR: 2300,
    systemRevenue: 460,
    clientRate: "20%",
    providerCost: 253,
    providerFeeRate: "11%",
    netIncome: 207,
  },
  {
    label: "PAX",
    numberOfBets: 760,
    currency: "USD",
    totalBetAmount: 120000,
    totalBetWinLoss: 120000,
    validBetAmount: 118000,
    profitLossGGR: 4200,
    systemRevenue: 840,
    clientRate: "20%",
    providerCost: 462,
    providerFeeRate: "11%",
    netIncome: 378,
  },
  {
    label: "AGVC",
    numberOfBets: 310,
    currency: "EUR",
    totalBetAmount: 45000,
    totalBetWinLoss: 45000,
    validBetAmount: 44200,
    profitLossGGR: 650,
    systemRevenue: 130,
    clientRate: "20%",
    providerCost: 71,
    providerFeeRate: "11%",
    netIncome: 58,
  },
];

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function addDays(date, amount) {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

function addMonths(date, amount) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + amount);
  return d;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfWeek(date) {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateBetween(date, start, end) {
  if (!start || !end) return false;
  const current = startOfDay(date).getTime();
  return (
    current > startOfDay(start).getTime() && current < startOfDay(end).getTime()
  );
}

function formatMonthYear(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatShortDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

function formatRangeValue(start, end) {
  if (!start || !end) return "";
  return `${formatShortDate(start)} - ${formatShortDate(end)}`;
}

function getPresetRange(type) {
  const today = new Date();

  switch (type) {
    case "Today":
      return {
        start: startOfDay(today),
        end: endOfDay(today),
      };

    case "Yesterday": {
      const yesterday = addDays(today, -1);
      return {
        start: startOfDay(yesterday),
        end: endOfDay(yesterday),
      };
    }

    case "This Week":
      return {
        start: startOfWeek(today),
        end: endOfWeek(today),
      };

    case "Last Week": {
      const lastWeekDate = addDays(today, -7);
      return {
        start: startOfWeek(lastWeekDate),
        end: endOfWeek(lastWeekDate),
      };
    }

    case "This Month":
      return {
        start: startOfMonth(today),
        end: endOfMonth(today),
      };

    case "Last Month": {
      const lastMonth = addMonths(today, -1);
      return {
        start: startOfMonth(lastMonth),
        end: endOfMonth(lastMonth),
      };
    }

    default:
      return {
        start: null,
        end: null,
      };
  }
}

function getMonthDays(monthDate) {
  const firstDay = startOfMonth(monthDate);
  const lastDay = endOfMonth(monthDate);

  const startCalendar = new Date(firstDay);
  startCalendar.setDate(firstDay.getDate() - firstDay.getDay());

  const endCalendar = new Date(lastDay);
  endCalendar.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  const days = [];
  const cursor = new Date(startCalendar);

  while (cursor <= endCalendar) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function DateRangePickerInput({ label, value, onChange }) {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [leftMonth, setLeftMonth] = useState(startOfMonth(new Date()));
  const [draftStart, setDraftStart] = useState(value.start);
  const [draftEnd, setDraftEnd] = useState(value.end);

  useEffect(() => {
    setDraftStart(value.start);
    setDraftEnd(value.end);

    if (value.start) {
      setLeftMonth(startOfMonth(value.start));
    }
  }, [value.start, value.end]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const rightMonth = addMonths(leftMonth, 1);
  const leftDays = getMonthDays(leftMonth);
  const rightDays = getMonthDays(rightMonth);

  const displayValue =
    draftStart && draftEnd ? formatRangeValue(draftStart, draftEnd) : "";

  const applyPreset = (preset) => {
    const range = getPresetRange(preset);
    setDraftStart(range.start);
    setDraftEnd(range.end);
    onChange(range);
  };

  const handleDateClick = (date) => {
    const clickedDate = startOfDay(date);

    if (!draftStart || (draftStart && draftEnd)) {
      setDraftStart(clickedDate);
      setDraftEnd(null);
      return;
    }

    if (clickedDate.getTime() < draftStart.getTime()) {
      setDraftStart(clickedDate);
      return;
    }

    const newEnd = endOfDay(clickedDate);
    setDraftEnd(newEnd);
    onChange({
      start: draftStart,
      end: newEnd,
    });
  };

  const renderCalendar = (monthDate, days) => {
    return (
      <div className="w-full">
        <div className="mb-3 grid grid-cols-7 place-items-center gap-y-2 text-[12px] text-slate-400 dark:text-slate-500">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="flex h-8 w-8 items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 place-items-center gap-y-2">
          {days.map((day) => {
            const isOutsideMonth = day.getMonth() !== monthDate.getMonth();
            const isStart = draftStart && isSameDay(day, draftStart);
            const isEnd = draftEnd && isSameDay(day, draftEnd);
            const isBetween = isDateBetween(day, draftStart, draftEnd);
            const isSelected = isStart || isEnd;

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDateClick(day)}
                className={`flex h-10 w-10 items-center justify-center rounded-[10px] text-[14px] transition ${
                  isSelected
                    ? "bg-linear-to-r from-sky-400 to-emerald-400 text-white shadow-sm"
                    : isBetween
                      ? "bg-emerald-50 text-slate-800 dark:bg-emerald-500/10 dark:text-slate-100"
                      : isOutsideMonth
                        ? "text-slate-300 dark:text-slate-600"
                        : "text-slate-800 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                }`}>
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-w-0" ref={wrapperRef}>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 text-left transition ${
            open
              ? "border-cyan-300 ring-2 ring-cyan-100 dark:border-cyan-400 dark:ring-cyan-500/20"
              : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
          } dark:bg-slate-900`}>
          <span
            className={`truncate text-sm ${
              displayValue
                ? "text-slate-700 dark:text-slate-100"
                : "text-slate-300 dark:text-slate-500"
            }`}>
            {displayValue || "Select date range"}
          </span>

          <CalendarDays className="h-5 w-5 shrink-0 text-slate-600 dark:text-slate-300" />
        </button>

        {open && (
          <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[760px] overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-900">
            <div className="flex">
              <div className="w-[150px] border-r border-slate-200 px-4 py-4 dark:border-slate-700">
                <div className="space-y-3">
                  {[
                    "Today",
                    "Yesterday",
                    "This Week",
                    "Last Week",
                    "This Month",
                    "Last Month",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="block text-left text-[15px] text-slate-800 transition hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-400">
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center border-b border-slate-200 dark:border-slate-700">
                  <div className="flex w-1/2 items-center justify-between border-r border-slate-200 px-4 py-3 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() =>
                        setLeftMonth((prev) => addMonths(prev, -1))
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="text-[16px] font-bold text-slate-800 dark:text-white">
                      {formatMonthYear(leftMonth)}
                    </div>

                    <div className="h-9 w-9" />
                  </div>

                  <div className="flex w-1/2 items-center justify-between px-4 py-3">
                    <div className="h-9 w-9" />

                    <div className="text-[16px] font-bold text-slate-800 dark:text-white">
                      {formatMonthYear(rightMonth)}
                    </div>

                    <button
                      type="button"
                      onClick={() => setLeftMonth((prev) => addMonths(prev, 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-0 px-5 py-4">
                  <div className="w-1/2 pr-4">
                    {renderCalendar(leftMonth, leftDays)}
                  </div>
                  <div className="w-1/2 pl-4">
                    {renderCalendar(rightMonth, rightDays)}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-3 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      setDraftStart(null);
                      setDraftEnd(null);
                      onChange({ start: null, end: null });
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                    Clear
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-linear-to-r from-sky-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-white">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  options = ["All"],
  value,
  onChange,
  placeholder,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-w-0" ref={wrapperRef}>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 text-sm transition ${
            open
              ? "border-cyan-300 ring-2 ring-cyan-100 dark:border-cyan-400 dark:ring-cyan-500/20"
              : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
          } dark:bg-slate-900`}>
          <span
            className={`truncate ${
              value === "All" && placeholder
                ? "text-slate-300 dark:text-slate-500"
                : "text-slate-700 dark:text-slate-100"
            }`}>
            {value === "All" && placeholder ? placeholder : value}
          </span>

          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900">
            <div className="py-2">
              {options.map((option) => {
                const isSelected = option === value;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                      isSelected
                        ? "bg-cyan-50 font-semibold text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300"
                        : "text-slate-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                    }`}>
                    <span>{option}</span>
                    {isSelected && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RowsPerPageSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const options = [10, 25, 50];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-9 min-w-[64px] items-center justify-between rounded-xl border bg-white pl-3 pr-3 text-sm text-slate-700 transition ${
          open
            ? "border-cyan-300 ring-2 ring-cyan-100 dark:border-cyan-400 dark:ring-cyan-500/20"
            : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
        } dark:bg-slate-900 dark:text-slate-100`}>
        <span>{value}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-30 min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900">
          <div className="py-2">
            {options.map((option) => {
              const selected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition ${
                    selected
                      ? "bg-cyan-50 font-semibold text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                  }`}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function formatAmount(value) {
  if (typeof value !== "number") return value;
  return value.toLocaleString();
}

function MetricCell({ value }) {
  if (typeof value !== "number" || value === 0) {
    return (
      <span className="whitespace-nowrap text-slate-700 dark:text-slate-300">
        {formatAmount(value)}
      </span>
    );
  }

  const isPositive = value > 0;

  return (
    <span
      className={`inline-flex whitespace-nowrap items-center gap-1 font-medium ${
        isPositive
          ? "text-emerald-600 dark:text-emerald-300"
          : "text-red-500 dark:text-red-300"
      }`}>
      <span>{formatAmount(value)}</span>
      {isPositive ? (
        <ArrowUpRight className="h-3.5 w-3.5" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" />
      )}
    </span>
  );
}

function ViewModeTabs({ value, onChange }) {
  const items = ["Client", "Core Provider", "Provider", "Game"];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        View Mode:
      </span>

      {items.map((item) => {
        const active = item === value;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              active
                ? "bg-linear-to-r from-cyan-400 to-emerald-400 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}>
            {item}
          </button>
        );
      })}
    </div>
  );
}

function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, index) => ({
      type: "page",
      value: index + 1,
    }));
  }

  if (currentPage <= 3) {
    return [
      { type: "page", value: 1 },
      { type: "page", value: 2 },
      { type: "page", value: 3 },
      { type: "ellipsis", direction: "right" },
      { type: "page", value: totalPages - 1 },
      { type: "page", value: totalPages },
    ];
  }

  if (currentPage >= totalPages - 2) {
    return [
      { type: "page", value: 1 },
      { type: "page", value: 2 },
      { type: "ellipsis", direction: "left" },
      { type: "page", value: totalPages - 2 },
      { type: "page", value: totalPages - 1 },
      { type: "page", value: totalPages },
    ];
  }

  return [
    { type: "page", value: 1 },
    { type: "ellipsis", direction: "left" },
    { type: "page", value: currentPage - 1 },
    { type: "page", value: currentPage },
    { type: "page", value: currentPage + 1 },
    { type: "ellipsis", direction: "right" },
    { type: "page", value: totalPages },
  ];
}

function buildRepeatedRows(baseRows, total, prefix) {
  return Array.from({ length: total }, (_, index) => {
    const row = baseRows[index % baseRows.length];
    return {
      ...row,
      rowKey: `${prefix}-${index}`,
    };
  });
}

function RevenueReportAnalyticsPage() {
  const [createdAt, setCreatedAt] = useState({
    start: null,
    end: null,
  });
  const [viewMode, setViewMode] = useState("Client");
  const [filterValue, setFilterValue] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const viewConfigs = useMemo(() => {
    return {
      Client: {
        filterLabel: "Client",
        placeholder: "Select client",
        firstColumnLabel: "Client",
        filterOptions: [
          "All",
          "CLT71",
          "CLT73",
          "AABB88",
          "HD007",
          "CL023",
          "TG200",
          "RD025",
          "CP026",
        ],
        rows: buildRepeatedRows(clientBaseRows, 152, "client"),
        columns: [
          { key: "label", label: "Client", type: "text", sticky: true },
          { key: "numberOfBets", label: "Number of bets", type: "amount" },
          { key: "currency", label: "Currency", type: "text" },
          { key: "totalBetAmount", label: "Total Bet Amount", type: "amount" },
          {
            key: "totalBetWinLoss",
            label: "Total Bet WinLoss",
            type: "amount",
          },
          { key: "validBetAmount", label: "Valid Bet Amount", type: "amount" },
          { key: "profitLossGGR", label: "Profit/Loss (GGR)", type: "metric" },
          { key: "systemRevenue", label: "System Revenue", type: "amount" },
          { key: "clientRate", label: "Client Rate (%)", type: "text" },
          { key: "providerFee", label: "Provider Fee", type: "amount" },
          { key: "providerCost", label: "Provider Cost", type: "amount" },
          { key: "providerFeeRate", label: "Provider Fee (%)", type: "text" },
          { key: "netIncome", label: "NET INCOME", type: "metric" },
        ],
      },
      "Core Provider": {
        filterLabel: "Core Provider",
        placeholder: "Select core provider",
        firstColumnLabel: "Core Provider",
        filterOptions: [
          "All",
          "WALA88",
          "MARBLEF1",
          "HEO",
          "PAX",
          "AGVC",
          "CL023",
        ],
        rows: buildRepeatedRows(coreProviderBaseRows, 152, "core-provider"),
        columns: [
          { key: "label", label: "Core Provider", type: "text", sticky: true },
          { key: "numberOfBets", label: "Number of bets", type: "amount" },
          { key: "currency", label: "Currency", type: "text" },
          { key: "totalBetAmount", label: "Total Bet Amount", type: "amount" },
          {
            key: "totalBetWinLoss",
            label: "Total Bet WinLoss",
            type: "amount",
          },
          { key: "validBetAmount", label: "Valid Bet Amount", type: "amount" },
          { key: "profitLossGGR", label: "Profit/Loss (GGR)", type: "metric" },
          { key: "systemRevenue", label: "System Revenue", type: "amount" },
          { key: "clientRate", label: "Client Rate (%)", type: "text" },
          { key: "providerCost", label: "Provider Cost", type: "amount" },
          { key: "providerFeeRate", label: "Provider Fee (%)", type: "text" },
          { key: "netIncome", label: "NET INCOME", type: "metric" },
        ],
      },
      Provider: {
        filterLabel: "Provider",
        placeholder: "Select provider",
        firstColumnLabel: "Provider",
        filterOptions: [
          "All",
          "PG Soft",
          "Pragmatic Play",
          "JILI",
          "Habanero",
          "NetEnt",
        ],
        rows: buildRepeatedRows(providerBaseRows, 152, "provider"),
        columns: [
          { key: "label", label: "Provider", type: "text", sticky: true },
          { key: "numberOfBets", label: "Number of bets", type: "amount" },
          { key: "currency", label: "Currency", type: "text" },
          { key: "totalBetAmount", label: "Total Bet Amount", type: "amount" },
          {
            key: "totalBetWinLoss",
            label: "Total Bet WinLoss",
            type: "amount",
          },
          { key: "validBetAmount", label: "Valid Bet Amount", type: "amount" },
          { key: "profitLossGGR", label: "Profit/Loss (GGR)", type: "metric" },
          { key: "systemRevenue", label: "System Revenue", type: "amount" },
          { key: "clientRate", label: "Client Rate (%)", type: "text" },
          { key: "providerCost", label: "Provider Cost", type: "amount" },
          { key: "providerFeeRate", label: "Provider Fee (%)", type: "text" },
          { key: "netIncome", label: "NET INCOME", type: "metric" },
        ],
      },
      Game: {
        filterLabel: "Game",
        placeholder: "Select game",
        firstColumnLabel: "Game",
        filterOptions: ["All", "WALA88", "MARBLEF1", "HEO", "PAX", "AGVC"],
        rows: buildRepeatedRows(gameBaseRows, 152, "game"),
        columns: [
          { key: "label", label: "Game", type: "text", sticky: true },
          { key: "numberOfBets", label: "Number of bets", type: "amount" },
          { key: "currency", label: "Currency", type: "text" },
          { key: "totalBetAmount", label: "Total Bet Amount", type: "amount" },
          {
            key: "totalBetWinLoss",
            label: "Total Bet WinLoss",
            type: "amount",
          },
          { key: "validBetAmount", label: "Valid Bet Amount", type: "amount" },
          { key: "profitLossGGR", label: "Profit/Loss (GGR)", type: "metric" },
          { key: "systemRevenue", label: "System Revenue", type: "amount" },
          { key: "clientRate", label: "Client Rate (%)", type: "text" },
          { key: "providerCost", label: "Provider Cost", type: "amount" },
          { key: "providerFeeRate", label: "Provider Fee (%)", type: "text" },
          { key: "netIncome", label: "NET INCOME", type: "metric" },
        ],
      },
    };
  }, []);

  const currentConfig = viewConfigs[viewMode];
  const allRows = currentConfig.rows;
  const totalEntries = allRows.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);
  const currentRows = allRows.slice(startIndex, endIndex);
  const paginationItems = getPaginationItems(currentPage, totalPages);

  const stickyHeaderLeft =
    "sticky left-0 z-20 bg-slate-50 dark:bg-slate-900 shadow-[10px_0_14px_-12px_rgba(15,23,42,0.18)] dark:shadow-[10px_0_14px_-12px_rgba(2,6,23,0.45)]";
  const stickyCellLeft =
    "sticky left-0 z-10 bg-white dark:bg-slate-950 shadow-[10px_0_14px_-12px_rgba(15,23,42,0.18)] dark:shadow-[10px_0_14px_-12px_rgba(2,6,23,0.45)]";

  useEffect(() => {
    setFilterValue("All");
    setCurrentPage(1);
  }, [viewMode]);

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleEllipsisClick = (direction) => {
    if (direction === "left") {
      setCurrentPage((prev) => Math.max(prev - 3, 1));
    } else {
      setCurrentPage((prev) => Math.min(prev + 3, totalPages));
    }
  };

  const handleReset = () => {
    setCreatedAt({ start: null, end: null });
    setFilterValue("All");
    setRowsPerPage(10);
    setCurrentPage(1);
  };

  const renderCellValue = (row, column) => {
    const value = row[column.key];

    if (column.type === "metric") {
      return <MetricCell value={value} />;
    }

    if (column.type === "amount") {
      return <span className="whitespace-nowrap">{formatAmount(value)}</span>;
    }

    return <span className="whitespace-nowrap">{value}</span>;
  };

  return (
    <div className="overflow-hidden rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-cyan-500/30 dark:bg-slate-950">
      <div className="relative border-b border-cyan-300 bg-slate-50 px-5 py-5 dark:border-cyan-500/30 dark:bg-slate-900">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover opacity-15"
        />

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800 dark:text-white">
              Revenue Report &amp; Analytics
            </h1>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-4 text-sm font-semibold text-white shadow-sm">
              <Download className="h-4 w-4" />
              <span>Export Excel</span>
            </button>
          </div>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr]">
              <DateRangePickerInput
                label="Created at"
                value={createdAt}
                onChange={setCreatedAt}
              />

              <FilterSelect
                label={currentConfig.filterLabel}
                options={currentConfig.filterOptions}
                value={filterValue}
                onChange={setFilterValue}
                placeholder={currentConfig.placeholder}
              />
            </div>

            <div className="flex shrink-0 items-end gap-2">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <ViewModeTabs value={viewMode} onChange={setViewMode} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1500px] text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              {currentConfig.columns.map((column) => (
                <th
                  key={column.key}
                  className={`min-w-[110px] whitespace-nowrap px-4 py-4 font-semibold ${
                    column.sticky ? stickyHeaderLeft : ""
                  }`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row) => (
              <tr
                key={row.rowKey}
                className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                {currentConfig.columns.map((column) => (
                  <td
                    key={`${row.rowKey}-${column.key}`}
                    className={`px-4 py-3 ${
                      column.sticky ? stickyCellLeft : ""
                    }`}>
                    {renderCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:text-slate-500">
        <div className="flex items-center gap-2">
          <span>Showing data</span>

          <RowsPerPageSelect
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          />

          <span>
            {startIndex + 1} to {endIndex} of {totalEntries} entries
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 transition ${
              currentPage === 1
                ? "cursor-not-allowed text-slate-300 dark:text-slate-700"
                : "text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
            }`}>
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {paginationItems.map((item, index) => {
              if (item.type === "ellipsis") {
                return (
                  <button
                    key={`ellipsis-${item.direction}-${index}`}
                    type="button"
                    onClick={() => handleEllipsisClick(item.direction)}
                    className="rounded-lg px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200">
                    ...
                  </button>
                );
              }

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setCurrentPage(item.value)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 transition ${
                    currentPage === item.value
                      ? "bg-indigo-600 text-white"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}>
                  {item.value}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 transition ${
              currentPage === totalPages
                ? "cursor-not-allowed text-slate-300 dark:text-slate-700"
                : "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            }`}>
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RevenueReportAnalyticsPage;
