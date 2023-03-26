import { trpc } from "@/server/utils/trpc";
import Link from "next/link";
import { isEmpty } from "lodash";

import { AppLayout } from "@/client/components/layout";
import { ApplicationHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";
import { Spinner } from "@/client/components/loader";
import { formatDate } from "@/client/lib/TextFormatter";

const User = () => {
  const { data, isLoading } = trpc.application.user.getAllUser.useQuery();

  return (
    <AppLayout>
      <ApplicationHeader title="Users" search tabs filter />
      <section id="users" className="bg-white">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {!isEmpty(data) ? (
                data?.map((value) => {
                  return (
                    <tr key={value.id}>
                      <Link href={`users/${value.id}`}>
                        <td className="mt-1 flex items-center gap-x-3 ">
                          <div className="heading h-9 w-9 overflow-hidden rounded-full bg-gray-200 text-center font-medium uppercase leading-[36px]">
                            {value?.person?.firstName.charAt(0)}
                            {value?.person?.lastName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">
                              {value.person?.firstName}
                              {value.person?.middleName &&
                                ` ${value.person.middleName} `}
                              {value.person?.lastName}
                            </p>
                          </div>
                        </td>
                      </Link>
                      <td>{value.email}</td>
                      <td>
                        <p>
                          {value.person?.address?.addressLine &&
                            `${value.person?.address} `}
                          {value.person?.address?.province.prov_name}{" "}
                          {value.person?.address?.city.city_name}
                          {value.person?.address?.Brgy?.brgy_loc &&
                            ` ${value.person?.address?.Brgy.brgy_loc}`}
                        </p>
                      </td>
                      <td>{formatDate(value.createdAt)}</td>
                      <td>
                        <ActionDropdown
                          viewOnClick={`users/${value.id}`}
                          options={["View", "Delete"]}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>{isLoading ? <Spinner /> : "No data available."}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppLayout>
  );
};

export default User;
