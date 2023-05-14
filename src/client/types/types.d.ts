import { ReactElement } from "react";

export type AppModules = {
  name: string;
  path: string;
  logo: ReactElement;
  action?: () => void;
};
