import { CountCard } from "@/client/components/card";
import { ApplicationHeader } from "@/client/components/header";
import { AppLayout } from "@/client/components/layout";

const dashboard = () => {
  const applicationStatus: number[] = [32, 68, 12];

  const calculatePercentage = (value: number) => {
    const total = applicationStatus.reduce((a, b) => a + b, 0);
    return Math.round((value / total) * 1000) / 10;
  };

  return (
    <AppLayout>
      <ApplicationHeader title="Dashboard" />
      <section
        id="At A Glance"
        className="flex justify-between rounded-md bg-white p-5">
        <CountCard title="Sales" count={999999} trend={12500} isCurrency />
        <CountCard title="Total Approved Applicants" count={11} />
        <div className="flex w-full max-w-sm">
          <div
            className="w-full"
            style={{
              flex: calculatePercentage(applicationStatus[0]),
            }}>
            <div className="h-2 w-full min-w-[50px] bg-lime-400" />
            <p className="heading text-sm text-lime-800">Approved</p>
            <p className="heading text-sm text-gray-800">
              {applicationStatus[0]} [
              {calculatePercentage(applicationStatus[0])}%]
            </p>
          </div>
          <div
            className="w-full"
            style={{
              flex: calculatePercentage(applicationStatus[1]),
            }}>
            <div className="h-2 w-full bg-amber-400" />
            <p className="heading text-sm text-amber-800">Pending</p>
            <p className="heading text-sm text-gray-800">
              {applicationStatus[1]} [
              {calculatePercentage(applicationStatus[1])}%]
            </p>
          </div>
          <div
            className="w-full"
            style={{
              flex: calculatePercentage(applicationStatus[2]),
            }}>
            <div className="h-2 w-full bg-rose-400" />
            <p className="heading text-sm text-rose-800">Expired</p>
            <p className="heading text-sm text-gray-800">
              {applicationStatus[2]} [
              {calculatePercentage(applicationStatus[2])}%]
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default dashboard;
