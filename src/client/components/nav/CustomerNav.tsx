import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { ReactNode, useState, useMemo } from "react";
import { flatten, find } from "lodash";
import { motion, AnimatePresence } from "framer-motion";

import {
  useCustomerOrderStore,
  useCustomerReferenceStore,
} from "@/client/store";
import { FormatCurrency } from "@/client/lib/TextFormatter";
import type { GetAllMenuType } from "@/client/types/main";
import { trpc } from "@/server/utils/trpc";
import { animateVariants } from "@/client/constant";

import { HiMenu, HiShoppingCart } from "react-icons/hi";
import { MdFoodBank, MdTableBar } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { BiHistory } from "react-icons/bi";
import IHabilinLogo from "@public/i-habilin-logo2";

import FoodStallTitle from "@/client/components/FoodStallTitle";
import { OrderSummaryCard } from "../card";

const CustomerNav = () => {
  const { customerOrder, updateCustomerOrder } = useCustomerOrderStore();
  const { customerReference, updateCustomerReference } =
    useCustomerReferenceStore();
  const { pathname, push } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const { mutate } = trpc.public.order.createOrder.useMutation({
    onSuccess: (data) => {
      setSubmitIsLoading(false);
      toast.remove("place-order");
      let { history } = customerReference;
      const isExisting = find(history, { transactionNo: data.id });
      if (!isExisting) {
        if (history && history?.length > 0) {
          history.push({
            transactionNo: data.id,
            date: data.createdAt,
            tableNumber: data.tableNumber,
          });
        } else {
          history = [
            {
              transactionNo: data.id,
              date: data.createdAt,
              tableNumber: data.tableNumber,
            },
          ];
        }
      }
      updateCustomerReference({
        ...customerReference,
        history,
      });
      updateCustomerOrder({
        ...customerOrder,
        orders: [],
      });
      push(`/orders/${data.id}`);
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.remove("place-order");
      toast.error(error.message);
    },
  });

  const total = useMemo(() => {
    return customerOrder?.orders?.reduce((acc: number, curr: any) => {
      const eachTotal = curr.menuOrders.reduce(
        (sum: number, item: GetAllMenuType) => {
          return sum + item.quantity * (item.total as unknown as number);
        },
        0
      );
      return acc + eachTotal;
    }, 0);
  }, [customerOrder]);

  const placeOrder = () => {
    setSubmitIsLoading(true);
    toast.loading("Placing Order...", {
      id: "place-order",
      duration: 999999,
    });
    const refinedOrdersData = customerOrder?.orders?.map((order) => {
      return order.menuOrders.map((menuOrder: GetAllMenuType) => {
        return {
          menuId: menuOrder.id,
          quantity: menuOrder.quantity,
        };
      });
    });
    mutate({
      tableNumber: customerOrder.tableNumber as number,
      customerId: customerReference.id,
      orders: flatten(refinedOrdersData),
    });
  };

  return (
    <>
      <nav className="fixed top-0 z-50 flex h-16 w-full items-center justify-between overflow-hidden bg-primary px-2">
        <div className="flex items-center gap-x-2">
          {isMenuOpen ? (
            <IoCloseSharp
              className="cursor-pointer fill-white"
              size={24}
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <HiMenu
              className="cursor-pointer fill-white"
              size={24}
              onClick={() => setIsMenuOpen(true)}
            />
          )}
          <IHabilinLogo className="my-10 w-1/2" />
        </div>
        <div>
          <HiShoppingCart
            className="fill-white"
            size={24}
            onClick={() => setIsCartOpen(true)}
          />
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={animateVariants}
            initial="mobileHidden"
            animate="mobileVisible"
            exit="mobileExit"
            className="fixed left-0 z-30 h-screen w-2/5  bg-primary pt-16">
            <Links
              activeLink="stalls"
              href="/stalls"
              text="Stalls"
              pathname={pathname}>
              <MdFoodBank className="fill-white" size={24} />
            </Links>
            <div
              className="flex items-center gap-2 border-l-[3px] !border-transparent px-4 py-3 text-white"
              aria-hidden
              onClick={() => {
                if (pathname === "/stalls") {
                  updateCustomerOrder({
                    ...customerOrder,
                    isTableModalOpen: true,
                  });
                } else {
                  toast.error("Please go to stalls first", {
                    id: "table-number",
                    duration: 3000,
                  });
                  setTimeout(() => {
                    toast.remove("table-number");
                  }, 3000);
                }
              }}>
              <MdTableBar className="fill-white" size={24} />
              <span className="font-poppins text-sm font-medium tracking-wider">
                Table Number
              </span>
            </div>
            <Links
              activeLink="orders"
              href="/orders"
              text="Orders"
              pathname={pathname}>
              <BiHistory className="fill-white" size={24} />
            </Links>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            variants={animateVariants}
            initial="cartHidden"
            animate="cartVisible"
            exit="cartExit"
            className="fixed right-0 z-50 h-full min-h-screen w-screen overflow-auto scroll-smooth bg-white px-4 drop-shadow-md sm:max-w-md">
            <form action="">
              <div className="mt-2 flex w-full  items-center border-b-2 pb-2">
                <div>
                  <button type="button" onClick={() => setIsCartOpen(false)}>
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 32 32">
                      <path
                        d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                        data-name="4-Arrow Left"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mr-10 flex w-full justify-center text-center font-brocha text-xl font-bold">
                  My Order <br />
                  Table # : {customerOrder.tableNumber}
                </div>
              </div>
              {customerOrder?.orders?.length === 0 ? (
                <p className="mt-3">No Data Available</p>
              ) : (
                customerOrder?.orders?.map((order) => {
                  return (
                    <>
                      <FoodStallTitle key={order.id} text={order.name} />
                      {order?.menuOrders?.map((menuOrder: GetAllMenuType) => {
                        return (
                          <OrderSummaryCard
                            id={menuOrder.id}
                            key={menuOrder.id}
                            src={menuOrder.media?.cdnUrl as string}
                            alt={menuOrder.name}
                            text={menuOrder.name}
                            price={menuOrder.total as unknown as number}
                            stallId={menuOrder?.category?.registrant?.id}
                          />
                        );
                      })}
                      <hr />
                    </>
                  );
                })
              )}
              <div className="mt-3">
                <div>
                  <p className="ml-2 font-brocha font-bold">Order Summary</p>
                </div>
                <div className="items-between flex w-full flex-col rounded-3xl bg-gray-50 px-6 py-4 text-sm text-gray-500 sm:max-w-md">
                  <div className="flex justify-between pt-4 text-base text-highlight">
                    <p className="font-semibold ">Total</p>
                    <p className="font-semibold">
                      {FormatCurrency(total, "PHP")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={
                    submitIsLoading || customerOrder?.orders?.length === 0
                  }
                  onClick={
                    submitIsLoading || customerOrder?.orders?.length === 0
                      ? undefined
                      : placeOrder
                  }
                  className="my-12 w-full bg-secondary font-brocha text-highlight disabled:cursor-not-allowed disabled:bg-secondary/60 sm:max-w-md">
                  Place Order
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Links = ({
  href,
  children,
  text,
  pathname,
  activeLink,
}: {
  href: string;
  text: string;
  children: ReactNode;
  pathname: string;
  activeLink: string;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 border-l-[3px] border-transparent px-4 py-3 text-white ${
        pathname.split("/")[1] === activeLink ? "border-white" : null
      }`}>
      {children}
      <span className="font-poppins text-sm font-medium tracking-wider">
        {" "}
        {text}{" "}
      </span>
    </Link>
  );
};

export default CustomerNav;
