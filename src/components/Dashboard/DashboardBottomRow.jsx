import Top5GamesCard from "./Top5GamesCard";
import Top5RevenueClientsCard from "./Top5RevenueClientsCard";
import SystemNetIncomeGrowthCard from "./SystemNetIncomeGrowthCard";

function DashboardBottomRow() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <div className="xl:col-span-3">
        <Top5GamesCard />
      </div>

      <div className="xl:col-span-3">
        <Top5RevenueClientsCard />
      </div>

      <div className="xl:col-span-6">
        <SystemNetIncomeGrowthCard />
      </div>
    </div>
  );
}

export default DashboardBottomRow;
