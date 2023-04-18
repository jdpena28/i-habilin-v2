import { isEmpty } from "lodash";

import { trpc } from "@/server/utils/trpc";
import { useStallConfigurationStore } from "@/client/store";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { Spinner } from "@/client/components/loader";
import { Notes } from "@/client/components/card";

const Index = () => {
  const { stall } = useStallConfigurationStore();
  const { data, isLoading } = trpc.stall.order.getAllOrders.useQuery({
    id: stall.id as string,
    status: "Order",
  });
  const { data: preparingData, isLoading: preparingIsLoading } =
    trpc.stall.order.getAllOrders.useQuery({
      id: stall.id as string,
      status: "Preparing",
    });
  const { data: readyData, isLoading: readyIsLoading } =
    trpc.stall.order.getAllOrders.useQuery({
      id: stall.id as string,
      status: "Ready",
    });
  const { data: billOutData, isLoading: billOutIsLoading } =
    trpc.stall.order.getAllOrders.useQuery({
      id: stall.id as string,
      status: "Bill Out",
    });
  const { data: cancelledData, isLoading: cancelledIsLoading } =
    trpc.stall.order.getAllOrders.useQuery({
      id: stall.id as string,
      status: "Cancelled",
    });

  return (
    <StallLayout>
      <StallHeader title="Orders" />
      <section id="order-board" className="space-y-3 overflow-y-auto">
        {/* Order Section */}
        <p className="mb-2 border-b-2 font-brocha text-xl font-bold">Order</p>
        <section
          id="orders"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {isLoading ? (
            <Spinner />
          ) : !isEmpty(data) ? (
            Object.keys(data).map((key) => {
              const eachItem = data[key].map((item) => {
                return (
                  <Notes
                    key={item.id}
                    id={item.id}
                    tableNo={key}
                    status="Order">
                    {item.orders.map((order) => {
                      return (
                        <p key={item.id}>
                          {order.quantity} x {order.menu.name}
                        </p>
                      );
                    })}
                  </Notes>
                );
              });
              return eachItem;
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Prepairing Section */}
        <p className="mb-2 border-b-2 font-brocha text-xl font-bold">
          Preparing
        </p>
        <section
          id="preparing"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {preparingIsLoading ? (
            <Spinner />
          ) : !isEmpty(preparingData) ? (
            Object.keys(preparingData).map((key) => {
              const eachItem = preparingData[key].map((item) => {
                return (
                  <Notes
                    key={item.id}
                    id={item.id}
                    tableNo={key}
                    status="Preparing">
                    {item.orders.map((order) => {
                      return (
                        <p key={item.id}>
                          {order.quantity} x {order.menu.name}
                        </p>
                      );
                    })}
                  </Notes>
                );
              });
              return eachItem;
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Ready Section */}
        <p className="mb-2 border-b-2 font-brocha text-xl font-bold">Ready</p>
        <section
          id="ready"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {readyIsLoading ? (
            <Spinner />
          ) : !isEmpty(readyData) ? (
            Object.keys(readyData).map((key) => {
              const eachItem = readyData[key].map((item) => {
                return (
                  <Notes
                    key={item.id}
                    id={item.id}
                    tableNo={key}
                    status="Preparing">
                    {item.orders.map((order) => {
                      return (
                        <p key={item.id}>
                          {order.quantity} x {order.menu.name}
                        </p>
                      );
                    })}
                  </Notes>
                );
              });
              return eachItem;
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Bill Out Section */}
        <p className="mb-2 border-b-2 font-brocha text-xl font-bold">
          Bill Out
        </p>
        <section
          id="billout"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {billOutIsLoading ? (
            <Spinner />
          ) : !isEmpty(billOutData) ? (
            Object.keys(billOutData).map((key) => {
              const eachItem = billOutData[key].map((item) => {
                return (
                  <Notes
                    key={item.id}
                    id={item.id}
                    tableNo={key}
                    status="Preparing">
                    {item.orders.map((order) => {
                      return (
                        <p key={item.id}>
                          {order.quantity} x {order.menu.name}
                        </p>
                      );
                    })}
                  </Notes>
                );
              });
              return eachItem;
            })
          ) : (
            <p>No Data Available</p>
          )}
        </section>
        {/* Cancelled Section */}
        <p className="mb-2 border-b-2 font-brocha text-xl font-bold">
          Cancelled
        </p>
        <section
          id="cancelled"
          className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto rounded-md bg-white p-5">
          {cancelledIsLoading ? (
            <Spinner />
          ) : !isEmpty(cancelledData) ? (
            Object.keys(cancelledData).map((key) => {
              const eachItem = cancelledData[key].map((item) => {
                return (
                  <Notes
                    key={item.id}
                    id={item.id}
                    tableNo={key}
                    status="Preparing">
                    {item.orders.map((order) => {
                      return (
                        <p key={item.id}>
                          {order.quantity} x {order.menu.name}
                        </p>
                      );
                    })}
                  </Notes>
                );
              });
              return eachItem;
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
