import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { STALL_APPLICATION_MODULES } from "@/client/constant/application";
import { useStallConfigurationStore } from "@/client/store";

import type { AppModules } from "@/client/types/types";

const StallNav = () => {
  const { data } = useSession();
  const { stall } = useStallConfigurationStore();
  return (
    <nav className="sticky left-0 h-screen w-[15%] bg-primary">
      <div className="relative mx-auto my-10 h-36 w-36 rounded-lg bg-white object-contain object-center p-2 lg:p-5">
        <Image
          className="rounded-lg"
          src={stall?.logo ? stall.logo : "/I-habilin-logo.svg"}
          alt={stall?.name ? `${stall.name} Logo ` : "I-Habilin Logo"}
          fill
        />
      </div>
      <div className="flex flex-col">
        {STALL_APPLICATION_MODULES.map((module: AppModules) => {
          return <NavLinks {...module} key={module.name} />;
        })}
      </div>
      <div className="absolute bottom-0 flex w-full flex-col items-center justify-around gap-x-3 bg-highlight p-1 lg:flex-row">
        <div className="avatar">
          {data?.user?.name?.split(" ")[0].charAt(0)}
          {data?.user?.name?.split(" ")[1].charAt(0)}
        </div>
        <p className="text-xs text-tertiary">{data?.user?.name}</p>
      </div>
    </nav>
  );
};

const NavLinks: FC<AppModules> = ({ path, action, logo, name }) => {
  const { pathname, query } = useRouter();
  return (
    <Link href={`/${query.stall}${path}`} onClick={action}>
      <div
        className={`flex items-center gap-x-4 p-3 ${
          pathname.split("/")[3].includes(name.toLowerCase())
            ? "active-link"
            : ""
        }`}>
        {logo}
        <p className="hidden font-medium text-white lg:block">{name}</p>
      </div>
    </Link>
  );
};

export default StallNav;