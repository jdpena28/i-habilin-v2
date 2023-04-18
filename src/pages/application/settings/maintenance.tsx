/* eslint-disable jsx-a11y/label-has-associated-control */
import { trpc } from "@/server/utils/trpc";
import toast from "react-hot-toast";

import { ApplicationHeader } from "@/client/components/header";
import { AppLayout } from "@/client/components/layout";

const Maintenance = () => {
  const { data, refetch } = trpc.application.settings.getAppMeta.useQuery({
    key: "MAINTENANCE_MODE",
  });
  const { mutate } = trpc.application.settings.isMaintenanceMode.useMutation({
    onSuccess: (value) => {
      toast.success(
        `Maintenance mode is now ${
          value.value === "true" ? "enabled" : "disabled"
        }`,
        {
          icon: value.value === "true" ? "⚠" : "🚫",
        }
      );
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <AppLayout>
      <ApplicationHeader title="Maintenance" goBack />
      <section
        id="maintenance"
        className="flex flex-row items-center justify-center gap-x-5 rounded-md bg-white p-5">
        <p className="label-text">Maintenance Mode</p>
        <label
          htmlFor="AcceptConditions"
          className="relative h-8 w-14 cursor-pointer">
          <input
            type="checkbox"
            id="AcceptConditions"
            className="peer sr-only"
            checked={data?.value && JSON.parse(data?.value)}
            onChange={(e) => {
              mutate({
                value: e.target.checked,
              });
            }}
          />
          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500" />
          <span className="absolute inset-0 m-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6" />
        </label>
      </section>
    </AppLayout>
  );
};

export default Maintenance;
