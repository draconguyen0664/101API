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
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";

const STORAGE_KEY = "sysop-management-rows-v4";
const STATUS_OPTIONS = ["All", "Active", "Inactive"];
const FORM_STATUS_OPTIONS = ["Active", "Inactive"];

const PERMISSION_TEMPLATE = {
  gameManagement: {
    enabled: true,
    editGame: true,
  },
  clientManagement: {
    enabled: true,
    addClient: true,
    editClient: true,
    manageGameByClient: true,
  },
  gameProviderManagement: {
    enabled: true,
    addProvider: true,
    editProvider: true,
  },
  sysOpAccessManagement: {
    enabled: true,
    addSysOp: true,
    editSysOp: true,
    deleteSysOp: true,
  },
};

const baseSysOps = [
  {
    id: "SOP-009",
    username: "admin.root",
    fullName: "Nguyen Nam",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
  {
    id: "SOP-008",
    username: "a.nguyen",
    fullName: "Nguyen A",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
  {
    id: "SOP-007",
    username: "t.le",
    fullName: "Le Thao",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
  {
    id: "SOP-006",
    username: "m.tran",
    fullName: "Tran Minh",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
  {
    id: "SOP-005",
    username: "p.pham",
    fullName: "Pham Phuong",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
  {
    id: "SOP-004",
    username: "h.vo",
    fullName: "Vo Hai",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
  {
    id: "SOP-003",
    username: "b.ngo",
    fullName: "Ngo Binh",
    status: "Active",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
  {
    id: "SOP-002",
    username: "t.ngo",
    fullName: "Ngo Trinh",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
  {
    id: "SOP-001",
    username: "t.ngo",
    fullName: "Ngo Trinh",
    status: "Inactive",
    createdAt: "03/10/2025 09:15",
    lastLogin: "03/10/2025 09:15",
    password: "Admin@123",
    permissions: PERMISSION_TEMPLATE,
  },
];

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createEmptySysOpForm() {
  return {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    status: "Active",
    permissions: deepClone(PERMISSION_TEMPLATE),
    formError: "",
  };
}

function buildSysOps(total = 152) {
  return Array.from({ length: total }, (_, index) => {
    const item = baseSysOps[index % baseSysOps.length];
    const num = total - index;

    return {
      ...item,
      id: `SOP-${String(num).padStart(3, "0")}`,
      permissions: deepClone(item.permissions || PERMISSION_TEMPLATE),
    };
  });
}

function loadSysOpsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return buildSysOps(152);

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return buildSysOps(152);
    }

    return parsed.map((item) => ({
      ...item,
      permissions: deepClone(item.permissions || PERMISSION_TEMPLATE),
    }));
  } catch {
    return buildSysOps(152);
  }
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

function ActionButtons({ enabled, onEdit, onToggleStatus, onDelete }) {
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

      <button
        type="button"
        onClick={onDelete}
        className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 dark:bg-red-500/10 dark:text-red-300">
        <Trash2 className="h-3 w-3" />
        <span>Delete</span>
      </button>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  showPassword,
  onToggleShow,
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
        />

        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200">
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

function PermissionSwitch({
  checked,
  onChange,
  label,
  bold = false,
  disabled = false,
}) {
  return (
    <label
      className={`flex items-center gap-2 text-sm ${
        disabled
          ? "cursor-not-allowed text-slate-400 dark:text-slate-500"
          : "cursor-pointer text-slate-700 dark:text-slate-200"
      }`}>
      <button
        type="button"
        onClick={() => {
          if (!disabled) onChange();
        }}
        disabled={disabled}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
          disabled
            ? "bg-slate-200 opacity-60 dark:bg-slate-700"
            : checked
              ? "bg-linear-to-r from-cyan-400 to-emerald-400"
              : "bg-slate-200 dark:bg-slate-700"
        }`}>
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white transition ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>

      <span className={bold ? "font-semibold text-cyan-500" : ""}>{label}</span>
    </label>
  );
}

function SysOpFormView({
  mode,
  form,
  setForm,
  onSave,
  onCancel,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) {
  const togglePermissionGroup = (groupKey) => {
    setForm((prev) => {
      const currentGroup = prev.permissions[groupKey];
      const nextEnabled = !currentGroup.enabled;
      const nextGroup = {};

      Object.keys(currentGroup).forEach((key) => {
        if (key === "enabled") {
          nextGroup[key] = nextEnabled;
        } else {
          nextGroup[key] = nextEnabled;
        }
      });

      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [groupKey]: nextGroup,
        },
        formError: "",
      };
    });
  };

  const togglePermissionChild = (groupKey, childKey) => {
    setForm((prev) => {
      const group = prev.permissions[groupKey];

      if (!group.enabled) {
        return prev;
      }

      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [groupKey]: {
            ...group,
            [childKey]: !group[childKey],
          },
        },
        formError: "",
      };
    });
  };

  const gameManagementEnabled = form.permissions.gameManagement.enabled;
  const clientManagementEnabled = form.permissions.clientManagement.enabled;
  const gameProviderEnabled = form.permissions.gameProviderManagement.enabled;
  const sysOpEnabled = form.permissions.sysOpAccessManagement.enabled;

  return (
    <div className="overflow-hidden rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-cyan-500/30 dark:bg-slate-950">
      <div className="relative rounded-t-[20px] border-b border-cyan-300 bg-slate-50 px-5 py-5 dark:border-cyan-500/30 dark:bg-slate-900">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover object-right opacity-15 dark:opacity-10"
        />

        <div className="relative z-10">
          <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800 dark:text-white">
            {mode === "create" ? "Create new SysOp" : "Edit SysOp"}
          </h1>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="rounded-xl border border-transparent bg-transparent">
          <h3 className="mb-5 text-[20px] font-bold text-cyan-500">
            The Details
          </h3>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <FieldLabel>
                Fullname <span className="text-red-500">*</span>
              </FieldLabel>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="Enter fullname"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <FieldLabel>
                Username <span className="text-red-500">*</span>
              </FieldLabel>
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
                placeholder="Enter username"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <div>
              <PasswordInput
                label={
                  <>
                    Password <span className="text-red-500">*</span>
                  </>
                }
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="Enter password"
                showPassword={showPassword}
                onToggleShow={() => setShowPassword((prev) => !prev)}
              />

              <div className="mt-3 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                <p>✓ Includes both uppercase and lowercase letters</p>
                <p>✓ Contains at least one special character</p>
                <p>✓ Minimum length of 8 characters</p>
              </div>
            </div>

            <div>
              <PasswordInput
                label={
                  <>
                    Confirm password <span className="text-red-500">*</span>
                  </>
                }
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                    formError: "",
                  }))
                }
                placeholder="Confirm password"
                showPassword={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword((prev) => !prev)}
              />
            </div>
          </div>

          <div className="mt-4 max-w-[420px]">
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
            />
          </div>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          <h3 className="mb-5 text-[20px] font-bold text-cyan-500">
            Permission
          </h3>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <PermissionSwitch
                checked={gameManagementEnabled}
                onChange={() => togglePermissionGroup("gameManagement")}
                label="Game Management"
                bold
              />

              <div className="pl-6">
                <PermissionSwitch
                  checked={
                    gameManagementEnabled &&
                    form.permissions.gameManagement.editGame
                  }
                  onChange={() =>
                    togglePermissionChild("gameManagement", "editGame")
                  }
                  label="Edit/Enable/Disable Game"
                  disabled={!gameManagementEnabled}
                />
              </div>

              <div className="pt-2" />

              <PermissionSwitch
                checked={clientManagementEnabled}
                onChange={() => togglePermissionGroup("clientManagement")}
                label="Client Management"
                bold
              />

              <div className="space-y-3 pl-6">
                <PermissionSwitch
                  checked={
                    clientManagementEnabled &&
                    form.permissions.clientManagement.addClient
                  }
                  onChange={() =>
                    togglePermissionChild("clientManagement", "addClient")
                  }
                  label="Add New Client"
                  disabled={!clientManagementEnabled}
                />
                <PermissionSwitch
                  checked={
                    clientManagementEnabled &&
                    form.permissions.clientManagement.editClient
                  }
                  onChange={() =>
                    togglePermissionChild("clientManagement", "editClient")
                  }
                  label="Edit/Enable/Disable Client"
                  disabled={!clientManagementEnabled}
                />
                <PermissionSwitch
                  checked={
                    clientManagementEnabled &&
                    form.permissions.clientManagement.manageGameByClient
                  }
                  onChange={() =>
                    togglePermissionChild(
                      "clientManagement",
                      "manageGameByClient",
                    )
                  }
                  label="Manage Game By Client"
                  disabled={!clientManagementEnabled}
                />
              </div>
            </div>

            <div className="space-y-4">
              <PermissionSwitch
                checked={gameProviderEnabled}
                onChange={() => togglePermissionGroup("gameProviderManagement")}
                label="Game Provider Management"
                bold
              />

              <div className="space-y-3 pl-6">
                <PermissionSwitch
                  checked={
                    gameProviderEnabled &&
                    form.permissions.gameProviderManagement.addProvider
                  }
                  onChange={() =>
                    togglePermissionChild(
                      "gameProviderManagement",
                      "addProvider",
                    )
                  }
                  label="Add New Provider"
                  disabled={!gameProviderEnabled}
                />
                <PermissionSwitch
                  checked={
                    gameProviderEnabled &&
                    form.permissions.gameProviderManagement.editProvider
                  }
                  onChange={() =>
                    togglePermissionChild(
                      "gameProviderManagement",
                      "editProvider",
                    )
                  }
                  label="Edit/Enable/Disable Game Provider"
                  disabled={!gameProviderEnabled}
                />
              </div>

              <div className="pt-2" />

              <PermissionSwitch
                checked={sysOpEnabled}
                onChange={() => togglePermissionGroup("sysOpAccessManagement")}
                label="SysOp & Access Management"
                bold
              />

              <div className="space-y-3 pl-6">
                <PermissionSwitch
                  checked={
                    sysOpEnabled &&
                    form.permissions.sysOpAccessManagement.addSysOp
                  }
                  onChange={() =>
                    togglePermissionChild("sysOpAccessManagement", "addSysOp")
                  }
                  label="Add New SysOp"
                  disabled={!sysOpEnabled}
                />
                <PermissionSwitch
                  checked={
                    sysOpEnabled &&
                    form.permissions.sysOpAccessManagement.editSysOp
                  }
                  onChange={() =>
                    togglePermissionChild("sysOpAccessManagement", "editSysOp")
                  }
                  label="Edit/Enable/Disable SysOp"
                  disabled={!sysOpEnabled}
                />
                <PermissionSwitch
                  checked={
                    sysOpEnabled &&
                    form.permissions.sysOpAccessManagement.deleteSysOp
                  }
                  onChange={() =>
                    togglePermissionChild(
                      "sysOpAccessManagement",
                      "deleteSysOp",
                    )
                  }
                  label="Delete SysOp"
                  disabled={!sysOpEnabled}
                />
              </div>
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
    </div>
  );
}

function SysOpManagementPage() {
  const [rows, setRows] = useState(() => loadSysOpsFromStorage());

  const [createdAtFilter, setCreatedAtFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("All");

  const [appliedFilters, setAppliedFilters] = useState({
    createdAtFilter: {
      startDate: null,
      endDate: null,
    },
    username: "",
    status: "All",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewMode, setViewMode] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(createEmptySysOpForm());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const query = appliedFilters.username.trim().toLowerCase();

      const usernameMatch =
        !query ||
        row.username.toLowerCase().includes(query) ||
        row.fullName.toLowerCase().includes(query) ||
        row.id.toLowerCase().includes(query);

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

      return usernameMatch && statusMatch && createdAtMatch;
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
      username,
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
    setUsername("");
    setStatus("All");

    setAppliedFilters({
      createdAtFilter: resetDate,
      username: "",
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
              lastLogin: now,
            }
          : row,
      ),
    );
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleAddNew = () => {
    setEditingId(null);
    setForm(createEmptySysOpForm());
    setShowPassword(false);
    setShowConfirmPassword(false);
    setViewMode("create");
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setForm({
      fullName: row.fullName || "",
      username: row.username || "",
      password: row.password || "",
      confirmPassword: row.password || "",
      status: row.status || "Active",
      permissions: deepClone(row.permissions || PERMISSION_TEMPLATE),
      formError: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setViewMode("edit");
  };

  const handleCancelForm = () => {
    setViewMode("list");
    setEditingId(null);
    setForm(createEmptySysOpForm());
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasLength = password.length >= 8;
    return hasUpper && hasLower && hasSpecial && hasLength;
  };

  const validateForm = () => {
    if (!form.fullName.trim()) return "Fullname is required.";
    if (!form.username.trim()) return "Username is required.";
    if (!form.password.trim()) return "Password is required.";
    if (!validatePassword(form.password)) {
      return "Password must have uppercase, lowercase, special character and minimum 8 characters.";
    }
    if (!form.confirmPassword.trim()) return "Confirm password is required.";
    if (form.password !== form.confirmPassword) {
      return "Confirm password does not match.";
    }
    if (!form.status.trim()) return "Status is required.";

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
          const value = Number(row.id.replace("SOP-", ""));
          return Number.isNaN(value) ? max : Math.max(max, value);
        }, 0) + 1;

      const newRow = {
        id: `SOP-${String(nextNumber).padStart(3, "0")}`,
        username: form.username.trim(),
        fullName: form.fullName.trim(),
        status: form.status,
        createdAt: now,
        lastLogin: now,
        password: form.password,
        permissions: deepClone(form.permissions),
      };

      setRows((prev) => [newRow, ...prev]);
    }

    if (viewMode === "edit" && editingId) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? {
                ...row,
                username: form.username.trim(),
                fullName: form.fullName.trim(),
                status: form.status,
                password: form.password,
                permissions: deepClone(form.permissions),
              }
            : row,
        ),
      );
    }

    setViewMode("list");
    setEditingId(null);
    setForm(createEmptySysOpForm());
    setShowPassword(false);
    setShowConfirmPassword(false);
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
      <SysOpFormView
        mode={viewMode}
        form={form}
        setForm={setForm}
        onSave={handleSaveForm}
        onCancel={handleCancelForm}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
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
              View SysOp List
            </h1>

            <button
              type="button"
              onClick={handleAddNew}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-white shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Add new SysOp</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1.1fr_1fr_auto_auto]">
            <DateRangePicker
              label="Created at"
              value={createdAtFilter}
              onChange={setCreatedAtFilter}
            />

            <div className="min-w-0">
              <FieldLabel>Username</FieldLabel>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search by username"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

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
                SysOp ID
              </th>
              <th className="w-[180px] whitespace-nowrap px-4 py-4 font-semibold">
                Username
              </th>
              <th className="w-[220px] whitespace-nowrap px-4 py-4 font-semibold">
                Full name
              </th>
              <th className="w-[140px] whitespace-nowrap px-4 py-4 font-semibold">
                Status
              </th>
              <th className="w-[180px] whitespace-nowrap px-4 py-4 font-semibold">
                Created at
              </th>
              <th className="w-[180px] whitespace-nowrap px-4 py-4 font-semibold">
                Last login
              </th>
              <th className="w-[260px] whitespace-nowrap px-4 py-4 font-semibold">
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
                <td className="whitespace-nowrap px-4 py-3">{row.username}</td>
                <td className="whitespace-nowrap px-4 py-3">{row.fullName}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">{row.createdAt}</td>
                <td className="whitespace-nowrap px-4 py-3">{row.lastLogin}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <ActionButtons
                    enabled={row.status === "Active"}
                    onEdit={() => handleEdit(row)}
                    onToggleStatus={() => handleToggleStatus(row.id)}
                    onDelete={() => handleDelete(row.id)}
                  />
                </td>
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                  No matching SysOp found.
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

export default SysOpManagementPage;
