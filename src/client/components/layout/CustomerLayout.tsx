import { Toaster } from "react-hot-toast";
import type { FC, ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GridLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import { trpc } from "@/server/utils/trpc";
import { CreateTableSchema, createTableSchema } from "@/server/schema/public";
import {
  useCustomerReferenceStore,
  useCustomerOrderStore,
} from "@/client/store";

import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { InputForm } from "@/client/components/form";
import { CustomerNav } from "../nav";

interface CustomerLayoutProps {
  children: ReactNode;
  isLoading: boolean;
}

const CustomerLayout: FC<CustomerLayoutProps> = ({ children, isLoading }) => {
  const { push, pathname } = useRouter();
  const { customerReference } = useCustomerReferenceStore();
  const { customerOrder, updateCustomerOrder } = useCustomerOrderStore();
  const { data, status: maintenanceStatus } =
    trpc.application.settings.getAppMeta.useQuery(
      {
        key: "MAINTENANCE_MODE",
      },
      {
        staleTime: 1000 * 60 * 60 * 1, // 1 hour
      }
    );
  const [isOpenSurveyModal, setIsOpenSurveyModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTableSchema>({
    resolver: yupResolver(createTableSchema),
  });

  const onSubmit = (value: CreateTableSchema) => {
    updateCustomerOrder({
      ...customerOrder,
      tableNumber: value.tableNumber,
      isTableModalOpen: false,
    });
  };

  useEffect(() => {
    if (maintenanceStatus === "success" && data?.value === "true") return;
    if (pathname === "/stalls/survey") return;
    if (!customerReference.isSurveyed) {
      setIsOpenSurveyModal(true);
    } else if (!customerOrder.tableNumber) {
      updateCustomerOrder({
        ...customerOrder,
        isTableModalOpen: true,
      });
    }
  }, []);

  if (maintenanceStatus === "loading") {
    return (
      <section className="flex h-screen w-full items-center justify-center">
        <GridLoader className="grid-loader" size={48} />
      </section>
    );
  }
  if (maintenanceStatus === "success" && data?.value === "true") {
    push("/maintenance");
  }
  return (
    <div className="bg-tertiary">
      <CustomerNav />
      {isLoading ? (
        <section className="flex h-screen w-full items-center justify-center">
          <GridLoader className="grid-loader" size={48} />
        </section>
      ) : (
        <div className=" container mx-auto min-h-screen px-5 pt-16">
          {children}
        </div>
      )}
      <Toaster />
      <ModalTemplate
        title="Survey"
        isOpenModal={isOpenSurveyModal}
        setIsOpenModal={setIsOpenSurveyModal}
        onClose={() => {
          push("/stalls/survey");
        }}
        bodyClassName="max-w-2xl">
        <div className="bg- relative h-80 w-full bg-contain bg-center lg:h-[490px]">
          <Image
            alt="Survey Illustration"
            src="/public/customer-review.gif"
            fill
          />
        </div>
        <p className="font-tertiary tracking-wide">
          Hello &#128075;, <br /> Let&apos;s have a quick survey about your food{" "}
          preferences.{" "}
        </p>
        <div className="mt-4 flex justify-end gap-x-2">
          <button
            type="button"
            onClick={() => {
              push("/stalls/survey");
            }}
            className="bg-primary">
            Proceed
          </button>
        </div>
      </ModalTemplate>
      <ModalTemplate
        title="Table Number"
        isOpenModal={customerOrder.isTableModalOpen}
        setIsOpenModal={setIsOpenSurveyModal}
        bodyClassName="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            id="tableNumber"
            type="number"
            labelText="Table Number*"
            name="tableNumber"
            aboveLabel="Please input your table number."
            error={errors}
            register={register}
            defaultValue={customerOrder.tableNumber}
          />
          <div className="mt-4 flex justify-end gap-x-2">
            <button type="submit" className="bg-primary">
              Submit
            </button>
          </div>
        </form>
      </ModalTemplate>
    </div>
  );
};

export default CustomerLayout;
