/* eslint-disable no-unused-vars */
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GridLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";

import { AppNav } from "../nav";

const AppLayout = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) => {
  const { push } = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <section className="flex h-screen w-full items-center justify-center">
        <GridLoader className="grid-loader" size={48} />
      </section>
    );
  }
  if (status === "unauthenticated") {
    push("/auth/login");
  }

  return (
    <div className="flex h-full min-h-screen w-full gap-x-10">
      <AppNav />
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

export default AppLayout;
