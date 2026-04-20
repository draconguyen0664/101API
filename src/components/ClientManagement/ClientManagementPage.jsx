import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
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

function FilterInput({ label, placeholder, value, onChange }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300"
      />
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
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      ) : null}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 text-sm transition ${
            open
              ? "border-cyan-300 ring-2 ring-cyan-100"
              : "border-slate-200 hover:border-slate-300"
          }`}>
          <span className="truncate text-slate-700">{value}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div
            className={`absolute left-0 top-[calc(100%+8px)] z-50 ${menuWidth} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]`}>
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
      className={`inline-flex min-w-[76px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
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

  const selectedCount = selectedRows.length;

  return (
    <div className="bg-[#dfe9f7] px-6 py-6">
      <div className="mb-5 flex items-center gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("assigned")}
          className={`relative pb-3 text-[15px] font-semibold ${
            activeTab === "assigned" ? "text-slate-800" : "text-slate-500"
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
            activeTab === "available" ? "text-slate-800" : "text-slate-500"
          }`}>
          Available Game List
          {activeTab === "available" && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400" />
          )}
        </button>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-emerald-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="border-b border-cyan-300 bg-slate-50 px-6 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
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
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="max-h-[220px] overflow-y-auto pr-2">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-700">
                  <th className="w-10 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === data.length && data.length > 0
                      }
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-slate-300"
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
                  <tr key={`${row.gameId}-${index}`} className="text-slate-700">
                    <td className="py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => toggleRow(index)}
                        className="h-4 w-4 rounded border-slate-300"
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
        <p className="text-sm text-slate-500">Selected: {selectedCount}</p>

        <button
          type="button"
          className="rounded-xl bg-emerald-200/70 px-6 py-3 text-sm font-semibold text-white">
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

  const [createdAt, setCreatedAt] = useState("");
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
    <div className="overflow-hidden rounded-[20px] border border-cyan-300 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="relative border-b border-cyan-300 bg-slate-50 px-5 py-5">
        <img
          src="/pattern3.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-60 object-cover opacity-15"
        />

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-800">
              View Client List
            </h1>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-4 text-sm font-semibold text-white shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Add new client</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <FilterInput
              label="Created at"
              placeholder="Select date range"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
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

            <div className="flex items-end gap-2">
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
              <th className="w-[140px] px-4 py-4 font-semibold">Client ID</th>
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
                <>
                  <tr
                    key={row.id}
                    className="border-t border-slate-100 text-slate-700">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleExpand(row.id)}
                        className="inline-flex items-center gap-3 text-sky-500 transition hover:text-sky-600">
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
                      <td colSpan={8} className="border-t border-slate-200 p-0">
                        <AssignedGamePanel
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                        />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
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

export default ClientManagementPage;
