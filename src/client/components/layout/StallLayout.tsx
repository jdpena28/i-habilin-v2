/* eslint-disable no-unused-vars */
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GridLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import { trpc } from "@/server/utils/trpc";

import { StallNav } from "../nav";

const StallLayout = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) => {
  const { query, push } = useRouter();
  const { status } = useSession();

  const { data, isLoading: maintenanceIsLoading } =
    trpc.application.settings.getAppMeta.useQuery(
      {
        key: "MAINTENANCE_MODE",
      },
      {
        staleTime: 1000 * 60 * 0.5, // 1 minute
        refetchOnWindowFocus: true,
      }
    );

  if (status === "loading" || maintenanceIsLoading) {
    return (
      <section className="flex h-screen w-full items-center justify-center">
        <GridLoader className="grid-loader" size={48} />
      </section>
    );
  }

  if (status === "unauthenticated") {
    push(`/${query.stall}/auth/login`);
  }

  if (!maintenanceIsLoading && data?.value === "true") {
    push("/maintenance");
  }

  return (
    <div className="flex h-full min-h-screen w-full gap-x-10">
      <StallNav />
      <div className="w-full overflow-y-auto pr-10">
        {isLoading ? (
          <section className="flex h-screen w-full items-center justify-center">
            <GridLoader className="grid-loader" size={48} />
          </section>
        ) : (
          children
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default StallLayout;
