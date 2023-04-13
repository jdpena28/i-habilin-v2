import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { isEmpty } from "lodash";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { trpc } from "@/server/utils/trpc";
import { useCustomerReferenceStore } from "@/client/store";
import { FormatCurrency } from "@/client/lib/TextFormatter";

import { CustomerLayout } from "@/client/components/layout";
import { CategoryButton } from "@/client/components/buttons";
import { MenuCard } from "@/client/components/card";
import { Spinner } from "@/client/components/loader";
import { FeaturedMenu } from "@/client/components/swiper";
import ModalTemplate from "@/client/components/modal/ModalTemplate";

const Menu = () => {
  const { customerReference } = useCustomerReferenceStore();
  const { query, push, pathname } = useRouter();
  const [menuDescription, setMenuDescription] = useState<any>();
  const [isMenuDescriptionModalOpen, setIsMenuDescriptionModalOpen] =
    useState(false);
  const { data: categoryData, status: categoryStatus } =
    trpc.public.getAllCategory.useQuery(
      {
        slug: query.stall as string,
      },
      {
        onSuccess: (data) => {
          let queries = {
            ...query,
          };
          if (!isEmpty(data)) {
            queries = {
              ...query,
              category: data[0]?.id,
            };
          }
          push({
            pathname,
            query: queries,
          });
        },
      }
    );
  const { data: featuredMenuData, status: featuredMenuStatus } =
    trpc.public.getAllMenu.useQuery(
      {
        slug: query.stall as string,
        featured: true,
      },
      {
        refetchInterval: 1000 * 60 * 0.25,
      }
    );

  const {
    data: menuData,
    isLoading: menuIsLoading,
    status: menuStatus,
  } = trpc.public.getAllMenu.useQuery(
    {
      categoryId: query?.category as string,
    },
    {
      refetchInterval: 1000 * 60 * 0.25,
    }
  );

  const {
    data: foodRecommendationData,
    isLoading: foodRecommendationIsLoading,
  } = trpc.public.getGenerateFoodRecommendation.useQuery(
    {
      customerId: customerReference.id,
      slug: query.stall as string,
    },
    {
      enabled: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return (
    <CustomerLayout
      isLoading={
        categoryStatus === "loading" &&
        menuStatus === "loading" &&
        featuredMenuStatus === "loading"
      }>
      <div className="mt-3 space-y-2">
        {!isEmpty(featuredMenuData) && <FeaturedMenu data={featuredMenuData} />}
        <p className="font-semibold uppercase">Categories</p>
        <section id="category" className="flex w-full gap-x-3 overflow-x-auto">
          {!isEmpty(categoryData) ? (
            categoryData?.map((i) => {
              return (
                <CategoryButton
                  key={i.id}
                  icon={i.customIcon ? i.customIcon.originalUrl : i.icon}
                  text={i.name}
                  id={i.id}
                />
              );
            })
          ) : (
            <p>No data available</p>
          )}
        </section>
        {foodRecommendationIsLoading ? (
          <p className="text-sm">Generating recommendation ...</p>
        ) : (
          !isEmpty(foodRecommendationData) && (
            <>
              <p className="font-semibold uppercase">For you</p>
              <section
                id="category"
                className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {foodRecommendationData?.recommended_food.map((i: any) => {
                  return (
                    <MenuCard
                      key={i.id}
                      title={i.name}
                      total={i.total as unknown as number}
                      price={i.price as unknown as number}
                      description={i.description}
                      imageUrl={i.media.cdnUrl}
                      discount={i.discount as unknown as number}
                      status={i.status}
                      onClick={() => {
                        setMenuDescription(i);
                        setIsMenuDescriptionModalOpen(true);
                      }}
                    />
                  );
                })}
              </section>
            </>
          )
        )}
        <p className="font-semibold uppercase">Menu</p>
        <section
          id="category"
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {menuIsLoading ? (
            <Spinner />
          ) : !isEmpty(menuData) ? (
            menuData?.map((i) => {
              return (
                <MenuCard
                  key={i.id}
                  title={i.name}
                  total={i.total as unknown as number}
                  price={i.price as unknown as number}
                  description={i.description}
                  imageUrl={i.media.cdnUrl}
                  discount={i.discount as unknown as number}
                  status={i.status}
                  onClick={() => {
                    setMenuDescription(i);
                    setIsMenuDescriptionModalOpen(true);
                  }}
                />
              );
            })
          ) : (
            <p>No data available</p>
          )}
        </section>
      </div>
      <ModalTemplate
        title={`${menuDescription?.name}`}
        isOpenModal={isMenuDescriptionModalOpen}
        setIsOpenModal={setIsMenuDescriptionModalOpen}
        bodyClassName="max-w-2xl"
        onClose={() => {
          setIsMenuDescriptionModalOpen(false);
          setTimeout(() => {
            setMenuDescription({});
          }, 500);
        }}>
        <div className="space-y-2">
          <div className="relative aspect-video h-auto w-full bg-contain bg-center">
            <Image
              src={menuDescription?.media?.cdnUrl}
              alt={menuDescription?.media?.name}
              fill
            />
          </div>
          <p className="font-neuemachina text-lg font-bold tracking-wide">
            {menuDescription?.name}
          </p>
          <p className="font-tertiary text-justify text-sm">
            {menuDescription?.description}
          </p>
          <p className="font-neuemachina font-semibold tracking-wide">
            <span className="line-through">
              {menuDescription?.discount > 0 &&
                FormatCurrency(menuDescription?.price as unknown as number)}
            </span>{" "}
            {menuDescription?.discount > 0 && ` - `}
            {FormatCurrency(menuDescription?.total) as unknown as number}
          </p>
          <div className="!mt-4 flex justify-around">
            <div className="flex h-max w-max items-center justify-center rounded-full p-2">
              <AiOutlineMinus size={16} />
            </div>
            <span className="heading font-bold">0</span>
            <div className="flex h-max w-max items-center justify-center rounded-full p-2">
              <AiOutlinePlus size={16} />
            </div>
          </div>
          <button className="!mt-4 w-full bg-primary">Add to Order</button>
        </div>
      </ModalTemplate>
    </CustomerLayout>
  );
};

export default Menu;
