import { Clock3, TrendingUp } from "lucide-react";

function ThroughputCard() {
  return (
    <div className="h-full rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950 dark:shadow-[0_8px_24px_rgba(2,6,23,0.45)]">
        <div className="relative min-h-[230px] flex-1 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-sky-500 via-cyan-400 to-emerald-400 dark:from-sky-600 dark:via-cyan-500 dark:to-emerald-500" />

          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.7)_1.2px,transparent_1.2px)] [background-size:12px_12px] dark:opacity-15" />

          <div className="absolute -bottom-12 -left-4 h-40 w-40 rounded-full opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.95)_1.5px,transparent_1.5px)] [background-size:9px_9px] dark:opacity-15" />

          <div className="absolute inset-0 bg-linear-to-t from-slate-950/0 to-white/0 dark:from-slate-950/10 dark:to-slate-950/0" />

          <div className="relative z-10 flex min-h-[230px] flex-col justify-between p-5 text-white">
            <p className="text-[18px] font-semibold">Throughput (TPS)</p>

            <div>
              <h3 className="text-[48px] font-bold leading-none tracking-tight text-white">
                3,204/s
              </h3>

              <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-[12px] font-semibold text-emerald-600 dark:bg-slate-900/70 dark:text-emerald-300 dark:ring-1 dark:ring-white/10">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>11.01% vs last hour</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-5 dark:border-t dark:border-slate-800/70">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <Clock3 className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            <span className="text-[18px] font-semibold">Average Latency</span>
          </div>

          <span className="text-[24px] font-bold text-slate-800 dark:text-white">
            94/ms
          </span>
        </div>
      </div>
    </div>
  );
}

export default ThroughputCard;
