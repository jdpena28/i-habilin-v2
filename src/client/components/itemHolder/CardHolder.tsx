/* eslint-disable @next/next/no-img-element */
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { FC } from "react";
import Image from "next/image";

interface CardHolderProps {
  src: string;
  text: string;
  price: number;
  alt: string;
}

const CardHolder: FC<CardHolderProps> = ({ src, alt, text, price }) => {
  return (
    <div className="m-4 overflow-hidden rounded shadow-lg">
      <Image
        className="bg-white"
        src={src}
        width={1980}
        height={1020}
        alt={alt}
      />
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
