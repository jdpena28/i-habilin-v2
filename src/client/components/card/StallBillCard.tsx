import { FC } from "react";
import { FormatCurrency } from "@/client/lib/TextFormatter";

interface StallBillProps {
  text: string;
  stall: string;
  price: number;
  total: number;
  discount: number;
  quantity?: number;
}

const StallBillCard: FC<StallBillProps> = ({
  stall,
  text,
  price,
  total,
  discount,
  quantity,
}) => {
  return (
    <div className="items-between mb-4 flex w-full max-w-2xl flex-col rounded-3xl bg-gray-50 px-6 py-4">
      <div className="flex justify-between pb-4">
        <p className="flex max-w-xl items-center truncate font-brocha text-lg font-bold md:text-xl">
          {stall}
        </p>
        <span className="badge-orange flex items-center justify-center rounded-full">
          Preparing
        </span>
      </div>
      <div className="my-1 flex flex-wrap justify-between pb-2 text-sm md:text-base">
        <p className="w-1/2 font-semibold">{text}</p>
        <p className="flex w-1/2 justify-end font-semibold">
          {FormatCurrency(price)}
        </p>
        <p className="flex w-full justify-end font-semibold">Qty: {quantity}</p>
      </div>
      <div>
        <hr />
      </div>
      <div className="items-between flex w-full max-w-2xl flex-col bg-gray-50 pt-4 text-highlight">
        <div className="flex justify-between text-sm md:text-base">
          <p className="font-semibold">Coupon Discount</p>
          <p className="font-semibold">{FormatCurrency(-discount)}</p>
        </div>
        <div className="my-1 flex justify-between md:text-lg">
          <p className="font-semibold">Total</p>
          <p className="font-semibold ">{FormatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default StallBillCard;
