import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleOff,
  Pencil,
  Plus,
  Search,
} from "lucide-react";

const baseRows = [
  {
    id: "CLT-001",
    code: "ALP",
    name: "Alpha Games B2B",
    currency: "USD",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Enable",
  },
  {
    id: "CLT-002",
    code: "BET",
    name: "Beta Platform",
    currency: "VND",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Disable",
  },
  {
    id: "CLT-003",
    code: "ECO",
    name: "Crystal Hub",
    currency: "USD",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Disable",
  },
  {
    id: "CLT-004",
    code: "CRY",
    name: "Delta Entertainment",
    currency: "USD",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Enable",
  },
  {
    id: "CLT-005",
    code: "DEL",
    name: "Echo Online",
    currency: "USD",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Disable",
  },
  {
    id: "CLT-006",
    code: "ECO",
    name: "Foxtrat Media",
    currency: "USD",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Disable",
  },
  {
    id: "CLT-007",
    code: "FOX",
    name: "Galaxy Corp",
    currency: "EUR",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Disable",
  },
  {
    id: "CLT-008",
    code: "GAL",
    name: "t.Hexagon B2B",
    currency: "SGD",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Disable",
  },
  {
    id: "CLT-009",
    code: "HEX",
    name: "Galaxy Corp",
    currency: "THB",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    updatedAt: "03/10/2025 09:15",
    action: "Disable",
  },
];

const assignedGames = [
  {
    provider: "NeoPlay",
    category: "Slot",
    gameId: "G-001",
    gameName: "Space Invader",
    status: "Active",
    assignedDate: "2025-10-02",
  },
  {
    provider: "Cardify",
    category: "Live casino",
    gameId: "G-001",
    gameName: "Lucky Cards",
    status: "Inactive",
    assignedDate: "2025-10-02",
  },
  {
    provider: "Cardify",
    category: "Slot",
    gameId: "G-001",
    gameName: "Lucky Cards",
    status: "Inactive",
    assignedDate: "2025-10-02",
  },
  {
    provider: "Cardify",
    category: "Slot",
    gameId: "G-001",
    gameName: "Lucky Cards",
    status: "Inactive",
    assignedDate: "2025-10-02",
  },
];

const availableGames = [
  {
    provider: "PG Soft",
    category: "Slot",
    gameId: "G-021",
    gameName: "Golden Spin",
    status: "Active",
    assignedDate: "-",
  },
  {
    provider: "Pragmatic",
    category: "Live casino",
    gameId: "G-033",
    gameName: "Mega Roulette",
    status: "Active",
    assignedDate: "-",
  },
  {
    provider: "JILI",
    category: "Table",
    gameId: "G-041",
    gameName: "Blackjack Pro",
    status: "Inactive",
    assignedDate: "-",
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
    month: "short",
    day: "numeric",
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

function FilterSelect({
  label,
  options = ["All"],
  value,
  onChange,
  menuWidth = "w-full",
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
      {label ? (
        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
      ) : null}

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
          <div
            className={`absolute left-0 top-[calc(100%+8px)] z-50 ${menuWidth} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900`}>
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

function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex min-w-[76px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
          : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-300"
      }`}>
      {status}
    </span>
  );
}

function ActionButtons({ action }) {
  const enable = action === "Enable";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-500 dark:bg-amber-500/10 dark:text-amber-300">
        <Pencil className="h-3 w-3" />
        <span>Edit</span>
      </button>

      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
          enable
            ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-300"
            : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-300"
        }`}>
        {enable ? (
          <CheckCircle2 className="h-3 w-3" />
        ) : (
          <CircleOff className="h-3 w-3" />
        )}
        <span>{action}</span>
      </button>
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

function AssignedGamePanel({ activeTab, setActiveTab }) {
  const [provider, setProvider] = useState("All");
  const [category, setCategory] = useState("All");
  const [gameName, setGameName] = useState("");
  const [status, setStatus] = useState("Active");
  const [selectedRows, setSelectedRows] = useState([]);

  const data = activeTab === "assigned" ? assignedGames : availableGames;

  const toggleRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
  };

  return (
    <div className="bg-[#dfe9f7] px-6 py-6 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("assigned")}
          className={`relative pb-3 text-[15px] font-semibold ${
            activeTab === "assigned"
              ? "text-slate-800 dark:text-white"
              : "text-slate-500 dark:text-slate-400"
          }`}>
          Assigned Game List
          {activeTab === "assigned" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("available")}
          className={`relative pb-3 text-[15px] font-semibold ${
            activeTab === "available"
              ? "text-slate-800 dark:text-white"
              : "text-slate-500 dark:text-slate-400"
          }`}>
          Available Game List
          {activeTab === "available" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400" />
          )}
        </button>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-emerald-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-emerald-500/40 dark:bg-slate-950">
        <div className="border-b border-cyan-300 bg-slate-50 px-6 py-6 dark:border-cyan-500/30 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <FilterSelect
              label="Core Provider"
              options={["All", "NeoPlay", "Cardify", "PG Soft", "Pragmatic"]}
              value={provider}
              onChange={setProvider}
            />

            <FilterSelect
              label="Category"
              options={["All", "Slot", "Live casino", "Table"]}
              value={category}
              onChange={setCategory}
            />

            <FilterInput
              label="Game Name"
              placeholder="Search by Game Name"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />

            <FilterSelect
              label="Status"
              options={["All", "Active", "Inactive"]}
              value={status}
              onChange={setStatus}
            />

            <div className="flex items-end gap-2">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>

              <button
                type="button"
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="max-h-[220px] overflow-y-auto pr-2">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-700 dark:text-slate-200">
                  <th className="w-10 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === data.length && data.length > 0
                      }
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
                    />
                  </th>
                  <th className="py-3 font-semibold">Provider</th>
                  <th className="py-3 font-semibold">Category</th>
                  <th className="py-3 font-semibold">Game ID</th>
                  <th className="py-3 font-semibold">Game Name</th>
                  <th className="py-3 font-semibold">Client Status</th>
                  <th className="py-3 font-semibold">Assigned Date</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={`${row.gameId}-${index}`}
                    className="text-slate-700 dark:text-slate-300">
                    <td className="py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => toggleRow(index)}
                        className="h-4 w-4 rounded border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
                      />
                    </td>
                    <td className="py-3">{row.provider}</td>
                    <td className="py-3">{row.category}</td>
                    <td className="py-3">{row.gameId}</td>
                    <td className="py-3">{row.gameName}</td>
                    <td className="py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-3">{row.assignedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Selected: {selectedRows.length}
        </p>

        <button
          type="button"
          className="rounded-xl bg-emerald-200/70 px-6 py-3 text-sm font-semibold text-white dark:bg-emerald-500/30">
          {activeTab === "assigned" ? "Unassign" : "Assign"}
        </button>
      </div>
    </div>
  );
}

function ClientManagementPage() {
  const allRows = useMemo(() => {
    return Array.from({ length: 152 }, (_, index) => {
      const baseRow = baseRows[index % baseRows.length];
      const number = index + 1;

      return {
        ...baseRow,
        id: `CLT-${String(number).padStart(3, "0")}`,
      };
    });
  }, []);

  const [createdAt, setCreatedAt] = useState({
    start: null,
    end: null,
  });
  const [clientName, setClientName] = useState("");
  const [currency, setCurrency] = useState("All");
  const [status, setStatus] = useState("All");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [expandedClientId, setExpandedClientId] = useState(null);
  const [activeTab, setActiveTab] = useState("assigned");

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

  const handleToggleExpand = (clientId) => {
    if (expandedClientId === clientId) {
      setExpandedClientId(null);
    } else {
      setExpandedClientId(clientId);
      setActiveTab("assigned");
    }
  };

  return (
    <div className="overflow-hidden rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-cyan-500/30 dark:bg-slate-950">
      <div className="relative border-b border-cyan-300 bg-slate-50 px-5 py-5 dark:border-cyan-500/30 dark:bg-slate-900">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover opacity-35"
        />

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800 dark:text-white">
              View Client List
            </h1>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-4 text-sm font-semibold text-white shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Add new client</span>
            </button>
          </div>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1.05fr_1.15fr_1fr_1fr]">
              <DateRangePickerInput
                label="Created at"
                value={createdAt}
                onChange={setCreatedAt}
              />

              <FilterInput
                label="Search by client name"
                placeholder="Search by name/code"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />

              <FilterSelect
                label="Default Currency"
                options={["All", "USD", "VND", "EUR", "SGD", "THB"]}
                value={currency}
                onChange={setCurrency}
              />

              <FilterSelect
                label="Status"
                options={["All", "Active", "Inactive"]}
                value={status}
                onChange={setStatus}
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
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <th className="w-[160px] px-4 py-4 font-semibold">Client ID</th>
              <th className="px-4 py-4 font-semibold">Client Code</th>
              <th className="px-4 py-4 font-semibold">Client name</th>
              <th className="px-4 py-4 font-semibold">Default Currency</th>
              <th className="px-4 py-4 font-semibold">Status</th>
              <th className="px-4 py-4 font-semibold">Created Date</th>
              <th className="px-4 py-4 font-semibold">Last Updated</th>
              <th className="px-4 py-4 font-semibold">Action (Global)</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row) => {
              const isExpanded = expandedClientId === row.id;

              return (
                <Fragment key={row.id}>
                  <tr className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleExpand(row.id)}
                        className="inline-flex items-center gap-3 text-sky-500 transition hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300">
                        <ChevronRight
                          className={`h-5 w-5 transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                        <span className="font-medium">{row.id}</span>
                      </button>
                    </td>

                    <td className="px-4 py-3">{row.code}</td>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.currency}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3">{row.createdAt}</td>
                    <td className="px-4 py-3">{row.updatedAt}</td>
                    <td className="px-4 py-3">
                      <ActionButtons action={row.action} />
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td
                        colSpan={8}
                        className="border-t border-slate-200 p-0 dark:border-slate-800">
                        <AssignedGamePanel
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
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

export default ClientManagementPage;
