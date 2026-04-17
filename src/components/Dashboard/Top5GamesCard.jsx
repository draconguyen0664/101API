import { useEffect, useMemo, useState } from "react";
import { Gamepad2 } from "lucide-react";

const gameDataByFilter = {
  Today: [
    { name: "MONEY TREE DOZER", value: 37406, percent: 88 },
    { name: "CIRCUS DOZER", value: 23519, percent: 44 },
    { name: "FA CHAI DOZER", value: 20519, percent: 36 },
    { name: "LIGHTNING BOMB", value: 19519, percent: 32 },
    { name: "SUPER COLOR GAME", value: 17214, percent: 27 },
  ],
  "This week": [
    { name: "MONEY TREE DOZER", value: 98312, percent: 92 },
    { name: "CIRCUS DOZER", value: 71648, percent: 67 },
    { name: "FA CHAI DOZER", value: 60420, percent: 56 },
    { name: "LIGHTNING BOMB", value: 51140, percent: 47 },
    { name: "SUPER COLOR GAME", value: 43852, percent: 40 },
  ],
  "This month": [
    { name: "MONEY TREE DOZER", value: 328406, percent: 95 },
    { name: "CIRCUS DOZER", value: 235190, percent: 72 },
    { name: "FA CHAI DOZER", value: 190519, percent: 58 },
    { name: "LIGHTNING BOMB", value: 169519, percent: 51 },
    { name: "SUPER COLOR GAME", value: 152214, percent: 46 },
  ],
};

function Top5GamesCard() {
  const [filter, setFilter] = useState("Today");
  const [animated, setAnimated] = useState(false);

  const games = useMemo(() => {
    return gameDataByFilter[filter] || gameDataByFilter.Today;
  }, [filter]);

  useEffect(() => {
    setAnimated(false);
    const frame = requestAnimationFrame(() => {
      const timeout = setTimeout(() => setAnimated(true), 40);
      return () => clearTimeout(timeout);
    });

    return () => cancelAnimationFrame(frame);
  }, [filter]);

  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="h-full rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-slate-800">Top 5 Games</h3>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] text-slate-700 outline-none">
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
          </select>
        </div>

        <div className="space-y-5">
          {games.map((game, index) => (
            <div
              key={`${filter}-${game.name}`}
              className="transition-all duration-500 ease-out"
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(6px)",
                transitionDelay: `${index * 80}ms`,
              }}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-300 text-white">
                    <Gamepad2 className="h-3 w-3" />
                  </div>

                  <span className="truncate text-[13px] font-semibold text-slate-700">
                    {game.name}
                  </span>
                </div>

                <span className="shrink-0 text-[13px] font-bold text-slate-700">
                  {game.value.toLocaleString()}
                </span>
              </div>

              <div className="h-[3px] w-full overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-linear-to-r from-sky-400 to-emerald-400 transition-[width] duration-700 ease-out"
                  style={{
                    width: animated ? `${game.percent}%` : "0%",
                    transitionDelay: `${120 + index * 90}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Top5GamesCard;
