import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";

import { AppModules } from "@/client/types/types";
import { APPLICATION_MODULES } from "@/client/constant/application";

const AppNav = () => {
  return (
    <nav className="h-screen w-[10%] bg-primary">
      <div className="decorated-underline mb-10 p-5 text-white">
        <p className="heading text-3xl">I-Habilin</p>
        <div />
      </div>
      <div className="flex flex-col">
        {APPLICATION_MODULES.map((module: AppModules) => {
          return <NavLinks {...module} key={module.name} />;
        })}
      </div>
    </nav>
  );
};

const NavLinks: FC<AppModules> = ({ path, action, logo, name }) => {
  const { pathname } = useRouter();
  return (
    <Link href={path} onClick={action}>
      <div
        className={`flex items-center gap-x-4 p-3 ${
          pathname.split("/")[2].includes(name.toLowerCase())
            ? "active-link"
            : ""
        }`}>
        {logo}
        <p className="font-medium text-white">{name}</p>
      </div>
    </Link>
  );
};

export default AppNav;
