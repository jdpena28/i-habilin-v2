import { Toaster } from "react-hot-toast";
import type { FC, ReactNode } from "react";
import { GridLoader } from "react-spinners";
import { CustomerNav } from "../nav";

interface CustomerLayoutProps {
  children: ReactNode;
  isLoading: boolean;
}

const CustomerLayout: FC<CustomerLayoutProps> = ({ children, isLoading }) => {
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
