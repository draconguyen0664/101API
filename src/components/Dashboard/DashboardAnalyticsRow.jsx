import ThroughputCard from "./ThroughputCard";
import ApiSuccessRateCard from "./ApiSuccessRateCard";
import RealTimeErrorLogCard from "./RealTimeErrorLogCard";
import CategoryDistributionCard from "./CategoryDistributionCard";

function DashboardAnalyticsRow() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-4">
      <ThroughputCard />
      <ApiSuccessRateCard />
      <RealTimeErrorLogCard />
      <CategoryDistributionCard />
    </div>
  );
}

export default DashboardAnalyticsRow;
