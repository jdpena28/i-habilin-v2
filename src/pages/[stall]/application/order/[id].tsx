/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { trpc } from "@/server/utils/trpc";
import { useStallConfigurationStore } from "@/client/store";
import {
  UpdateOrderById,
  updateOrderById,
  updateOrders,
  UpdateOrders,
} from "@/server/schema/stall/order";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";
import { Spinner } from "@/client/components/loader";
import { SubmitButton } from "@/client/components/buttons";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { InputForm, SelectForm } from "@/client/components/form";
import { FormatCurrency } from "@/client/lib/TextFormatter";

const OrderDetails = () => {
  interface PaymentDetailsType {
    total: number;
    cashTendered: number | undefined | null;
  }
  const { stall } = useStallConfigurationStore();
  const { query, push } = useRouter();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentDetailsModalOpen, setIsPaymentDetailsModalOpen] =
    useState(false);
  const [paymentDetails, setPaymentDetails] = useState<
    PaymentDetailsType | undefined
  >();
  const [ids, setIds] = useState<string[] | undefined>([]);
  const { data, isLoading, refetch } = trpc.stall.order.getOrder.useQuery({
    id: query.id as string,
    status: query.status as string,
    stallId: stall?.id as string,
  });
  const statusOption = [
    {
      text: "Order",
    },
    {
      text: "Preparing",
    },
    {
      text: "Ready",
    },
    {
      text: "Bill Out",
    },
    {
      text: "Completed",
    },
    {
      text: "Cancelled",
    },
  ];
  const { mutate: deleteOrder } = trpc.stall.order.deleteOrder.useMutation({
    onSuccess: () => {
      setSubmitIsLoading(false);
      setIsDeleteModalOpen(false);
      refetch();
      toast.success("Order deleted successfully");
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.error(error.message);
    },
  });
  const { mutate: updateOrder } = trpc.stall.order.updateOrderById.useMutation({
    onSuccess: () => {
      setSubmitIsLoading(false);
      setIsEditModalOpen(false);
      refetch();
      toast.success("Order updated successfully");
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.error(error.message);
    },
  });
  const { mutate: updateStatus } = trpc.stall.order.updateOrders.useMutation({
    onSuccess: (updateStatusData) => {
      setSubmitIsLoading(false);
      setIsStatusModalOpen(false);
      if (statusGetValues("status") === "Completed") {
        setTimeout(() => {
          toast.success("Order updated successfully", {
            id: "order-update",
          });
        }, 500);
        setTimeout(() => {
          toast.remove("order-update");
        }, 2000);
        setPaymentDetails({
          total: updateStatusData.total,
          cashTendered: updateStatusData?.cashTendered,
        });
        setIsPaymentDetailsModalOpen(true);
        return;
      }
      refetch();
      push(
        `/${query.stall}/application/order#${statusGetValues(
          "status"
        ).toLowerCase()}`
      );
      setTimeout(() => {
        toast.success("Order updated successfully", {
          id: "order-update",
        });
      }, 500);
      setTimeout(() => {
        toast.remove("order-update");
      }, 2000);
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdateOrderById>({
    resolver: yupResolver(updateOrderById),
  });

  const {
    register: statusRegister,
    handleSubmit: statusHandleSubmit,
    setValue: statusSetValue,
    getValues: statusGetValues,
    formState: { errors: statusErrors },
    reset: statusReset,
    watch: statusWatch,
  } = useForm<UpdateOrders>({
    resolver: yupResolver(updateOrders),
  });

  const selectIds = (id: string, type?: "select-all") => {
    if (type === "select-all") {
      return data?.menu?.length === ids?.length
        ? setIds([])
        : setIds(data?.menu?.map((i) => i.id));
    }
    if (ids?.includes(id)) {
      return setIds(ids?.filter((i) => i !== id));
    }
    return ids?.length ? setIds([...ids, id]) : setIds([id]);
  };

  const onDelete = () => {
    setSubmitIsLoading(true);
    deleteOrder({
      id: ids,
    });
  };

  const onEdit = (value: UpdateOrderById) => {
    setValue("id", value.id);
    setValue("quantity", value.quantity);
    setValue("status", value.status);
    setValue("name", value.name);
    setIsEditModalOpen(true);
  };

  const onEditByIdSubmit = (value: UpdateOrderById) => {
    setSubmitIsLoading(true);
    updateOrder(value);
  };

  const onUpdateStatus = () => {
    if (isEmpty(data?.menu)) return;
    setIsStatusModalOpen(true);
    statusSetValue("status", query.status as string);
    statusSetValue(
      "id",
      data?.menu.map((i) => i.id)
    );
  };

  const onClosePaymentDetailsModal = () => {
    push(
      `/${query.stall}/application/order#${statusGetValues(
        "status"
      ).toLowerCase()}`
    );
    setIsPaymentDetailsModalOpen(false);
  };

  const onSubmitUpdateStatus = (value: UpdateOrders) => {
    setSubmitIsLoading(true);
    updateStatus(value);
  };

  const discount = useMemo(() => {
    if (
      data?.discount?.registrantId === stall.id &&
      paymentDetails?.total &&
      data?.discount?.discount
    ) {
      return (
        Math.abs(
          ((data.discount.discount as unknown as number) / 100) *
            paymentDetails.total
        ) * -1
      );
    }
    return 0;
  }, [
    data?.discount?.discount,
    data?.discount?.registrantId,
    paymentDetails?.total,
    stall.id,
  ]);

  return (
    <StallLayout>
      <StallHeader
        title={`Order | Table No: ${
          data?.tableNumber ? data?.tableNumber : ""
        }`}
        goBack
        buttonText="Edit Status"
        onClickButton={onUpdateStatus}>
        {ids && ids?.length > 1 && (
          <button
            className="bg-red-500 p-2 text-white"
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </button>
        )}
      </StallHeader>
      <section id="orders" className="">
        <table>
          <thead>
            <tr>
              <th>
                {" "}
                <label id="select-all" htmlFor="select-all" className="sr-only">
                  Select All
                </label>
                <input
                  type="checkbox"
                  id="select-all"
                  name="select-all"
                  className="h-5 w-5 rounded border-gray-300 text-secondary checked:ring-secondary focus:ring-secondary"
                  onChange={() => selectIds("", "select-all")}
                  checked={!isEmpty(data) && ids?.length === data?.menu?.length}
                />
              </th>
              <th>Quantity</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <Spinner />
                </td>
              </tr>
            ) : data && !isEmpty(data.menu) ? (
              data.menu.map((item) => {
                return (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        name="select-all"
                        className="h-5 w-5 rounded border-gray-300 text-secondary checked:ring-secondary focus:ring-secondary"
                        onChange={() => selectIds(item.id)}
                        checked={ids?.includes(item.id)}
                      />
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      <p className="font-medium">{item.menu.name}</p>
                      <p className="text-xs">{item.batchNo}</p>
                    </td>
                    <td>
                      <ActionDropdown
                        options={["Delete", "Edit"]}
                        viewOnClick=""
                        onDelete={() => {
                          setIds([item.id]);
                          setIsDeleteModalOpen(true);
                        }}
                        onEdit={() =>
                          onEdit({
                            id: item.id,
                            quantity: item.quantity,
                            status: item.status,
                            name: item.menu.name,
                          })
                        }
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <ModalTemplate
        title="Delete Order"
        isOpenModal={isDeleteModalOpen}
        setIsOpenModal={setIsDeleteModalOpen}
        bodyClassName="max-w-2xl">
        <p>Are you sure you want to delete ?</p>
        <ul className="ml-4 list-disc">
          {data?.menu
            ?.filter((i) => ids?.includes(i.id))
            .map((i) => {
              return (
                <li>
                  <p className="font-medium">{i.menu.name}</p>
                  <p className="text-xs">Batch No: {i.batchNo}</p>
                </li>
              );
            })}
        </ul>
        <div className="mt-4 flex justify-end gap-x-2">
          <button
            type="reset"
            className="bg-yellow-400 text-black"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setIds([]);
            }}>
            Cancel
          </button>
          <SubmitButton
            className="!bg-red-500 text-white"
            isLoading={submitIsLoading}
            onClick={onDelete}
          />
        </div>
      </ModalTemplate>
      <ModalTemplate
        title={`Edit Order | ${getValues("name")}`}
        isOpenModal={isEditModalOpen}
        setIsOpenModal={setIsEditModalOpen}
        bodyClassName="max-w-2xl">
        <form className="space-y-3" onSubmit={handleSubmit(onEditByIdSubmit)}>
          <SelectForm
            register={register}
            error={errors}
            id="status"
            aboveLabel="Status"
            placeholder="Select Status"
            data={statusOption}
            filterBy="text"
            selectedBy="text"
            setValue={setValue}
            watch={watch}
          />
          <InputForm
            id="quantity"
            name="quantity"
            type="number"
            labelText="Quantity*"
            error={errors}
            register={register}
            aboveLabel="Quantity*"
          />

          <div className="flex justify-end gap-x-2 pt-8">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                setIsEditModalOpen(false);
                reset();
              }}>
              Cancel
            </button>
            <SubmitButton isLoading={submitIsLoading} />
          </div>
        </form>
      </ModalTemplate>
      <ModalTemplate
        title="Update Status"
        isOpenModal={isStatusModalOpen}
        setIsOpenModal={setIsStatusModalOpen}
        bodyClassName="max-w-2xl min-h-[36vh]">
        <form
          className="space-y-3"
          onSubmit={statusHandleSubmit(onSubmitUpdateStatus)}>
          <SelectForm
            register={statusRegister}
            error={statusErrors}
            id="status"
            aboveLabel="Status"
            placeholder="Select Status"
            data={statusOption}
            filterBy="text"
            selectedBy="text"
            setValue={statusSetValue}
            watch={statusWatch}
          />
          {statusWatch("status") === "Completed" ? (
            <InputForm
              id="cashTendered"
              name="cashTendered"
              type="number"
              labelText="Cash Tendered*"
              error={statusErrors}
              register={statusRegister}
              step=".01"
              aboveLabel="Cash Tendered*"
            />
          ) : null}
          <div className="flex justify-end gap-x-2 pt-14">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                setIsStatusModalOpen(false);
                statusReset();
              }}>
              Cancel
            </button>
            <SubmitButton isLoading={submitIsLoading} />
          </div>
        </form>
      </ModalTemplate>
      <ModalTemplate
        title="Exchange"
        isOpenModal={isPaymentDetailsModalOpen}
        setIsOpenModal={setIsPaymentDetailsModalOpen}
        onClose={onClosePaymentDetailsModal}
        bodyClassName="max-w-2xl space-y-2 min-h-[20vh] text-xl">
        <pre>
          <strong className="font-bold">Total:</strong>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          {FormatCurrency(paymentDetails?.total)}
        </pre>
        <pre>
          <strong className="font-bold">Discount:</strong>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          {FormatCurrency(discount)}
          {data?.discount?.registrantId === stall.id &&
            ` - Code: ${data?.discount?.code}`}
        </pre>
        <pre>
          <strong className="font-bold">Cash Tendered:</strong>
          &emsp;&emsp;&emsp;
          {FormatCurrency(paymentDetails?.cashTendered)}
        </pre>
        <pre className="border-t-2 border-gray-400 pt-2">
          <strong className="font-bold">Change:</strong>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          {paymentDetails?.cashTendered &&
            paymentDetails?.total &&
            FormatCurrency(
              paymentDetails.cashTendered - (paymentDetails.total + discount)
            )}
        </pre>
        <div className="flex justify-end gap-x-2 pt-8">
          <button
            type="button"
            className="bg-primary text-white"
            onClick={onClosePaymentDetailsModal}>
            Okay
          </button>
        </div>
      </ModalTemplate>
    </StallLayout>
  );
};

export default OrderDetails;
