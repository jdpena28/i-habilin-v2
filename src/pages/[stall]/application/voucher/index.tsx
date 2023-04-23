/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { trpc } from "@/server/utils/trpc";
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { formatDate } from "@/client/lib/TextFormatter";
import {
  createVoucherSchema,
  CreateVoucherSchema,
} from "@/server/schema/stall/voucher";
import { useStallConfigurationStore } from "@/client/store";

import { InputForm, SelectForm } from "@/client/components/form";
import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";
import { Spinner } from "@/client/components/loader";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { SubmitButton } from "@/client/components/buttons";
import { BiSync } from "react-icons/bi";

const Voucher = () => {
  const { stall } = useStallConfigurationStore();
  const [ids, setIds] = useState<string[] | undefined>([]);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const { data, isLoading, refetch } =
    trpc.stall.voucher.getAllVoucher.useQuery({
      registrantId: stall.id as string,
    });

  const { mutate: createVoucher } =
    trpc.stall.voucher.createVoucher.useMutation({
      onSuccess: () => {
        refetch();
        setSubmitIsLoading(false);
        toast.success("Voucher successfully created.");
        setIsVoucherModalOpen(false);
        reset();
      },
      onError: (error) => {
        setSubmitIsLoading(false);
        toast.error(error.message);
      },
    });

  const { mutate: deleteVoucher } =
    trpc.stall.voucher.deleteVoucher.useMutation({
      onSuccess: () => {
        refetch();
        setSubmitIsLoading(false);
        toast.success("Voucher successfully deleted.");
        setIds([]);
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        setSubmitIsLoading(false);
        toast.error(error.message);
      },
    });

  const selectIds = (id: string, type?: "select-all") => {
    if (type === "select-all") {
      return data?.length === ids?.length
        ? setIds([])
        : setIds(data?.map((i) => i.id));
    }
    if (ids?.includes(id)) {
      return setIds(ids?.filter((i) => i !== id));
    }
    return ids?.length ? setIds([...ids, id]) : setIds([id]);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<CreateVoucherSchema>({
    resolver: yupResolver(createVoucherSchema),
  });

  const onSubmit = (value: CreateVoucherSchema) => {
    setSubmitIsLoading(true);
    createVoucher(value);
  };

  const onDelete = () => {
    setSubmitIsLoading(true);
    deleteVoucher({
      ids: ids as string[],
    });
  };

  const findStatusClass = (status: string) => {
    switch (status) {
      case "Active":
        return "badge-green";
      case "Used":
        return "badge-yellow";
      case "Expired":
        return "badge-red";
      default:
        return "badge-red";
    }
  };

  return (
    <StallLayout>
      <StallHeader
        title="Voucher"
        tabs
        buttonText="Generate Voucher"
        onClickButton={() => {
          setValue("registrantId", stall.id as string);
          setIsVoucherModalOpen(true);
        }}
      />
      {ids && ids?.length > 1 ? (
        <button
          className="my-1 ml-1 bg-red-500 !p-1 text-sm text-white"
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}>
          Delete
        </button>
      ) : null}
      <section id="users" className="bg-white">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <label
                    id="select-all"
                    htmlFor="select-all"
                    className="sr-only">
                    Select All
                  </label>
                  <input
                    type="checkbox"
                    id="select-all"
                    name="select-all"
                    className="h-5 w-5 rounded border-gray-300 text-secondary checked:ring-secondary focus:ring-secondary"
                    onChange={() => selectIds("", "select-all")}
                    checked={ids?.length === data?.length && !isEmpty(data)}
                  />
                </th>
                <th>Code</th>
                <th>Status</th>
                <th>Discount (%)</th>
                <th>Valid Date</th>
                <th>Used/Quantity</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {!isEmpty(data) ? (
                data?.map((i) => {
                  return (
                    <tr key={i.id}>
                      <td>
                        <input
                          type="checkbox"
                          id="123"
                          name="select-all"
                          className="h-5 w-5 rounded border-gray-300 text-secondary checked:ring-secondary focus:ring-secondary"
                          onChange={() => selectIds(i.id)}
                          checked={ids?.includes(i.id)}
                        />
                      </td>
                      <td>{i.code}</td>
                      <td>
                        <div className={`${findStatusClass(i.status)}`}>
                          {i.status}
                        </div>
                      </td>
                      <td>{i.discount as unknown as number}%</td>
                      <td>{i.validUntil ? formatDate(i.validUntil) : "N/A"}</td>
                      <td>
                        {i.used}/{i.quantity}
                      </td>
                      <td>
                        <ActionDropdown
                          viewOnClick=""
                          options={["Edit", "Delete"]}
                          onDelete={() => {
                            setIds([i.id]);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="w-52">
                    {isLoading ? <Spinner /> : "No data available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <ModalTemplate
        title="Generate Voucher"
        isOpenModal={isVoucherModalOpen}
        setIsOpenModal={setIsVoucherModalOpen}
        bodyClassName="max-w-2xl min-h-[30vh]">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-x-3">
            <InputForm
              parentClassName="w-full"
              id="code"
              name="code"
              type="text"
              labelText="Code*"
              error={errors}
              register={register}
              aboveLabel="Code*"
              step=".01"
            />
            <div>
              <p className="invisible">Code</p>
              <BiSync
                size={32}
                className="cursor-pointer rounded-md bg-primary fill-white p-1"
                onClick={() => {
                  setValue("code", Math.random().toString(36).slice(-8));
                }}
              />
            </div>
          </div>
          <InputForm
            id="discount"
            name="discount"
            type="text"
            labelText="Discount*"
            error={errors}
            register={register}
            aboveLabel="Discount*"
            helperText="Discount in percentage"
            step=".01"
          />
          <SelectForm
            register={register}
            error={errors}
            id="status"
            placeholder="Status*"
            aboveLabel="Status*"
            data={[{ name: "Active" }, { name: "Expired" }, { name: "Used" }]}
            filterBy="name"
            selectedBy="name"
            setValue={setValue}
            watch={watch}
          />
          <InputForm
            id="validUntil"
            name="validUntil"
            type="datetime-local"
            labelText="Validity Date"
            defaultValue={null}
            error={errors}
            register={register}
            aboveLabel="Validity Date"
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
          <div className="mt-4 flex justify-end gap-x-2">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                reset();
                setIsVoucherModalOpen(false);
              }}>
              Cancel
            </button>
            <SubmitButton isLoading={submitIsLoading} />
          </div>
        </form>
      </ModalTemplate>
      <ModalTemplate
        title="Delete Voucher"
        isOpenModal={isDeleteModalOpen}
        setIsOpenModal={setIsDeleteModalOpen}
        bodyClassName="max-w-2xl">
        <p>Are you sure you want to delete ?</p>
        <ul className="ml-4 list-disc">
          {data
            ?.filter((i) => ids?.includes(i.id))
            .map((i) => {
              return <li>{i.code}</li>;
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
    </StallLayout>
  );
};

export default Voucher;
