import { Toaster } from "react-hot-toast";
import type { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { GridLoader } from "react-spinners";
import { trpc } from "@/server/utils/trpc";
import { CustomerNav } from "../nav";

interface CustomerLayoutProps {
  children: ReactNode;
  isLoading: boolean;
}

const CustomerLayout: FC<CustomerLayoutProps> = ({ children, isLoading }) => {
  const { push } = useRouter();
  const { data, status: maintenanceStatus } =
    trpc.application.settings.getAppMeta.useQuery(
      {
        key: "MAINTENANCE_MODE",
      },
      {
        staleTime: 1000 * 60 * 60 * 1, // 1 hour
      }
    );
  if (maintenanceStatus === "loading") {
    return (
      <section className="flex h-screen w-full items-center justify-center">
        <GridLoader className="grid-loader" size={48} />
      </section>
    );
  }
  if (maintenanceStatus === "success" && data?.value === "true") {
    push("/maintenance");
  }
  return (
    <div className="bg-tertiary">
      <CustomerNav />
      {isLoading ? (
        <section className="flex h-screen w-full items-center justify-center">
          <GridLoader className="grid-loader" size={48} />
        </section>
      ) : (
        <div className=" container mx-auto min-h-screen px-5 pt-16">
          {children}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default CustomerLayout;
