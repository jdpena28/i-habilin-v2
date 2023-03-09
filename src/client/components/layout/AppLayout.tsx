import { ReactNode } from "react";
import { AppNav } from "../nav";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full min-h-screen w-full gap-x-10">
      <AppNav />
      <div className="w-full pr-10">{children}</div>
    </div>
  );
};

export default AppLayout;
