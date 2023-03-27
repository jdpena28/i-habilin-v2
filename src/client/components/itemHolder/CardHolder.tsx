/* eslint-disable @next/next/no-img-element */
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { FC, ReactNode } from "react";

interface CardHolderProps {
  icon: ReactNode;
  text: string;
  price: number;
}

const CardHolder: FC<CardHolderProps> = ({ icon, text, price }) => {
  return (
    <div className="m-4 overflow-hidden rounded shadow-lg">
      {icon}
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{text}</div>
        <div>{FormatCurrency(price)}</div>
        <p className="text-base text-gray-700">
          perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
    </div>
  );
};

export default CardHolder;
