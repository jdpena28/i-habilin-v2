import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import { CustomerNav } from "../nav";

const CustomerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-tertiary">
      <CustomerNav />
      <div className=" container mx-auto min-h-screen px-5 pt-16">
        {children}
      </div>
      <Toaster />
    </div>
  );
};

export default CustomerLayout;
