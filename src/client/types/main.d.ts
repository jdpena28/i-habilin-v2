import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/routers/_app";
import type { Menu, Media } from "@prisma/client";

type RouterOutput = inferRouterOutputs<AppRouter>;

export interface GetAllMenuType extends Menu {
  media?: Media;
  category?: {
    registrant?: {
      id?: string;
      name?: string;
    };
  };
  quantity: number;
}
