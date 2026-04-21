import { useState } from "react";
import DashboardSelect from "../Common/DashboardSelect";

const logsByFilter = {
  Today: [
    {
      time: "13:30:12",
      provider: "RSG",
      message: "Gateway Timeout - Endpoint: /v1/seamless/bet [Trace: x8a91b]",
      code: "ERR-504",
      color: "bg-orange-500",
    },
    {
      time: "13:30:45",
      provider: "VIP_Bet",
      message: "Unauthorized - Invalid Signature [Trace: z92jk1]",
      code: "WRN-401",
      color: "bg-amber-500",
    },
    {
      time: "13:31:02",
      provider: "JILI",
      message: "Connection refused [Trace: m01xx9]",
      code: "ERR-502",
      color: "bg-orange-500",
    },
  ],

  "Last 7 days": [
    {
      time: "09:15:33",
      provider: "Pragmatic",
      message: "Request timeout [Trace: l19ps2]",
      code: "ERR-504",
      color: "bg-orange-500",
    },
    {
      time: "10:42:18",
      provider: "NetEnt",
      message: "Unauthorized - Token invalid [Trace: f81dk7]",
      code: "WRN-401",
      color: "bg-amber-500",
    },
    {
      time: "14:05:22",
      provider: "PG Soft",
      message: "Connection refused [Trace: p33mj4]",
      code: "ERR-502",
      color: "bg-orange-500",
    },
  ],

  "Last 30 days": [
    {
      time: "08:21:01",
      provider: "RSG",
      message: "Service unavailable [Trace: q11we8]",
      code: "ERR-503",
      color: "bg-orange-500",
    },
    {
      time: "12:09:47",
      provider: "Play'n GO",
      message: "Invalid signature [Trace: z77kk2]",
      code: "WRN-401",
      color: "bg-amber-500",
    },
    {
      time: "16:44:12",
      provider: "JILI",
      message: "Connection refused [Trace: n02xp5]",
      code: "ERR-502",
      color: "bg-orange-500",
    },
  ],
};

function RealTimeErrorLogCard() {
  const [filter, setFilter] = useState("Today");
  const logs = logsByFilter[filter] || logsByFilter.Today;

  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="h-full rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-[18px] font-bold text-slate-800 dark:text-white">
            Real-time Error Log
          </h3>

          <div className="w-[140px]">
            <DashboardSelect
              value={filter}
              options={["Today", "Last 7 days", "Last 30 days"]}
              onChange={setFilter}
            />
          </div>
        </div>

        <div className="space-y-5">
          {logs.map((log, index) => (
            <div key={`${log.time}-${log.provider}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="mt-1 h-2.5 w-2.5 rounded-full border-2 border-cyan-400 bg-white dark:bg-slate-950" />
                {index !== logs.length - 1 && (
                  <span className="mt-1 h-full w-px bg-slate-200 dark:bg-slate-800" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">
                      [{log.time}] [Provider: {log.provider}]
                    </p>
                    <p className="mt-1 break-words text-[14px] leading-7 text-slate-700 dark:text-slate-300">
                      {log.message}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 whitespace-nowrap rounded-full ${log.color} px-3 py-1 text-[11px] font-bold text-white`}>
                    {log.code}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RealTimeErrorLogCard;
