/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

type CustomerReferenceType = {
  id: string;
  name: string | undefined | null;
  isSurveyed: boolean;
};

interface CustomerReference {
  customerReference: CustomerReferenceType;
  updateCustomerReference: (customerReference: CustomerReferenceType) => void;
}

export const useCustomerReferenceStore = create<CustomerReference>()(
  persist(
    (set) => ({
      customerReference: {
        isSurveyed: false,
        id: "",
        name: "",
      },
      updateCustomerReference: (customerReference: CustomerReferenceType) => {
        set({ customerReference });
      },
    }),
    {
      name: "customer-reference",
    }
  )
);

type CustomerOrderType = {
  tableNumber: number | undefined;
  isTableModalOpen: boolean;
};

interface CustomerOrder {
  customerOrder: CustomerOrderType;
  updateCustomerOrder: (customerOrder: CustomerOrderType) => void;
}

export const useCustomerOrderStore = create<CustomerOrder>()(
  persist(
    (set) => ({
      customerOrder: {
        tableNumber: undefined,
        isTableModalOpen: false,
      },
      updateCustomerOrder: (customerOrder: CustomerOrderType) => {
        set({ customerOrder });
      },
    }),
    {
      name: "customer-order",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
