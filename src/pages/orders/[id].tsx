/* eslint-disable no-shadow */
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { isEmpty, flattenDeep, isEqual, filter } from "lodash";
import { useRouter } from "next/router";

import { trpc } from "@/server/utils/trpc";
import { FormatCurrency } from "@/client/lib/TextFormatter";

import { CustomerLayout } from "@/client/components/layout";
import { Spinner } from "@/client/components/loader";
import ModalTemplate from "@/client/components/modal/ModalTemplate";

const Orders = () => {
  const [isFoodReadyModalOpen, setIsFoodReadyModalOpen] = useState(false);
  const [readyFood, setReadyFood] = useState<any>();
  const [readedFood, setReadedFood] = useState<any>([]);
  const { query } = useRouter();
  const { data, isLoading } = trpc.public.order.getOrder.useQuery(
    {
      id: query.id as string,
    },
    {
      refetchInterval: 1000 * 15, // 15 seconds
      onSuccess: (data) => {
        if (data.data) {
          // #FIX: data should be refined when they close the modal remove on the ready food and replace with new ready food
          const allReadyFood = Object.keys(data.data).map((key) => {
            const eachStall = data.data[key].map((item) => {
              const eachMenu = item.data.filter((item) => {
                return (
                  item.status === "Ready" && !readedFood.includes(item.id[0])
                );
              });
              return eachMenu;
            });
            return eachStall;
          });
          const flattenedData = flattenDeep(allReadyFood);
          const areEquals = isEqual(flattenedData, readyFood);
          if (areEquals) return;
          if (!isEmpty(flattenedData)) {
            setReadyFood(flattenedData);
            setIsFoodReadyModalOpen(true);
            if (window.navigator.userAgent.includes("Android")) {
              window?.navigator?.vibrate([
                1000, 500, 1000, 500, 1000, 500, 1000, 500, 1000, 500, 1000,
                500,
              ]);
            }
          }
        }
      },
    }
  );

  const total = useMemo(() => {
    if (isEmpty(data)) return 0;
    return Object.keys(data.data).reduce((acc, key) => {
      const menuTotal = data.data[key].reduce((acc, item) => {
        const eachTotal = item.data.reduce((acc, item) => {
          if (item.status === "Cancelled") return acc;
          return (
            acc +
            parseInt(item.menu.total as unknown as string, 10) * item.quantity
          );
        }, 0);
        return acc + eachTotal;
      }, 0);
      return acc + menuTotal;
    }, 0);
  }, [data]);

  const statusBadge = (status: string) => {
    switch (status) {
      case "Order":
        return "badge-yellow";
      case "Preparing":
        return "badge-orange";
      case "Ready":
        return "badge-lime";
      case "Bill Out":
        return "badge-blue";
      default:
        return "badge-red";
    }
  };

  const handleReadedFoodModal = () => {
    if (readedFood.length > 0) {
      const filterIdWithLengthOfTwo = filter(readyFood, (item) => {
        return item.id.length <= 1;
      });
      setReadedFood(
        filterIdWithLengthOfTwo.map((item: any) => {
          return item.id[0];
        })
      );
    }
    setReadedFood(
      readedFood.concat(
        readyFood?.map((item: any) => {
          return item.id[0];
        })
      )
    );
    setIsFoodReadyModalOpen(false);
  };

  return (
    <CustomerLayout isLoading={isLoading}>
      <section id="orders" className="space-y-3">
        <div className="mt-3 w-full rounded-lg bg-white p-2 text-center">
          <h3 className="text-lg lg:text-2xl">Orders</h3>
          <p className="font-bold text-gray-500">
            Table #: {data?.tableNumber}{" "}
          </p>
        </div>
        <div className="flex w-full flex-col gap-y-3 divide-y-2 rounded-lg bg-white p-2 lg:p-5">
          {isLoading ? (
            <Spinner />
          ) : !isEmpty(data) ? (
            Object.keys(data.data).map((key) => {
              return (
                <div key={key} className="space-y-3">
                  <p className="font-bold lg:mb-3">{key}</p>
                  {data.data[key].map((i) => {
                    return (
                      <>
                        <div
                          key={Math.random()}
                          className={`${statusBadge(i.status)} !max-w-full`}>
                          {i.status}
                        </div>
                        <div key={Math.random()} className="space-y-3">
                          {i.data.map((item) => (
                            <MenuOrderCard
                              key={item.id[0]}
                              src={item.menu.media.cdnUrl}
                              text={item.menu.name}
                              quantity={item.quantity}
                              price={item.menu.total as unknown as number}
                            />
                          ))}
                        </div>
                      </>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <p className="lg:mb-3">No data available</p>
          )}
        </div>
        <div className="space-y-3 rounded-lg bg-white p-2 lg:p-5">
          <p className="font-brocha text-sm font-bold ">Have a promo code?</p>
          <div>
            <div className="flex">
              <div className="relative flex w-full rounded-lg p-2 ring-1 ring-primary">
                <input
                  type="text"
                  className="w-full appearance-none border-none text-sm outline-none ring-0 focus:outline-none  focus:ring-0 "
                  placeholder="Enter promo code here"
                />
                <button
                  type="button"
                  className="rounded-2xl bg-secondary !p-3 text-xs text-highlight">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3 rounded-lg bg-white p-2 lg:p-5">
          <p className="font-brocha text-sm font-bold">Order Summary</p>
          <div className="items-between flex w-full flex-col rounded-3xl bg-gray-50 px-6 py-4 text-sm text-gray-500">
            <div className="my-1 flex justify-between">
              <p className="font-semibold">Subtotal</p>
              <p className="font-semibold">
                {FormatCurrency(total - total * 0.12, "PHP")}
              </p>
            </div>
            <div className="my-1 flex justify-between">
              <p className="font-semibold">VAT</p>
              <p className="font-semibold">
                {FormatCurrency(total * 0.12, "PHP")}
              </p>
            </div>
            <div className="mt-1 mb-8 flex justify-between">
              <p className="font-semibold">Coupon Discount</p>
              <p className="font-semibold">{FormatCurrency(0, "PHP")}</p>
            </div>
            <div>
              <hr />
            </div>
            <div className="flex justify-between pt-4 text-lg text-highlight">
              <p className="font-semibold ">Total</p>
              <p className="font-semibold">{FormatCurrency(total, "PHP")}</p>
            </div>
          </div>
          <button className="w-full bg-primary text-white">Bill Out</button>
        </div>
      </section>
      <ModalTemplate
        title="Food are ready"
        isOpenModal={isFoodReadyModalOpen}
        setIsOpenModal={setIsFoodReadyModalOpen}
        onClose={handleReadedFoodModal}
        bodyClassName="max-w-2xl">
        <ul className="list-inside list-disc space-y-3">
          {readyFood?.map((item: any) => {
            return <li key={item.id}>{item.menu.name}</li>;
          })}
        </ul>
        <div className="flex flex-row-reverse">
          <button
            className="bg-primary text-white"
            onClick={handleReadedFoodModal}>
            Okey
          </button>
        </div>
      </ModalTemplate>
    </CustomerLayout>
  );
};

type MenuOrderCardProps = {
  src: string;
  text: string;
  quantity: number;
  price: number;
};

const MenuOrderCard: FC<MenuOrderCardProps> = ({
  src,
  text,
  quantity,
  price,
}) => {
  return (
    <div className="flex flex-1 items-center justify-around gap-x-2">
      <div className="flex w-full flex-[.80] items-center gap-x-3 lg:gap-x-0">
        <div className="relative h-24 w-full lg:w-1/3">
          <Image
            className="aspect-video bg-white object-contain"
            src={src}
            alt={text}
            fill
          />
        </div>
        <div className="w-full lg:w-max">
          <p className="text-sm font-medium">{text}</p>
          <p className="text-xs">QTY: {quantity}</p>
        </div>
      </div>
      <p className="flex-[.20] font-brocha text-sm">
        {FormatCurrency(price, "PHP")}
      </p>
    </div>
  );
};

export default Orders;
