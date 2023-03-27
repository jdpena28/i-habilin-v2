import { useState } from "react";
import { trpc } from "@/server/utils/trpc";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

import { AppLayout } from "@/client/components/layout";
import { ApplicationHeader } from "@/client/components/header";

const UserDetails = () => {
  const sidebarModules = ["Personal Info"];
  const [activeModule, setActiveModule] = useState<string>(sidebarModules[0]);
  const { query } = useRouter();

  const { data, isLoading } = trpc.application.user.getUser.useQuery({
    id: query.id as string,
  });

  return (
    <AppLayout isLoading={isLoading}>
      <ApplicationHeader
        title="Users"
        goBack
        /*  buttonText="Edit Application"
        onClickButton={() => {
          if (data) {
            setValue("status", data?.status);
            setValue("id", data?.id);
            setValue("slug", data?.slug);
          }
          setIsOpenModal(true);
        }} */
      />
      {!isEmpty(data) && (
        <section id="user" className="flex gap-x-3">
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
            <div className="heading relative ml-10 -mt-10 inline-block h-24 w-24 rounded-full bg-white text-center text-lg leading-[96px] ring-2 ring-highlight">
              {data.person?.firstName.charAt(0).toUpperCase()}
              {data.person?.lastName.charAt(0).toUpperCase()}
            </div>
            <span className="heading absolute pl-5 pt-3 text-xl">
              {data.person?.firstName}
              {data.person?.middleName && ` ${data.person.middleName} `}
              {data.person?.lastName}
            </span>
            {activeModule === sidebarModules[0] && (
              <section className="space-y-5 p-10">
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    First Name:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data.person?.firstName}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Middle Name:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data.person?.middleName ? data?.person.middleName : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Last Name:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data.person?.lastName}
                  </p>
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
                  <p className="inline-block font-poppins">
                    {data?.person?.contactNo}
                  </p>
                </div>
                <div>
                  <p className="subheading inline-block w-full max-w-xs">
                    Address:{" "}
                  </p>
                  <p className="inline-block font-poppins">
                    {data.person?.address?.addressLine &&
                      `${data?.person?.address.addressLine} `}
                    {data.person?.address?.province?.prov_name}&nbsp;
                    {data.person?.address?.city?.city_name}&nbsp;
                    {data.person?.address?.Brgy?.brgy_loc}
                  </p>
                </div>
              </section>
            )}
            <div className="sticky bottom-0 h-5 w-full rounded-bl-3xl bg-secondary" />
          </div>
        </section>
      )}
    </AppLayout>
  );
};

export default UserDetails;
