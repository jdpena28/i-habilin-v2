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
    <div className="flex w-full max-w-xs flex-col rounded-xl bg-white drop-shadow-md">
      <div className="h-2/5 w-4/5">
        <Image
          className="h-44 max-w-xs rounded-xl  object-cover md:h-64"
          src={src}
          width={1980}
          height={1020}
          alt={alt}
        />
      </div>
      <div className="flex flex-col p-4 leading-normal">
        <div className="mb-2 text-xl font-bold">{text}</div>
        <div>{FormatCurrency(price)}</div>
        <p className="mb-3 font-normal text-gray-700">
          perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
    </div>
  );
};

export default CardHolder;
