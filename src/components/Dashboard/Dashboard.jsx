import DashboardAnalyticsRow from "./DashboardAnalyticsRow";
import DashboardBottomRow from "./DashboardBottomRow";
import StatsGrid from "./StatsGrid";

function Dashboard() {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <DashboardAnalyticsRow />
      <DashboardBottomRow />
    </div>
  );
}

export default Dashboard;
