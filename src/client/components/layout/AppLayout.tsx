import { ReactNode } from "react";
import { GridLoader } from "react-spinners";
import { AppNav } from "../nav";

const AppLayout = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) => {
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
    </div>
  );
};

export default AppLayout;
