const logs = [
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
];

function RealTimeErrorLogCard() {
  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="h-full rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-[18px] font-bold text-slate-800">
            Real-time Error Log
          </h3>

          <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] text-slate-700 outline-none">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>

        <div className="space-y-5">
          {logs.map((log, index) => (
            <div key={`${log.time}-${log.provider}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="mt-1 h-2.5 w-2.5 rounded-full border-2 border-cyan-400 bg-white" />
                {index !== logs.length - 1 && (
                  <span className="mt-1 h-full w-px bg-slate-200" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[14px] font-semibold text-slate-800">
                      [{log.time}] [Provider: {log.provider}]
                    </p>
                    <p className="mt-1 text-[14px] leading-6 text-slate-700">
                      {log.message}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full ${log.color} px-3 py-1 text-[11px] font-bold text-white`}>
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
