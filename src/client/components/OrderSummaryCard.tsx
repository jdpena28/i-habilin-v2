import Image from "next/image";
import { FC } from "react";

interface OrderSummaryProps {
  text: string;
  price: number;
  count?: number;
}

const OrderSummaryCard: FC<OrderSummaryProps> = ({ text, price, count }) => {
  return (
    <div>
      <div className="relative mb-6 flex h-32 w-full max-w-5xl rounded-3xl bg-gray-50">
        <button
          type="button"
          className="absolute -top-2 -right-3 mr-2 inline-flex items-center rounded-3xl bg-red-500 p-4 text-center text-sm font-medium text-white hover:bg-red-400 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            color="#ffffff"
            className="-m-2 h-1 w-4">
            <path d="M0 0h21.875v4H0z" />
          </svg>
        </button>
        <div className="relative m-2 inline-block w-32 overflow-hidden rounded-xl object-center">
          <Image
            className="bg-white"
            src="/.././public/food-placeholder.jpg"
            width={1980}
            height={1020}
            alt=""
          />
        </div>
        <div className="m-2 flex flex-1 flex-col">
          <div className="mb-11">
            <p className="text-md font-bold">{text}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className=" mr-2">
              <p className="text-secondary">
                ₱{" "}
                <span className="text-xl font-bold text-highlight">
                  {price}
                </span>{" "}
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
