/* eslint-disable no-unsafe-optional-chaining */
import { trpc } from "@/server/utils/trpc";

import { CountCard } from "@/client/components/card";
import { ApplicationHeader } from "@/client/components/header";
import { AppLayout } from "@/client/components/layout";

const dashboard = () => {
  const { data, isLoading } =
    trpc.application.registrant.getRegistrantCount.useQuery();

  const calculatePercentage = (value: number | undefined) => {
    return isLoading
      ? 0.333
      : Math.round((value || 0 / (data?.total ? data?.total : 0)) * 1000) / 10;
  };

  return (
    <AppLayout>
      <ApplicationHeader title="Dashboard" />
      <section
        id="At A Glance"
        className="flex justify-between rounded-md bg-white p-5">
        <CountCard
          title="Sales"
          count={999999}
          trend={12500}
          isCurrency
          isLoading={isLoading}
        />
        <CountCard
          title="Total Applicants"
          count={data?.total}
          isLoading={isLoading}
        />
        <div className="flex w-full max-w-sm">
          <div
            className="w-full"
            style={{
              flex: calculatePercentage(data?.active),
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
              flex: calculatePercentage(data?.pending),
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
              flex: calculatePercentage(data?.expired),
            }}>
            <div className="h-2 w-full bg-rose-400" />
            <p className="heading text-sm text-rose-800">Expired</p>
            <p className="heading text-sm text-gray-800">
              {data?.expired} [{calculatePercentage(data?.expired)}%]
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default dashboard;
