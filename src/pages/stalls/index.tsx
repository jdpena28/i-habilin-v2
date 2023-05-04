import { NextPage } from "next";
import { FC } from "react";
import { isEmpty } from "lodash";

import { trpc } from "@/server/utils/trpc";
import { CustomerLayout } from "@/client/components/layout";
import { StallCard } from "@/client/components/card";

const Stalls: FC<NextPage> = () => {
  const { data, isLoading } = trpc.public.getAllStalls.useQuery();

  return (
    <CustomerLayout isLoading={isLoading}>
      <section id="menu" className="mt-3">
        <div className=" relative md:flex ">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 ">
              {!isEmpty(data) ? (
                data?.map((i) => {
                  return (
                    <StallCard
                      key={i.id}
                      src={i.logo.cdnUrl}
                      text={i.name}
                      alt={i.name}
                      slug={i.slug}
                    />
                  );
                })
              ) : (
                <p>No Data Available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
};

export default Stalls;
