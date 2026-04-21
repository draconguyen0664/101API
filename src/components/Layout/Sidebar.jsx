import { useMemo, useState } from "react";
import {
  Building,
  Copy,
  File,
  Home,
  LayoutDashboard,
  UserCircle,
  Wallet,
} from "lucide-react";
import { useI18n } from "../../contexts/LanguageContext";

function Sidebar({ collapsed, onToggle, currentPage, onPageChange }) {
  const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]));
  const { t } = useI18n();

  const menuItems = useMemo(
    () => [
      {
        id: "dashboard",
        icon: Home,
        label: t("sidebar.dashboard"),
      },
      {
        id: "game",
        icon: LayoutDashboard,
        label: t("sidebar.gameManagement"),
      },
      {
        id: "client",
        icon: UserCircle,
        label: t("sidebar.clientManagement"),
      },
      {
        id: "provider",
        icon: Building,
        label: t("sidebar.gameProviderManagement"),
      },
      {
        id: "sysOp",
        icon: Copy,
        label: t("sidebar.sysopAccessManagement"),
      },
      {
        id: "bet",
        icon: Wallet,
        label: t("sidebar.betManagement"),
      },
      {
        id: "report",
        icon: File,
        label: t("sidebar.revenueReporting"),
      },
    ],
    [t],
  );

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }

    setExpandedItems(newExpanded);
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-80"
      } relative z-10 flex flex-col border-r border-slate-200/50 bg-white/80 backdrop-blur-xl transition-all duration-300 ease-in-out dark:border-slate-700/50 dark:bg-slate-900/80`}>
      <div className="border-b border-slate-200/50 p-6 dark:border-slate-700/50">
        <img src="./logo.svg" alt="logo" className="h-10 w-auto" />
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item.id);
                  } else {
                    onPageChange(item.id);
                  }
                }}
                title={item.label}
                className={`w-full rounded-xl p-4 transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-cyan-500 to-green-500 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50"
                }`}>
                <div className="flex items-center justify-start gap-3 min-w-0">
                  <Icon className="h-5 w-5 shrink-0" />

                  {!collapsed && (
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="block min-w-0 flex-1 truncate whitespace-nowrap text-left font-medium">
                        {item.label}
                      </span>

                      {item.badge && (
                        <span className="shrink-0 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                          {item.badge}
                        </span>
                      )}

                      {item.count && (
                        <span className="shrink-0 rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                          {item.count}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
