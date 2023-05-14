/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unsafe-optional-chaining */
import { format } from "date-fns";

import { trpc } from "@/server/utils/trpc";
import { FormatCurrency } from "@/client/lib/TextFormatter";

import { CountCard } from "@/client/components/card";
import { ApplicationHeader } from "@/client/components/header";
import { AppLayout } from "@/client/components/layout";
import { EChart } from "@/client/components/charts";

const dashboard = () => {
  const { data, isLoading } =
    trpc.application.dashboard.getRegistrantCount.useQuery();

  const { data: totalSales, isLoading: isLoadingTotalSales } =
    trpc.application.dashboard.getTotalSales.useQuery();
  const { data: weeklySalesData, isLoading: weeklySalesIsLoading } =
    trpc.application.dashboard.getWeeklySales.useQuery();
  const calculatePercentage = (value: number | undefined) => {
    return isLoading
      ? 0.333
      : value
      ? Math.round((value / (data?.total ?? 0)) * 1000) / 10
      : 0;
  };

  return (
    <AppLayout>
      <ApplicationHeader title="Dashboard" />
      <section id="At A Glance" className="grid grid-cols-12 gap-x-3 gap-y-10">
        <div className="col-span-full flex justify-between rounded-md bg-white p-5">
          <CountCard
            title="Sales"
            count={
              totalSales?.overallTotalSales._sum.total as unknown as number
            }
            trend={totalSales?.totalTrendSales}
            isCurrency
            isLoading={isLoadingTotalSales}
          />
          <CountCard
            title="Total Applicants"
            count={data?.total}
            isLoading={isLoading}
          />
          <div className="flex w-full max-w-sm items-center">
            <div
              className="w-full"
              style={{
                flex: calculatePercentage(data?.active) || 0.333,
              }}>
              <div className="h-2 w-full min-w-[50px] bg-lime-400" />
              <p className="heading text-sm text-lime-800">Active</p>
              <p className="heading text-sm text-gray-800">
                {data?.active} [{calculatePercentage(data?.active)}%]
              </p>
            </div>
            <div
              className="w-full"
              style={{
                flex: calculatePercentage(data?.pending) || 0.333,
              }}>
              <div className="h-2 w-full bg-amber-400" />
              <p className="heading text-sm text-amber-800">Pending</p>
              <p className="heading text-sm text-gray-800">
                {data?.pending} [{calculatePercentage(data?.pending)}%]
              </p>
            </div>
            <div
              className="w-full"
              style={{
                flex: calculatePercentage(data?.denied) || 0.333,
              }}>
              <div className="h-2 w-full bg-red-600" />
              <p className="heading text-sm text-red-900">Denied</p>
              <p className="heading text-sm text-gray-800">
                {data?.denied} [{calculatePercentage(data?.denied)}%]
              </p>
            </div>
            <div
              className="w-full"
              style={{
                flex: calculatePercentage(data?.expired) || 0.333,
              }}>
              <div className="h-2 w-full bg-rose-400" />
              <p className="heading text-sm text-rose-800">Expired</p>
              <p className="heading text-sm text-gray-800">
                {data?.expired} [{calculatePercentage(data?.expired)}%]
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-12 h-[400px] w-full rounded-lg bg-white">
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
    </AppLayout>
  );
};

export default dashboard;
