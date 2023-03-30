import Image from "next/image";
import { FC } from "react";
import { FormatCurrency } from "@/client/lib/TextFormatter";

interface OrderSummaryProps {
  src: string;
  alt: string;
  text: string;
  price: number;
  count?: number;
}

const OrderSummaryCard: FC<OrderSummaryProps> = ({
  src,
  alt,
  text,
  price,
  count,
}) => {
  return (
    <div>
      <div className="relative mb-2 flex h-28 w-full rounded-3xl bg-gray-50 md:max-w-sm">
        <button
          type="button"
          className="absolute top-2 right-1 mr-2 inline-flex items-center rounded-3xl bg-red-500 p-3 text-center text-sm font-medium text-white hover:bg-red-400 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            color="#ffffff"
            className="-m-2 h-1 w-3">
            <path d="M0 0h21.875v4H0z" />
          </svg>
        </button>
        <div className="relative m-2 inline-block w-2/6 overflow-hidden rounded-xl object-center">
          <Image
            className="bg-white"
            src={src}
            width={1980}
            height={1020}
            alt={alt}
          />
        </div>
        <div className="m-2 flex flex-1 flex-col">
          <div className="mb-8">
            <p className="text-md font-bold">{text}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className=" mr-2">
              <p className="text-xl font-bold text-highlight">
                {FormatCurrency(price, "PHP", true)}
              </p>
            </div>
            <div>
              <div className="flex items-center rounded-full border">
                <button
                  type="button"
                  className="h-8 w-8 leading-10 text-gray-600 transition hover:opacity-75">
                  -
                </button>

                <input
                  type="number"
                  id="Quantity"
                  value={count}
                  className="h-8 w-12 border-transparent text-center font-bold [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  className="h-8 w-8 leading-10 text-gray-600 transition hover:opacity-75">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
