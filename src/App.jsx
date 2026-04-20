import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import Dashboard from "./components/Dashboard/Dashboard";
import GameManagementPage from "./components/GameManagement/GameManagementPage";
import ClientManagementPage from "./components/ClientManagement/ClientManagementPage";

function App() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { theme, toggleTheme } = useTheme();

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;

      case "game":
        return <GameManagementPage />;

      case "client":
        return <ClientManagementPage />;

      case "provider":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800">
              Game Provider Management
            </h1>
            <p className="mt-2 text-slate-500">
              Đây là trang Game Provider Management.
            </p>
          </div>
        );

      case "sysOp":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800">
              SysOp & Access Management
            </h1>
            <p className="mt-2 text-slate-500">
              Đây là trang SysOp & Access Management.
            </p>
          </div>
        );

      case "bet":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800">
              Bet Management
            </h1>
            <p className="mt-2 text-slate-500">Đây là trang Bet Management.</p>
          </div>
        );

      case "report":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800">
              Revenue Reporting
            </h1>
            <p className="mt-2 text-slate-500">
              Đây là trang Revenue Reporting.
            </p>
          </div>
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          collapsed={sideBarCollapsed}
          onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header
            sidebarCollapsed={sideBarCollapsed}
            onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
            theme={theme}
            onToggleTheme={toggleTheme}
            currentPage={currentPage}
          />

          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">{renderPage()}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
