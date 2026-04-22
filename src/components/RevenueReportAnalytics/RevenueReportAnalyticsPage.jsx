import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const TAB_CONFIGS = {
  client: {
    id: "client",
    label: "Client",
    entityKey: "client",
    selectLabel: "Client",
    placeholder: "Select client",
  },
  coreProvider: {
    id: "coreProvider",
    label: "Core Provider",
    entityKey: "coreProvider",
    selectLabel: "Core Provider",
    placeholder: "Select core provider",
  },
  provider: {
    id: "provider",
    label: "Provider",
    entityKey: "provider",
    selectLabel: "Provider",
    placeholder: "Select provider",
  },
  game: {
    id: "game",
    label: "Game",
    entityKey: "game",
    selectLabel: "Game",
    placeholder: "Select game",
  },
};

function createEmptyDateRange() {
  return {
    startDate: null,
    endDate: null,
  };
}

function createEmptyFilterState() {
  return {
    client: {
      dateRange: createEmptyDateRange(),
      entity: "",
    },
    coreProvider: {
      dateRange: createEmptyDateRange(),
      entity: "",
    },
    provider: {
      dateRange: createEmptyDateRange(),
      entity: "",
    },
    game: {
      dateRange: createEmptyDateRange(),
      entity: "",
    },
  };
}

const baseRows = [
  {
    client: "CLT71",
    coreProvider: "WALA88",
    provider: "PG Soft",
    game: "WALA88",
    createdAt: "03/10/2025 09:15",
    numberOfBets: 1240,
    currency: "USD",
    totalBetAmount: 180000,
    totalBetWinLoss: 180000,
    validBetAmount: 175000,
    profitLoss: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerFee: 0,
    providerCost: 0,
    providerFeePercent: "-",
    netIncome: 0,
  },
  {
    client: "CLT73",
    coreProvider: "MARBLEF1",
    provider: "Evolution",
    game: "MARBLEF1",
    createdAt: "05/10/2025 10:20",
    numberOfBets: 532,
    currency: "USD",
    totalBetAmount: 92000,
    totalBetWinLoss: 92000,
    validBetAmount: 91000,
    profitLoss: -1200,
    systemRevenue: -240,
    clientRate: "20%",
    providerFee: -132,
    providerCost: -132,
    providerFeePercent: "11%",
    netIncome: -108,
  },
  {
    client: "CLT73",
    coreProvider: "HEO",
    provider: "JILI",
    game: "HEO",
    createdAt: "08/10/2025 11:05",
    numberOfBets: 90,
    currency: "USD",
    totalBetAmount: 5000,
    totalBetWinLoss: 5000,
    validBetAmount: 5000,
    profitLoss: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerFee: 0,
    providerCost: 0,
    providerFeePercent: "-",
    netIncome: 0,
  },
  {
    client: "AABB88",
    coreProvider: "PAX",
    provider: "Pragmatic Play",
    game: "PAX",
    createdAt: "10/10/2025 14:30",
    numberOfBets: 760,
    currency: "USD",
    totalBetAmount: 120000,
    totalBetWinLoss: 120000,
    validBetAmount: 118000,
    profitLoss: 4200,
    systemRevenue: 840,
    clientRate: "20%",
    providerFee: 462,
    providerCost: 462,
    providerFeePercent: "11%",
    netIncome: 378,
  },
  {
    client: "HD007",
    coreProvider: "AGVC",
    provider: "Habanero",
    game: "AGVC",
    createdAt: "12/10/2025 08:45",
    numberOfBets: 310,
    currency: "EUR",
    totalBetAmount: 45000,
    totalBetWinLoss: 45000,
    validBetAmount: 44200,
    profitLoss: 650,
    systemRevenue: 130,
    clientRate: "20%",
    providerFee: 71,
    providerCost: 71,
    providerFeePercent: "11%",
    netIncome: 58,
  },
  {
    client: "CL023",
    coreProvider: "CL023",
    provider: "NetEnt",
    game: "CL023",
    createdAt: "15/10/2025 09:40",
    numberOfBets: 980,
    currency: "USD",
    totalBetAmount: 210000,
    totalBetWinLoss: 210000,
    validBetAmount: 204000,
    profitLoss: 9300,
    systemRevenue: 1860,
    clientRate: "20%",
    providerFee: 1023,
    providerCost: 1023,
    providerFeePercent: "11%",
    netIncome: 837,
  },
  {
    client: "TG200",
    coreProvider: "TG200",
    provider: "SBO Sports",
    game: "TG200",
    createdAt: "18/10/2025 13:10",
    numberOfBets: 420,
    currency: "VND",
    totalBetAmount: 65000,
    totalBetWinLoss: 65000,
    validBetAmount: 63500,
    profitLoss: -1800,
    systemRevenue: -360,
    clientRate: "20%",
    providerFee: -198,
    providerCost: -198,
    providerFeePercent: "11%",
    netIncome: -162,
  },
  {
    client: "RD025",
    coreProvider: "MARBLEF1",
    provider: "KA Gaming",
    game: "RD025",
    createdAt: "20/10/2025 15:00",
    numberOfBets: 1500,
    currency: "VND",
    totalBetAmount: 300000,
    totalBetWinLoss: 300000,
    validBetAmount: 292000,
    profitLoss: 0,
    systemRevenue: 0,
    clientRate: "-",
    providerFee: 0,
    providerCost: 0,
    providerFeePercent: "-",
    netIncome: 0,
  },
  {
    client: "CP026",
    coreProvider: "HEO",
    provider: "LottX",
    game: "CP026",
    createdAt: "25/10/2025 16:25",
    numberOfBets: 660,
    currency: "USD",
    totalBetAmount: 98000,
    totalBetWinLoss: 98000,
    validBetAmount: 95800,
    profitLoss: 3200,
    systemRevenue: 640,
    clientRate: "20%",
    providerFee: 352,
    providerCost: 352,
    providerFeePercent: "11%",
    netIncome: 288,
  },
];

function buildRows(total = 152) {
  return Array.from({ length: total }, (_, index) => {
    const item = baseRows[index % baseRows.length];
    const day = String((index % 28) + 1).padStart(2, "0");
    const month = index % 3 === 0 ? "10" : index % 3 === 1 ? "11" : "12";
    const hour = String(9 + (index % 8)).padStart(2, "0");
    const minute = String(10 + (index % 40)).padStart(2, "0");

    return {
      ...item,
      createdAt: `${day}/${month}/2025 ${hour}:${minute}`,
    };
  });
}

function parseTableDate(dateTimeString) {
  if (!dateTimeString) return null;

  const [datePart] = dateTimeString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);

  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

function formatDateLabel(date) {
  const d = date instanceof Date ? date : new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

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

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return startOfDay(d);
}

function endOfWeek(date) {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  return endOfDay(d);
}

function startOfMonth(date) {
  return startOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
}

function endOfMonth(date) {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

function isSameDay(a, b) {
  if (!a || !b) return false;

  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function isDateInRange(date, start, end) {
  if (!start || !end) return false;
  return date >= startOfDay(start) && date <= endOfDay(end);
}

function getMonthMatrix(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const startDate = new Date(year, month, 1 - firstWeekday);

  return Array.from({ length: 6 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + weekIndex * 7 + dayIndex);

      return {
        date,
        isCurrentMonth: date.getMonth() === month,
      };
    }),
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatNumber(value) {
  if (typeof value !== "number") return value;
  return value.toLocaleString();
}

function getTabColumns(activeTab) {
  const firstLabel =
    activeTab === "client"
      ? "Client"
      : activeTab === "coreProvider"
        ? "Core Provider"
        : activeTab === "provider"
          ? "Provider"
          : "Game";

  return [
    {
      key: TAB_CONFIGS[activeTab].entityKey,
      label: firstLabel,
      type: "text",
      sticky: true,
      minWidth: "min-w-[180px]",
    },
    { key: "numberOfBets", label: "Number of bets", type: "number" },
    { key: "currency", label: "Currency", type: "text" },
    { key: "totalBetAmount", label: "Total Bet Amount", type: "number" },
    { key: "totalBetWinLoss", label: "Total Bet WinLoss", type: "number" },
    { key: "validBetAmount", label: "Valid Bet Amount", type: "number" },
    { key: "profitLoss", label: "Profit/Loss (GGR)", type: "delta" },
    { key: "systemRevenue", label: "System Revenue", type: "delta" },
    { key: "clientRate", label: "Client Rate (%)", type: "text" },
    { key: "providerFee", label: "Provider Fee", type: "delta" },
    { key: "providerCost", label: "Provider Cost", type: "delta" },
    { key: "providerFeePercent", label: "Provider Fee (%)", type: "text" },
    { key: "netIncome", label: "NET INCOME", type: "delta" },
  ];
}

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
      {children}
    </label>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-transparent bg-linear-to-r from-cyan-400 to-emerald-400 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}>
      {children}
    </button>
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
        className={`flex h-9 min-w-[66px] items-center justify-between rounded-xl border bg-white px-3 text-sm text-slate-700 transition ${
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
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-[140] min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900">
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

function CalendarMonthGrid({
  monthDate,
  startDate,
  endDate,
  hoverDate,
  onDayClick,
  onDayHover,
}) {
  const matrix = getMonthMatrix(monthDate);
  const previewEnd = startDate && !endDate && hoverDate ? hoverDate : endDate;

  return (
    <div className="w-full px-6 py-5">
      <div className="mb-3 grid grid-cols-7 gap-y-2 text-center text-sm text-slate-400 dark:text-slate-500">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {matrix.flat().map(({ date, isCurrentMonth }) => {
          const selectedStart = startDate && isSameDay(date, startDate);
          const selectedEnd = endDate && isSameDay(date, endDate);

          const rangeStart =
            startDate && previewEnd
              ? startDate < previewEnd
                ? startDate
                : previewEnd
              : null;

          const rangeEnd =
            startDate && previewEnd
              ? startDate < previewEnd
                ? previewEnd
                : startDate
              : null;

          const inRange =
            rangeStart && rangeEnd && isDateInRange(date, rangeStart, rangeEnd);

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onDayClick(date)}
              onMouseEnter={() => onDayHover(date)}
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-[15px] transition ${
                !isCurrentMonth
                  ? "text-slate-300 dark:text-slate-600"
                  : "text-slate-800 dark:text-slate-100"
              } ${
                inRange && !selectedStart && !selectedEnd
                  ? "bg-emerald-100/70 dark:bg-emerald-500/15"
                  : ""
              } ${
                selectedStart || selectedEnd
                  ? "bg-linear-to-r from-cyan-400 to-emerald-400 text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}>
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ControlledDateRangePicker({
  label,
  value,
  isOpen,
  onToggle,
  onClose,
  onChange,
}) {
  const wrapperRef = useRef(null);
  const [tempStart, setTempStart] = useState(value.startDate || null);
  const [tempEnd, setTempEnd] = useState(value.endDate || null);
  const [hoverDate, setHoverDate] = useState(null);
  const [leftMonth, setLeftMonth] = useState(() => {
    const base = value.startDate || new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  useEffect(() => {
    if (isOpen) {
      setTempStart(value.startDate || null);
      setTempEnd(value.endDate || null);
      setHoverDate(null);

      const base = value.startDate || new Date();
      setLeftMonth(new Date(base.getFullYear(), base.getMonth(), 1));
    }
  }, [isOpen, value.startDate, value.endDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !wrapperRef.current?.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const displayValue = useMemo(() => {
    if (value.startDate && value.endDate) {
      return `${formatDateLabel(value.startDate)} - ${formatDateLabel(
        value.endDate,
      )}`;
    }

    if (value.startDate) {
      return `${formatDateLabel(value.startDate)} - ...`;
    }

    return "";
  }, [value]);

  const applyPreset = (preset) => {
    const now = new Date();
    let start = null;
    let end = null;

    if (preset === "Today") {
      start = startOfDay(now);
      end = endOfDay(now);
    } else if (preset === "Yesterday") {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      start = startOfDay(y);
      end = endOfDay(y);
    } else if (preset === "This Week") {
      start = startOfWeek(now);
      end = endOfWeek(now);
    } else if (preset === "Last Week") {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      start = startOfWeek(d);
      end = endOfWeek(d);
    } else if (preset === "This Month") {
      start = startOfMonth(now);
      end = endOfMonth(now);
    } else if (preset === "Last Month") {
      const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      start = startOfMonth(d);
      end = endOfMonth(d);
    }

    setTempStart(start);
    setTempEnd(end);
    setHoverDate(null);

    if (start) {
      setLeftMonth(new Date(start.getFullYear(), start.getMonth(), 1));
    }
  };

  const handleDayClick = (date) => {
    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(startOfDay(date));
      setTempEnd(null);
      setHoverDate(null);
      return;
    }

    if (date < tempStart) {
      setTempEnd(endOfDay(tempStart));
      setTempStart(startOfDay(date));
      return;
    }

    setTempEnd(endOfDay(date));
  };

  const handleApply = () => {
    onChange({
      startDate: tempStart,
      endDate: tempEnd,
    });
    onClose();
  };

  const handleClear = () => {
    setTempStart(null);
    setTempEnd(null);
    setHoverDate(null);

    onChange({
      startDate: null,
      endDate: null,
    });

    onClose();
  };

  const rightMonth = new Date(
    leftMonth.getFullYear(),
    leftMonth.getMonth() + 1,
    1,
  );

  return (
    <div className="relative min-w-0" ref={wrapperRef}>
      <FieldLabel>{label}</FieldLabel>

      <button
        type="button"
        onClick={onToggle}
        className={`flex h-11 w-full items-center justify-between rounded-xl border px-4 text-sm transition-all ${
          isOpen
            ? "border-cyan-300 bg-white ring-2 ring-cyan-100 dark:border-cyan-400 dark:bg-slate-800 dark:ring-cyan-500/20"
            : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
        }`}>
        <span
          className={`truncate ${
            displayValue
              ? "text-slate-700 dark:text-slate-100"
              : "text-slate-300 dark:text-slate-500"
          }`}>
          {displayValue || "Select date range"}
        </span>

        <CalendarDays className="ml-3 h-4 w-4 shrink-0 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-[300] grid w-[930px] grid-cols-[170px_1fr] items-stretch overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.20)] dark:border-slate-700 dark:bg-slate-900">
          <div className="min-h-[478px] border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-700 dark:bg-slate-900">
            {[
              "Today",
              "Yesterday",
              "This Week",
              "Last Week",
              "This Month",
              "Last Month",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => applyPreset(item)}
                className="block w-full rounded-lg px-3 py-3 text-left text-[15px] text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                {item}
              </button>
            ))}
          </div>

          <div className="flex min-h-[478px] flex-col bg-white dark:bg-slate-900">
            <div className="grid grid-cols-[72px_1fr_1fr_72px] items-center border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center py-3">
                <button
                  type="button"
                  onClick={() =>
                    setLeftMonth(
                      new Date(
                        leftMonth.getFullYear(),
                        leftMonth.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>

              <div className="border-r border-slate-200 py-4 text-center text-[18px] font-bold text-slate-800 dark:border-slate-700 dark:text-white">
                {leftMonth.toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <div className="py-4 text-center text-[18px] font-bold text-slate-800 dark:text-white">
                {rightMonth.toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <div className="flex items-center justify-center py-3">
                <button
                  type="button"
                  onClick={() =>
                    setLeftMonth(
                      new Date(
                        leftMonth.getFullYear(),
                        leftMonth.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 bg-white dark:bg-slate-900">
              <div className="border-r border-slate-200 dark:border-slate-700">
                <CalendarMonthGrid
                  monthDate={leftMonth}
                  startDate={tempStart}
                  endDate={tempEnd}
                  hoverDate={hoverDate}
                  onDayClick={handleDayClick}
                  onDayHover={setHoverDate}
                />
              </div>

              <CalendarMonthGrid
                monthDate={rightMonth}
                startDate={tempStart}
                endDate={tempEnd}
                hoverDate={hoverDate}
                onDayClick={handleDayClick}
                onDayHover={setHoverDate}
              />
            </div>

            <div className="mt-auto flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={handleClear}
                className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                Clear
              </button>

              <button
                type="button"
                onClick={handleApply}
                className="h-10 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ControlledEntitySelect({
  label,
  value,
  options,
  placeholder,
  isOpen,
  onToggle,
  onClose,
  onChange,
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !wrapperRef.current?.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="relative min-w-0" ref={wrapperRef}>
      <FieldLabel>{label}</FieldLabel>

      <button
        type="button"
        onClick={onToggle}
        className={`flex h-11 w-full items-center justify-between rounded-xl border px-4 text-sm transition-all ${
          isOpen
            ? "border-cyan-300 bg-white ring-2 ring-cyan-100 dark:border-cyan-400 dark:bg-slate-800 dark:ring-cyan-500/20"
            : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
        }`}>
        <span
          className={`truncate ${
            value
              ? "text-slate-700 dark:text-slate-100"
              : "text-slate-300 dark:text-slate-500"
          }`}>
          {value || placeholder}
        </span>

        <ChevronDown
          className={`ml-3 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-[290] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900">
          <div className="max-h-[320px] overflow-y-auto py-2">
            <button
              type="button"
              onClick={() => {
                onChange("");
                onClose();
              }}
              className={`block w-full px-4 py-3 text-left text-sm transition ${
                !value
                  ? "bg-cyan-50 font-semibold text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300"
                  : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}>
              {placeholder}
            </button>

            {options.map((option) => {
              const selected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    onClose();
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "bg-cyan-50 font-semibold text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}>
                  <span>{option}</span>
                  {selected && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function DeltaCell({ value }) {
  if (typeof value !== "number") {
    return <span className="text-slate-700 dark:text-slate-200">{value}</span>;
  }

  if (value > 0) {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-300">
        <span>{formatNumber(value)}</span>
        <TrendingUp className="h-3.5 w-3.5" />
      </span>
    );
  }

  if (value < 0) {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-red-500 dark:text-red-300">
        <span>{formatNumber(value)}</span>
        <TrendingDown className="h-3.5 w-3.5" />
      </span>
    );
  }

  return <span className="text-slate-700 dark:text-slate-200">0</span>;
}

function RevenueReportAnalyticsPage() {
  const rowsByTab = useMemo(() => {
    const allRows = buildRows(152);

    return {
      client: allRows,
      coreProvider: allRows,
      provider: allRows,
      game: allRows,
    };
  }, []);

  const [activeTab, setActiveTab] = useState("client");
  const [draftFilters, setDraftFilters] = useState(createEmptyFilterState);
  const [appliedFilters, setAppliedFilters] = useState(createEmptyFilterState);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopover, setOpenPopover] = useState(null);

  const activeConfig = TAB_CONFIGS[activeTab];
  const activeDraft = draftFilters[activeTab];
  const activeApplied = appliedFilters[activeTab];
  const currentDataset = rowsByTab[activeTab] || [];
  const columns = getTabColumns(activeTab);

  const entityOptions = useMemo(() => {
    const values = [
      ...new Set(currentDataset.map((row) => row[activeConfig.entityKey])),
    ];
    return values.sort((a, b) => String(a).localeCompare(String(b)));
  }, [currentDataset, activeConfig.entityKey]);

  const filteredRows = useMemo(() => {
    return currentDataset.filter((row) => {
      const selectedEntity = activeApplied.entity;
      const dateRange = activeApplied.dateRange;

      const entityMatch =
        !selectedEntity || row[activeConfig.entityKey] === selectedEntity;

      const rowDate = parseTableDate(row.createdAt);
      const startDate = dateRange.startDate;
      const endDate = dateRange.endDate;

      let dateMatch = true;

      if (startDate && rowDate) {
        dateMatch = rowDate >= startOfDay(startDate);
      }

      if (dateMatch && endDate && rowDate) {
        dateMatch = rowDate <= endOfDay(endDate);
      }

      return entityMatch && dateMatch;
    });
  }, [currentDataset, activeApplied, activeConfig.entityKey]);

  const totalEntries = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);
  const currentRows = filteredRows.slice(startIndex, endIndex);
  const paginationItems = getPaginationItems(safeCurrentPage, totalPages);

  useEffect(() => {
    setCurrentPage(1);
    setOpenPopover(null);
  }, [activeTab]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const updateDraftFilter = (key, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [key]: value,
      },
    }));
  };

  const handleSearch = () => {
    setAppliedFilters((prev) => ({
      ...prev,
      [activeTab]: {
        dateRange: {
          startDate: activeDraft.dateRange.startDate,
          endDate: activeDraft.dateRange.endDate,
        },
        entity: activeDraft.entity,
      },
    }));

    setCurrentPage(1);
    setOpenPopover(null);
  };

  const handleReset = () => {
    const resetValue = {
      dateRange: createEmptyDateRange(),
      entity: "",
    };

    setDraftFilters((prev) => ({
      ...prev,
      [activeTab]: resetValue,
    }));

    setAppliedFilters((prev) => ({
      ...prev,
      [activeTab]: resetValue,
    }));

    setRowsPerPage(10);
    setCurrentPage(1);
    setOpenPopover(null);
  };

  const handleExportExcel = () => {
    const headers = columns.map((column) => column.label);

    const tableRows = filteredRows
      .map((row) => {
        const cells = columns
          .map((column) => {
            const rawValue = row[column.key];
            const displayValue =
              typeof rawValue === "number" ? formatNumber(rawValue) : rawValue;

            return `<td>${escapeHtml(displayValue)}</td>`;
          })
          .join("");

        return `<tr>${cells}</tr>`;
      })
      .join("");

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="UTF-8" />
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #cbd5e1; padding: 8px; font-family: Arial, sans-serif; font-size: 12px; }
            th { background: #e2e8f0; font-weight: bold; text-align: left; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([html], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replaceAll(":", "-");

    link.href = url;
    link.download = `revenue-report-${activeTab}-${timestamp}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

  return (
    <div className="overflow-visible rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-cyan-500/30 dark:bg-slate-950">
      <div className="relative z-[50] border-b border-cyan-300 bg-slate-50 px-5 py-5 dark:border-cyan-500/30 dark:bg-slate-900">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover object-right opacity-15 dark:opacity-10"
        />

        <div className="relative z-[60]">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800 dark:text-white">
              Revenue Report & Analytics
            </h1>

            <button
              type="button"
              onClick={handleExportExcel}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
              <Download className="h-4 w-4" />
              <span>Export Excel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_auto]">
            <ControlledDateRangePicker
              label="Created at"
              value={activeDraft.dateRange}
              isOpen={openPopover === "date"}
              onToggle={() =>
                setOpenPopover((prev) => (prev === "date" ? null : "date"))
              }
              onClose={() => setOpenPopover(null)}
              onChange={(value) => updateDraftFilter("dateRange", value)}
            />

            <ControlledEntitySelect
              label={activeConfig.selectLabel}
              value={activeDraft.entity}
              options={entityOptions}
              placeholder={activeConfig.placeholder}
              isOpen={openPopover === "entity"}
              onToggle={() =>
                setOpenPopover((prev) => (prev === "entity" ? null : "entity"))
              }
              onClose={() => setOpenPopover(null)}
              onChange={(value) => updateDraftFilter("entity", value)}
            />

            <div className="flex items-end">
              <div className="flex w-full flex-wrap items-center gap-3 xl:w-auto xl:flex-nowrap">
                <button
                  type="button"
                  onClick={handleSearch}
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

      <div className="relative z-[20] border-b border-slate-100 px-5 py-5 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            View Mode:
          </span>

          {Object.values(TAB_CONFIGS).map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </TabButton>
          ))}
        </div>
      </div>

      <div className="relative z-0 isolate overflow-x-auto">
        <table className="min-w-[1800px] text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              {columns.map((column, index) => {
                const isSticky = index === 0;

                return (
                  <th
                    key={column.key}
                    className={`whitespace-nowrap px-4 py-4 font-semibold ${
                      column.minWidth || ""
                    } ${
                      isSticky
                        ? "sticky left-0 z-10 bg-slate-50 shadow-[8px_0_12px_-10px_rgba(15,23,42,0.18)] dark:bg-slate-900"
                        : ""
                    }`}>
                    {column.label}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr
                key={`${activeTab}-${row[activeConfig.entityKey]}-${rowIndex}`}
                className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                {columns.map((column, colIndex) => {
                  const value = row[column.key];
                  const isSticky = colIndex === 0;

                  return (
                    <td
                      key={column.key}
                      className={`whitespace-nowrap px-4 py-4 ${
                        column.minWidth || ""
                      } ${
                        isSticky
                          ? "sticky left-0 z-[5] bg-white shadow-[8px_0_12px_-10px_rgba(15,23,42,0.15)] dark:bg-slate-950"
                          : ""
                      }`}>
                      {column.type === "delta" ? (
                        <DeltaCell value={value} />
                      ) : column.type === "number" ? (
                        formatNumber(value)
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                  No matching data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="relative z-[10] flex flex-col gap-4 border-t border-slate-100 px-5 py-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:text-slate-500">
        <div className="flex items-center gap-2">
          <span>Showing data</span>

          <RowsPerPageSelect
            value={rowsPerPage}
            onChange={(value) => {
              setRowsPerPage(value);
              setCurrentPage(1);
            }}
          />

          <span>
            {totalEntries === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
            {totalEntries} entries
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={safeCurrentPage === 1}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 transition ${
              safeCurrentPage === 1
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
                    safeCurrentPage === item.value
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
            disabled={safeCurrentPage === totalPages}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 transition ${
              safeCurrentPage === totalPages
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
