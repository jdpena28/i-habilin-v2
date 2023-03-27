import Image from "next/image";
import { trpc } from "@/server/utils/trpc";
import Link from "next/link";
import { isEmpty } from "lodash";

import { AppLayout } from "@/client/components/layout";
import { ApplicationHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";
import { Spinner } from "@/client/components/loader";
import { formatDate } from "@/client/lib/TextFormatter";

const registrants = () => {
  const { data, isLoading } =
    trpc.application.registrant.getAllRegistrant.useQuery();
  return (
    <AppLayout>
      <ApplicationHeader title="Registrants" search tabs filter />
      <section id="registrants" className="bg-white">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
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

export default registrants;
