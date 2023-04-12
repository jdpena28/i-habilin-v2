import { NextPage } from "next";
import { FC, useState, useEffect } from "react";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";

import { trpc } from "@/server/utils/trpc";
import { useCustomerReferenceStore } from "@/client/store";

import { CustomerLayout } from "@/client/components/layout";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { StallCard } from "@/client/components/card";

const Stalls: FC<NextPage> = () => {
  const { push } = useRouter();
  const { customerReference } = useCustomerReferenceStore();
  const { data, isLoading } = trpc.public.getAllStalls.useQuery();
  const [isOpenSurveyModal, setIsOpenSurveyModal] = useState(false);

  useEffect(() => {
    if (!customerReference.isSurveyed) {
      setIsOpenSurveyModal(true);
    }
  }, []);
  return (
    <CustomerLayout isLoading={isLoading}>
      <section>
        <div className=" relative md:flex ">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-6 ">
              {!isEmpty(data) ? (
                data?.map((i) => {
                  return (
                    <StallCard
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
          Hello &#128075;, <br /> Let&apos;s have a quick survey about your food
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
    </CustomerLayout>
  );
};

export default Stalls;
