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
  Eye,
  Search,
} from "lucide-react";

const baseRows = [
  {
    id: "TRS-009",
    clientName: "Client A",
    providerName: "WALA SUB 1",
    gameName: "WALA88",
    gameType: "Live Casino",
    betAmount: 1000,
    winLoss: 0,
    profitLoss: "GGR",
    netIncome: 0,
    clientRate: "-",
    providerCostValue: 0,
    providerCostCode1: "PVD-001",
    providerCostCode2: "PVD-001",
    status: "Success",
    type: "Promo",
  },
  {
    id: "TRS-008",
    clientName: "Client B",
    providerName: "MARBLEF1 TEST",
    gameName: "MARBLEF1",
    gameType: "Lottery",
    betAmount: 1000,
    winLoss: 800,
    profitLoss: "GGR",
    netIncome: -108,
    clientRate: "20%",
    providerCostValue: -132,
    providerCostCode1: "PVD-002",
    providerCostCode2: "PVD-002",
    status: "Canceled",
    type: "Normal",
  },
  {
    id: "TRS-007",
    clientName: "Client C",
    providerName: "HEO PIANO",
    gameName: "HEO",
    gameType: "Slot",
    betAmount: 1000,
    winLoss: 800,
    profitLoss: "GGR",
    netIncome: 0,
    clientRate: "-",
    providerCostValue: 0,
    providerCostCode1: "PVD-003",
    providerCostCode2: "PVD-003",
    status: "Success",
    type: "Normal",
  },
  {
    id: "TRS-006",
    clientName: "Client D",
    providerName: "PAX HD2",
    gameName: "PAX",
    gameType: "Live Casino",
    betAmount: 1000,
    winLoss: -200,
    profitLoss: 840,
    netIncome: 378,
    clientRate: "20%",
    providerCostValue: 462,
    providerCostCode1: "PVD-004",
    providerCostCode2: "PVD-004",
    status: "Success",
    type: "Normal",
  },
  {
    id: "TRS-005",
    clientName: "Client E",
    providerName: "AGVC MOONLIGHT",
    gameName: "AGVC",
    gameType: "Live Casino",
    betAmount: 1000,
    winLoss: 200,
    profitLoss: 130,
    netIncome: 58,
    clientRate: "20%",
    providerCostValue: 71,
    providerCostCode1: "PVD-005",
    providerCostCode2: "PVD-005",
    status: "Processing",
    type: "Promo",
  },
  {
    id: "TRS-004",
    clientName: "Client F",
    providerName: "PAX H1",
    gameName: "CL023",
    gameType: "Lottery",
    betAmount: 800,
    winLoss: 0,
    profitLoss: 1860,
    netIncome: 837,
    clientRate: "20%",
    providerCostValue: 1023,
    providerCostCode1: "PVD-006",
    providerCostCode2: "PVD-006",
    status: "Canceled",
    type: "Normal",
  },
  {
    id: "TRS-003",
    clientName: "Client G",
    providerName: "WALA88",
    gameName: "WALA88",
    gameType: "Slot",
    betAmount: 800,
    winLoss: 0,
    profitLoss: -360,
    netIncome: -162,
    clientRate: "20%",
    providerCostValue: -198,
    providerCostCode1: "PVD-007",
    providerCostCode2: "PVD-007",
    status: "Success",
    type: "Promo",
  },
  {
    id: "TRS-002",
    clientName: "Client H",
    providerName: "MARBLEF1 GUITAR",
    gameName: "MARBLEF1",
    gameType: "Live Casino",
    betAmount: 1000,
    winLoss: -200,
    profitLoss: 0,
    netIncome: 0,
    clientRate: "-",
    providerCostValue: 0,
    providerCostCode1: "PVD-008",
    providerCostCode2: "PVD-008",
    status: "Canceled",
    type: "Normal",
  },
  {
    id: "TRS-001",
    clientName: "Client I",
    providerName: "HEO GAMER",
    gameName: "HEO",
    gameType: "Live Casino",
    betAmount: 1000,
    winLoss: -200,
    profitLoss: 640,
    netIncome: 288,
    clientRate: "20%",
    providerCostValue: 352,
    providerCostCode1: "PVD-009",
    providerCostCode2: "PVD-009",
    status: "Canceled",
    type: "Normal",
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
                    className="rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-white">
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

function FilterInput({ label, placeholder, value, onChange }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
      />
    </div>
  );
}

function FilterSelect({ label, options = ["All"], value, onChange }) {
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
          <span className="truncate text-slate-700 dark:text-slate-100">
            {value}
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

function StatusBadge({ status }) {
  if (status === "Success") {
    return (
      <span className="inline-flex min-w-[88px] items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
        Success
      </span>
    );
  }

  if (status === "Processing") {
    return (
      <span className="inline-flex min-w-[88px] items-center justify-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
        Processing
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-[88px] items-center justify-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 dark:bg-red-500/10 dark:text-red-300">
      Canceled
    </span>
  );
}

function TypeBadge({ type }) {
  if (type === "Promo") {
    return (
      <span className="inline-flex min-w-[72px] items-center justify-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-300">
        Promo
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-[72px] items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
      Normal
    </span>
  );
}

function ValueCell({ value }) {
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

function ActionButtons() {
  return (
    <button
      type="button"
      className="inline-flex min-w-[78px] items-center justify-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-500 dark:bg-amber-500/10 dark:text-amber-300">
      <Eye className="h-3 w-3" />
      <span>View</span>
    </button>
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

function BetManagementPage() {
  const allRows = useMemo(() => {
    return Array.from({ length: 152 }, (_, index) => {
      const source = baseRows[index % baseRows.length];
      const number = 152 - index;

      return {
        ...source,
        id: `TRS-${String(number).padStart(3, "0")}`,
      };
    });
  }, []);

  const [betTime, setBetTime] = useState({
    start: null,
    end: null,
  });
  const [transId, setTransId] = useState("");
  const [clientName, setClientName] = useState("");
  const [providerName, setProviderName] = useState("");
  const [gameName, setGameName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [status, setStatus] = useState("All");
  const [currency, setCurrency] = useState("All");
  const [gameType, setGameType] = useState("All");
  const [type, setType] = useState("All");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalEntries = allRows.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);
  const currentRows = allRows.slice(startIndex, endIndex);

  const paginationItems = getPaginationItems(currentPage, totalPages);

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
    setBetTime({ start: null, end: null });
    setTransId("");
    setClientName("");
    setProviderName("");
    setGameName("");
    setPlayerName("");
    setStatus("All");
    setCurrency("All");
    setGameType("All");
    setType("All");
    setRowsPerPage(10);
    setCurrentPage(1);
  };

  const stickyBaseHeader = "sticky z-20 bg-slate-50 dark:bg-slate-900";
  const stickyBaseCell = "sticky z-10 bg-white dark:bg-slate-950";
  const stickyShadow =
    "shadow-[-10px_0_14px_-12px_rgba(15,23,42,0.18)] dark:shadow-[-10px_0_14px_-12px_rgba(2,6,23,0.45)]";

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
              Bet Management
            </h1>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-4 text-sm font-semibold text-white shadow-sm">
              <Download className="h-4 w-4" />
              <span>Export Excel</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
              <DateRangePickerInput
                label="Bet Time"
                value={betTime}
                onChange={setBetTime}
              />

              <FilterInput
                label="Trans Id"
                placeholder="Enter Trans Id"
                value={transId}
                onChange={(e) => setTransId(e.target.value)}
              />

              <FilterInput
                label="Client Name"
                placeholder="Enter Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />

              <FilterInput
                label="Provider Name"
                placeholder="Enter Provider Name"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              />

              <FilterInput
                label="Game Name"
                placeholder="Enter Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />

              <FilterInput
                label="Player Name"
                placeholder="Enter Player Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
              <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr]">
                <FilterSelect
                  label="Status"
                  options={["All", "Success", "Canceled", "Processing"]}
                  value={status}
                  onChange={setStatus}
                />

                <FilterSelect
                  label="Currency"
                  options={["All", "USD", "VND", "EUR"]}
                  value={currency}
                  onChange={setCurrency}
                />

                <FilterSelect
                  label="Game Type"
                  options={["All", "Live Casino", "Lottery", "Slot"]}
                  value={gameType}
                  onChange={setGameType}
                />

                <FilterSelect
                  label="Type"
                  options={["All", "Promo", "Normal"]}
                  value={type}
                  onChange={setType}
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
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1880px] text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <th className="min-w-[90px] whitespace-nowrap px-4 py-4 font-semibold">
                Trans ID
              </th>
              <th className="min-w-[110px] whitespace-nowrap px-4 py-4 font-semibold">
                Client Name
              </th>
              <th className="min-w-[170px] whitespace-nowrap px-4 py-4 font-semibold">
                Provider Name
              </th>
              <th className="min-w-[120px] whitespace-nowrap px-4 py-4 font-semibold">
                Game Name
              </th>
              <th className="min-w-[110px] whitespace-nowrap px-4 py-4 font-semibold">
                Game Type
              </th>
              <th className="min-w-[95px] whitespace-nowrap px-4 py-4 font-semibold">
                Bet Amount
              </th>
              <th className="min-w-[130px] whitespace-nowrap px-4 py-4 font-semibold">
                Win/Loss Amount
              </th>
              <th className="min-w-[110px] whitespace-nowrap px-4 py-4 font-semibold">
                Profit/Loss
              </th>
              <th className="min-w-[110px] whitespace-nowrap px-4 py-4 font-semibold">
                NET INCOME
              </th>
              <th className="min-w-[120px] whitespace-nowrap px-4 py-4 font-semibold">
                Client Rate (%)
              </th>
              <th className="min-w-[110px] whitespace-nowrap px-4 py-4 font-semibold">
                Provider Cost
              </th>
              <th className="min-w-[110px] whitespace-nowrap px-4 py-4 font-semibold">
                Provider Cost
              </th>
              <th className="min-w-[110px] whitespace-nowrap px-4 py-4 font-semibold">
                Provider Cost
              </th>

              <th
                className={`${stickyBaseHeader} ${stickyShadow} right-[190px] min-w-[120px] whitespace-nowrap px-4 py-4 font-semibold`}>
                Status
              </th>
              <th
                className={`${stickyBaseHeader} right-[100px] min-w-[90px] whitespace-nowrap px-4 py-4 font-semibold`}>
                Type
              </th>
              <th
                className={`${stickyBaseHeader} right-0 min-w-[100px] whitespace-nowrap px-4 py-4 font-semibold`}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.clientName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.providerName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.gameName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.gameType}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {formatAmount(row.betAmount)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  <ValueCell value={row.winLoss} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.profitLoss}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  <ValueCell value={row.netIncome} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.clientRate}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {formatAmount(row.providerCostValue)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.providerCostCode1}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  {row.providerCostCode2}
                </td>

                <td
                  className={`${stickyBaseCell} ${stickyShadow} right-[190px] whitespace-nowrap px-4 py-3 align-middle`}>
                  <StatusBadge status={row.status} />
                </td>
                <td
                  className={`${stickyBaseCell} right-[100px] whitespace-nowrap px-4 py-3 align-middle`}>
                  <TypeBadge type={row.type} />
                </td>
                <td
                  className={`${stickyBaseCell} right-0 whitespace-nowrap px-4 py-3 align-middle`}>
                  <ActionButtons />
                </td>
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

export default BetManagementPage;
