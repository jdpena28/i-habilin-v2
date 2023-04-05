/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

type StallConfigurationType = {
  id: string | undefined;
  logo: string | undefined;
  name: string | undefined;
};

interface StallConfigurationStore {
  stall: StallConfigurationType;
  updateStall: (stall: StallConfigurationType) => void;
}

export const useStallConfigurationStore = create<StallConfigurationStore>()(
  persist(
    (set) => ({
      stall: {
        id: "",
        logo: "",
        name: "",
      },
      updateStall: (stall: StallConfigurationType) => {
        set({ stall });
      },
    }),
    {
      name: "stall-configuration",
    }
  )
);
