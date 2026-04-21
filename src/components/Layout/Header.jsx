import { Menu, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import DashboardSelect from "../Common/DashboardSelect";
import { useI18n } from "../../contexts/LanguageContext";

function Header({ sidebarCollapsed, onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const { currentLanguageLabel, changeLanguageByLabel, t } = useI18n();

  return (
    <div className="relative z-40 overflow-visible border-b border-slate-200/50 bg-white px-6 py-4 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80">
      <div className="flex items-center justify-between overflow-visible">
        <div className="flex items-center space-x-4 overflow-visible">
          <button
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative z-50 w-40">
            <DashboardSelect
              value={currentLanguageLabel}
              options={["English", "French", "Vietnamese", "Chinese"]}
              onChange={changeLanguageByLabel}
              menuClassName="w-44"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <div className="flex items-center space-x-3 border-l border-slate-200 pl-3 dark:border-slate-700">
            <img
              src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
              alt="User"
              className="h-8 w-8 rounded-full ring-2 ring-green-500"
            />

            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Draco Nguyen
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t("header.administrator")}
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
