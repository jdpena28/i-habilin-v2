/* eslint-disable no-shadow */
import Image from "next/image";
import { FC, useMemo, useState, Fragment } from "react";
import { isEmpty, flattenDeep, isEqual, filter, uniq } from "lodash";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { Listbox, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";

import { trpc } from "@/server/utils/trpc";
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { BillOutSchema, billOutSchema } from "@/server/schema/public/order";
import { RouterOutput } from "@/client/types/main";

import { CustomerLayout } from "@/client/components/layout";
import { Spinner } from "@/client/components/loader";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { InputForm } from "@/client/components/form";
import { SubmitButton } from "@/client/components/buttons";

const Orders = () => {
  const [isFoodReadyModalOpen, setIsFoodReadyModalOpen] = useState(false);
  const [emailReceiptModalOpen, setEmailReceiptModalOpen] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [readyFood, setReadyFood] = useState<any>();
  const [readedFood, setReadedFood] = useState<any>([]);
  const { query } = useRouter();
  const { data, isLoading, refetch } = trpc.public.order.getOrder.useQuery(
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
  const { mutate: billOut } = trpc.public.order.billOut.useMutation({
    onSuccess: () => {
      refetch();
      setEmailReceiptModalOpen(false);
      setSubmitIsLoading(false);
      toast.success("Order bill out");
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.error(error.message);
    },
  });
  const { mutate: redeemCode } = trpc.public.order.redeemCode.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Code Redeemed", {
        id: "toast-voucher",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        id: "toast-voucher",
      });
    },
  });
  const { mutate: deleteCode } = trpc.public.order.deleteCode.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Code Deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { data: voucherCodeData } = trpc.public.order.getVoucherCode.useQuery(
    {
      stallNames: uniq(
        Object.keys(data?.data || {}).map((key) => {
          return key;
        })
      ),
    },
    {
      enabled: !isEmpty(data?.data),
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BillOutSchema>({
    resolver: yupResolver(billOutSchema),
  });

  const onSubmit = (values: BillOutSchema) => {
    setSubmitIsLoading(true);
    billOut({
      ...values,
      orderData: data,
    });
  };

  const handleBillOut = () => {
    if (isEmpty(data)) return;
    const getAllMenuIds = Object.keys(data.data).map((key) => {
      const eachStall = data.data[key].map((item) => {
        const eachMenu = item.data.map((item) => {
          if (item.status === "Cancelled") return "0";
          return item.id;
        });
        return eachMenu;
      });
      return eachStall;
    });
    setValue("id", data.id as string);
    setValue("menuIds", flattenDeep(getAllMenuIds));
    setValue("total", total + couponDiscount);
    setEmailReceiptModalOpen(true);
  };

  const total = useMemo(() => {
    if (isEmpty(data)) return 0;
    return Object.keys(data.data).reduce((acc, key) => {
      const menuTotal = data.data[key].reduce((acc, item) => {
        const eachTotal = item.data.reduce((acc, item) => {
          if (item.status === "Cancelled") return acc;
          return (
            acc +
            parseFloat(item.menu.total as unknown as string) * item.quantity
          );
        }, 0);
        return acc + eachTotal;
      }, 0);
      return acc + menuTotal;
    }, 0);
  }, [data]);

  const couponDiscount = useMemo(() => {
    if (
      isEmpty(data?.tableOrder?.discount) ||
      isEmpty(data?.data) ||
      isEmpty(data)
    )
      return 0;
    const totalFromTheMenu = Object.keys(data.data).reduce((acc, key) => {
      if (key !== data?.tableOrder?.discount?.registrant?.name) return acc;
      const menuTotal = data.data[key].reduce((acc, item) => {
        const eachTotal = item.data.reduce((acc, item) => {
          if (item.status === "Cancelled") return acc;
          return (
            acc +
            parseFloat(item.menu.total as unknown as string) * item.quantity
          );
        }, 0);
        return acc + eachTotal;
      }, 0);
      return acc + menuTotal;
    }, 0);
    return (
      Math.abs(
        totalFromTheMenu *
          ((data?.tableOrder?.discount?.discount as unknown as number) / 100)
      ) * -1
    );
  }, [data]);

  const isBillOut = useMemo(() => {
    if (isEmpty(data)) return false;
    return Object.keys(data.data).every((key) => {
      return data.data[key].some((item) => {
        return item.data.some((item) =>
          ["Bill Out", "Cancelled", "Ready", "Completed"].includes(item.status)
        );
      });
    });
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
      case "Completed":
        return "badge-green";
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

  const handleApplyCode = (code: string) => {
    toast.loading("Redeeming code...", {
      id: "toast-voucher",
    });
    redeemCode({
      code,
      orderId: query.id as string,
    });
  };

  const handleDeleteCode = () => {
    deleteCode({
      orderId: query.id as string,
      code: data?.tableOrder?.discount?.code as string,
    });
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
                              key={Math.random()}
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
                  <p className="text-right font-brocha lg:px-32 xl:px-40">
                    Total :&nbsp;{" "}
                    {FormatCurrency(
                      data.data[key].reduce((acc, item) => {
                        const eachTotal = item.data.reduce((acc, item) => {
                          if (item.status === "Cancelled") return acc;
                          return (
                            acc +
                            parseFloat(item.menu.total as unknown as string) *
                              item.quantity
                          );
                        }, 0);
                        return acc + eachTotal;
                      }, 0)
                    )}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="lg:mb-3">No data available</p>
          )}
        </div>
        <div className="space-y-3 rounded-lg bg-white p-2 lg:p-5">
          <p className="font-brocha text-sm font-bold ">Promo Code</p>
          <div>
            <div className="flex p-1">
              <div
                className={`relative flex w-full rounded-lg p-2 ring-1 ring-primary ${
                  data?.tableOrder && "justify-between gap-x-3"
                }`}>
                {!isEmpty(data?.tableOrder?.discount) ? (
                  <p className="flex max-w-full items-center  truncate rounded-lg bg-secondary/60 p-1.5 text-xs font-semibold text-black ring-2 ring-secondary ring-offset-2 lg:text-base">
                    {data?.tableOrder?.discount?.registrant?.name}-
                    {data?.tableOrder?.discount?.code}
                  </p>
                ) : data?.tableOrder?.status !== "Bill Out" ? (
                  <ListVoucherCode
                    data={voucherCodeData}
                    onChange={(e: string) => {
                      handleApplyCode(e);
                    }}
                  />
                ) : (
                  <p className="flex max-w-full items-center  truncate rounded-lg bg-secondary/60 p-1.5 text-xs font-semibold text-black ring-2 ring-secondary ring-offset-2 lg:text-base">
                    No Voucher Code
                  </p>
                )}
                {!isEmpty(data?.tableOrder?.discount) && (
                  <button
                    type="button"
                    onClick={
                      data?.status === "Bill Out" ? undefined : handleDeleteCode
                    }
                    disabled={data?.status === "Bill Out"}
                    className="rounded-2xl bg-red-500 !p-3 text-xs text-white disabled:bg-red-500/70">
                    Delete
                  </button>
                )}
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
              <p className="font-semibold">
                {FormatCurrency(couponDiscount, "PHP")}
              </p>
            </div>
            <div>
              <hr />
            </div>
            <div className="flex justify-between pt-4 text-lg text-highlight">
              <p className="font-semibold ">Total</p>
              <p className="font-semibold">
                {FormatCurrency(total + couponDiscount, "PHP")}
              </p>
            </div>
          </div>
          {data?.status !== "Bill Out" && (
            <button
              className="w-full bg-primary text-white disabled:cursor-not-allowed disabled:bg-primary/70"
              type="button"
              disabled={!isBillOut}
              onClick={!isBillOut ? undefined : handleBillOut}>
              Bill Out
            </button>
          )}
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
      <ModalTemplate
        title="Email Receipt"
        isOpenModal={emailReceiptModalOpen}
        setIsOpenModal={setEmailReceiptModalOpen}
        bodyClassName="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            id="email"
            type="email"
            labelText="Email*"
            name="email"
            helperText="The receipt will be sent to this email address."
            error={errors}
            register={register}
          />
          <div className="mt-3 flex flex-row-reverse gap-x-3">
            <SubmitButton isLoading={submitIsLoading} />
            <button
              className="bg-secondary text-black"
              type="button"
              onClick={() => {
                setEmailReceiptModalOpen(false);
              }}>
              Cancel
            </button>
          </div>
        </form>
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

interface ListVoucherCodeProps {
  data: RouterOutput["public"]["order"]["getVoucherCode"] | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: string) => void;
}

const ListVoucherCode: FC<ListVoucherCodeProps> = ({ data, onChange }) => {
  return (
    <Listbox onChange={onChange}>
      <div className="relative w-full">
        <Listbox.Button className="relative w-full cursor-default rounded-lg  py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block w-full truncate !font-poppins text-sm text-black">
            Select Voucher Code
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-tertiary py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {isEmpty(data) ? (
              <Listbox.Option
                key="Empty"
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 font-poppins ${
                    active ? "bg-secondary/80" : "text-gray-900"
                  }`
                }
                value="">
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-bold" : "font-normal"
                    }`}>
                    No data available
                  </span>
                )}
              </Listbox.Option>
            ) : (
              data?.map((i) => {
                return (
                  <Listbox.Option
                    key={i.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 font-poppins ${
                        active ? "bg-secondary/80" : "text-gray-900"
                      }`
                    }
                    value={i.code}>
                    {() => (
                      <span className="block truncate font-poppins text-sm font-normal lg:text-base">
                        Discount: {i.discount as unknown as number}%
                        <p className="text-xs font-normal">
                          {i.registrant.name} - {i.code}
                        </p>
                      </span>
                    )}
                  </Listbox.Option>
                );
              })
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Orders;
