import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleOff,
  Gamepad2,
  ImagePlus,
  Pencil,
  Save,
  Search,
  X,
} from "lucide-react";

const STORAGE_KEY = "game-management-rows-v3";

const baseGames = [
  {
    id: "G-001",
    game: "Game 1",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Slot",
    globalStatus: "Inactive",
    clientEnable: 99,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-002",
    game: "Game 2",
    description: "Short description of the game.",
    provider: "PG Soft",
    category: "Live Casino",
    globalStatus: "Active",
    clientEnable: 0,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-003",
    game: "Game 3",
    description: "Short description of the game.",
    provider: "Play'n GO",
    category: "Table",
    globalStatus: "Active",
    clientEnable: 0,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-004",
    game: "Game 4",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Slot",
    globalStatus: "Active",
    clientEnable: 110,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-005",
    game: "Game 5",
    description: "Short description of the game.",
    provider: "NetEnt",
    category: "Live Casino",
    globalStatus: "Inactive",
    clientEnable: 0,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-006",
    game: "Game 6",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Table",
    globalStatus: "Active",
    clientEnable: 0,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-007",
    game: "Game 7",
    description: "Short description of the game.",
    provider: "Play'n GO",
    category: "Arcade",
    globalStatus: "Active",
    clientEnable: 0,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-008",
    game: "Game 8",
    description: "Short description of the game.",
    provider: "PG Soft",
    category: "Slot",
    globalStatus: "Active",
    clientEnable: 0,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-009",
    game: "Game 9",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Arcade",
    globalStatus: "Active",
    clientEnable: 0,
    iconFileName: "",
    iconPreview: "",
  },
  {
    id: "G-010",
    game: "Game 10",
    description: "Short description of the game.",
    provider: "Pragmatic",
    category: "Slot",
    globalStatus: "Inactive",
    clientEnable: 99,
    iconFileName: "",
    iconPreview: "",
  },
];

function buildGames(total = 152) {
  return Array.from({ length: total }, (_, index) => {
    const item = baseGames[index % baseGames.length];
    const num = index + 1;

    return {
      ...item,
      id: `G-${String(num).padStart(3, "0")}`,
      game: `Game ${num}`,
    };
  });
}

function loadRowsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildGames(152);

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return buildGames(152);
    }

    return parsed;
  } catch {
    return buildGames(152);
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));

    reader.readAsDataURL(file);
  });
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (disabled) setOpen(false);
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
            if (!disabled) setOpen((prev) => !prev);
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
            className={`absolute left-0 top-[calc(100%+8px)] z-[120] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900 ${menuClassName}`}>
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-[120] min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900">
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
  if (status === "Active") {
    return (
      <span className="inline-flex min-w-[68px] items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-[68px] items-center justify-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 dark:bg-red-500/10 dark:text-red-300">
      Inactive
    </span>
  );
}

function GameThumb({ row }) {
  if (row.iconPreview) {
    return (
      <img
        src={row.iconPreview}
        alt={row.game}
        className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
      />
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
      <Gamepad2 className="h-4 w-4" />
    </div>
  );
}

function ActionButtons({ enabled, onEdit }) {
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
          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 dark:bg-red-500/10 dark:text-red-300">
          <CircleOff className="h-3 w-3" />
          <span>Disable</span>
        </button>
      ) : (
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Check className="h-3 w-3" />
          <span>Enable</span>
        </button>
      )}
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

function EditGameView({
  form,
  setForm,
  onSave,
  onCancel,
  onFileChange,
  onRemoveImage,
  fileInputRef,
}) {
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
            Edit Game
          </h1>
        </div>
      </div>

      <div className="relative z-10 overflow-visible px-5 py-5">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Game Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.gameName}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    gameName: e.target.value,
                    formError: "",
                  }))
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400"
              />
            </div>

            <FilterSelect
              label={
                <>
                  Provider <span className="text-red-500">*</span>
                </>
              }
              value={form.provider}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  provider: value,
                }))
              }
              options={["Pragmatic", "PG Soft", "Play'n GO", "NetEnt"]}
              disabled
              className="z-[20]"
            />

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
                rows={8}
                className="min-h-[185px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-4 overflow-visible">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Icon
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.svg"
                onChange={onFileChange}
                className="hidden"
              />

              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className="relative flex min-h-[185px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-5 text-center transition hover:border-cyan-300 hover:bg-cyan-50/30 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-500/40 dark:hover:bg-slate-900">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemoveImage();
                  }}
                  className={`absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white ${
                    form.iconPreview
                      ? "visible"
                      : "invisible pointer-events-none"
                  }`}>
                  <X className="h-4 w-4" />
                </button>

                {form.iconPreview ? (
                  <>
                    <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                      <img
                        src={form.iconPreview}
                        alt={form.gameName || "Preview"}
                        className="h-20 w-20 object-contain"
                      />
                    </div>

                    <p className="max-w-full truncate text-sm font-medium text-indigo-500 dark:text-indigo-300">
                      {form.iconFileName}
                    </p>

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                      Drag and drop your PNG, JPG, WebP, SVG images here or
                      browse
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400 dark:text-slate-500">
                      (Max. File Size: 5 MB)
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                      <ImagePlus className="h-6 w-6" />
                    </div>

                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Drag and drop or browse image
                    </span>

                    <span className="mt-2 text-xs leading-5 text-slate-400 dark:text-slate-500">
                      PNG, JPG, WebP, SVG
                      <br />
                      Max. file size: 5 MB
                    </span>
                  </>
                )}
              </div>

              {form.fileError && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {form.fileError}
                </p>
              )}
            </div>

            <FilterSelect
              label={
                <>
                  Category <span className="text-red-500">*</span>
                </>
              }
              value={form.category}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  category: value,
                  formError: "",
                }))
              }
              options={["Slot", "Live Casino", "Table", "Arcade"]}
              className="z-[110]"
              menuClassName="z-[130]"
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
              options={["Active", "Inactive"]}
              className="z-[100]"
              menuClassName="z-[120]"
            />
          </div>
        </div>

        {form.formError && (
          <p className="mt-4 text-center text-sm font-medium text-red-500">
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

function ListView({
  keyword,
  setKeyword,
  coreProvider,
  setCoreProvider,
  category,
  setCategory,
  status,
  setStatus,
  handleSearch,
  handleReset,
  handleKeyDown,
  currentRows,
  totalEntries,
  startIndex,
  endIndex,
  rowsPerPage,
  setRowsPerPage,
  safeCurrentPage,
  totalPages,
  paginationItems,
  handlePrevious,
  handleNext,
  handleEllipsisClick,
  setCurrentPage,
  onEdit,
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
          <h1 className="mb-5 text-[30px] font-bold tracking-[-0.03em] text-slate-800 dark:text-white">
            View Game List
          </h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_1fr_1fr_auto_auto]">
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Game Name
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by name/code"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </div>

            <FilterSelect
              label="Core Provider"
              value={coreProvider}
              onChange={setCoreProvider}
              options={["All", "Pragmatic", "PG Soft", "Play'n GO", "NetEnt"]}
            />

            <FilterSelect
              label="Category"
              value={category}
              onChange={setCategory}
              options={["All", "Slot", "Live Casino", "Table", "Arcade"]}
            />

            <FilterSelect
              label="Status"
              value={status}
              onChange={setStatus}
              options={["All", "Active", "Inactive"]}
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
              <th className="w-[90px] whitespace-nowrap px-4 py-4 font-semibold">
                Game ID
              </th>
              <th className="w-[170px] whitespace-nowrap px-4 py-4 font-semibold">
                Game
              </th>
              <th className="w-[280px] whitespace-nowrap px-4 py-4 font-semibold">
                Description
              </th>
              <th className="w-[120px] whitespace-nowrap px-4 py-4 font-semibold">
                Provider
              </th>
              <th className="w-[120px] whitespace-nowrap px-4 py-4 font-semibold">
                Category
              </th>
              <th className="w-[150px] whitespace-nowrap px-4 py-4 font-semibold">
                Global Status
              </th>
              <th className="w-[120px] whitespace-nowrap px-4 py-4 font-semibold">
                Client Enable
              </th>
              <th className="w-[220px] whitespace-nowrap px-4 py-4 font-semibold">
                Action (Global)
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
                  <div className="flex items-center gap-3 overflow-hidden">
                    <GameThumb row={row} />
                    <span className="truncate">{row.game}</span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <p className="truncate">{row.description}</p>
                </td>

                <td className="whitespace-nowrap px-4 py-3">{row.provider}</td>
                <td className="whitespace-nowrap px-4 py-3">{row.category}</td>

                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={row.globalStatus} />
                </td>

                <td className="whitespace-nowrap px-4 py-3">
                  {row.clientEnable}
                </td>

                <td className="whitespace-nowrap px-4 py-3">
                  <ActionButtons
                    enabled={row.clientEnable > 0}
                    onEdit={() => onEdit(row)}
                  />
                </td>
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                  No matching games found.
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

function GameManagementPage() {
  const [rows, setRows] = useState(() => loadRowsFromStorage());

  const [keyword, setKeyword] = useState("");
  const [coreProvider, setCoreProvider] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [appliedFilters, setAppliedFilters] = useState({
    keyword: "",
    coreProvider: "All",
    category: "All",
    status: "All",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [mode, setMode] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    gameName: "",
    provider: "Pragmatic",
    description: "",
    category: "Slot",
    status: "Active",
    iconFileName: "",
    iconPreview: "",
    fileError: "",
    formError: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const keywordLower = appliedFilters.keyword.trim().toLowerCase();

      const keywordMatch =
        !keywordLower ||
        row.game.toLowerCase().includes(keywordLower) ||
        row.id.toLowerCase().includes(keywordLower);

      const providerMatch =
        appliedFilters.coreProvider === "All" ||
        row.provider === appliedFilters.coreProvider;

      const categoryMatch =
        appliedFilters.category === "All" ||
        row.category === appliedFilters.category;

      const statusMatch =
        appliedFilters.status === "All" ||
        row.globalStatus === appliedFilters.status;

      return keywordMatch && providerMatch && categoryMatch && statusMatch;
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
      keyword,
      coreProvider,
      category,
      status,
    });
    setCurrentPage(1);
  };

  const handleReset = () => {
    setKeyword("");
    setCoreProvider("All");
    setCategory("All");
    setStatus("All");
    setAppliedFilters({
      keyword: "",
      coreProvider: "All",
      category: "All",
      status: "All",
    });
    setRowsPerPage(10);
    setCurrentPage(1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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

  const handleEdit = (row) => {
    setEditingId(row.id);
    setEditForm({
      gameName: row.game,
      provider: row.provider,
      description: row.description,
      category: row.category,
      status: row.globalStatus,
      iconFileName: row.iconFileName || "",
      iconPreview: row.iconPreview || "",
      fileError: "",
      formError: "",
    });
    setMode("edit");
  };

  const handleCancelEdit = () => {
    setMode("list");
    setEditingId(null);
    setEditForm({
      gameName: "",
      provider: "Pragmatic",
      description: "",
      category: "Slot",
      status: "Active",
      iconFileName: "",
      iconPreview: "",
      fileError: "",
      formError: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    const trimmedName = editForm.gameName.trim();

    if (!trimmedName) {
      setEditForm((prev) => ({
        ...prev,
        formError: "Game Name is required.",
      }));
      return;
    }

    setRows((prev) =>
      prev.map((row) =>
        row.id === editingId
          ? {
              ...row,
              game: trimmedName,
              provider: row.provider,
              description: editForm.description,
              category: editForm.category,
              globalStatus: editForm.status,
              iconFileName: editForm.iconFileName,
              iconPreview: editForm.iconPreview,
            }
          : row,
      ),
    );

    handleCancelEdit();
  };

  const handleRemoveImage = () => {
    setEditForm((prev) => ({
      ...prev,
      iconFileName: "",
      iconPreview: "",
      fileError: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];

    if (!validTypes.includes(file.type)) {
      setEditForm((prev) => ({
        ...prev,
        fileError: "Only PNG, JPG, JPEG, WebP, SVG files are allowed.",
      }));
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setEditForm((prev) => ({
        ...prev,
        fileError: "Max file size is 5 MB.",
      }));
      event.target.value = "";
      return;
    }

    try {
      const preview = await readFileAsDataURL(file);

      setEditForm((prev) => ({
        ...prev,
        iconFileName: file.name,
        iconPreview: String(preview),
        fileError: "",
      }));
    } catch {
      setEditForm((prev) => ({
        ...prev,
        fileError: "Failed to load image.",
      }));
    }
  };

  if (mode === "edit") {
    return (
      <EditGameView
        form={editForm}
        setForm={setEditForm}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        onFileChange={handleFileChange}
        onRemoveImage={handleRemoveImage}
        fileInputRef={fileInputRef}
      />
    );
  }

  return (
    <ListView
      keyword={keyword}
      setKeyword={setKeyword}
      coreProvider={coreProvider}
      setCoreProvider={setCoreProvider}
      category={category}
      setCategory={setCategory}
      status={status}
      setStatus={setStatus}
      handleSearch={handleSearch}
      handleReset={handleReset}
      handleKeyDown={handleKeyDown}
      currentRows={currentRows}
      totalEntries={totalEntries}
      startIndex={startIndex}
      endIndex={endIndex}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      safeCurrentPage={safeCurrentPage}
      totalPages={totalPages}
      paginationItems={paginationItems}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      handleEllipsisClick={handleEllipsisClick}
      setCurrentPage={setCurrentPage}
      onEdit={handleEdit}
    />
  );
}

export default GameManagementPage;
