import { useState } from "react";
import {
  Building,
  Copy,
  File,
  Home,
  LayoutDashboard,
  UserCircle,
  Wallet,
  ChevronDown,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    icon: Home,
    label: "Dashboard",
    active: true,
  },
  {
    id: "game",
    icon: LayoutDashboard,
    label: "Game Management",
  },
  {
    id: "client",
    icon: UserCircle,
    label: "Client Management",
  },
  {
    id: "provider",
    icon: Building,
    label: "Game Provider Management",
  },
  {
    id: "sysOp",
    icon: Copy,
    label: "SysOp & Access Management",
  },
  {
    id: "bet",
    icon: Wallet,
    label: "Bet Management",
  },
  {
    id: "report",
    icon: File,
    label: "Revenue Reporting",
  },
];

function Sidebar({ collapsed, onToggle, currentPage, onPageChange }) {
  const [expandedItems, setExpendedItems] = useState(new Set(["analytics"]));
  const toggleExpended = (itemid) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemid)) {
      newExpanded.delete(itemid);
    } else {
      newExpanded.add(itemid);
    }
    setExpendedItems(newExpanded);
  };
  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-80"
      } transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <img src="./logo.svg" alt="logo" />
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          return (
            <div key={item.id}>
              <button
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                  currentPage === item.id || item.active
                    ? "bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}>
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5`} />
                  {/* Conditional Rendering */}
                  {!collapsed && (
                    <>
                      <span className="font-medium ml-2">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </>
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
