import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleOff,
  Eye,
  EyeOff,
  Info,
  KeyRound,
  Pencil,
  Plus,
  Save,
  Search,
} from "lucide-react";

const STORAGE_KEY = "client-management-rows-v5";

const CURRENCIES = ["USD", "VND", "EUR", "SGD", "THB"];
const PROVIDERS = [
  "NeoPlay",
  "Cardify",
  "Pragmatic",
  "PG Soft",
  "Play'n GO",
  "NetEnt",
];
const GAME_CATEGORIES = ["Slot", "Live casino", "Table", "Arcade"];
const CLIENT_STATUSES = ["Active", "Inactive"];
const REVENUE_MODE_OPTIONS = ["Revenue Share %", "Category Revenue %"];

const GAME_POOL = [
  {
    gameId: "G-001",
    gameName: "Space Invader",
    provider: "NeoPlay",
    category: "Slot",
    status: "Active",
  },
  {
    gameId: "G-002",
    gameName: "Lucky Cards",
    provider: "Cardify",
    category: "Live casino",
    status: "Inactive",
  },
  {
    gameId: "G-003",
    gameName: "Money Tree Dozer",
    provider: "Pragmatic",
    category: "Slot",
    status: "Active",
  },
  {
    gameId: "G-004",
    gameName: "Circus Dozer",
    provider: "PG Soft",
    category: "Slot",
    status: "Active",
  },
  {
    gameId: "G-005",
    gameName: "FA Chai Dozer",
    provider: "Pragmatic",
    category: "Slot",
    status: "Inactive",
  },
  {
    gameId: "G-006",
    gameName: "Lightning Bomb",
    provider: "Play'n GO",
    category: "Arcade",
    status: "Active",
  },
  {
    gameId: "G-007",
    gameName: "Royal Wheel",
    provider: "NetEnt",
    category: "Table",
    status: "Inactive",
  },
  {
    gameId: "G-008",
    gameName: "Ocean Spin",
    provider: "Pragmatic",
    category: "Slot",
    status: "Active",
  },
  {
    gameId: "G-009",
    gameName: "Crystal Bet",
    provider: "Cardify",
    category: "Live casino",
    status: "Active",
  },
  {
    gameId: "G-010",
    gameName: "Color Tower",
    provider: "PG Soft",
    category: "Arcade",
    status: "Inactive",
  },
];

const baseClients = [
  {
    id: "CLT-001",
    clientCode: "ALP",
    clientName: "Alpha Games B2B",
    defaultCurrency: "USD",
    status: "Inactive",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "alpha_admin",
    supportCurrency: "USD",
    apiBaseUrl: "https://api.alpha.com",
    apiKeySecret: "ALPHA_SECRET_001",
    description: "",
    ipWhitelist: "103.1.10.1\n103.1.10.2",
    coreProvider: "Pragmatic",
    provider: "Pragmatic",
    revenueModel: "Revenue Share %",
    revenuePercent: "20",
  },
  {
    id: "CLT-002",
    clientCode: "BET",
    clientName: "Beta Platform",
    defaultCurrency: "VND",
    status: "Active",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "beta_admin",
    supportCurrency: "VND",
    apiBaseUrl: "https://api.beta.com",
    apiKeySecret: "BETA_SECRET_002",
    description: "",
    ipWhitelist: "10.10.10.1",
    coreProvider: "PG Soft",
    provider: "PG Soft",
    revenueModel: "Revenue Share %",
    revenuePercent: "15",
  },
  {
    id: "CLT-003",
    clientCode: "ECO",
    clientName: "Crystal Hub",
    defaultCurrency: "USD",
    status: "Active",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "eco_admin",
    supportCurrency: "USD",
    apiBaseUrl: "https://api.eco.com",
    apiKeySecret: "ECO_SECRET_003",
    description: "",
    ipWhitelist: "172.16.0.5",
    coreProvider: "Play'n GO",
    provider: "Play'n GO",
    revenueModel: "Revenue Share %",
    revenuePercent: "18",
  },
  {
    id: "CLT-004",
    clientCode: "CRY",
    clientName: "Delta Entertainment",
    defaultCurrency: "USD",
    status: "Inactive",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "cry_admin",
    supportCurrency: "USD",
    apiBaseUrl: "https://api.cry.com",
    apiKeySecret: "CRY_SECRET_004",
    description: "",
    ipWhitelist: "192.168.3.4",
    coreProvider: "NetEnt",
    provider: "NetEnt",
    revenueModel: "Category Revenue %",
    revenuePercent: "10",
  },
  {
    id: "CLT-005",
    clientCode: "DEL",
    clientName: "Echo Online",
    defaultCurrency: "USD",
    status: "Active",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "del_admin",
    supportCurrency: "USD",
    apiBaseUrl: "https://api.del.com",
    apiKeySecret: "DEL_SECRET_005",
    description: "",
    ipWhitelist: "172.16.10.10",
    coreProvider: "Pragmatic",
    provider: "Pragmatic",
    revenueModel: "Revenue Share %",
    revenuePercent: "12",
  },
  {
    id: "CLT-006",
    clientCode: "ECO",
    clientName: "Foxtrat Media",
    defaultCurrency: "USD",
    status: "Active",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "fox_admin",
    supportCurrency: "USD",
    apiBaseUrl: "https://api.fox.com",
    apiKeySecret: "FOX_SECRET_006",
    description: "",
    ipWhitelist: "10.22.33.44",
    coreProvider: "PG Soft",
    provider: "PG Soft",
    revenueModel: "Revenue Share %",
    revenuePercent: "14",
  },
  {
    id: "CLT-007",
    clientCode: "FOX",
    clientName: "Galaxy Corp",
    defaultCurrency: "EUR",
    status: "Active",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "galaxy_admin",
    supportCurrency: "EUR",
    apiBaseUrl: "https://api.galaxy.com",
    apiKeySecret: "GALAXY_SECRET_007",
    description: "",
    ipWhitelist: "81.2.69.142",
    coreProvider: "Play'n GO",
    provider: "Play'n GO",
    revenueModel: "Category Revenue %",
    revenuePercent: "8",
  },
  {
    id: "CLT-008",
    clientCode: "GAL",
    clientName: "t.Hexagon B2B",
    defaultCurrency: "SGD",
    status: "Active",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "hex_admin",
    supportCurrency: "SGD",
    apiBaseUrl: "https://api.hex.com",
    apiKeySecret: "HEX_SECRET_008",
    description: "",
    ipWhitelist: "192.168.100.2",
    coreProvider: "Pragmatic",
    provider: "Pragmatic",
    revenueModel: "Revenue Share %",
    revenuePercent: "13",
  },
  {
    id: "CLT-009",
    clientCode: "HEX",
    clientName: "Galaxy Corp",
    defaultCurrency: "THB",
    status: "Active",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "hex2_admin",
    supportCurrency: "THB",
    apiBaseUrl: "https://api.hex2.com",
    apiKeySecret: "HEX2_SECRET_009",
    description: "",
    ipWhitelist: "203.144.1.1",
    coreProvider: "NetEnt",
    provider: "NetEnt",
    revenueModel: "Category Revenue %",
    revenuePercent: "9",
  },
  {
    id: "CLT-010",
    clientCode: "ALP",
    clientName: "Alpha Games B2B",
    defaultCurrency: "USD",
    status: "Inactive",
    createdDate: "03/10/2025 09:15",
    lastUpdated: "03/10/2025 09:15",
    username: "alpha2_admin",
    supportCurrency: "USD",
    apiBaseUrl: "https://api.alpha2.com",
    apiKeySecret: "ALPHA_SECRET_010",
    description: "",
    ipWhitelist: "45.10.20.30",
    coreProvider: "Pragmatic",
    provider: "Pragmatic",
    revenueModel: "Revenue Share %",
    revenuePercent: "20",
  },
];

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
  const diff = -day;
  d.setDate(d.getDate() + diff);
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

function generateSecret() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let result = "";

  for (let i = 0; i < 28; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

function getDefaultClientGames(seed = 1) {
  const assignedGames = [];
  const availableGames = [];

  for (let i = 0; i < 4; i += 1) {
    const source = GAME_POOL[(seed + i) % GAME_POOL.length];

    assignedGames.push({
      ...source,
      id: `${source.gameId}-A-${seed}-${i}`,
      assignedDate: `2025-10-0${Math.min(9, i + 2)}`,
      clientStatus: i % 2 === 0 ? "Active" : "Inactive",
    });
  }

  for (let i = 4; i < 10; i += 1) {
    const source = GAME_POOL[(seed + i) % GAME_POOL.length];

    availableGames.push({
      ...source,
      id: `${source.gameId}-B-${seed}-${i}`,
      assignedDate: "",
      clientStatus: source.status,
    });
  }

  return {
    assignedGames,
    availableGames,
  };
}

function buildClients(total = 152) {
  return Array.from({ length: total }, (_, index) => {
    const item = baseClients[index % baseClients.length];
    const num = index + 1;
    const details = getDefaultClientGames(num);

    return {
      ...item,
      id: `CLT-${String(num).padStart(3, "0")}`,
      assignedGames: details.assignedGames,
      availableGames: details.availableGames,
    };
  });
}

function loadClientsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return buildClients(152);

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return buildClients(152);
    }

    return parsed;
  } catch {
    return buildClients(152);
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

function FilterSelect({
  label,
  value,
  options,
  onChange,
  className = "",
  menuClassName = "",
  disabled = false,
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

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  return (
    <div className={`relative min-w-0 ${className}`} ref={wrapperRef}>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
            }
          }}
          className={`flex h-11 w-full items-center justify-between rounded-xl border px-4 text-sm transition-all ${
            disabled
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
              : open
                ? "border-cyan-300 bg-white ring-2 ring-cyan-100 dark:border-cyan-400 dark:bg-slate-800 dark:ring-cyan-500/20"
                : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
          }`}>
          <span
            className={`truncate ${
              disabled
                ? "text-slate-400 dark:text-slate-500"
                : "text-slate-700 dark:text-slate-100"
            }`}>
            {value}
          </span>

          <ChevronDown
            className={`ml-3 h-4 w-4 shrink-0 ${
              disabled ? "text-slate-300 dark:text-slate-600" : "text-slate-400"
            } transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {!disabled && open && (
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
    }

    if (preset === "Yesterday") {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      start = startOfDay(y);
      end = endOfDay(y);
    }

    if (preset === "This Week") {
      start = startOfWeek(now);
      end = endOfWeek(now);
    }

    if (preset === "Last Week") {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      start = startOfWeek(d);
      end = endOfWeek(d);
    }

    if (preset === "This Month") {
      start = startOfMonth(now);
      end = endOfMonth(now);
    }

    if (preset === "Last Month") {
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
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>

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

function InfoLabel({ children }) {
  return (
    <div className="mb-2 flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
      <span>{children}</span>
      <Info className="h-3.5 w-3.5 text-slate-400" />
    </div>
  );
}

function ExpandedClientPanel({ row, onAssignGames, onUnassignGames }) {
  const [tab, setTab] = useState("assigned");
  const [provider, setProvider] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("Active");
  const [keyword, setKeyword] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setSelectedIds([]);
    setProvider("All");
    setCategory("All");
    setKeyword("");
    setStatus(tab === "assigned" ? "Active" : "All");
  }, [tab, row.id]);

  const currentData =
    tab === "assigned" ? row.assignedGames : row.availableGames;

  const filteredGames = useMemo(() => {
    const keywordQuery = keyword.trim().toLowerCase();

    return currentData.filter((game) => {
      const providerMatch = provider === "All" || game.provider === provider;
      const categoryMatch = category === "All" || game.category === category;
      const statusMatch = status === "All" || game.clientStatus === status;
      const keywordMatch =
        !keywordQuery ||
        game.gameName.toLowerCase().includes(keywordQuery) ||
        game.gameId.toLowerCase().includes(keywordQuery);

      return providerMatch && categoryMatch && statusMatch && keywordMatch;
    });
  }, [currentData, provider, category, status, keyword]);

  const toggleSelected = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAllCurrent = () => {
    const allIds = filteredGames.map((item) => item.id);

    if (allIds.length > 0 && allIds.every((id) => selectedIds.includes(id))) {
      setSelectedIds((prev) => prev.filter((id) => !allIds.includes(id)));
      return;
    }

    setSelectedIds((prev) => Array.from(new Set([...prev, ...allIds])));
  };

  const handleReset = () => {
    setProvider("All");
    setCategory("All");
    setKeyword("");
    setStatus(tab === "assigned" ? "Active" : "All");
  };

  const handleAction = () => {
    if (tab === "assigned") {
      onUnassignGames(row.id, selectedIds);
    } else {
      onAssignGames(row.id, selectedIds);
    }

    setSelectedIds([]);
  };

  return (
    <div className="bg-[#eef4ff] px-6 py-7 dark:bg-slate-900/30">
      <div className="mb-6 flex items-center gap-8">
        <button
          type="button"
          onClick={() => setTab("assigned")}
          className={`relative pb-3 text-[15px] font-semibold transition ${
            tab === "assigned"
              ? "text-slate-800 dark:text-white"
              : "text-slate-400 dark:text-slate-500"
          }`}>
          Assigned Game List
          {tab === "assigned" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-emerald-400" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setTab("available")}
          className={`relative pb-3 text-[15px] font-semibold transition ${
            tab === "available"
              ? "text-slate-800 dark:text-white"
              : "text-slate-400 dark:text-slate-500"
          }`}>
          Available Game List
          {tab === "available" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-emerald-400" />
          )}
        </button>
      </div>

      <div className="rounded-[28px] border border-emerald-300 bg-white dark:border-cyan-500/20 dark:bg-slate-950">
        <div className="border-b border-cyan-200 px-6 py-6 dark:border-cyan-500/20">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto_auto]">
            <FilterSelect
              label="Core Provider"
              value={provider}
              onChange={setProvider}
              options={["All", ...PROVIDERS]}
            />

            <FilterSelect
              label="Category"
              value={category}
              onChange={setCategory}
              options={["All", ...GAME_CATEGORIES]}
            />

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Game Name
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by Game Name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <FilterSelect
              label="Status"
              value={status}
              onChange={setStatus}
              options={["All", ...CLIENT_STATUSES]}
            />

            <div className="flex items-end">
              <button
                type="button"
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

        <div className="max-h-[280px] overflow-auto px-6 py-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600 dark:text-slate-300">
                <th className="w-[42px] pb-4">
                  <input
                    type="checkbox"
                    checked={
                      filteredGames.length > 0 &&
                      filteredGames.every((item) =>
                        selectedIds.includes(item.id),
                      )
                    }
                    onChange={toggleAllCurrent}
                    className="h-4 w-4 rounded"
                  />
                </th>
                <th className="pb-4 font-semibold">Provider</th>
                <th className="pb-4 font-semibold">Category</th>
                <th className="pb-4 font-semibold">Game ID</th>
                <th className="pb-4 font-semibold">Game Name</th>
                <th className="pb-4 font-semibold">Client Status</th>
                {tab === "assigned" && (
                  <th className="pb-4 font-semibold">Assigned Date</th>
                )}
              </tr>
            </thead>

            <tbody>
              {filteredGames.map((game) => (
                <tr
                  key={game.id}
                  className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(game.id)}
                      onChange={() => toggleSelected(game.id)}
                      className="h-4 w-4 rounded"
                    />
                  </td>
                  <td className="py-4 text-slate-700 dark:text-slate-300">
                    {game.provider}
                  </td>
                  <td className="py-4 text-slate-700 dark:text-slate-300">
                    {game.category}
                  </td>
                  <td className="py-4 text-slate-700 dark:text-slate-300">
                    {game.gameId}
                  </td>
                  <td className="py-4 text-slate-700 dark:text-slate-300">
                    {game.gameName}
                  </td>
                  <td className="py-4">
                    <StatusBadge status={game.clientStatus} />
                  </td>
                  {tab === "assigned" && (
                    <td className="py-4 text-slate-700 dark:text-slate-300">
                      {game.assignedDate}
                    </td>
                  )}
                </tr>
              ))}

              {filteredGames.length === 0 && (
                <tr>
                  <td
                    colSpan={tab === "assigned" ? 7 : 6}
                    className="py-8 text-center text-slate-400 dark:text-slate-500">
                    No games found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Selected: {selectedIds.length}
          </span>

          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={handleAction}
            className={`inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold text-white ${
              selectedIds.length === 0
                ? "cursor-not-allowed bg-emerald-200 dark:bg-slate-700"
                : "bg-linear-to-r from-cyan-400 to-emerald-400"
            }`}>
            {tab === "assigned" ? "Unassign" : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ClientFormView({
  mode,
  form,
  setForm,
  onSave,
  onCancel,
  onGenerateSecret,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative overflow-visible rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-cyan-500/30 dark:bg-slate-950">
      <div className="relative rounded-t-[20px] border-b border-cyan-300 bg-slate-50 px-5 py-5 dark:border-cyan-500/30 dark:bg-slate-900">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover object-right opacity-15 dark:opacity-10"
        />

        <div className="relative z-10">
          <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800 dark:text-white">
            {mode === "create" ? "Create new client" : "Edit client"}
          </h1>
        </div>
      </div>

      <div className="relative z-10 overflow-visible px-5 py-5">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <InfoLabel>
                Client code <span className="text-red-500">*</span>
              </InfoLabel>
              <input
                type="text"
                value={form.clientCode}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    clientCode: e.target.value.toUpperCase(),
                    formError: "",
                  }))
                }
                placeholder="Enter Client code"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.clientName}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    clientName: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="Enter Client name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <InfoLabel>
                Username <span className="text-red-500">*</span>
              </InfoLabel>
              <input
                type="text"
                value={form.username}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    username: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="Enter User name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                      formError: "",
                    }))
                  }
                  placeholder="Enter password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p>✓ Includes both uppercase and lowercase letters</p>
                <p>✓ Contains at least one special character</p>
                <p>✓ Minimum length of 6 characters</p>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Confirm password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                      formError: "",
                    }))
                  }
                  placeholder="Confirm password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showConfirmPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <FilterSelect
              label={
                <>
                  Support Currency <span className="text-red-500">*</span>
                </>
              }
              value={form.supportCurrency}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  supportCurrency: value,
                  formError: "",
                }))
              }
              options={["Select currency", ...CURRENCIES]}
            />

            <FilterSelect
              label={
                <>
                  Default Currency <span className="text-red-500">*</span>
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
              options={["Select currency", ...CURRENCIES]}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                API Base URL <span className="text-red-500">*</span>
              </label>
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
                placeholder="Enter API Base URL"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                API Key / Secret <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.apiKeySecret}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      apiKeySecret: e.target.value,
                      formError: "",
                    }))
                  }
                  placeholder="Generate API Key / Secret"
                  className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={onGenerateSecret}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-4 text-sm font-semibold text-white shadow-sm">
                  <KeyRound className="h-4 w-4" />
                  <span>Generate</span>
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Please make sure to save your API Key/Secret
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                IP Whitelist <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.ipWhitelist}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    ipWhitelist: e.target.value,
                    formError: "",
                  }))
                }
                rows={6}
                className="min-h-[120px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400"
              />
            </div>

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
              options={CLIENT_STATUSES}
              className="z-[120]"
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Provider <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <FilterSelect
                  value={form.coreProvider}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      coreProvider: value,
                      formError: "",
                    }))
                  }
                  options={["Select core provider", ...PROVIDERS]}
                  className="z-[110]"
                />

                <FilterSelect
                  value={form.provider}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      provider: value,
                      formError: "",
                    }))
                  }
                  options={["Select provider", ...PROVIDERS]}
                  className="z-[100]"
                />
              </div>

              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-500">
                <Plus className="h-4 w-4" />
                <span>Add Provider</span>
              </button>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Revenue Model <span className="text-red-500">*</span>
              </label>

              <div className="space-y-4">
                {REVENUE_MODE_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <input
                      type="radio"
                      name="revenue-model"
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

                <input
                  type="text"
                  value={form.revenuePercent}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      revenuePercent: e.target.value,
                      formError: "",
                    }))
                  }
                  placeholder="Enter number percent"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Description
              </label>
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
                placeholder="Fast-paced arcade runner through outer space."
                rows={8}
                className="min-h-[180px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
              <div className="mt-1 flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>Max length: 500 chars</span>
                <span>{form.description.length}/500</span>
              </div>
            </div>
          </div>
        </div>

        {form.formError && (
          <p className="mt-5 text-center text-sm font-medium text-red-500">
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

function ClientListView({
  createdAtFilter,
  setCreatedAtFilter,
  keyword,
  setKeyword,
  defaultCurrency,
  setDefaultCurrency,
  status,
  setStatus,
  onSearch,
  onReset,
  onAdd,
  rows,
  totalEntries,
  startIndex,
  endIndex,
  rowsPerPage,
  setRowsPerPage,
  safeCurrentPage,
  totalPages,
  paginationItems,
  onPrevious,
  onNext,
  onEllipsisClick,
  setCurrentPage,
  onEdit,
  onToggleStatus,
  expandedClientId,
  onToggleExpand,
  onAssignGames,
  onUnassignGames,
}) {
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
              View Client List
            </h1>

            <button
              type="button"
              onClick={onAdd}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Add new client</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1.1fr_1fr_1fr_auto_auto]">
            <DateRangePicker
              label="Created at"
              value={createdAtFilter}
              onChange={setCreatedAtFilter}
            />

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Search by client name
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by name/code"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <FilterSelect
              label="Default Currency"
              value={defaultCurrency}
              onChange={setDefaultCurrency}
              options={["All", ...CURRENCIES]}
            />

            <FilterSelect
              label="Status"
              value={status}
              onChange={setStatus}
              options={["All", ...CLIENT_STATUSES]}
            />

            <div className="flex items-end">
              <button
                type="button"
                onClick={onSearch}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={onReset}
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
              <th className="w-[130px] whitespace-nowrap px-4 py-4 font-semibold">
                Client ID
              </th>
              <th className="w-[140px] whitespace-nowrap px-4 py-4 font-semibold">
                Client Code
              </th>
              <th className="w-[220px] whitespace-nowrap px-4 py-4 font-semibold">
                Client name
              </th>
              <th className="w-[180px] whitespace-nowrap px-4 py-4 font-semibold">
                Default Currency
              </th>
              <th className="w-[140px] whitespace-nowrap px-4 py-4 font-semibold">
                Status
              </th>
              <th className="w-[190px] whitespace-nowrap px-4 py-4 font-semibold">
                Created Date
              </th>
              <th className="w-[190px] whitespace-nowrap px-4 py-4 font-semibold">
                Last Updated
              </th>
              <th className="w-[220px] whitespace-nowrap px-4 py-4 font-semibold">
                Action (Global)
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const expanded = expandedClientId === row.id;

              return (
                <Fragment key={row.id}>
                  <tr className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                    <td className="whitespace-nowrap px-4 py-3">
                      <button
                        type="button"
                        onClick={() => onToggleExpand(row.id)}
                        className="flex items-center gap-3">
                        {expanded ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-blue-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 text-blue-500" />
                        )}
                        <span className="font-medium text-blue-500">
                          {row.id}
                        </span>
                      </button>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      {row.clientCode}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.clientName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.defaultCurrency}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.createdDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.lastUpdated}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <ActionButtons
                        enabled={row.status === "Active"}
                        onEdit={() => onEdit(row)}
                        onToggleStatus={() => onToggleStatus(row.id)}
                      />
                    </td>
                  </tr>

                  {expanded && (
                    <tr className="border-t border-slate-100 dark:border-slate-800">
                      <td colSpan={8} className="px-0 py-0">
                        <ExpandedClientPanel
                          row={row}
                          onAssignGames={onAssignGames}
                          onUnassignGames={onUnassignGames}
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                  No matching clients found.
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
            onClick={onPrevious}
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
                    onClick={() => onEllipsisClick(item.direction)}
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
            onClick={onNext}
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

function ClientManagementPage() {
  const [rows, setRows] = useState(() => loadClientsFromStorage());

  const [createdAtFilter, setCreatedAtFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [keyword, setKeyword] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("All");
  const [status, setStatus] = useState("All");

  const [appliedFilters, setAppliedFilters] = useState({
    createdAtFilter: {
      startDate: null,
      endDate: null,
    },
    keyword: "",
    defaultCurrency: "All",
    status: "All",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [mode, setMode] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [expandedClientId, setExpandedClientId] = useState(null);

  const [form, setForm] = useState({
    clientCode: "",
    clientName: "",
    username: "",
    password: "",
    confirmPassword: "",
    supportCurrency: "Select currency",
    defaultCurrency: "Select currency",
    apiBaseUrl: "",
    apiKeySecret: "",
    ipWhitelist: "",
    status: "Active",
    coreProvider: "Select core provider",
    provider: "Select provider",
    revenueModel: "Revenue Share %",
    revenuePercent: "",
    description: "",
    formError: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const keywordQuery = appliedFilters.keyword.trim().toLowerCase();

      const keywordMatch =
        !keywordQuery ||
        row.clientName.toLowerCase().includes(keywordQuery) ||
        row.clientCode.toLowerCase().includes(keywordQuery) ||
        row.id.toLowerCase().includes(keywordQuery);

      const currencyMatch =
        appliedFilters.defaultCurrency === "All" ||
        row.defaultCurrency === appliedFilters.defaultCurrency;

      const statusMatch =
        appliedFilters.status === "All" || row.status === appliedFilters.status;

      const rowDate = parseTableDate(row.createdDate);
      const startDate = appliedFilters.createdAtFilter.startDate;
      const endDate = appliedFilters.createdAtFilter.endDate;

      let createdAtMatch = true;

      if (startDate && rowDate) {
        createdAtMatch = rowDate >= startOfDay(startDate);
      }

      if (createdAtMatch && endDate && rowDate) {
        createdAtMatch = rowDate <= endOfDay(endDate);
      }

      return keywordMatch && currencyMatch && statusMatch && createdAtMatch;
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

  const resetForm = () => {
    setForm({
      clientCode: "",
      clientName: "",
      username: "",
      password: "",
      confirmPassword: "",
      supportCurrency: "Select currency",
      defaultCurrency: "Select currency",
      apiBaseUrl: "",
      apiKeySecret: "",
      ipWhitelist: "",
      status: "Active",
      coreProvider: "Select core provider",
      provider: "Select provider",
      revenueModel: "Revenue Share %",
      revenuePercent: "",
      description: "",
      formError: "",
    });
  };

  const handleSearch = () => {
    setAppliedFilters({
      createdAtFilter,
      keyword,
      defaultCurrency,
      status,
    });
    setCurrentPage(1);
  };

  const handleReset = () => {
    setCreatedAtFilter({
      startDate: null,
      endDate: null,
    });
    setKeyword("");
    setDefaultCurrency("All");
    setStatus("All");
    setAppliedFilters({
      createdAtFilter: {
        startDate: null,
        endDate: null,
      },
      keyword: "",
      defaultCurrency: "All",
      status: "All",
    });
    setRowsPerPage(10);
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    setEditingId(null);
    resetForm();
    setMode("create");
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setForm({
      clientCode: row.clientCode,
      clientName: row.clientName,
      username: row.username || "",
      password: "",
      confirmPassword: "",
      supportCurrency: row.supportCurrency || "Select currency",
      defaultCurrency: row.defaultCurrency || "Select currency",
      apiBaseUrl: row.apiBaseUrl || "",
      apiKeySecret: row.apiKeySecret || "",
      ipWhitelist: row.ipWhitelist || "",
      status: row.status || "Active",
      coreProvider: row.coreProvider || "Select core provider",
      provider: row.provider || "Select provider",
      revenueModel: row.revenueModel || "Revenue Share %",
      revenuePercent: row.revenuePercent || "",
      description: row.description || "",
      formError: "",
    });
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("list");
    setEditingId(null);
    resetForm();
  };

  const handleGenerateSecret = () => {
    setForm((prev) => ({
      ...prev,
      apiKeySecret: generateSecret(),
      formError: "",
    }));
  };

  const validateForm = () => {
    if (!form.clientCode.trim()) return "Client code is required.";
    if (!form.clientName.trim()) return "Client name is required.";
    if (!form.username.trim()) return "Username is required.";

    if (!form.password.trim() && mode === "create") {
      return "Password is required.";
    }

    if (!form.confirmPassword.trim() && mode === "create") {
      return "Confirm password is required.";
    }

    if (
      (mode === "create" || form.password || form.confirmPassword) &&
      form.password !== form.confirmPassword
    ) {
      return "Password and confirm password do not match.";
    }

    if (form.supportCurrency === "Select currency") {
      return "Support Currency is required.";
    }

    if (form.defaultCurrency === "Select currency") {
      return "Default Currency is required.";
    }

    if (!form.apiBaseUrl.trim()) return "API Base URL is required.";
    if (!form.apiKeySecret.trim()) return "API Key / Secret is required.";
    if (!form.ipWhitelist.trim()) return "IP Whitelist is required.";

    if (form.coreProvider === "Select core provider") {
      return "Core Provider is required.";
    }

    if (form.provider === "Select provider") {
      return "Provider is required.";
    }

    if (!form.revenuePercent.trim()) {
      return "Revenue percent is required.";
    }

    return "";
  };

  const handleSave = () => {
    const error = validateForm();

    if (error) {
      setForm((prev) => ({
        ...prev,
        formError: error,
      }));
      return;
    }

    const now = formatDateTime(new Date());

    if (mode === "create") {
      const nextNumber =
        rows.reduce((max, row) => {
          const value = Number(row.id.replace("CLT-", ""));
          return Number.isNaN(value) ? max : Math.max(max, value);
        }, 0) + 1;

      const details = getDefaultClientGames(nextNumber);

      const newRow = {
        id: `CLT-${String(nextNumber).padStart(3, "0")}`,
        clientCode: form.clientCode.trim().toUpperCase(),
        clientName: form.clientName.trim(),
        defaultCurrency: form.defaultCurrency,
        status: form.status,
        createdDate: now,
        lastUpdated: now,
        username: form.username.trim(),
        supportCurrency: form.supportCurrency,
        apiBaseUrl: form.apiBaseUrl.trim(),
        apiKeySecret: form.apiKeySecret.trim(),
        description: form.description.trim(),
        ipWhitelist: form.ipWhitelist.trim(),
        coreProvider: form.coreProvider,
        provider: form.provider,
        revenueModel: form.revenueModel,
        revenuePercent: form.revenuePercent.trim(),
        assignedGames: details.assignedGames,
        availableGames: details.availableGames,
      };

      setRows((prev) => [newRow, ...prev]);
    }

    if (mode === "edit" && editingId) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? {
                ...row,
                clientCode: form.clientCode.trim().toUpperCase(),
                clientName: form.clientName.trim(),
                defaultCurrency: form.defaultCurrency,
                status: form.status,
                lastUpdated: now,
                username: form.username.trim(),
                supportCurrency: form.supportCurrency,
                apiBaseUrl: form.apiBaseUrl.trim(),
                apiKeySecret: form.apiKeySecret.trim(),
                description: form.description.trim(),
                ipWhitelist: form.ipWhitelist.trim(),
                coreProvider: form.coreProvider,
                provider: form.provider,
                revenueModel: form.revenueModel,
                revenuePercent: form.revenuePercent.trim(),
              }
            : row,
        ),
      );
    }

    handleCancel();
  };

  const handleToggleStatus = (id) => {
    const now = formatDateTime(new Date());

    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              status: row.status === "Active" ? "Inactive" : "Active",
              lastUpdated: now,
            }
          : row,
      ),
    );
  };

  const handleAssignGames = (clientId, gameIds) => {
    const now = formatDateTime(new Date());

    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== clientId) return row;

        const movingGames = row.availableGames.filter((game) =>
          gameIds.includes(game.id),
        );

        const stayedAvailable = row.availableGames.filter(
          (game) => !gameIds.includes(game.id),
        );

        const newAssigned = [
          ...movingGames.map((game) => ({
            ...game,
            assignedDate: now,
            clientStatus: "Active",
          })),
          ...row.assignedGames,
        ];

        return {
          ...row,
          assignedGames: newAssigned,
          availableGames: stayedAvailable,
          lastUpdated: now,
        };
      }),
    );
  };

  const handleUnassignGames = (clientId, gameIds) => {
    const now = formatDateTime(new Date());

    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== clientId) return row;

        const movingGames = row.assignedGames.filter((game) =>
          gameIds.includes(game.id),
        );

        const stayedAssigned = row.assignedGames.filter(
          (game) => !gameIds.includes(game.id),
        );

        const newAvailable = [
          ...movingGames.map((game) => ({
            ...game,
            assignedDate: "",
          })),
          ...row.availableGames,
        ];

        return {
          ...row,
          assignedGames: stayedAssigned,
          availableGames: newAvailable,
          lastUpdated: now,
        };
      }),
    );
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

  const handleToggleExpand = (id) => {
    setExpandedClientId((prev) => (prev === id ? null : id));
  };

  if (mode === "create" || mode === "edit") {
    return (
      <ClientFormView
        mode={mode}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onCancel={handleCancel}
        onGenerateSecret={handleGenerateSecret}
      />
    );
  }

  return (
    <ClientListView
      createdAtFilter={createdAtFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      keyword={keyword}
      setKeyword={setKeyword}
      defaultCurrency={defaultCurrency}
      setDefaultCurrency={setDefaultCurrency}
      status={status}
      setStatus={setStatus}
      onSearch={handleSearch}
      onReset={handleReset}
      onAdd={handleAddNew}
      rows={currentRows}
      totalEntries={totalEntries}
      startIndex={startIndex}
      endIndex={endIndex}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      safeCurrentPage={safeCurrentPage}
      totalPages={totalPages}
      paginationItems={paginationItems}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onEllipsisClick={handleEllipsisClick}
      setCurrentPage={setCurrentPage}
      onEdit={handleEdit}
      onToggleStatus={handleToggleStatus}
      expandedClientId={expandedClientId}
      onToggleExpand={handleToggleExpand}
      onAssignGames={handleAssignGames}
      onUnassignGames={handleUnassignGames}
    />
  );
}

export default ClientManagementPage;
