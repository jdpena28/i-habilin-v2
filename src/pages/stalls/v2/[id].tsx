/* eslint-disable no-shadow */
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { isEmpty } from "lodash";
import { format } from "date-fns";
import { useRouter } from "next/router";

import { useCustomerOrderStore } from "@/client/store";
import { CreateStallSettingsSchema } from "@/server/schema/stall/settings";
import { ssgHelper } from "@/server/utils/ssgHelper";

import { trpc } from "@/server/utils/trpc";
import { CustomerLayout } from "@/client/components/layout";
import { StallCard } from "@/client/components/card";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const data = await ssgHelper.stall.settings.getQRCode.prefetch({
    id: context.params?.id as string,
  });

  console.log(JSON.stringify(data, null, 1));

  return {
    props: {
      trpc: ssgHelper.dehydrate(),
      id: context.params?.id,
    },
  };
}

const Stalls = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { id } = props;
  const { customerOrder, updateCustomerOrder } = useCustomerOrderStore();
  const { push } = useRouter();
  const { isLoading: qrCodeIsLoading } = trpc.stall.settings.getQRCode.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !isEmpty(id),
      onSuccess: (data) => {
        if (!data) push("/404");
        if (data) {
          updateCustomerOrder({
            ...customerOrder,
            tableNumber: data.tableNumber,
            isTableModalOpen: false,
          });
        }
      },
    }
  );
  const { data, isLoading } = trpc.public.getAllStalls.useQuery();
  const checkIfClosed = (id: string) => {
    const stall = data?.find((i) => i.id === id)?.operatingHours;
    if (stall) {
      const parseJSON = JSON.parse(stall) as CreateStallSettingsSchema;
      switch (parseJSON.type) {
        case "Everyday":
          if (
            (parseJSON?.endTime &&
              format(new Date(), "HH:mm") > parseJSON?.endTime) ||
            (parseJSON?.startTime &&
              format(new Date(), "HH:mm") < parseJSON?.startTime)
          ) {
            return true;
          }
          break;
        case "Weekdays":
          if (
            ["Saturday", "Sunday"].includes(format(new Date(), "EEEE")) ||
            (parseJSON?.endTime &&
              format(new Date(), "HH:mm") > parseJSON?.endTime) ||
            (parseJSON?.startTime &&
              format(new Date(), "HH:mm") < parseJSON?.startTime)
          ) {
            return true;
          }
          break;
        case "Weekends":
          if (
            (parseJSON?.startTime &&
              parseJSON?.endTime &&
              !["Saturday", "Sunday"].includes(format(new Date(), "EEEE"))) ||
            (parseJSON?.endTime &&
              format(new Date(), "HH:mm") > parseJSON?.endTime) ||
            (parseJSON?.startTime &&
              format(new Date(), "HH:mm") < parseJSON?.startTime)
          ) {
            return true;
          }
          break;
        case "Custom":
          if (parseJSON?.operationHours) {
            const findIndex = parseJSON?.operationHours?.findIndex(
              (i) => i?.day === format(new Date(), "EEEE")
            );
            if (findIndex === -1) {
              return true;
            }
            const operatingHours = parseJSON?.operationHours[findIndex];
            if (operatingHours === null) return true;
            if (
              format(new Date(), "HH:mm") > operatingHours.endTime ||
              format(new Date(), "HH:mm") < operatingHours.startTime
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
    <CustomerLayout isLoading={isLoading || qrCodeIsLoading}>
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
