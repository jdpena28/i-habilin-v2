import DashboardIcon from "@public/dashboard-icon";

import { StallHeader } from "@/client/components/header";
import { StallLayout } from "@/client/components/layout";
import { CountCard } from "@/client/components/card";
import { PieChart } from "@/client/components/charts";

const Dashboard = () => {
  return (
    <StallLayout>
      <StallHeader title="Dashboard" />
      <section id="dashboard" className="grid grid-cols-12 gap-3">
        <div className="col-span-7 flex w-full items-center gap-x-3 rounded-xl bg-primary p-4 text-white">
          <div className="space-y-3">
            <p className="font-brocha text-xl">Welcome to your dashboard!</p>
            <p>
              This is (Stall Name) admin dashboard designed to reflect an
              overview of the most important data inside the business.
            </p>
          </div>
          <div className="w-full">
            <DashboardIcon />
          </div>
        </div>
        <div className="col-span-5 rounded-lg bg-white">
          <PieChart />
        </div>
        <div className="col-span-12 flex w-full justify-evenly">
          <CountCard
            title="Sales"
            count={999999}
            trend={12500}
            isCurrency
            isLoading={false}
          />
          <CountCard
            title="Food Ordered"
            count={999999}
            trend={12500}
            isCurrency
            isLoading={false}
          />
          <CountCard
            title="Survey Responses"
            count={999999}
            trend={12500}
            isCurrency
            isLoading={false}
          />
        </div>
      </section>
    </StallLayout>
  );
};

export default Dashboard;
