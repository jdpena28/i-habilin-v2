/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import Image from "next/image";
import { trpc } from "@/server/utils/trpc";
import Link from "next/link";
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";

import { AppLayout } from "@/client/components/layout";
import { ApplicationHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";
import { Spinner } from "@/client/components/loader";
import { formatDate } from "@/client/lib/TextFormatter";

const Registrants = () => {
  const [ids, setIds] = useState<string[] | undefined>([]);
  const { data, isLoading, refetch } =
    trpc.application.registrant.getAllRegistrant.useQuery();
  const { mutate } = trpc.application.registrant.deleteRegistrant.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted registrant.");
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
      <ApplicationHeader title="Registrants" search tabs filter />
      {ids && ids?.length > 1 ? (
        <button
          className="my-1 ml-1 bg-red-500 !p-1 text-sm text-white"
          onClick={() => {
            mutate({
              id: ids,
            });
            setIds([]);
          }}>
          Delete
        </button>
      ) : null}
      <section id="registrants" className="bg-white">
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
                <th>Stall Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(data) ? (
                data?.map((i: any) => {
                  return (
                    <tr key={i.id}>
                      <td>
                        <input
                          type="checkbox"
                          id={i.id}
                          name="select-all"
                          className="h-5 w-5 rounded border-gray-300 text-secondary checked:ring-secondary focus:ring-secondary"
                          onChange={() => selectIds(i.id)}
                          checked={ids?.includes(i.id)}
                        />
                      </td>
                      <Link href={`registrants/${i.id}`}>
                        <td className="mt-1 flex items-center gap-x-3 ">
                          <div className="relative h-9 w-9 overflow-hidden rounded-full">
                            <Image src={i.logo.cdnUrl} alt={i.name} fill />
                          </div>
                          <div>
                            <p className="font-medium">{i.name}</p>
                            <p className="text-xs">
                              ihabilin.com/
                              {i.slug}
                            </p>
                          </div>
                        </td>
                      </Link>
                      <td>{i.email}</td>
                      <td>
                        <div
                          className={`${
                            i.status === "Pending"
                              ? "badge-yellow"
                              : i.status === "Active"
                              ? "badge-lime"
                              : i?.status === "Denied"
                              ? "badge-orange"
                              : "badge-red"
                          }`}>
                          {i.status}
                        </div>
                      </td>
                      <td>{formatDate(i.createdAt)}</td>
                      <td>
                        <ActionDropdown
                          viewOnClick={`/application/registrants/${i.id}`}
                          options={["View", "Delete"]}
                          onDelete={() => {
                            mutate({
                              id: i.id,
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

export default Registrants;
