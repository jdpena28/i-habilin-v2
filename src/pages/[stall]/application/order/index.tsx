import { isEmpty } from "lodash";
import { useRouter } from "next/router";

import { trpc } from "@/server/utils/trpc";
import { useStallConfigurationStore } from "@/client/store";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { Spinner } from "@/client/components/loader";
import { Notes } from "@/client/components/card";
import { Filter } from "@/client/components/filtering-sorting";

const Index = () => {
  const { query } = useRouter();
  const { stall } = useStallConfigurationStore();
  const { data, isLoading } = trpc.stall.order.getAllOrders.useQuery(
    {
      id: stall.id as string,
      status: "Order",
      orderBy: query.sortBy as string,
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
          : (query.sortBy as string),
      },
      {
        refetchInterval:
          query?.sortPreparingBy === "Preparing Time"
            ? 1000 * 60 * 10
            : 1000 * 15, // 10 minutes or 15 seconds
        cacheTime: 1000 * 60 * 15, // 15 minutes
        staleTime:
          query?.sortPreparingBy === "Preparing Time" ? 1000 * 60 * 10 : 0, // 10 minutes or 0 seconds
      }
    );
  const { data: readyData, isLoading: readyIsLoading } =
    trpc.stall.order.getAllOrders.useQuery(
      {
        id: stall.id as string,
        status: "Ready",
        orderBy: query.sortBy as string,
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
        orderBy: query.sortBy as string,
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
        orderBy: query.sortBy as string,
      },
      {
        refetchInterval: 1000 * 15, // 15 seconds
      }
    );

  const sortByOptions = [
    "Order Time (Asc.)",
    "Order Time (Desc.)",
    "Preparation Time",
  ];
  return (
    <StallLayout>
      <StallHeader
        title="Orders"
        filterQuery="sortBy"
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
                  tableNo={key.replace("Table Number:", "")}
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
                  status="Order">
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
                  status="Order">
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
    </StallLayout>
  );
};

export default Index;
