import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import { trpc } from "@/server/utils/trpc";
import { useCustomerReferenceStore } from "@/client/store";

import { CustomerLayout } from "@/client/components/layout";
import { CategoryButton } from "@/client/components/buttons";
import { MenuCard } from "@/client/components/card";
import { Spinner } from "@/client/components/loader";
import { FeaturedMenu } from "@/client/components/swiper";

const Menu = () => {
  const { customerReference } = useCustomerReferenceStore();
  const { query, push, pathname } = useRouter();
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
                />
              );
            })
          ) : (
            <p>No data available</p>
          )}
        </section>
      </div>
    </CustomerLayout>
  );
};

export default Menu;
