import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleOff,
  Pencil,
  Plus,
  Search,
  Save,
  X,
} from "lucide-react";

const STORAGE_KEY = "game-provider-management-rows-v4";

const CORE_PROVIDERS = [
  "All",
  "PG Soft",
  "Evolution",
  "Pragmatic Play",
  "Habanero",
  "JILI Games",
  "SBO Sports",
  "KA Gaming",
  "LottX",
];

const FORM_CORE_PROVIDERS = CORE_PROVIDERS.filter((item) => item !== "All");

const REVENUE_MODE_OPTIONS = [
  "All",
  "Revenue Share %",
  "Category Share %",
  "--",
];

const FORM_REVENUE_MODE_OPTIONS = ["Revenue Share %", "Category Share %"];

const STATUS_OPTIONS = ["All", "Active", "Inactive"];
const FORM_STATUS_OPTIONS = ["Active", "Inactive"];

const CURRENCY_OPTIONS = ["USD", "EUR", "VND", "SGD", "THB", "JPY", "CNY"];

const CATEGORY_OPTIONS = ["Slot", "Live casino", "Table", "Arcade"];

const baseProviders = [
  {
    id: "PVD-001",
    providerName: "PG Soft",
    coreProvider: "PG Soft",
    defaultCurrency: "USD",
    supportCurrencies: ["USD", "EUR"],
    revenueModel: "Revenue Share %",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.pgsoft.com/v1",
    apiKey: "PG-KEY-001",
    secretKey: "PG-SECRET-001",
    providerCode: "1223",
    description:
      "Innovative iGaming provider offering next-generation casino games.",
    revenueSharePercent: "20",
    categoryRevenueRows: [
      { category: "Slot", value: "50" },
      { category: "Table", value: "52" },
    ],
  },
  {
    id: "PVD-002",
    providerName: "Evolution",
    coreProvider: "Evolution",
    defaultCurrency: "--",
    supportCurrencies: ["EUR"],
    revenueModel: "--",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.evolution.com/v1",
    apiKey: "EVO-KEY-002",
    secretKey: "EVO-SECRET-002",
    providerCode: "2201",
    description: "Live casino provider with global table distribution.",
    revenueSharePercent: "",
    categoryRevenueRows: [
      { category: "Live casino", value: "40" },
      { category: "Table", value: "35" },
    ],
  },
  {
    id: "PVD-003",
    providerName: "Pragmatic Play",
    coreProvider: "Pragmatic Play",
    defaultCurrency: "USD",
    supportCurrencies: ["USD", "EUR", "SGD"],
    revenueModel: "Category Share %",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.pragmaticplay.com/v1",
    apiKey: "PP-KEY-003",
    secretKey: "PP-SECRET-003",
    providerCode: "3308",
    description: "Multi-product content provider for slots and live casino.",
    revenueSharePercent: "",
    categoryRevenueRows: [
      { category: "Slot", value: "50" },
      { category: "Live casino", value: "45" },
    ],
  },
  {
    id: "PVD-004",
    providerName: "Habanero",
    coreProvider: "Habanero",
    defaultCurrency: "USD",
    supportCurrencies: ["USD", "THB"],
    revenueModel: "Category Share %",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.habanero.com/v1",
    apiKey: "HB-KEY-004",
    secretKey: "HB-SECRET-004",
    providerCode: "4490",
    description: "Casino provider with mobile-first slot content.",
    revenueSharePercent: "",
    categoryRevenueRows: [
      { category: "Slot", value: "48" },
      { category: "Arcade", value: "40" },
    ],
  },
  {
    id: "PVD-005",
    providerName: "JILI Games",
    coreProvider: "JILI Games",
    defaultCurrency: "EUR",
    supportCurrencies: ["EUR", "USD"],
    revenueModel: "Revenue Share %",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.jili.com/v1",
    apiKey: "JL-KEY-005",
    secretKey: "JL-SECRET-005",
    providerCode: "5530",
    description: "Arcade and casino provider for Asian markets.",
    revenueSharePercent: "18",
    categoryRevenueRows: [
      { category: "Arcade", value: "42" },
      { category: "Slot", value: "40" },
    ],
  },
  {
    id: "PVD-006",
    providerName: "SBO Sports",
    coreProvider: "SBO Sports",
    defaultCurrency: "USD",
    supportCurrencies: ["USD", "VND"],
    revenueModel: "Revenue Share %",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.sbosports.com/v1",
    apiKey: "SBO-KEY-006",
    secretKey: "SBO-SECRET-006",
    providerCode: "6610",
    description: "Sportsbook content and odds integration.",
    revenueSharePercent: "15",
    categoryRevenueRows: [
      { category: "Table", value: "35" },
      { category: "Live casino", value: "30" },
    ],
  },
  {
    id: "PVD-007",
    providerName: "KA Gaming",
    coreProvider: "KA Gaming",
    defaultCurrency: "VND",
    supportCurrencies: ["VND", "USD"],
    revenueModel: "Category Share %",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.kagaming.com/v1",
    apiKey: "KA-KEY-007",
    secretKey: "KA-SECRET-007",
    providerCode: "7720",
    description: "Live casino and fish game provider.",
    revenueSharePercent: "",
    categoryRevenueRows: [
      { category: "Live casino", value: "50" },
      { category: "Arcade", value: "43" },
    ],
  },
  {
    id: "PVD-008",
    providerName: "KA Gaming",
    coreProvider: "KA Gaming",
    defaultCurrency: "VND",
    supportCurrencies: ["VND", "SGD"],
    revenueModel: "Category Share %",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.kagaming.com/v2",
    apiKey: "KA-KEY-008",
    secretKey: "KA-SECRET-008",
    providerCode: "7721",
    description: "Regional distribution provider branch.",
    revenueSharePercent: "",
    categoryRevenueRows: [
      { category: "Arcade", value: "44" },
      { category: "Slot", value: "41" },
    ],
  },
  {
    id: "PVD-009",
    providerName: "LottX",
    coreProvider: "LottX",
    defaultCurrency: "USD",
    supportCurrencies: ["USD", "CNY"],
    revenueModel: "Category Share %",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.lottx.com/v1",
    apiKey: "LOT-KEY-009",
    secretKey: "LOT-SECRET-009",
    providerCode: "8890",
    description: "Lottery and number-based content provider.",
    revenueSharePercent: "",
    categoryRevenueRows: [
      { category: "Table", value: "36" },
      { category: "Arcade", value: "39" },
    ],
  },
  {
    id: "PVD-010",
    providerName: "PG Soft",
    coreProvider: "PG Soft",
    defaultCurrency: "USD",
    supportCurrencies: ["USD", "JPY", "CNY"],
    revenueModel: "Revenue Share %",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastSyncTime: "03/10/2025 09:15",
    apiBaseUrl: "https://api.pgsoft.com/v2",
    apiKey: "PG-KEY-010",
    secretKey: "PG-SECRET-010",
    providerCode: "1224",
    description: "Second integration node for PG Soft.",
    revenueSharePercent: "22",
    categoryRevenueRows: [
      { category: "Slot", value: "53" },
      { category: "Arcade", value: "47" },
    ],
  },
];

function createEmptyForm() {
  return {
    coreProvider: FORM_CORE_PROVIDERS[0],
    providerCode: "",
    providerName: "",
    supportCurrencies: ["USD", "JPY", "CNY"],
    defaultCurrency: "USD",
    status: "Active",
    apiBaseUrl: "",
    apiKey: "",
    secretKey: "",
    revenueModel: "Revenue Share %",
    revenueSharePercent: "",
    categoryRevenueRows: [
      { category: "Slot", value: "50" },
      { category: "Table", value: "52" },
    ],
    description: "",
    formError: "",
  };
}

function formatDateTime(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
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

function buildProviders(total = 152) {
  return Array.from({ length: total }, (_, index) => {
    const item = baseProviders[index % baseProviders.length];
    const num = index + 1;

    return {
      ...item,
      id: `PVD-${String(num).padStart(3, "0")}`,
    };
  });
}

function loadProvidersFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return buildProviders(152);

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return buildProviders(152);
    }

    return parsed;
  } catch {
    return buildProviders(152);
  }
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

function MultiCurrencySelect({ label, value, options, onChange }) {
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

  const toggleValue = (item) => {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
      return;
    }

    onChange([...value, item]);
  };

  const removeValue = (item, event) => {
    event.stopPropagation();
    onChange(value.filter((v) => v !== item));
  };

  return (
    <div className="relative min-w-0" ref={wrapperRef}>
      <FieldLabel>{label}</FieldLabel>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex min-h-11 w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all ${
          open
            ? "border-cyan-300 bg-white ring-2 ring-cyan-100 dark:border-cyan-400 dark:bg-slate-800 dark:ring-cyan-500/20"
            : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
        }`}>
        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {value.length > 0 ? (
            value.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {item}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => removeValue(item, event)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      removeValue(item, event);
                    }
                  }}
                  className="cursor-pointer text-slate-400">
                  <X className="h-3 w-3" />
                </span>
              </span>
            ))
          ) : (
            <span className="text-slate-300 dark:text-slate-500">
              Select support currency
            </span>
          )}
        </div>

        <ChevronDown
          className={`ml-3 h-4 w-4 shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-[150] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900">
          <div className="max-h-64 overflow-y-auto py-2">
            {options.map((item) => {
              const selected = value.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleValue(item)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "bg-cyan-50 font-semibold text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}>
                  <span>{item}</span>
                  {selected && <Check className="h-4 w-4" />}
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
  if (status === "Active") {
    return (
      <span className="inline-flex min-w-[78px] items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-[78px] items-center justify-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 dark:bg-red-500/10 dark:text-red-300">
      Inactive
    </span>
  );
}

function ActionButtons({ enabled, onEdit, onToggleStatus }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-500 dark:bg-amber-500/10 dark:text-amber-300">
        <Pencil className="h-3 w-3" />
        <span>Edit</span>
      </button>

      {enabled ? (
        <button
          type="button"
          onClick={onToggleStatus}
          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 dark:bg-red-500/10 dark:text-red-300">
          <CircleOff className="h-3 w-3" />
          <span>Disable</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggleStatus}
          className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Check className="h-3 w-3" />
          <span>Enable</span>
        </button>
      )}
    </div>
  );
}

function ProviderFormView({ mode, form, setForm, onSave, onCancel }) {
  const isCategoryMode = form.revenueModel === "Category Share %";

  const updateCategoryRow = (index, key, nextValue) => {
    setForm((prev) => ({
      ...prev,
      categoryRevenueRows: prev.categoryRevenueRows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: nextValue } : row,
      ),
      formError: "",
    }));
  };

  return (
    <div className="overflow-visible rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-cyan-500/30 dark:bg-slate-950">
      <div className="relative rounded-t-[20px] border-b border-cyan-300 bg-slate-50 px-5 py-5 dark:border-cyan-500/30 dark:bg-slate-900">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover object-right opacity-15 dark:opacity-10"
        />

        <div className="relative z-10">
          <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800 dark:text-white">
            {mode === "create" ? "Create new provider" : "Edit provider"}
          </h1>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_140px] gap-3">
              <FilterSelect
                label={
                  <>
                    Core Provider <span className="text-red-500">*</span>
                  </>
                }
                value={form.coreProvider}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    coreProvider: value,
                    formError: "",
                  }))
                }
                options={FORM_CORE_PROVIDERS}
                className="z-[130]"
              />

              <div>
                <FieldLabel>&nbsp;</FieldLabel>
                <input
                  type="text"
                  value={form.providerCode}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      providerCode: e.target.value,
                      formError: "",
                    }))
                  }
                  placeholder="1223"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Provider Name</FieldLabel>
              <input
                type="text"
                value={form.providerName}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    providerName: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="PAX 123"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <MultiCurrencySelect
              label={
                <>
                  Support Currency <span className="text-red-500">*</span>
                </>
              }
              value={form.supportCurrencies}
              options={CURRENCY_OPTIONS}
              onChange={(next) =>
                setForm((prev) => ({
                  ...prev,
                  supportCurrencies: next,
                  formError: "",
                }))
              }
            />

            <FilterSelect
              label={
                <>
                  Default currency <span className="text-red-500">*</span>
                </>
              }
              value={form.defaultCurrency}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  defaultCurrency: value,
                  formError: "",
                }))
              }
              options={CURRENCY_OPTIONS}
              className="z-[120]"
            />

            <FilterSelect
              label={
                <>
                  Status <span className="text-red-500">*</span>
                </>
              }
              value={form.status}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  status: value,
                  formError: "",
                }))
              }
              options={FORM_STATUS_OPTIONS}
              className="z-[110]"
            />

            <div>
              <FieldLabel>Description</FieldLabel>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                    formError: "",
                  }))
                }
                maxLength={500}
                placeholder="Innovative iGaming provider offering next-generation 3D and VR casino games with immersive gameplay and strong cross-platform compatibility."
                rows={10}
                className="min-h-[220px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>Max length: 500 chars</span>
                <span>{form.description.length}/500</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <FieldLabel>
                API Base URL <span className="text-red-500">*</span>
              </FieldLabel>
              <input
                type="text"
                value={form.apiBaseUrl}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    apiBaseUrl: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="https://api.evoplaygaming.com/v1"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <FieldLabel>
                API Key <span className="text-red-500">*</span>
              </FieldLabel>
              <input
                type="text"
                value={form.apiKey}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    apiKey: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="EVO-KEY-29384XYZ"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <FieldLabel>
                Secret key <span className="text-red-500">*</span>
              </FieldLabel>
              <input
                type="text"
                value={form.secretKey}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    secretKey: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="EVO-KEY-29384XYZ"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <FieldLabel>
                Revenue Model <span className="text-red-500">*</span>
              </FieldLabel>

              <div className="space-y-4 rounded-xl border border-transparent py-1">
                {FORM_REVENUE_MODE_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <input
                      type="radio"
                      name="provider-revenue-model"
                      checked={form.revenueModel === option}
                      onChange={() =>
                        setForm((prev) => ({
                          ...prev,
                          revenueModel: option,
                          formError: "",
                        }))
                      }
                      className="h-4 w-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}

                {!isCategoryMode && (
                  <div className="max-w-[240px]">
                    <input
                      type="text"
                      value={form.revenueSharePercent}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          revenueSharePercent: e.target.value,
                          formError: "",
                        }))
                      }
                      placeholder="Enter revenue share percent"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
                    />
                  </div>
                )}

                {isCategoryMode && (
                  <div className="space-y-3">
                    {form.categoryRevenueRows.map((row, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr] gap-3">
                        <FilterSelect
                          value={row.category}
                          onChange={(value) =>
                            updateCategoryRow(index, "category", value)
                          }
                          options={CATEGORY_OPTIONS}
                          className="z-[90]"
                        />

                        <input
                          type="text"
                          value={row.value}
                          onChange={(e) =>
                            updateCategoryRow(index, "value", e.target.value)
                          }
                          placeholder="50"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4" />
          </div>
        </div>

        {form.formError && (
          <p className="mt-6 text-center text-sm font-medium text-red-500">
            {form.formError}
          </p>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function GameProviderManagementPage() {
  const [rows, setRows] = useState(() => loadProvidersFromStorage());

  const [createdAtFilter, setCreatedAtFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [providerName, setProviderName] = useState("");
  const [coreProvider, setCoreProvider] = useState("All");
  const [revenueModel, setRevenueModel] = useState("All");
  const [status, setStatus] = useState("All");

  const [appliedFilters, setAppliedFilters] = useState({
    createdAtFilter: {
      startDate: null,
      endDate: null,
    },
    providerName: "",
    coreProvider: "All",
    revenueModel: "All",
    status: "All",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewMode, setViewMode] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(createEmptyForm());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const providerQuery = appliedFilters.providerName.trim().toLowerCase();

      const providerMatch =
        !providerQuery ||
        row.providerName.toLowerCase().includes(providerQuery) ||
        row.id.toLowerCase().includes(providerQuery);

      const coreProviderMatch =
        appliedFilters.coreProvider === "All" ||
        row.coreProvider === appliedFilters.coreProvider;

      const revenueModelMatch =
        appliedFilters.revenueModel === "All" ||
        row.revenueModel === appliedFilters.revenueModel;

      const statusMatch =
        appliedFilters.status === "All" || row.status === appliedFilters.status;

      const rowDate = parseTableDate(row.createdAt);
      const startDate = appliedFilters.createdAtFilter.startDate;
      const endDate = appliedFilters.createdAtFilter.endDate;

      let createdAtMatch = true;

      if (startDate && rowDate) {
        createdAtMatch = rowDate >= startOfDay(startDate);
      }

      if (createdAtMatch && endDate && rowDate) {
        createdAtMatch = rowDate <= endOfDay(endDate);
      }

      return (
        providerMatch &&
        coreProviderMatch &&
        revenueModelMatch &&
        statusMatch &&
        createdAtMatch
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
      createdAtFilter: {
        startDate: createdAtFilter.startDate,
        endDate: createdAtFilter.endDate,
      },
      providerName,
      coreProvider,
      revenueModel,
      status,
    });

    setCurrentPage(1);
  };

  const handleReset = () => {
    const resetDate = {
      startDate: null,
      endDate: null,
    };

    setCreatedAtFilter(resetDate);
    setProviderName("");
    setCoreProvider("All");
    setRevenueModel("All");
    setStatus("All");

    setAppliedFilters({
      createdAtFilter: resetDate,
      providerName: "",
      coreProvider: "All",
      revenueModel: "All",
      status: "All",
    });

    setRowsPerPage(10);
    setCurrentPage(1);
  };

  const handleToggleStatus = (id) => {
    const now = formatDateTime(new Date());

    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              status: row.status === "Active" ? "Inactive" : "Active",
              lastSyncTime: now,
            }
          : row,
      ),
    );
  };

  const handleAddProvider = () => {
    setEditingId(null);
    setForm(createEmptyForm());
    setViewMode("create");
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setForm({
      coreProvider: row.coreProvider || FORM_CORE_PROVIDERS[0],
      providerCode: row.providerCode || "",
      providerName: row.providerName || "",
      supportCurrencies:
        Array.isArray(row.supportCurrencies) && row.supportCurrencies.length > 0
          ? row.supportCurrencies
          : ["USD"],
      defaultCurrency:
        row.defaultCurrency && row.defaultCurrency !== "--"
          ? row.defaultCurrency
          : "USD",
      status: row.status || "Active",
      apiBaseUrl: row.apiBaseUrl || "",
      apiKey: row.apiKey || "",
      secretKey: row.secretKey || "",
      revenueModel:
        row.revenueModel === "Category Share %"
          ? "Category Share %"
          : "Revenue Share %",
      revenueSharePercent: row.revenueSharePercent || "",
      categoryRevenueRows:
        Array.isArray(row.categoryRevenueRows) &&
        row.categoryRevenueRows.length > 0
          ? row.categoryRevenueRows
          : [
              { category: "Slot", value: "50" },
              { category: "Table", value: "52" },
            ],
      description: row.description || "",
      formError: "",
    });
    setViewMode("edit");
  };

  const handleCancelForm = () => {
    setViewMode("list");
    setEditingId(null);
    setForm(createEmptyForm());
  };

  const validateForm = () => {
    if (!form.coreProvider) return "Core Provider is required.";
    if (!form.providerCode.trim()) return "Provider code is required.";
    if (!form.providerName.trim()) return "Provider Name is required.";
    if (!form.apiBaseUrl.trim()) return "API Base URL is required.";
    if (!form.apiKey.trim()) return "API Key is required.";
    if (!form.secretKey.trim()) return "Secret key is required.";
    if (!form.defaultCurrency.trim()) return "Default currency is required.";
    if (!form.status.trim()) return "Status is required.";
    if (
      !Array.isArray(form.supportCurrencies) ||
      form.supportCurrencies.length === 0
    ) {
      return "Support Currency is required.";
    }

    if (
      form.revenueModel === "Revenue Share %" &&
      !form.revenueSharePercent.trim()
    ) {
      return "Revenue share percent is required.";
    }

    if (form.revenueModel === "Category Share %") {
      const invalidRow = form.categoryRevenueRows.find(
        (row) => !row.category || !row.value.trim(),
      );

      if (invalidRow) {
        return "All category revenue rows must be completed.";
      }
    }

    return "";
  };

  const handleSaveForm = () => {
    const error = validateForm();

    if (error) {
      setForm((prev) => ({
        ...prev,
        formError: error,
      }));
      return;
    }

    const now = formatDateTime(new Date());

    if (viewMode === "create") {
      const nextNumber =
        rows.reduce((max, row) => {
          const value = Number(row.id.replace("PVD-", ""));
          return Number.isNaN(value) ? max : Math.max(max, value);
        }, 0) + 1;

      const newRow = {
        id: `PVD-${String(nextNumber).padStart(3, "0")}`,
        providerName: form.providerName.trim(),
        coreProvider: form.coreProvider,
        defaultCurrency: form.defaultCurrency,
        supportCurrencies: form.supportCurrencies,
        revenueModel: form.revenueModel,
        status: form.status,
        createdAt: now,
        lastSyncTime: now,
        apiBaseUrl: form.apiBaseUrl.trim(),
        apiKey: form.apiKey.trim(),
        secretKey: form.secretKey.trim(),
        providerCode: form.providerCode.trim(),
        description: form.description.trim(),
        revenueSharePercent: form.revenueSharePercent.trim(),
        categoryRevenueRows: form.categoryRevenueRows,
      };

      setRows((prev) => [newRow, ...prev]);
    }

    if (viewMode === "edit" && editingId) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? {
                ...row,
                providerName: form.providerName.trim(),
                coreProvider: form.coreProvider,
                defaultCurrency: form.defaultCurrency,
                supportCurrencies: form.supportCurrencies,
                revenueModel: form.revenueModel,
                status: form.status,
                lastSyncTime: now,
                apiBaseUrl: form.apiBaseUrl.trim(),
                apiKey: form.apiKey.trim(),
                secretKey: form.secretKey.trim(),
                providerCode: form.providerCode.trim(),
                description: form.description.trim(),
                revenueSharePercent: form.revenueSharePercent.trim(),
                categoryRevenueRows: form.categoryRevenueRows,
              }
            : row,
        ),
      );
    }

    const resetDate = {
      startDate: null,
      endDate: null,
    };

    setCreatedAtFilter(resetDate);
    setProviderName("");
    setCoreProvider("All");
    setRevenueModel("All");
    setStatus("All");
    setAppliedFilters({
      createdAtFilter: resetDate,
      providerName: "",
      coreProvider: "All",
      revenueModel: "All",
      status: "All",
    });
    setCurrentPage(1);
    setViewMode("list");
    setEditingId(null);
    setForm(createEmptyForm());
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

  if (viewMode === "create" || viewMode === "edit") {
    return (
      <ProviderFormView
        mode={viewMode}
        form={form}
        setForm={setForm}
        onSave={handleSaveForm}
        onCancel={handleCancelForm}
      />
    );
  }

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
              View Game Provider List
            </h1>

            <button
              type="button"
              onClick={handleAddProvider}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Add new provider</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto_auto]">
            <DateRangePicker
              label="Created at"
              value={createdAtFilter}
              onChange={setCreatedAtFilter}
            />

            <div className="min-w-0">
              <FieldLabel>Provider Name</FieldLabel>
              <input
                type="text"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search by name/code"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <FilterSelect
              label="Core Provider"
              value={coreProvider}
              onChange={setCoreProvider}
              options={CORE_PROVIDERS}
            />

            <FilterSelect
              label="Revenue Model"
              value={revenueModel}
              onChange={setRevenueModel}
              options={REVENUE_MODE_OPTIONS}
            />

            <FilterSelect
              label="Status"
              value={status}
              onChange={setStatus}
              options={STATUS_OPTIONS}
            />

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>

            <div className="flex items-end">
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

      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <th className="w-[140px] whitespace-nowrap px-4 py-4 font-semibold">
                Provider ID
              </th>
              <th className="w-[170px] whitespace-nowrap px-4 py-4 font-semibold">
                Provider Name
              </th>
              <th className="w-[170px] whitespace-nowrap px-4 py-4 font-semibold">
                Core Provider
              </th>
              <th className="w-[150px] whitespace-nowrap px-4 py-4 font-semibold">
                Default currency
              </th>
              <th className="w-[160px] whitespace-nowrap px-4 py-4 font-semibold">
                Revenue Model
              </th>
              <th className="w-[140px] whitespace-nowrap px-4 py-4 font-semibold">
                Status
              </th>
              <th className="w-[170px] whitespace-nowrap px-4 py-4 font-semibold">
                Created at
              </th>
              <th className="w-[170px] whitespace-nowrap px-4 py-4 font-semibold">
                Last sync time
              </th>
              <th className="w-[220px] whitespace-nowrap px-4 py-4 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                <td className="whitespace-nowrap px-4 py-3">{row.id}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.providerName}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.coreProvider}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.defaultCurrency}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.revenueModel}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">{row.createdAt}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  {row.lastSyncTime}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <ActionButtons
                    enabled={row.status === "Active"}
                    onEdit={() => handleEdit(row)}
                    onToggleStatus={() => handleToggleStatus(row.id)}
                  />
                </td>
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                  No matching providers found.
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

export default GameProviderManagementPage;
