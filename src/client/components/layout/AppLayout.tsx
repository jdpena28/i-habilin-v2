import { ReactNode } from "react";
import { AppNav } from "../nav";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full min-h-screen w-full gap-x-10">
      <AppNav />
      {children}
    </div>
  );
};

export default AppLayout;
