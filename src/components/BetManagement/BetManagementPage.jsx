import { useMemo, useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const STATUS_OPTIONS = ["All", "Success", "Canceled", "Processing"];
const CURRENCY_OPTIONS = ["All", "USD", "EUR", "VND", "SGD", "THB"];
const GAME_TYPE_OPTIONS = ["All", "Live Casino", "Lottery", "Slot", "Table"];
const TYPE_OPTIONS = ["All", "Promo", "Normal"];

const baseTransactions = [
  {
    transId: "TRS-009",
    betTime: "03/10/2025 09:15",
    clientName: "Client A",
    providerName: "WALA SUB 1",
    gameName: "WALA88",
    playerName: "player.alpha",
    currency: "USD",
    gameType: "Live Casino",
    type: "Promo",
    status: "Success",
    betAmount: 1000,
    winLossAmount: 0,
    profitLoss: "GGR",
    netIncome: 0,
    clientRate: "-",
  },
  {
    transId: "TRS-008",
    betTime: "03/10/2025 09:15",
    clientName: "Client B",
    providerName: "MARBLEF1 TEST",
    gameName: "MARBLEF1",
    playerName: "player.beta",
    currency: "USD",
    gameType: "Lottery",
    type: "Normal",
    status: "Canceled",
    betAmount: 1000,
    winLossAmount: 800,
    profitLoss: "GGR",
    netIncome: -108,
    clientRate: "20%",
  },
  {
    transId: "TRS-007",
    betTime: "03/10/2025 09:15",
    clientName: "Client C",
    providerName: "HEO PIANO",
    gameName: "HEO",
    playerName: "player.charlie",
    currency: "USD",
    gameType: "Slot",
    type: "Normal",
    status: "Success",
    betAmount: 1000,
    winLossAmount: 800,
    profitLoss: 0,
    netIncome: 0,
    clientRate: "-",
  },
  {
    transId: "TRS-006",
    betTime: "03/10/2025 09:15",
    clientName: "Client D",
    providerName: "PAX HD2",
    gameName: "PAX",
    playerName: "player.delta",
    currency: "USD",
    gameType: "Live Casino",
    type: "Normal",
    status: "Success",
    betAmount: 1000,
    winLossAmount: -200,
    profitLoss: 840,
    netIncome: 378,
    clientRate: "20%",
  },
  {
    transId: "TRS-005",
    betTime: "03/10/2025 09:15",
    clientName: "Client E",
    providerName: "AGVC MOONLIGHT",
    gameName: "AGVC",
    playerName: "player.echo",
    currency: "USD",
    gameType: "Live Casino",
    type: "Promo",
    status: "Processing",
    betAmount: 1000,
    winLossAmount: 200,
    profitLoss: 130,
    netIncome: 58,
    clientRate: "20%",
  },
  {
    transId: "TRS-004",
    betTime: "03/10/2025 09:15",
    clientName: "Client F",
    providerName: "PAX H1",
    gameName: "CL023",
    playerName: "player.foxtrot",
    currency: "EUR",
    gameType: "Lottery",
    type: "Normal",
    status: "Canceled",
    betAmount: 800,
    winLossAmount: 0,
    profitLoss: 1860,
    netIncome: 837,
    clientRate: "20%",
  },
  {
    transId: "TRS-003",
    betTime: "03/10/2025 09:15",
    clientName: "Client G",
    providerName: "WALA88",
    gameName: "WALA88",
    playerName: "player.golf",
    currency: "VND",
    gameType: "Slot",
    type: "Promo",
    status: "Success",
    betAmount: 800,
    winLossAmount: 0,
    profitLoss: -360,
    netIncome: -162,
    clientRate: "20%",
  },
  {
    transId: "TRS-002",
    betTime: "03/10/2025 09:15",
    clientName: "Client H",
    providerName: "MARBLEF1 GUITAR",
    gameName: "MARBLEF1",
    playerName: "player.hotel",
    currency: "USD",
    gameType: "Live Casino",
    type: "Normal",
    status: "Canceled",
    betAmount: 1000,
    winLossAmount: -200,
    profitLoss: 0,
    netIncome: 0,
    clientRate: "-",
  },
  {
    transId: "TRS-001",
    betTime: "03/10/2025 09:15",
    clientName: "Client I",
    providerName: "HEO GAMER",
    gameName: "HEO",
    playerName: "player.india",
    currency: "USD",
    gameType: "Live Casino",
    type: "Normal",
    status: "Canceled",
    betAmount: 1000,
    winLossAmount: -200,
    profitLoss: 640,
    netIncome: 288,
    clientRate: "20%",
  },
];

const TABLE_COLUMNS = [
  { key: "transId", label: "Trans ID", minWidth: "min-w-[120px]" },
  { key: "betTime", label: "Bet Time", minWidth: "min-w-[150px]" },
  { key: "clientName", label: "Client Name", minWidth: "min-w-[140px]" },
  { key: "providerName", label: "Provider Name", minWidth: "min-w-[170px]" },
  { key: "gameName", label: "Game Name", minWidth: "min-w-[120px]" },
  { key: "playerName", label: "Player Name", minWidth: "min-w-[170px]" },
  { key: "currency", label: "Currency", minWidth: "min-w-[90px]" },
  { key: "gameType", label: "Game Type", minWidth: "min-w-[120px]" },
  { key: "betAmount", label: "Bet Amount", minWidth: "min-w-[110px]" },
  { key: "winLossAmount", label: "Win/Loss Amount", minWidth: "min-w-[130px]" },
  { key: "profitLoss", label: "Profit/Loss", minWidth: "min-w-[120px]" },
  { key: "netIncome", label: "NET INCOME", minWidth: "min-w-[120px]" },
  { key: "clientRate", label: "Client Rate (%)", minWidth: "min-w-[120px]" },
  {
    key: "status",
    label: "Status",
    minWidth: "min-w-[120px]",
    stickyRight: "right-[220px]",
    stickyZ: "z-20",
  },
  {
    key: "type",
    label: "Type",
    minWidth: "min-w-[100px]",
    stickyRight: "right-[120px]",
    stickyZ: "z-20",
  },
  {
    key: "action",
    label: "Action",
    minWidth: "min-w-[120px]",
    stickyRight: "right-0",
    stickyZ: "z-30",
    stickyShadow: true,
  },
];

function buildTransactions(total = 152) {
  return Array.from({ length: total }, (_, index) => {
    const item = baseTransactions[index % baseTransactions.length];
    const number = total - index;
    const day = String((index % 28) + 1).padStart(2, "0");
    const month = index % 3 === 0 ? "10" : index % 3 === 1 ? "11" : "12";
    const hour = String(9 + (index % 8)).padStart(2, "0");
    const minute = String(10 + (index % 40)).padStart(2, "0");

    return {
      ...item,
      transId: `TRS-${String(number).padStart(3, "0")}`,
      betTime: `${day}/${month}/2025 ${hour}:${minute}`,
      playerName: `${item.playerName}.${number}`,
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

function formatSignedDisplay(value) {
  if (typeof value !== "number") return value;
  return value.toLocaleString();
}

function getStickyRightClass(column, isHeader = false) {
  if (!column.stickyRight) return "";

  const baseBg = isHeader
    ? "bg-slate-50 dark:bg-slate-900"
    : "bg-white dark:bg-slate-950";

  const shadow = column.stickyShadow
    ? "shadow-[-10px_0_16px_-12px_rgba(15,23,42,0.35)]"
    : "";

  return `sticky ${column.stickyRight} ${column.stickyZ || "z-20"} ${baseBg} ${shadow}`;
}

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
      {children}
    </label>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  className = "",
  menuClassName = "",
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
    <div className={`relative min-w-0 ${className}`} ref={wrapperRef}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-11 w-full items-center justify-between rounded-xl border px-4 text-sm transition-all ${
          open
            ? "border-cyan-300 bg-white ring-2 ring-cyan-100 dark:border-cyan-400 dark:bg-slate-800 dark:ring-cyan-500/20"
            : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
        }`}>
        <span className="truncate text-slate-700 dark:text-slate-100">
          {value}
        </span>

        <ChevronDown
          className={`ml-3 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 top-[calc(100%+8px)] z-[140] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900 ${menuClassName}`}>
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

function DateRangePicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [tempStart, setTempStart] = useState(value.startDate || null);
  const [tempEnd, setTempEnd] = useState(value.endDate || null);
  const [hoverDate, setHoverDate] = useState(null);
  const [leftMonth, setLeftMonth] = useState(() => {
    const base = value.startDate || new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const wrapperRef = useRef(null);

  useEffect(() => {
    setTempStart(value.startDate || null);
    setTempEnd(value.endDate || null);

    const base = value.startDate || new Date();
    setLeftMonth(new Date(base.getFullYear(), base.getMonth(), 1));
  }, [value.startDate, value.endDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
        setHoverDate(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setOpen(false);
    setHoverDate(null);
  };

  const handleClear = () => {
    setTempStart(null);
    setTempEnd(null);
    setHoverDate(null);

    onChange({
      startDate: null,
      endDate: null,
    });

    setOpen(false);
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
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-11 w-full items-center justify-between rounded-xl border px-4 text-sm transition-all ${
          open
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

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-[160] flex w-[930px] overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.20)] dark:border-slate-700 dark:bg-slate-900">
          <div className="w-[170px] border-r border-slate-200 px-4 py-5 dark:border-slate-700">
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

          <div className="flex flex-1 flex-col">
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

            <div className="grid grid-cols-2">
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

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4 dark:border-slate-700">
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

function StatusBadge({ status }) {
  const styles =
    status === "Success"
      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
      : status === "Processing"
        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"
        : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-300";

  return (
    <span
      className={`inline-flex min-w-[88px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  const styles =
    type === "Promo"
      ? "bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-300"
      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300";

  return (
    <span
      className={`inline-flex min-w-[72px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {type}
    </span>
  );
}

function NumberDeltaCell({ value }) {
  if (typeof value !== "number") {
    return <span className="text-slate-700 dark:text-slate-200">{value}</span>;
  }

  if (value > 0) {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-300">
        <span>{formatSignedDisplay(value)}</span>
        <TrendingUp className="h-3.5 w-3.5" />
      </span>
    );
  }

  if (value < 0) {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-red-500 dark:text-red-300">
        <span>{formatSignedDisplay(value)}</span>
        <TrendingDown className="h-3.5 w-3.5" />
      </span>
    );
  }

  return <span className="text-slate-700 dark:text-slate-200">0</span>;
}

function ActionButtons({ onView }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <button
        type="button"
        onClick={onView}
        className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-500 dark:bg-amber-500/10 dark:text-amber-300">
        <Eye className="h-3 w-3" />
        <span>View</span>
      </button>
    </div>
  );
}

function renderCellContent(columnKey, row, onView) {
  switch (columnKey) {
    case "betAmount":
      return formatNumber(row.betAmount);

    case "winLossAmount":
      return <NumberDeltaCell value={row.winLossAmount} />;

    case "profitLoss":
      return typeof row.profitLoss === "number" ? (
        <NumberDeltaCell value={row.profitLoss} />
      ) : (
        <span>{row.profitLoss}</span>
      );

    case "netIncome":
      return <NumberDeltaCell value={row.netIncome} />;

    case "status":
      return <StatusBadge status={row.status} />;

    case "type":
      return <TypeBadge type={row.type} />;

    case "action":
      return <ActionButtons onView={() => onView(row)} />;

    default:
      return row[columnKey];
  }
}

function BetManagementPage() {
  const [rows] = useState(() => buildTransactions(152));

  const [betTimeFilter, setBetTimeFilter] = useState({
    startDate: null,
    endDate: null,
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

  const [appliedFilters, setAppliedFilters] = useState({
    betTimeFilter: {
      startDate: null,
      endDate: null,
    },
    transId: "",
    clientName: "",
    providerName: "",
    gameName: "",
    playerName: "",
    status: "All",
    currency: "All",
    gameType: "All",
    type: "All",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const transMatch =
        !appliedFilters.transId.trim() ||
        row.transId
          .toLowerCase()
          .includes(appliedFilters.transId.trim().toLowerCase());

      const clientMatch =
        !appliedFilters.clientName.trim() ||
        row.clientName
          .toLowerCase()
          .includes(appliedFilters.clientName.trim().toLowerCase());

      const providerMatch =
        !appliedFilters.providerName.trim() ||
        row.providerName
          .toLowerCase()
          .includes(appliedFilters.providerName.trim().toLowerCase());

      const gameMatch =
        !appliedFilters.gameName.trim() ||
        row.gameName
          .toLowerCase()
          .includes(appliedFilters.gameName.trim().toLowerCase());

      const playerMatch =
        !appliedFilters.playerName.trim() ||
        row.playerName
          .toLowerCase()
          .includes(appliedFilters.playerName.trim().toLowerCase());

      const statusMatch =
        appliedFilters.status === "All" || row.status === appliedFilters.status;

      const currencyMatch =
        appliedFilters.currency === "All" ||
        row.currency === appliedFilters.currency;

      const gameTypeMatch =
        appliedFilters.gameType === "All" ||
        row.gameType === appliedFilters.gameType;

      const typeMatch =
        appliedFilters.type === "All" || row.type === appliedFilters.type;

      const rowDate = parseTableDate(row.betTime);
      const startDate = appliedFilters.betTimeFilter.startDate;
      const endDate = appliedFilters.betTimeFilter.endDate;

      let betTimeMatch = true;

      if (startDate && rowDate) {
        betTimeMatch = rowDate >= startOfDay(startDate);
      }

      if (betTimeMatch && endDate && rowDate) {
        betTimeMatch = rowDate <= endOfDay(endDate);
      }

      return (
        transMatch &&
        clientMatch &&
        providerMatch &&
        gameMatch &&
        playerMatch &&
        statusMatch &&
        currencyMatch &&
        gameTypeMatch &&
        typeMatch &&
        betTimeMatch
      );
    });
  }, [rows, appliedFilters]);

  const totalEntries = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);
  const currentRows = filteredRows.slice(startIndex, endIndex);
  const paginationItems = getPaginationItems(safeCurrentPage, totalPages);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSearch = () => {
    setAppliedFilters({
      betTimeFilter: {
        startDate: betTimeFilter.startDate,
        endDate: betTimeFilter.endDate,
      },
      transId,
      clientName,
      providerName,
      gameName,
      playerName,
      status,
      currency,
      gameType,
      type,
    });

    setCurrentPage(1);
  };

  const handleReset = () => {
    const resetDate = {
      startDate: null,
      endDate: null,
    };

    setBetTimeFilter(resetDate);
    setTransId("");
    setClientName("");
    setProviderName("");
    setGameName("");
    setPlayerName("");
    setStatus("All");
    setCurrency("All");
    setGameType("All");
    setType("All");

    setAppliedFilters({
      betTimeFilter: resetDate,
      transId: "",
      clientName: "",
      providerName: "",
      gameName: "",
      playerName: "",
      status: "All",
      currency: "All",
      gameType: "All",
      type: "All",
    });

    setRowsPerPage(10);
    setCurrentPage(1);
  };

  const handleExportExcel = () => {
    const exportRows = filteredRows;

    const headers = TABLE_COLUMNS.map((column) => column.label);

    const tableRows = exportRows
      .map(
        (row) => `
          <tr>
            <td>${escapeHtml(row.transId)}</td>
            <td>${escapeHtml(row.betTime)}</td>
            <td>${escapeHtml(row.clientName)}</td>
            <td>${escapeHtml(row.providerName)}</td>
            <td>${escapeHtml(row.gameName)}</td>
            <td>${escapeHtml(row.playerName)}</td>
            <td>${escapeHtml(row.currency)}</td>
            <td>${escapeHtml(row.gameType)}</td>
            <td>${escapeHtml(formatNumber(row.betAmount))}</td>
            <td>${escapeHtml(formatSignedDisplay(row.winLossAmount))}</td>
            <td>${escapeHtml(
              typeof row.profitLoss === "number"
                ? formatSignedDisplay(row.profitLoss)
                : row.profitLoss,
            )}</td>
            <td>${escapeHtml(formatSignedDisplay(row.netIncome))}</td>
            <td>${escapeHtml(row.clientRate)}</td>
            <td>${escapeHtml(row.status)}</td>
            <td>${escapeHtml(row.type)}</td>
            <td>View</td>
          </tr>
        `,
      )
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
    link.download = `bet-management-${timestamp}.xls`;
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

  const handleView = (row) => {
    console.log("View bet row:", row);
  };

  const handleEnterSearch = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="overflow-hidden rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-cyan-500/30 dark:bg-slate-950">
      <div className="relative border-b border-cyan-300 bg-slate-50 px-5 py-5 dark:border-cyan-500/30 dark:bg-slate-900">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover object-right opacity-15 dark:opacity-10"
        />

        <div className="relative z-10">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800 dark:text-white">
              Bet Management
            </h1>

            <button
              type="button"
              onClick={handleExportExcel}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
              <Download className="h-4 w-4" />
              <span>Export Excel</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
            <DateRangePicker
              label="Bet Time"
              value={betTimeFilter}
              onChange={setBetTimeFilter}
            />

            <div className="min-w-0">
              <FieldLabel>Trans Id</FieldLabel>
              <input
                type="text"
                value={transId}
                onChange={(e) => setTransId(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder="Enter Trans Id"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div className="min-w-0">
              <FieldLabel>Client Name</FieldLabel>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder="Enter Client Name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div className="min-w-0">
              <FieldLabel>Provider Name</FieldLabel>
              <input
                type="text"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder="Enter Provider Name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div className="min-w-0">
              <FieldLabel>Game Name</FieldLabel>
              <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder="Enter Game Name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div className="min-w-0">
              <FieldLabel>Player Name</FieldLabel>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder="Enter Player Name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <FilterSelect
              label="Status"
              value={status}
              onChange={setStatus}
              options={STATUS_OPTIONS}
            />

            <FilterSelect
              label="Currency"
              value={currency}
              onChange={setCurrency}
              options={CURRENCY_OPTIONS}
            />

            <FilterSelect
              label="Game Type"
              value={gameType}
              onChange={setGameType}
              options={GAME_TYPE_OPTIONS}
            />

            <FilterSelect
              label="Type"
              value={type}
              onChange={setType}
              options={TYPE_OPTIONS}
            />

            <div className="flex items-end xl:justify-start">
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

      <div className="relative isolate overflow-x-auto">
        <table className="min-w-[1850px] text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className={`whitespace-nowrap px-4 py-4 font-semibold ${column.minWidth || ""} ${getStickyRightClass(
                    column,
                    true,
                  )}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row) => (
              <tr
                key={row.transId}
                className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                {TABLE_COLUMNS.map((column) => (
                  <td
                    key={column.key}
                    className={`whitespace-nowrap px-4 py-4 ${column.minWidth || ""} ${getStickyRightClass(
                      column,
                      false,
                    )}`}>
                    {renderCellContent(column.key, row, handleView)}
                  </td>
                ))}
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan={TABLE_COLUMNS.length}
                  className="px-4 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                  No matching bet transaction found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:text-slate-500">
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

export default BetManagementPage;
