import React from "react";
import { PublicNav } from "../nav";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-tertiary">
      <PublicNav />
      <div className="container mx-auto min-h-screen px-5">{children}</div>
    </div>
  );
};

export default HomeLayout;
