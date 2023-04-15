import React from "react";
import StallBillCard from "@/client/components/card/StallBillCard";

const BillOut = () => {
  return (
    <section className="bg-white px-4">
      <div className="my-4 flex w-full max-w-2xl items-center ">
        <div>
          <button
            type="button"
            className="flex rounded-full text-blue-700 hover:bg-gray-200 hover:text-white">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 32 32">
              <path
                d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                data-name="4-Arrow Left"
              />
            </svg>
          </button>
        </div>
        <div className="mr-10 flex w-full justify-center font-brocha text-lg font-bold md:text-xl">
          Orders
        </div>
      </div>

      <StallBillCard
        stall="Mang Inasal"
        text="Unli Manok"
        price={150}
        discount={50}
        quantity={1}
        total={200}
      />
      <StallBillCard
        stall="Jollibee"
        text="Chicken Joy"
        price={150}
        discount={50}
        quantity={1}
        total={200}
      />
      <StallBillCard
        stall="Greenwich"
        text="Chicken Joy"
        price={150}
        discount={50}
        quantity={1}
        total={200}
      />
      <StallBillCard
        stall="Luto ni Bebang"
        text="Chicken Joy"
        price={150}
        discount={50}
        quantity={1}
        total={200}
      />
      <StallBillCard
        stall="Popots"
        text="Chicken Joy"
        price={150}
        discount={50}
        quantity={1}
        total={200}
      />
      <StallBillCard
        stall="Zeus Silog"
        text="Chicken Joy"
        price={150}
        discount={50}
        quantity={1}
        total={200}
      />
      <StallBillCard
        stall="KFC"
        text="Chicken Joy"
        price={150}
        discount={50}
        quantity={1}
        total={200}
      />
      <StallBillCard
        stall="Chowking"
        text="Biryani"
        price={130}
        discount={10}
        quantity={2}
        total={250}
      />
      <div className="md:text-lg">
        <div>
          <p className="font-brocha font-bold">Order Summary</p>
        </div>
        <div className="items-between flex w-full max-w-2xl flex-col rounded-3xl bg-gray-50 px-6 py-4 text-gray-500">
          <div className="flex justify-between text-highlight">
            <p className="font-semibold ">Overall Total</p>
            <p className="font-semibold">₱ 201.60 </p>
          </div>
        </div>
        <button
          type="button"
          className="my-12 w-full max-w-2xl bg-secondary font-brocha text-highlight">
          Bill Out
        </button>
      </div>
    </section>
  );
};

export default BillOut;
