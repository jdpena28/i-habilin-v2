/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { trpc } from "@/server/utils/trpc";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { QRCode } from "react-qrcode-logo";

import { formatDate } from "@/client/lib/TextFormatter";
import {
  CreateQrCodeSchema,
  createQrCodeSchema,
} from "@/server/schema/stall/settings";
import { useStallConfigurationStore } from "@/client/store";

import { InputForm } from "@/client/components/form";
import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";
import { Spinner } from "@/client/components/loader";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { SubmitButton } from "@/client/components/buttons";

const GenerateQR = () => {
  const { stall } = useStallConfigurationStore();
  const URL =
    process.env.NODE_ENV === "development"
      ? "http://192.168.100.114:3000"
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  const { query } = useRouter();
  const [ids, setIds] = useState<string[] | undefined>([]);
  const [isGenerateQROpen, setIsGenerateQROpen] = useState(false);
  const [isViewQROpen, setIsViewQROpen] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const ORDER_BY_OPTION = [
    {
      label: "Name (Asc)",
      value: "name_asc",
    },
    {
      label: "Name (Desc)",
      value: "name_desc",
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateQrCodeSchema>({
    resolver: yupResolver(createQrCodeSchema),
  });

  const { data, isLoading, refetch } =
    trpc.stall.settings.getAllQRCode.useQuery({
      registrantId: stall.id,
      orderBy: query.orderBy as string,
      search: query.search as string,
    });

  const { mutate: createQRCode } = trpc.stall.settings.createQRCode.useMutation(
    {
      onSuccess: () => {
        reset();
        setSubmitIsLoading(false);
        setIsGenerateQROpen(false);
        refetch();
        toast.success("QR code created successfully");
      },
      onError: (err) => {
        setSubmitIsLoading(false);
        toast.error(err.message);
      },
    }
  );

  const { mutate: updateQrCode } = trpc.stall.settings.updateQRCode.useMutation(
    {
      onSuccess: () => {
        reset();
        setSubmitIsLoading(false);
        setIsGenerateQROpen(false);
        refetch();
        toast.success("QR code updated successfully");
      },
      onError: (err) => {
        setSubmitIsLoading(false);
        toast.error(err.message);
      },
    }
  );

  const { mutate } = trpc.stall.settings.deleteQRCode.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted QR Code.");
      setIds([]);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
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

  const onSubmit = async (values: CreateQrCodeSchema) => {
    setSubmitIsLoading(true);
    if (values.id) {
      return updateQrCode(values);
    }
    return createQRCode({
      ...values,
    });
  };

  return (
    <StallLayout>
      <StallHeader
        title="Generate QR Code"
        filterQuery="orderBy"
        goBack
        filter={
          <>
            <option value="default" selected>
              Sort By
            </option>
            {ORDER_BY_OPTION.map((value) => {
              return (
                <option key={value.value} value={value.value}>
                  {value.label}
                </option>
              );
            })}
          </>
        }
        search
        buttonText="Generate QR"
        onClickButton={() => {
          setValue("registrantId", stall.id as string);
          setIsGenerateQROpen(true);
        }}
      />
      {ids && ids?.length > 1 ? (
        <button
          className="my-1 ml-1 bg-red-500 !p-1 text-sm text-white"
          onClick={() => {
            mutate({
              id: ids,
            });
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
                <th>QR Code ID</th>
                <th>Table Number</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {!isEmpty(data) ? (
                data?.map((value) => {
                  return (
                    <tr key={value.id}>
                      <td>
                        <input
                          type="checkbox"
                          id={value.id}
                          name="select-all"
                          className="h-5 w-5 rounded border-gray-300 text-secondary checked:ring-secondary focus:ring-secondary"
                          onChange={() => selectIds(value.id)}
                          checked={ids?.includes(value.id)}
                        />
                      </td>
                      <td>{value.id}</td>
                      <td>{value.tableNumber}</td>
                      <td>{formatDate(value.createdAt)}</td>
                      <td>
                        <ActionDropdown
                          viewOnClick=""
                          viewOnAction={() => {
                            setValue("id", value.id);
                            setValue("tableNumber", value.tableNumber);
                            setIsViewQROpen(true);
                          }}
                          options={["View", "Edit", "Delete"]}
                          onDelete={() => {
                            mutate({
                              id: [value.id],
                            });
                          }}
                          onEdit={() => {
                            setValue("id", value.id);
                            setValue("tableNumber", value.tableNumber);
                            setValue("registrantId", value.registrantId);
                            setValue("type", value.type as "QR-Code");
                            setIsGenerateQROpen(true);
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
        title={`${getValues("id") ? "Edit" : "Generate"} QR Code`}
        isOpenModal={isGenerateQROpen}
        setIsOpenModal={setIsGenerateQROpen}
        bodyClassName="max-w-2xl min-h-[30vh]">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-col space-y-2 md:w-full">
            <InputForm
              id="tableNumber"
              type="number"
              labelText="Table Number*"
              name="tableNumber"
              aboveLabel="Table Number*"
              error={errors}
              register={register}
            />
            <div className="mt-4 flex justify-end gap-x-2">
              <button
                type="reset"
                className="bg-yellow-400 text-black"
                onClick={() => {
                  reset();
                  setIsGenerateQROpen(false);
                }}>
                Cancel
              </button>
              <SubmitButton isLoading={submitIsLoading} />
            </div>
          </div>
        </form>
      </ModalTemplate>
      <ModalTemplate
        title={`QR Code | Table Number: ${getValues("tableNumber")}`}
        isOpenModal={isViewQROpen}
        setIsOpenModal={setIsViewQROpen}
        bodyClassName="max-w-2xl min-h-[30vh]"
        onClose={() => {
          reset();
        }}>
        <div id="qr-code-image" className="mx-auto h-max w-max">
          <QRCode
            value={`${URL}/stalls/v2/${getValues("id")}`}
            size={200}
            logoWidth={198 * 0.35}
            logoHeight={124 * 0.35}
          />
        </div>
        <div className="mt-4 flex justify-end gap-x-2">
          <button
            type="button"
            className="bg-primary text-white"
            onClick={() => {
              setIsViewQROpen(false);
              reset();
            }}>
            Okay
          </button>
        </div>
      </ModalTemplate>
    </StallLayout>
  );
};

export default GenerateQR;
