import { NextPage } from "next";
import { FC } from "react";
import { isEmpty } from "lodash";
import { format } from "date-fns";

import { CreateStallSettingsSchema } from "@/server/schema/stall/settings";

import { trpc } from "@/server/utils/trpc";
import { CustomerLayout } from "@/client/components/layout";
import { StallCard } from "@/client/components/card";

const Stalls: FC<NextPage> = () => {
  const { data, isLoading } = trpc.public.getAllStalls.useQuery();
  const checkIfClosed = (id: string) => {
    const stall = data?.find((i) => i.id === id)?.operatingHours;
    if (stall) {
      const parseJSON = JSON.parse(stall) as CreateStallSettingsSchema;
      switch (parseJSON.type) {
        case "Everyday":
          if (
            parseJSON.startTime < format(new Date(), "HH:mm") &&
            parseJSON.endTime < format(new Date(), "HH:mm")
          ) {
            return true;
          }
          break;
        case "Weekdays":
          if (
            ["Saturday", "Sunday"].includes(format(new Date(), "EEEE")) ||
            (format(new Date(), "HH:mm") > parseJSON.endTime &&
              format(new Date(), "HH:mm") < parseJSON.startTime)
          ) {
            return true;
          }
          break;
        case "Weekends":
          if (
            !["Saturday", "Sunday"].includes(format(new Date(), "EEEE")) ||
            (format(new Date(), "HH:mm") > parseJSON.endTime &&
              format(new Date(), "HH:mm") < parseJSON.startTime)
          ) {
            return true;
          }
          break;
        case "Custom":
          if (parseJSON?.operationHours) {
            const findIndex = parseJSON?.operationHours?.findIndex(
              (i) => i.day === format(new Date(), "EEEE")
            );
            if (findIndex === -1) {
              return true;
            }
            if (
              format(new Date(), "HH:mm") >
              parseJSON.operationHours[findIndex].endTime
            ) {
              return true;
            }
            if (
              format(new Date(), "HH:mm") <
              parseJSON.operationHours[findIndex].startTime
            ) {
              return true;
            }
          }
          break;
        default:
          return false;
      }
    }
    return false;
  };
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
                      isClosed={i.isClosed || checkIfClosed(i.id)}
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
