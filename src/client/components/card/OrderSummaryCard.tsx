import Image from "next/image";
import { FC } from "react";

import { useCustomerOrderStore } from "@/client/store";
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { GetAllMenuType } from "@/client/types/main";

interface OrderSummaryProps {
  src: string;
  alt: string;
  text: string;
  price: number;
  id: string;
  stallId: string | undefined;
}

const OrderSummaryCard: FC<OrderSummaryProps> = ({
  src,
  alt,
  text,
  price,
  id,
  stallId,
}) => {
  const { customerOrder, updateCustomerOrder } = useCustomerOrderStore();
  const handleQuantityAdd = () => {
    const { orders } = customerOrder;
    const orderIndex = orders.findIndex((i) => i.id === stallId);
    const menuIndex = orders[orderIndex].menuOrders?.findIndex(
      (i: GetAllMenuType) => i.id === id
    );
    orders[orderIndex].menuOrders[menuIndex].quantity += 1;
    updateCustomerOrder({
      ...customerOrder,
      orders,
    });
  };
  const handleQuantityMinus = () => {
    const { orders } = customerOrder;
    const orderIndex = orders.findIndex((i) => i.id === stallId);
    const menuIndex = orders[orderIndex].menuOrders?.findIndex(
      (i: GetAllMenuType) => i.id === id
    );
    if (orders[orderIndex].menuOrders[menuIndex].quantity === 1) {
      return;
    }
    orders[orderIndex].menuOrders[menuIndex].quantity -= 1;
    updateCustomerOrder({
      ...customerOrder,
      orders,
    });
  };

  const handleDeleteMenu = () => {
    const { orders } = customerOrder;
    const orderIndex = orders.findIndex((i) => i.id === stallId);
    const menuIndex = orders[orderIndex].menuOrders?.findIndex(
      (i: GetAllMenuType) => i.id === id
    );
    orders[orderIndex].menuOrders.splice(menuIndex, 1);
    if (orders[orderIndex].menuOrders.length === 0) {
      orders.splice(orderIndex, 1);
    }
    updateCustomerOrder({
      ...customerOrder,
      orders,
    });
  };

  const findValue = () => {
    const { orders } = customerOrder;
    const orderIndex = orders.findIndex((i) => i.id === stallId);
    const menuIndex = orders[orderIndex].menuOrders?.findIndex(
      (i: GetAllMenuType) => i.id === id
    );
    return orders[orderIndex].menuOrders[menuIndex].quantity;
  };
  return (
    <div className="relative mb-2 flex h-28 w-full rounded-3xl bg-gray-50 sm:max-w-lg">
      <button
        type="button"
        onClick={handleDeleteMenu}
        className="absolute top-2 right-1 mr-2 inline-flex items-center rounded-3xl bg-red-500 p-3 text-center font-medium text-white hover:bg-red-400 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-m-2 h-1 w-3 fill-white">
          <path d="M0 0h21.875v4H0z" />
        </svg>
      </button>
      <div className="flex">
        <div className="m-2 flex h-auto w-[35%] overflow-hidden rounded-xl object-contain">
          <Image
            className="bg-white"
            src={src}
            width={1980}
            height={1020}
            alt={alt}
          />
        </div>
        <div className="m-2 flex flex-1 flex-col overflow-hidden text-sm sm:text-base">
          <div className="mb-8">
            <p className="truncate pr-8 font-bold">{text}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="mr-2">
              <p className="font-bold text-highlight">
                {FormatCurrency(price, "PHP", true)}
              </p>
            </div>
            <div>
              <div className="flex items-center rounded-full border">
                <button
                  type="button"
                  className="h-8 w-8 leading-10 text-gray-600 transition hover:opacity-75"
                  onClick={handleQuantityMinus}>
                  -
                </button>
                <input
                  type="number"
                  id="Quantity"
                  value={findValue()}
                  className="h-8 w-12 border-none text-center text-xs font-bold [-moz-appearance:_textfield] sm:text-sm sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  className="h-8 w-8 leading-10 text-gray-600 transition hover:opacity-75"
                  onClick={handleQuantityAdd}>
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
