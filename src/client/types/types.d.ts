/* eslint-disable no-unused-vars */
import React, { ReactElement } from "react";

export type AppModules = {
  name: string;
  path: string;
  logo: ReactElement;
  action?: () => void;
};
