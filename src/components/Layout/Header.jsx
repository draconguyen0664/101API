import { Menu, Moon, Sun, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import DashboardSelect from "../Common/DashboardSelect";

function Header({ sidebarCollapsed, onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("English");

  return (
    <div className="relative z-40 bg-white dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 overflow-visible">
      <div className="flex items-center justify-between overflow-visible">
        <div className="flex items-center space-x-4 overflow-visible">
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={onToggleSidebar}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="w-40 relative z-50">
            <DashboardSelect
              value={language}
              options={["English", "French", "Vietnamese", "Chinese"]}
              onChange={setLanguage}
              menuClassName="w-44"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <img
              src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
              alt="User"
              className="w-8 h-8 rounded-full ring-2 ring-green-500"
            />

            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Draco Nguyen
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
