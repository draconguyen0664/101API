import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  CircleOff,
  Gamepad2,
  Pencil,
  Search,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

const rows = [
  {
    id: "G-001",
    game: "Game 1",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Slot",
    status: "Inactive",
    enabled: 99,
    action: "Enable",
  },
  {
    id: "G-002",
    game: "Game 2",
    description: "Short description of the game.",
    provider: "PG Soft",
    category: "Live Casino",
    status: "Active",
    enabled: 0,
    action: "Disable",
  },
  {
    id: "G-003",
    game: "Game 3",
    description: "Short description of the game.",
    provider: "Play'n GO",
    category: "Table",
    status: "Active",
    enabled: 0,
    action: "Disable",
  },
  {
    id: "G-004",
    game: "Game 4",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Slot",
    status: "Active",
    enabled: 110,
    action: "Disable",
  },
  {
    id: "G-005",
    game: "Game 5",
    description: "Short description of the game.",
    provider: "NetEnt",
    category: "Live Casino",
    status: "Inactive",
    enabled: 0,
    action: "Enable",
  },
  {
    id: "G-006",
    game: "Game 6",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Table",
    status: "Active",
    enabled: 0,
    action: "Disable",
  },
  {
    id: "G-007",
    game: "Game 7",
    description: "Short description of the game.",
    provider: "Play'n GO",
    category: "Arcade",
    status: "Active",
    enabled: 0,
    action: "Disable",
  },
  {
    id: "G-008",
    game: "Game 8",
    description: "Short description of the game.",
    provider: "PG Soft",
    category: "Slot",
    status: "Active",
    enabled: 0,
    action: "Disable",
  },
  {
    id: "G-009",
    game: "Game 9",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Arcade",
    status: "Active",
    enabled: 0,
    action: "Disable",
  },
];

function FilterInput({ label, placeholder }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300"
      />
    </div>
  );
}

function FilterSelect({ label, options = ["All"], defaultValue = "All" }) {
  const [selected, setSelected] = useState(defaultValue);
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
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 text-sm transition ${
            open
              ? "border-cyan-300 ring-2 ring-cyan-100"
              : "border-slate-200 hover:border-slate-300"
          }`}>
          <span className="truncate text-slate-700">{selected}</span>

          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
            <div className="py-2">
              {options.map((option) => {
                const isSelected = option === selected;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                      isSelected
                        ? "bg-cyan-50 font-semibold text-cyan-600"
                        : "text-slate-700 hover:bg-slate-50"
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
            ? "border-cyan-300 ring-2 ring-cyan-100"
            : "border-slate-200 hover:border-slate-300"
        }`}>
        <span>{value}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-30 min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
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
                      ? "bg-cyan-50 font-semibold text-cyan-600"
                      : "text-slate-700 hover:bg-slate-50"
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
      className={`inline-flex min-w-[60px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
        isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
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
        className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-500">
        <Pencil className="h-3 w-3" />
        <span>Edit</span>
      </button>

      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
          enable ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
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

function GameManagementPage() {
  const allRows = useMemo(() => {
    return Array.from({ length: 152 }, (_, index) => {
      const baseRow = rows[index % rows.length];
      const number = index + 1;

      return {
        ...baseRow,
        id: `G-${String(number).padStart(3, "0")}`,
        game: `Game ${number}`,
      };
    });
  }, []);

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

  return (
    <div className="overflow-hidden rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="relative border-b border-cyan-300 bg-slate-50 px-5 py-5">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover"
        />

        <div className="relative z-10">
          <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800">
            View Game List
          </h1>

          <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-end">
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <FilterInput
                label="Game Name"
                placeholder="Search by name/code"
              />

              <FilterSelect
                label="Core Provider"
                options={["All", "Pragmatic", "PG Soft", "Play'n GO", "NetEnt"]}
                defaultValue="All"
              />

              <FilterSelect
                label="Category"
                options={["All", "Slot", "Live Casino", "Table", "Arcade"]}
                defaultValue="All"
              />

              <FilterSelect
                label="Status"
                options={["All", "Active", "Inactive"]}
                defaultValue="All"
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
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600">
              <th className="px-4 py-4 font-semibold">Game ID</th>
              <th className="px-4 py-4 font-semibold">Game</th>
              <th className="px-4 py-4 font-semibold">Description</th>
              <th className="px-4 py-4 font-semibold">Provider</th>
              <th className="px-4 py-4 font-semibold">Category</th>
              <th className="px-4 py-4 font-semibold">Global Status</th>
              <th className="px-4 py-4 font-semibold">Client Enable</th>
              <th className="px-4 py-4 font-semibold">Action (Global)</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-100 text-slate-700">
                <td className="px-4 py-3">{row.id}</td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-300 text-white">
                      <Gamepad2 className="h-3.5 w-3.5" />
                    </div>
                    <span>{row.game}</span>
                  </div>
                </td>

                <td className="px-4 py-3">{row.description}</td>
                <td className="px-4 py-3">{row.provider}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3">{row.enabled}</td>
                <td className="px-4 py-3">
                  <ActionButtons action={row.action} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
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

        <div className="flex items-center gap-2 text-slate-500">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 transition ${
              currentPage === 1
                ? "cursor-not-allowed text-slate-300"
                : "text-slate-400 hover:text-slate-600"
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
                    className="rounded-lg px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
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
                      : "text-slate-700 hover:bg-slate-100"
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
                ? "cursor-not-allowed text-slate-300"
                : "text-slate-700 hover:text-slate-900"
            }`}>
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameManagementPage;
