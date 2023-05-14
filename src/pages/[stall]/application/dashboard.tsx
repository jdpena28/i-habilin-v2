/* eslint-disable no-underscore-dangle */
import { format } from "date-fns";

import { useStallConfigurationStore } from "@/client/store";
import { trpc } from "@/server/utils/trpc";
import { FormatCurrency } from "@/client/lib/TextFormatter";

import DashboardIcon from "@public/dashboard-icon";

import { StallHeader } from "@/client/components/header";
import { StallLayout } from "@/client/components/layout";
import { CountCard } from "@/client/components/card";
import { EChart } from "@/client/components/charts";
import { AgeGroupPieChart } from "@/client/components/swiper";

const Dashboard = () => {
  const { stall } = useStallConfigurationStore();
  const { data, isLoading } = trpc.stall.dashboard.getDashboardCount.useQuery({
    registrantId: stall.id as string,
  });
  const { data: ageGroupData, isLoading: ageGroupIsLoading } =
    trpc.stall.dashboard.getAgeGroupOrderCount.useQuery({
      registrantId: stall.id as string,
    });
  const { data: weeklySalesData, isLoading: weeklySalesIsLoading } =
    trpc.stall.dashboard.getWeeklySales.useQuery({
      registrantId: stall.id as string,
    });
  return (
    <StallLayout>
      <StallHeader title="Dashboard" />
      <section id="dashboard" className="grid grid-cols-12 gap-x-3 gap-y-10">
        <div className="col-span-7 flex w-full items-center gap-x-3 rounded-xl bg-primary p-4 text-white">
          <div className="space-y-3">
            <p className="font-brocha text-xl">Welcome to your dashboard!</p>
            <p>
              This is <strong className="underline">{stall.name}</strong> stall
              dashboard designed to reflect an overview of the most important
              data inside the business.
            </p>
          </div>
          <div className="w-full">
            <DashboardIcon />
          </div>
        </div>
        <AgeGroupPieChart data={ageGroupData} isLoading={ageGroupIsLoading} />
        <div className="col-span-12 flex w-full flex-wrap justify-evenly rounded-xl bg-white">
          <CountCard
            title="Sales"
            count={data?.totalSales}
            trend={data?.totalTrendSales}
            isCurrency
            isLoading={isLoading}
            className=""
          />
          <CountCard
            title="Food Ordered"
            count={data?.totalOrders._sum.quantity as unknown as number}
            trend={data?.totalTrendOrders}
            isLoading={isLoading}
            className=""
          />
          <CountCard
            title="Survey Responses"
            count={data?.surveyResponses}
            isLoading={isLoading}
            className=""
          />
        </div>
        <div className="col-span-12 h-96 w-full rounded-lg bg-white">
          <EChart
            loading={weeklySalesIsLoading}
            option={{
              animation: true,
              title: {
                text: "Weekly Sales",
                left: "center",
                padding: 10,
              },
              xAxis: {
                type: "category",
                data: weeklySalesData?.map((item) =>
                  format(
                    new Date(
                      new Date().setHours(0, 0, 0, 0) -
                        item.day * 24 * 60 * 60 * 1000
                    ),
                    "E"
                  )
                ),
              },
              yAxis: {
                type: "value",
                axisLabel: {
                  formatter: (value: number) => FormatCurrency(value),
                },
              },
              tooltip: {
                trigger: "axis",
                formatter: (params: any) => {
                  const { name, value } = params[0];
                  return `${name}: ${FormatCurrency(value)}`;
                },
              },
              series: [
                {
                  data: weeklySalesData?.map((item) => item.totalSales),
                  type: "bar",
                },
              ],
            }}
            className="!max-h-[384px]"
          />
        </div>
      </section>
    </StallLayout>
  );
};

export default Dashboard;
