import { useState } from "react";
import Image from "next/image";
import { trpc } from "@/server/utils/trpc";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditRegistrantSchema,
  editRegistrantSchema,
} from "@/server/schema/application/registrant";

import { AppLayout } from "@/client/components/layout";
import { ApplicationHeader } from "@/client/components/header";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { SelectForm } from "@/client/components/form";

const Registrants = () => {
  const { query } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<EditRegistrantSchema>({
    resolver: zodResolver(editRegistrantSchema),
  });
  const onSubmit = () => {
    console.log("Submitted");
  };
  const sidebarModules = [
    "Stall Info",
    "Owner Details",
    "Contact Person Details",
  ];
  const [activeModule, setActiveModule] = useState<string>(sidebarModules[0]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, isLoading } =
    trpc.application.registrant.getRegistrant.useQuery({
      id: query.id as string,
    });

  return (
    <AppLayout isLoading={isLoading}>
      <ApplicationHeader
        title="Registrants"
        goBack
        buttonText="Edit Application"
        onClickButton={() => {
          setIsOpenModal(true);
        }}
      />
      {!isEmpty(data) && (
        <section id="registrants" className="flex gap-x-3">
          {/* Side Bar */}
          <div className="flow-root w-full max-w-[230px] font-neuemachina">
            <div aria-label="Main Nav" className="-my-2 flex flex-col">
              <ul className="space-y-1 py-2">
                {sidebarModules.map((i: string) => {
                  return (
                    <li
                      key={i}
                      onClick={() => setActiveModule(i)}
                      aria-hidden="true"
                      className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium ${
                        activeModule === i && "bg-secondary"
                      }`}>
                      {i}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Stall Info */}
          <div className="w-full rounded-tl-3xl rounded-bl-3xl bg-white">
            <div className="sticky top-0 h-24 w-full rounded-tl-3xl bg-secondary" />
            <div className="relative ml-10 -mt-10 inline-block h-24 w-24 overflow-hidden rounded-full bg-white object-center ring-2 ring-highlight">
              <Image
                className="bg-white p-2"
                src={data?.logo?.cdnUrl}
                alt={data?.name}
                fill
              />
            </div>
            <span className="heading absolute pl-5 pt-3 text-xl">
              {data?.name}
            </span>
            {activeModule === sidebarModules[0] && (
              <section className="space-y-5 p-10">
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Stall Name:{" "}
                  </p>
                  <p className="inline-block font-poppins">{data?.name}</p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Status:{" "}
                  </p>
                  <div
                    className={`inline-block !text-base ${
                      data?.status === "Pending"
                        ? "badge-yellow"
                        : data?.status === "Active"
                        ? "badge-lime"
                        : "badge-red"
                    }`}>
                    {data?.status}
                  </div>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Email:{" "}
                  </p>
                  <p className="inline-block font-poppins">{data?.email}</p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Contact No:{" "}
                  </p>
                  <p className="inline-block font-poppins">{data?.contactNo}</p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Address:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.address?.addressLine &&
                      `${data?.address?.addressLine} `}
                    {data?.address?.province?.prov_name}&nbsp;
                    {data?.address?.city?.city_name}&nbsp;
                    {data?.address?.Brgy?.brgy_loc}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Business Permit:{" "}
                  </p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={data?.bussinessPermit?.cdnUrl}
                    className="inline-block font-poppins text-blue-500 underline underline-offset-2">
                    View Link
                  </a>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    DTI Permit:{" "}
                  </p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={data?.dtiPermit?.cdnUrl}
                    className="inline-block font-poppins text-blue-500 underline underline-offset-2">
                    View Link
                  </a>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Sanitary Permit:{" "}
                  </p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={data?.sanitaryPermit?.cdnUrl}
                    className="inline-block font-poppins text-blue-500 underline underline-offset-2">
                    View Link
                  </a>
                </div>
              </section>
            )}
            {activeModule === sidebarModules[1] && (
              <section className="space-y-5 p-10">
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Owner:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.owner?.firstName}{" "}
                    {data?.owner?.middleName && `${data?.owner?.middleName} `}
                    {data?.owner?.lastName}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Address:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.owner?.address?.addressLine &&
                      `${data?.owner?.address?.addressLine} `}
                    {data?.owner?.address?.province?.prov_name}&nbsp;
                    {data?.owner?.address?.city?.city_name}&nbsp;
                    {data?.owner?.address?.Brgy?.brgy_loc}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Email:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.owner?.email}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Contact No:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.owner?.contactNo}
                  </p>
                </div>
              </section>
            )}
            {activeModule === sidebarModules[2] && (
              <section className="space-y-5 p-10">
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Contact Person:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.representative?.firstName}{" "}
                    {data?.representative?.middleName &&
                      `${data?.representative?.middleName} `}
                    {data?.representative?.lastName}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Address:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.representative?.address?.addressLine &&
                      `${data?.representative?.address?.addressLine} `}
                    {data?.representative?.address?.province?.prov_name}&nbsp;
                    {data?.representative?.address?.city?.city_name}&nbsp;
                    {data?.representative?.address?.Brgy?.brgy_loc}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Email:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.representative?.email}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Contact No:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data?.representative?.contactNo}
                  </p>
                </div>
              </section>
            )}
            <div className="sticky bottom-0 h-5 w-full rounded-bl-3xl bg-secondary" />
          </div>
          <pre className="text-lg font-bold">
            TITE{JSON.stringify(typeof datas, null, 1)}
          </pre>
        </section>
      )}
      <ModalTemplate
        title="Edit Application"
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        bodyClassName="max-w-2xl h-[30vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectForm
            register={register}
            error={errors}
            id="status"
            placeholder="Status"
            data={[
              {
                id: 0,
                text: "Pending",
              },
              {
                id: 1,
                text: "Active",
              },
              {
                id: 2,
                text: "Expired",
              },
            ]}
            filterBy="text"
            selectedBy="text"
            setValue={setValue}
            watch={watch}
          />
          <div className="mt-4 flex justify-end gap-x-2">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                setIsOpenModal(false);
              }}>
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white">
              Submit
            </button>
          </div>
        </form>
      </ModalTemplate>
    </AppLayout>
  );
};

export default Registrants;
