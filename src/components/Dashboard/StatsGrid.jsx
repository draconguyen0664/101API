import React from "react";
import {
  Building2,
  Gamepad2,
  Shield,
  Users,
  WalletCards,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    id: "games",
    title: "Active Game",
    value: "1,248",
    icon: Gamepad2,
    iconGradient: "from-sky-500 to-emerald-400",
    accent: "bg-emerald-500",
    bgImage: "/pattern1.png",
    showDot: true,
  },
  {
    id: "clients",
    title: "Active Clients",
    value: "342",
    icon: Users,
    iconGradient: "from-sky-500 to-emerald-400",
    accent: "bg-emerald-500",
    bgImage: "/pattern2.png",
    showDot: true,
  },
  {
    id: "providers",
    title: "Active Providers",
    value: "28",
    icon: Building2,
    iconGradient: "from-sky-500 to-emerald-400",
    accent: "bg-emerald-500",
    bgImage: "/pattern3.png",
    showDot: true,
  },
  {
    id: "sysops",
    title: "Active SysOps",
    value: "15",
    icon: Shield,
    iconGradient: "from-sky-500 to-emerald-400",
    accent: "bg-emerald-500",
    bgImage: "/pattern4.png",
    showDot: true,
  },
  {
    id: "income",
    title: "Total Net Income",
    value: "$10,001",
    icon: WalletCards,
    iconGradient: "from-sky-500 to-emerald-400",
    accent: "bg-emerald-500",
    change: "-5.4%",
    bgImage: "/pattern5.png",
    showDot: false,
  },
];

function CardDecoration({ image }) {
  if (!image) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-white/10" />

      <div className="absolute inset-0 bg-linear-to-r from-white/12 via-white/6 to-white/0" />
    </div>
  );
}

function StatsCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 p-px transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative min-h-[160px] overflow-hidden rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <CardDecoration image={item.bgImage} />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${item.iconGradient} text-white shadow-sm`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-2">
            <p className="mb-3 text-[14px] font-medium text-slate-500">
              {item.title}
            </p>

            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                {item.showDot && (
                  <span className={`h-2.5 w-2.5 rounded-full ${item.accent}`} />
                )}

                <h3 className="text-[30px] font-bold tracking-wide text-slate-800">
                  {item.value}
                </h3>
              </div>

              {item.change && (
                <div className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-500">
                  <TrendingDown className="h-3 w-3" />
                  <span>{item.change}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((item) => (
        <StatsCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default StatsGrid;
