import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { isEmpty } from "lodash";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { trpc } from "@/server/utils/trpc";
import {
  useCustomerOrderStore,
  useCustomerReferenceStore,
} from "@/client/store";
import { FormatCurrency } from "@/client/lib/TextFormatter";
import type { GetAllMenuType } from "@/client/types/main";

import { CustomerLayout } from "@/client/components/layout";
import { CategoryButton } from "@/client/components/buttons";
import { MenuCard } from "@/client/components/card";
import { Spinner } from "@/client/components/loader";
import { FeaturedMenu } from "@/client/components/swiper";
import ModalTemplate from "@/client/components/modal/ModalTemplate";

const Menu = () => {
  const { customerReference } = useCustomerReferenceStore();
  const { customerOrder, updateCustomerOrder } = useCustomerOrderStore();
  const { query, push, pathname } = useRouter();
  const [menuDescription, setMenuDescription] = useState<
    GetAllMenuType | undefined | never
  >();
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
          let url = pathname;
          if (!Array.isArray(data) && data.isClosed) {
            url = "/stalls";
            queries = {};
          }
          if (!isEmpty(data) && Array.isArray(data)) {
            queries = {
              ...query,
              category: data[0]?.id,
            };
          }
          push({
            pathname: url,
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
      enabled: process.env.NODE_ENV !== "development",
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  const addToOrder = () => {
    const { orders } = customerOrder;
    if (isEmpty(orders)) {
      updateCustomerOrder({
        ...customerOrder,
        orders: [
          {
            id: menuDescription?.category?.registrant?.id,
            name: menuDescription?.category?.registrant?.name,
            menuOrders: menuDescription ? [menuDescription] : [],
          },
        ],
      });
    } else {
      const stallIndex = orders.findIndex(
        (i) => i.id === menuDescription?.category?.registrant?.id
      );
      if (stallIndex !== -1) {
        const menuIndex = orders[stallIndex].menuOrders?.findIndex(
          (i: GetAllMenuType) => i.id === menuDescription?.id
        );
        if (menuIndex !== -1) {
          orders[stallIndex].menuOrders[menuIndex] =
            menuDescription as GetAllMenuType;
        } else {
          orders[stallIndex].menuOrders?.push(
            menuDescription as GetAllMenuType
          );
        }
      } else {
        orders.push({
          id: menuDescription?.category?.registrant?.id,
          name: menuDescription?.category?.registrant?.name,
          menuOrders: menuDescription ? [menuDescription] : [],
        });
      }
      updateCustomerOrder({
        ...customerOrder,
        orders,
      });
    }
    setIsMenuDescriptionModalOpen(false);
  };

  const handleQuantityAdd = () => {
    if (menuDescription) {
      setMenuDescription({
        ...menuDescription,
        quantity: menuDescription.quantity + 1,
      });
    }
  };

  const handleQuantityMinus = () => {
    if (menuDescription?.quantity === 1) {
      return;
    }
    if (menuDescription) {
      setMenuDescription({
        ...menuDescription,
        quantity: menuDescription.quantity - 1,
      });
    }
  };

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
          {!isEmpty(categoryData) && Array.isArray(categoryData) ? (
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
              <p className="font-semibold uppercase">
                For you
                {query.confidence === "true" &&
                  ` | CONFIDENCE LEVEL: ${foodRecommendationData.confidence}`}
              </p>
              <section
                id="foodRecommended"
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
                        setMenuDescription({
                          ...i,
                          quantity:
                            customerOrder.orders.length === 0
                              ? 1
                              : customerOrder.orders
                                  .find(
                                    (j) => j.id === i.category.registrant.id
                                  )
                                  ?.menuOrders?.find(
                                    (k: GetAllMenuType) => k.id === i.id
                                  )?.quantity || 1,
                        });
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
          id="menu"
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
                    setMenuDescription({
                      ...i,
                      quantity:
                        customerOrder.orders.length === 0
                          ? 1
                          : customerOrder.orders
                              .find((j) => j.id === i.category.registrant.id)
                              ?.menuOrders?.find(
                                (k: GetAllMenuType) => k.id === i.id
                              )?.quantity || 1,
                    });
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
            setMenuDescription(undefined);
          }, 500);
        }}>
        <div className="space-y-2">
          <div className="relative aspect-video h-auto w-full bg-contain bg-center">
            <Image
              src={menuDescription?.media?.cdnUrl as string}
              alt={menuDescription?.media?.name as string}
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
              {typeof menuDescription?.discount === "number" &&
                menuDescription.discount > 0 &&
                FormatCurrency(menuDescription?.price as unknown as number)}
            </span>{" "}
            {typeof menuDescription?.discount === "number" &&
              menuDescription.discount > 0 &&
              ` - `}
            {FormatCurrency(menuDescription?.total as unknown as number)}
          </p>
          <div className="!mt-4 flex justify-around">
            <AiOutlineMinus size={20} onClick={handleQuantityMinus} />
            <span className="heading font-bold">
              {menuDescription?.quantity}
            </span>
            <AiOutlinePlus size={20} onClick={handleQuantityAdd} />
          </div>
          <button className="!mt-4 w-full bg-primary" onClick={addToOrder}>
            Add to Order
          </button>
        </div>
      </ModalTemplate>
    </CustomerLayout>
  );
};

export default Menu;
