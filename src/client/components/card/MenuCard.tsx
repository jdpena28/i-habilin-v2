/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { FC } from "react";
import Image from "next/image";

interface MenuCardProps {
  title: string;
  total: number;
  price: number;
  description: string | null;
  imageUrl: string;
  discount: number;
  status: string;
  onClick: () => void;
}

const MenuCard: FC<MenuCardProps> = ({
  title,
  total,
  price,
  description,
  imageUrl,
  discount,
  status,
  onClick,
}) => {
  return (
    <div
      className="relative col-span-1 aspect-video h-[288px] w-full rounded p-1 shadow-lg lg:h-[432px] lg:p-4"
      onClick={onClick}
      aria-hidden>
      {discount > 0 && status === "Available" && (
        <div className="absolute -top-4 -right-2 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-red-500 font-poppins font-medium text-white lg:h-14 lg:w-14">
          <span className="text-xs">Sale</span>
          <span className=" text-xs lg:text-sm">{discount}%</span>
        </div>
      )}
      {status === "Not Available" && (
        <div className="absolute z-30 flex h-full w-full items-center justify-center backdrop-blur-sm">
          <div className="h-max w-max rounded-md bg-red-500 p-2 font-poppins font-medium tracking-wider text-white">
            Not Available
          </div>
        </div>
      )}
      <Image
        className="mx-auto"
        src={`${imageUrl}/-/crop/16:9/`}
        alt={title}
        height={576 * 0.5}
        width={720 * 0.5}
      />
      <div className="p-2 lg:px-6 lg:py-4">
        <div className=" mb-1 text-sm font-bold lg:mb-2 lg:text-xl">
          {title}
        </div>
        <div className="text-sm lg:text-base">
          {discount > 0 && (
            <span className="text-sm line-through lg:text-base">
              {FormatCurrency(price)}
            </span>
          )}
          {discount > 0 && ` - `}
          {FormatCurrency(total)}
        </div>
        <p className="h-32 truncate whitespace-normal text-xs text-gray-700 lg:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
