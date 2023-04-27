/* eslint-disable no-underscore-dangle */
import { useStallConfigurationStore } from "@/client/store";
import { trpc } from "@/server/utils/trpc";

import DashboardIcon from "@public/dashboard-icon";

import { StallHeader } from "@/client/components/header";
import { StallLayout } from "@/client/components/layout";
import { CountCard } from "@/client/components/card";
import { EChart } from "@/client/components/charts";

import type { ReactEChartsProps } from "@/client/components/charts/EChart";

const Dashboard = () => {
  const { stall } = useStallConfigurationStore();
  const { data, isLoading } = trpc.stall.dashboard.getDashboardCount.useQuery({
    registrantId: stall.id as string,
  });
  const option: ReactEChartsProps["option"] = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "-2%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  const barOption: ReactEChartsProps["option"] = {
    animation: true,
    title: {
      text: "Weekly Sales",
      left: "center",
      padding: 10,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
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
        <div className="col-span-5 rounded-lg bg-white">
          <EChart option={option} />
        </div>
        <div className="col-span-12 flex w-full flex-wrap justify-evenly">
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
            option={barOption}
            style={{
              maxHeight: "384px !important",
            }}
          />
        </div>
      </section>
    </StallLayout>
  );
};

export default Dashboard;
