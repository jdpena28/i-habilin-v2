import { useState } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { trpc } from "@/server/utils/trpc";
import { useStallConfigurationStore } from "@/client/store";
import {
  createOrderSchema,
  CreateOrderSchema,
} from "@/server/schema/stall/order";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { Spinner } from "@/client/components/loader";
import { Notes } from "@/client/components/card";
import { Filter } from "@/client/components/filtering-sorting";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { InputForm, SelectForm } from "@/client/components/form";
import { SubmitButton } from "@/client/components/buttons";

const Index = () => {
  const { query } = useRouter();
  const { stall } = useStallConfigurationStore();
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateOrderSchema>({
    resolver: yupResolver(createOrderSchema),
  });
  const { data, isLoading } = trpc.stall.order.getAllOrders.useQuery(
    {
      id: stall.id as string,
      status: "Order",
      orderBy: query.orderBy as string,
    },
    {
      refetchInterval: 1000 * 15, // 15 seconds
    }
  );
  const { data: preparingData, isLoading: preparingIsLoading } =
    trpc.stall.order.getAllOrders.useQuery(
      {
        id: stall.id as string,
        status: "Preparing",
        orderBy: query.sortPreparingBy
          ? (query.sortPreparingBy as string)
          : (query.orderBy as string),
      },
      {
        refetchInterval:
          query?.sortPreparingBy === "Preparation Time"
            ? 1000 * 60 * 10
            : 1000 * 15, // 10 minutes or 15 seconds
        cacheTime: 1000 * 60 * 15, // 15 minutes
        staleTime:
          query?.sortPreparingBy === "Preparation Time" ? 1000 * 60 * 10 : 0, // 10 minutes or 0 seconds
      }
    );
  const { data: readyData, isLoading: readyIsLoading } =
    trpc.stall.order.getAllOrders.useQuery(
      {
        id: stall.id as string,
        status: "Ready",
        orderBy: query.orderBy as string,
      },
      {
        refetchInterval: 1000 * 15, // 15 seconds
      }
    );
  const { data: billOutData, isLoading: billOutIsLoading } =
    trpc.stall.order.getAllOrders.useQuery(
      {
        id: stall.id as string,
        status: "Bill Out",
        orderBy: query.orderBy as string,
      },
      {
        refetchInterval: 1000 * 15, // 15 seconds
      }
    );
  const { data: completedData, isLoading: completedIsLoading } =
    trpc.stall.order.getAllOrders.useQuery(
      {
        id: stall.id as string,
        status: "Completed",
        orderBy: query.orderBy as string,
      },
      {
        refetchInterval: 1000 * 15, // 15 seconds
      }
    );
  const { data: cancelledData, isLoading: cancelledIsLoading } =
    trpc.stall.order.getAllOrders.useQuery(
      {
        id: stall.id as string,
        status: "Cancelled",
        orderBy: query.orderBy as string,
      },
      {
        refetchInterval: 1000 * 15, // 15 seconds
      }
    );
  const { data: menuData, isLoading: menuIsLoading } =
    trpc.stall.menu.getAllMenu.useQuery({
      stallId: stall.id as string,
    });
  const { mutate } = trpc.stall.order.createOrder.useMutation({
    onSuccess: () => {
      setIsAddOrderModalOpen(false);
      setSubmitIsLoading(false);
      reset();
      toast.success("Order has been added");
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.error(error.message);
    },
  });

  const sortByOptions = [
    "Order Time (Asc.)",
    "Order Time (Desc.)",
    "Preparation Time",
  ];

  const onSubmit = (values: CreateOrderSchema) => {
    setSubmitIsLoading(true);
    mutate(values);
  };
  return (
    <StallLayout>
      <StallHeader
        title="Orders"
        filterQuery="orderBy"
        buttonText="Add Order"
        onClickButton={() => {
          setIsAddOrderModalOpen(true);
        }}
        filter={
          <>
            <option value="default" selected>
              Sort By
            </option>
            {sortByOptions.map((option, key) => {
              if (key + 1 === sortByOptions.length) {
                return null;
              }
              return (
                <option
                  selected={query?.sortPreparingBy === option}
                  key={option}
                  value={option}>
                  {option}
                </option>
              );
            })}
          </>
        }
      />
      <section id="order-board" className="space-y-3 overflow-y-auto">
        {/* Order Section */}
        <p className="badge-yellow !max-w-full text-center !text-base !font-bold">
          Order
        </p>
        <section
          id="order"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {isLoading ? (
            <Spinner />
          ) : !isEmpty(data) ? (
            Object.keys(data).map((key) => {
              return (
                <Notes
                  key={data[key].id}
                  id={data[key].id}
                  tableNo={key.replace("Table Number:", "")}
                  status="Order">
                  {data[key].orders.map((order) => {
                    return (
                      <p key={order.menu.name}>
                        {order.quantity} x {order.menu.name}
                      </p>
                    );
                  })}
                </Notes>
              );
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Prepairing Section */}
        <p className="badge-orange !max-w-full text-center !text-base !font-bold">
          Preparing
        </p>
        <div className="flex flex-row-reverse">
          <Filter sortQuery="sortPreparingBy">
            <option value="default" selected>
              Sort By
            </option>
            {sortByOptions.map((option) => {
              return (
                <option
                  selected={query?.sortPreparingBy === option}
                  key={option}
                  value={option}>
                  {option}
                </option>
              );
            })}
          </Filter>
        </div>
        <section
          id="preparing"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {preparingIsLoading ? (
            <Spinner />
          ) : !isEmpty(preparingData) ? (
            Object.keys(preparingData).map((key) => {
              return (
                <Notes
                  key={preparingData[key].id}
                  id={preparingData[key].id}
                  tableNo={preparingData[key].tableNumber}
                  estimatedTime={preparingData[key].estimated_time}
                  status="Preparing">
                  {preparingData[key].orders.map((order) => {
                    return (
                      <p key={order.menu.name}>
                        {order.quantity} x {order.menu.name}
                      </p>
                    );
                  })}
                </Notes>
              );
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Ready Section */}
        <p className="badge-lime !max-w-full text-center !text-base !font-bold">
          Ready
        </p>
        <section
          id="ready"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {readyIsLoading ? (
            <Spinner />
          ) : !isEmpty(readyData) ? (
            Object.keys(readyData).map((key) => {
              return (
                <Notes
                  key={readyData[key].id}
                  id={readyData[key].id}
                  tableNo={key.replace("Table Number:", "")}
                  status="Ready">
                  {readyData[key].orders.map((order) => {
                    return (
                      <p key={order.menu.name}>
                        {order.quantity} x {order.menu.name}
                      </p>
                    );
                  })}
                </Notes>
              );
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Bill Out Section */}
        <p className="badge-blue !max-w-full text-center !text-base !font-bold">
          Bill Out
        </p>
        <section
          id="bill out"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {billOutIsLoading ? (
            <Spinner />
          ) : !isEmpty(billOutData) ? (
            Object.keys(billOutData).map((key) => {
              return (
                <Notes
                  key={billOutData[key].id}
                  id={billOutData[key].id}
                  tableNo={key.replace("Table Number:", "")}
                  status="Bill Out">
                  {billOutData[key].orders.map((order) => {
                    return (
                      <p key={order.menu.name}>
                        {order.quantity} x {order.menu.name}
                      </p>
                    );
                  })}
                </Notes>
              );
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Completed Section */}
        <p className="badge-green !max-w-full text-center !text-base !font-bold">
          Completed
        </p>
        <section
          id="completed"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {completedIsLoading ? (
            <Spinner />
          ) : !isEmpty(completedData) ? (
            Object.keys(completedData).map((key) => {
              return (
                <Notes
                  key={completedData[key].id}
                  id={completedData[key].id}
                  tableNo={key.replace("Table Number:", "")}
                  status="Completed">
                  {completedData[key].orders.map((order) => {
                    return (
                      <p key={order.menu.name}>
                        {order.quantity} x {order.menu.name}
                      </p>
                    );
                  })}
                </Notes>
              );
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Cancelled Section */}
        <p className="badge-red !max-w-full text-center !text-base !font-bold">
          Cancelled
        </p>
        <section
          id="cancelled"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {cancelledIsLoading ? (
            <Spinner />
          ) : !isEmpty(cancelledData) ? (
            Object.keys(cancelledData).map((key) => {
              return (
                <Notes
                  key={cancelledData[key].id}
                  id={cancelledData[key].id}
                  tableNo={key.replace("Table Number:", "")}
                  status="Cancelled">
                  {cancelledData[key].orders.map((order) => {
                    return (
                      <p key={order.menu.name}>
                        {order.quantity} x {order.menu.name}
                      </p>
                    );
                  })}
                </Notes>
              );
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
      </section>
      <ModalTemplate
        title="Add Order"
        isOpenModal={isAddOrderModalOpen}
        setIsOpenModal={setIsAddOrderModalOpen}
        bodyClassName="max-w-2xl"
        onClose={() => {
          reset();
        }}>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            id="tableNumber"
            name="tableNumber"
            type="number"
            labelText="Table Number*"
            error={errors}
            register={register}
            aboveLabel="Table Number*"
          />
          <div className="flex gap-x-5">
            <InputForm
              parentClassName="flex-[.2]"
              id="orders[0].quantity"
              name="orders[0].quantity"
              type="number"
              labelText="Quantity*"
              error={errors}
              register={register}
              aboveLabel="Quantity*"
            />
            <SelectForm
              parentClassName="flex-[.8]"
              register={register}
              error={errors}
              id="orders[0].menuId"
              aboveLabel="Menu"
              placeholder="Select menu"
              data={menuData}
              filterBy="name"
              selectedBy="id"
              setValue={setValue}
              watch={watch}
              isLoading={menuIsLoading}
            />
          </div>
          {watch("orders")?.length > 1 &&
            watch("orders").map((orders, index) => {
              if (index === 0) return null;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="flex gap-x-5">
                  <InputForm
                    parentClassName="flex-[.2]"
                    id={`orders[${index}].quantity`}
                    name={`orders[${index}].quantity`}
                    type="number"
                    labelText="Quantity*"
                    error={errors}
                    register={register}
                    aboveLabel="Quantity*"
                  />
                  <SelectForm
                    parentClassName="flex-[.8]"
                    register={register}
                    error={errors}
                    id={`orders[${index}].menuId`}
                    aboveLabel="Menu"
                    placeholder="Select menu"
                    data={menuData}
                    filterBy="name"
                    selectedBy="id"
                    setValue={setValue}
                    watch={watch}
                    isLoading={menuIsLoading}
                  />
                </div>
              );
            })}
          <button
            className="mx-auto bg-primary p-2 text-white"
            onClick={() => {
              const index = getValues("orders").length;
              setValue(`orders.${index}.quantity`, 1);
              setValue(`orders.${index}.menuId`, "");
            }}>
            Add Orders
          </button>
          <div className="flex justify-end gap-x-2 pt-8">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                setIsAddOrderModalOpen(false);
                reset();
              }}>
              Cancel
            </button>
            <SubmitButton isLoading={submitIsLoading} />
          </div>
        </form>
      </ModalTemplate>
    </StallLayout>
  );
};

export default Index;
