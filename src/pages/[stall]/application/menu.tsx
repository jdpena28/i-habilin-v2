import type { NextPage } from "next";
import { FC, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { isEmpty } from "lodash";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  createCategorySchema,
  CreateCategorySchema,
  createMenuSchema,
  CreateMenuSchema,
} from "@/server/schema/stall/menu";
import { slugify } from "@/server/lib/slugify";
import { useStallConfigurationStore } from "@/client/store";
import { trpc } from "@/server/utils/trpc";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import {
  SortableCategoryButton,
  SubmitButton,
} from "@/client/components/buttons";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import {
  FileUploader,
  InputForm,
  EmojiPicker,
  SelectForm,
} from "@/client/components/form";
import { Spinner } from "@/client/components/loader";
import SortableMenuCard from "@/client/components/card/SortableMenuCard";

const Menu: FC<NextPage> = () => {
  const { query, pathname, push } = useRouter();
  const { stall } = useStallConfigurationStore();
  const { data, isLoading, refetch } = trpc.stall.menu.getAllCategory.useQuery({
    registrantId: stall.id as string,
  });
  const {
    data: menuData,
    isLoading: menuIsLoading,
    refetch: menuRefetch,
  } = trpc.stall.menu.getAllMenu.useQuery({
    categoryId: query.category as string,
  });
  const { mutate } = trpc.stall.menu.createCategory.useMutation({
    onSuccess: () => {
      refetch();
      setIsCategoryModalOpen(false);
      setSubmitIsLoading(false);
      reset();
      toast.success("Category created");
    },
    onError: (err) => {
      setSubmitIsLoading(false);
      toast.error(err.message);
    },
  });
  const { mutate: updateCategory } = trpc.stall.menu.updateCategory.useMutation(
    {
      onSuccess: () => {
        refetch();
        setIsCategoryModalOpen(false);
        setSubmitIsLoading(false);
        reset();
        toast.success("Category updated");
      },
      onError: (err) => {
        setSubmitIsLoading(false);
        toast.error(err.message);
      },
    }
  );
  const { mutate: deleteCategory } = trpc.stall.menu.deleteCategory.useMutation(
    {
      onSuccess: () => {
        refetch();
        push({
          pathname,
          query: {
            stall: query.stall,
          },
        });
        setIsDeleteCategoryModalOpen(false);
        setSubmitIsLoading(false);
        toast.success("Category deleted");
      },
      onError: (err) => {
        setSubmitIsLoading(false);
        toast.error(err.message);
      },
    }
  );
  const { mutate: updateCategoryOrderList } =
    trpc.stall.menu.updateCategorySort.useMutation({
      onSuccess: () => {
        refetch();
        toast.success("Category order updated");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const { mutate: addMenu } = trpc.stall.menu.createMenu.useMutation({
    onSuccess: () => {
      menuRefetch();
      setIsMenuModalOpen(false);
      setSubmitIsLoading(false);
      resetMenu();
      toast.success("Menu created");
    },
    onError: (err) => {
      setSubmitIsLoading(false);
      toast.error(err.message);
    },
  });
  const { mutate: updateMenu } = trpc.stall.menu.updateMenu.useMutation({
    onSuccess: () => {
      menuRefetch();
      setIsMenuModalOpen(false);
      setSubmitIsLoading(false);
      resetMenu();
      toast.success("Menu updated");
    },
    onError: (err) => {
      setSubmitIsLoading(false);
      toast.error(err.message);
    },
  });
  const { mutate: deleteMenu } = trpc.stall.menu.deleteMenu.useMutation({
    onSuccess: () => {
      menuRefetch();
      setIsDeleteMenuModalOpen(false);
      setSelectedMenu("");
      setSubmitIsLoading(false);
      resetMenu();
      toast.success("Menu deleted");
    },
    onError: (err) => {
      setSubmitIsLoading(false);
      toast.error(err.message);
    },
  });
  const { mutate: updateMenuOrderList } =
    trpc.stall.menu.updateMenuSort.useMutation({
      onSuccess: () => {
        menuRefetch();
        toast.success("Menu order updated");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [isDeleteMenuModalOpen, setIsDeleteMenuModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateCategorySchema>({
    resolver: yupResolver(createCategorySchema),
  });
  const onSubmit = (value: CreateCategorySchema) => {
    setSubmitIsLoading(true);
    if (value.id) {
      updateCategory({
        ...value,
        registrantId: stall.id as string,
      });
    } else {
      mutate({
        ...value,
        registrantId: stall.id as string,
        order: data?.length as number,
      });
    }
  };

  const {
    register: registerMenu,
    handleSubmit: handleSubmitMenu,
    setValue: setValueMenu,
    getValues: getValuesMenu,
    watch: watchMenu,
    reset: resetMenu,
    formState: { errors: errorsMenu },
  } = useForm<CreateMenuSchema>({
    resolver: yupResolver(createMenuSchema),
  });
  const onSubmitMenu = (value: CreateMenuSchema) => {
    setSubmitIsLoading(true);
    if (value.id) {
      updateMenu({
        ...value,
      });
    } else {
      value.categoryId = query.category as string;
      addMenu(value);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const oldList = data?.map((i) => i.id);
    const { active, over } = event;

    if (active.id !== over?.id && oldList) {
      const newList = arrayMove(
        oldList,
        oldList.indexOf(active.id),
        oldList.indexOf(over?.id)
      );
      updateCategoryOrderList(newList);
    }
  };

  const handleDragEndMenu = (event: any) => {
    const oldList = menuData?.map((i) => i.id);
    const { active, over } = event;

    if (active.id !== over?.id && oldList) {
      const newList = arrayMove(
        oldList,
        oldList.indexOf(active.id),
        oldList.indexOf(over?.id)
      );
      updateMenuOrderList(newList);
    }
  };

  const handleEditCategory = () => {
    const activeCategory = data?.find((i) => i.id === query.category);
    if (!activeCategory) return;
    setValue("id", activeCategory.id);
    setValue("name", activeCategory.name);
    setValue("slug", activeCategory.slug);
    setValue("registrantId", activeCategory.registrantId);
    setValue("order", activeCategory.order);
    setValue(
      "icon",
      activeCategory.icon
        ? activeCategory.icon
        : activeCategory.customIcon
        ? {
            name: activeCategory?.customIcon.name,
            uuid: activeCategory?.customIcon.uuid,
            size: activeCategory?.customIcon.size,
            isImage: activeCategory?.customIcon.isImage,
            cdnUrl: activeCategory?.customIcon.cdnUrl,
            originalUrl: activeCategory?.customIcon.originalUrl,
          }
        : ""
    );
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (e: FormEvent) => {
    e.preventDefault();
    setSubmitIsLoading(true);
    deleteCategory({
      id: query.category as string,
    });
  };

  const handleEditMenu = (id: string) => {
    const activeMenu = menuData?.find((i) => i.id === id);
    if (!activeMenu) return;
    setValueMenu("id", activeMenu.id);
    setValueMenu("name", activeMenu.name);
    setValueMenu("order", activeMenu.order);
    setValueMenu("description", activeMenu.description);
    setValueMenu("price", activeMenu.price as unknown as number);
    setValueMenu("status", activeMenu.status);
    setValueMenu("featured", activeMenu.featured);
    setValueMenu("discount", activeMenu.discount ? activeMenu.discount : 0);
    setValueMenu("total", activeMenu.total as unknown as number);
    setValueMenu("media", {
      name: activeMenu.media.name,
      uuid: activeMenu.media.uuid,
      size: activeMenu.media.size,
      isImage: activeMenu.media.isImage,
      cdnUrl: activeMenu.media.cdnUrl,
      originalUrl: activeMenu.media.originalUrl,
    });
    setIsMenuModalOpen(true);
  };

  const handleDeleteMenu = (e: FormEvent) => {
    e.preventDefault();
    setSubmitIsLoading(true);
    deleteMenu({
      id: selectedMenu,
    });
  };

  return (
    <StallLayout>
      <StallHeader
        title="Menu"
        buttonText="Add Category"
        onClickButton={() => {
          setIsCategoryModalOpen(true);
        }}>
        {query.category && (
          <>
            <button
              className="bg-secondary p-2 text-black"
              type="button"
              onClick={handleEditCategory}>
              Edit Category
            </button>
            <button
              className="bg-red-500 p-2 text-white"
              type="button"
              onClick={() => setIsDeleteCategoryModalOpen(true)}>
              Delete Category
            </button>
            <button
              className="bg-secondary p-2 text-black"
              type="button"
              onClick={() => {
                setIsMenuModalOpen(true);
              }}>
              Add Menu
            </button>
          </>
        )}
      </StallHeader>
      <p className="font-semibold uppercase">Categories </p>

      <section id="category" className="flex flex-wrap gap-x-3 p-2">
        {isLoading ? (
          <Spinner />
        ) : !isEmpty(data) ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              strategy={horizontalListSortingStrategy}
              items={data?.length ? data?.map((i) => i.id) : []}>
              {data?.map((i) => {
                return (
                  <SortableCategoryButton
                    key={i.id}
                    id={i.id}
                    icon={i.customIcon ? i.customIcon.originalUrl : i.icon}
                    text={i.name}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        ) : (
          <p>No data available</p>
        )}
      </section>
      <p className="font-semibold uppercase">Menu </p>
      <section id="menu" className="mt-4 ml-4 grid grid-cols-4 gap-5">
        {menuIsLoading ? (
          <Spinner />
        ) : !isEmpty(menuData) ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEndMenu}>
            <SortableContext
              strategy={horizontalListSortingStrategy}
              items={menuData?.length ? menuData?.map((i) => i.id) : []}>
              {menuData?.map((i) => {
                return (
                  <SortableMenuCard
                    key={i.id}
                    title={i.name}
                    total={i.total as unknown as number}
                    price={i.price as unknown as number}
                    description={i.description}
                    imageUrl={i.media.cdnUrl}
                    featured={i.featured}
                    discount={i.discount ? i.discount : 0}
                    status={i.status}
                    id={i.id}
                    handleEdit={() => handleEditMenu(i.id)}
                    handleDelete={() => {
                      setSelectedMenu(i.id);
                      setIsDeleteMenuModalOpen(true);
                    }}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        ) : (
          <p>No data available</p>
        )}
      </section>
      <ModalTemplate
        title={`${getValues("id") ? "Edit" : "Add"} Category`}
        isOpenModal={isCategoryModalOpen}
        setIsOpenModal={setIsCategoryModalOpen}
        bodyClassName="max-w-2xl min-h-[30vh]">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            id="name"
            name="name"
            type="text"
            labelText="Name*"
            error={errors}
            register={register}
            aboveLabel="Name*"
            sideEffect={(e) => {
              setValue("slug", slugify(e.target.value));
            }}
          />
          <div>
            <div className="pb-1">
              <p className="label-text">Logo*</p>
              <p className="helper-text !ml-0 !text-sm">
                You can select an emoji or upload your custom logo. Recommended
                size is <strong className="font-medium">32 x 32 pixels</strong>
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <EmojiPicker id="icon" setValue={setValue} />
              <div className="h-6 w-[2px] bg-gray-400" />
              <FileUploader
                setValue={setValue}
                error={errors}
                crop="1:1"
                id="icon"
                getValues={getValues}
                watch={watch}
                register={register}
              />
              {typeof watch("icon") === "string" ? (
                <p className="font-bold">: &emsp;{watch("icon") as string}</p>
              ) : typeof watch("icon") === "object" ? (
                <Image
                  className="ml-3"
                  src={watch("icon.cdnUrl")}
                  alt="Icon"
                  width={32}
                  height={32}
                />
              ) : null}
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-x-2">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                reset();
                setIsCategoryModalOpen(false);
              }}>
              Cancel
            </button>
            <SubmitButton isLoading={submitIsLoading} />
          </div>
        </form>
      </ModalTemplate>
      <ModalTemplate
        title={`${getValuesMenu("id") ? "Edit" : "Add"} Menu`}
        isOpenModal={isMenuModalOpen}
        setIsOpenModal={setIsMenuModalOpen}
        bodyClassName="max-w-2xl min-h-[30vh]">
        <form className="space-y-3" onSubmit={handleSubmitMenu(onSubmitMenu)}>
          <InputForm
            id="name"
            name="name"
            type="text"
            labelText="Name*"
            error={errorsMenu}
            register={registerMenu}
            aboveLabel="Name*"
          />
          <InputForm
            id="description"
            name="description"
            type="textarea"
            labelText="Description*"
            error={errorsMenu}
            register={registerMenu}
            aboveLabel="Description*"
          />
          <FileUploader
            setValue={setValueMenu}
            error={errorsMenu}
            crop="16:9"
            id="media"
            getValues={getValuesMenu}
            watch={watchMenu}
            register={registerMenu}
            label="Image*"
          />
          <SelectForm
            register={registerMenu}
            error={errorsMenu}
            id="status"
            placeholder="Status*"
            aboveLabel="Status*"
            data={[
              { name: "Select status" },
              { name: "Available" },
              { name: "Not Available" },
            ]}
            filterBy="name"
            selectedBy="name"
            setValue={setValueMenu}
            watch={watchMenu}
          />
          <div>
            <label className="label-text" htmlFor="featured">
              Featured: &emsp;
              <input
                className="text-primary outline-none focus:ring-primary"
                type="checkbox"
                id="featured"
                {...registerMenu("featured")}
              />
            </label>
          </div>
          <InputForm
            id="price"
            name="price"
            type="number"
            labelText="Price*"
            error={errorsMenu}
            register={registerMenu}
            aboveLabel="Price*"
            sideEffect={(e) => {
              const { value } = e.target;
              const discount = getValuesMenu("discount");
              setValueMenu(
                "total",
                parseFloat(value) - (parseFloat(value) * (discount || 0)) / 100
              );
            }}
          />
          <InputForm
            id="discount"
            name="discount"
            type="number"
            labelText="Discount"
            error={errorsMenu}
            register={registerMenu}
            aboveLabel="Discount"
            sideEffect={(e) => {
              const { value } = e.target;
              setValueMenu(
                "total",
                getValuesMenu("price") -
                  (parseFloat(value) * getValuesMenu("price")) / 100
              );
            }}
            defaultValue={0}
          />
          <InputForm
            id="total"
            name="total"
            type="number"
            labelText="Total*"
            error={errorsMenu}
            register={registerMenu}
            aboveLabel="Total*"
            step=".01"
          />
          <div className="mt-4 flex justify-end gap-x-2">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                resetMenu();
                setIsMenuModalOpen(false);
              }}>
              Cancel
            </button>
            <SubmitButton isLoading={submitIsLoading} />
          </div>
        </form>
      </ModalTemplate>
      <ModalTemplate
        title="Delete Category"
        isOpenModal={isDeleteCategoryModalOpen}
        setIsOpenModal={setIsDeleteCategoryModalOpen}
        bodyClassName="max-w-lg">
        <form className="space-y-3" onSubmit={handleDeleteCategory}>
          <p>
            Are you sure you want to delete category named{" "}
            <span className="font-medium underline underline-offset-1">
              {data?.find((i) => i.id === query.category)?.name}
            </span>
            ?
          </p>
          <div className="mt-4 flex justify-end gap-x-2">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                setIsDeleteCategoryModalOpen(false);
              }}>
              Cancel
            </button>
            <SubmitButton
              className="!bg-red-500 text-white"
              isLoading={submitIsLoading}
            />
          </div>
        </form>
      </ModalTemplate>
      <ModalTemplate
        title="Delete Menu"
        isOpenModal={isDeleteMenuModalOpen}
        setIsOpenModal={setIsDeleteMenuModalOpen}
        bodyClassName="max-w-lg">
        <form className="space-y-3" onSubmit={handleDeleteMenu}>
          <p>
            Are you sure you want to delete menu named{" "}
            <span className="font-medium underline underline-offset-1">
              {menuData?.find((i) => i.id === selectedMenu)?.name}
            </span>
            ?
          </p>
          <div className="mt-4 flex justify-end gap-x-2">
            <button
              type="reset"
              className="bg-yellow-400 text-black"
              onClick={() => {
                setIsDeleteMenuModalOpen(false);
                setSelectedMenu("");
              }}>
              Cancel
            </button>
            <SubmitButton
              className="!bg-red-500 text-white"
              isLoading={submitIsLoading}
            />
          </div>
        </form>
      </ModalTemplate>
    </StallLayout>
  );
};

export default Menu;
