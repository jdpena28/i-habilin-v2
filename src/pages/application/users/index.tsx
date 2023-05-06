/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { trpc } from "@/server/utils/trpc";
import Link from "next/link";
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import { AppLayout } from "@/client/components/layout";
import { ApplicationHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";
import { Spinner } from "@/client/components/loader";
import { formatDate } from "@/client/lib/TextFormatter";

const User = () => {
  const { query } = useRouter();
  const [ids, setIds] = useState<string[] | undefined>([]);
  const { data, isLoading, refetch } =
    trpc.application.user.getAllUser.useQuery({
      orderBy: query.orderBy as string,
      search: query.search as string,
    });
  const { mutate } = trpc.application.user.deleteUser.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted user.");
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
  return (
    <AppLayout>
      <ApplicationHeader
        title="Users"
        search
        filter
        filterData={[
          {
            label: "Name (Asc)",
            value: "name_asc",
          },
          {
            label: "Name (Desc)",
            value: "name_desc",
          },
        ]}
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
                          onDelete={() => {
                            mutate({
                              id: value.id,
                            });
                          }}
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
