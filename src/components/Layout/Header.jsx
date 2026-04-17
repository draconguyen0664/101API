import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

function Header({ sidebarCollapsed, onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={onToggleSidebar}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-40">
            <select
              className="
                w-full appearance-none
                pl-4 pr-10 py-2.5
                bg-slate-100 dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                rounded-xl
                text-slate-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all
              ">
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="vietnamese">Vietnamese</option>
              <option value="chinese">Chinese</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
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

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <img
              src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
              alt="User"
              className="w-8 h-8 rounded-full ring-2 ring-green-500"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
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
