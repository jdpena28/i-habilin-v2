import type { NextPage } from "next";
import { FC, useState } from "react";
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

const Menu: FC<NextPage> = () => {
  const { query } = useRouter();
  const { stall } = useStallConfigurationStore();
  const { data, isLoading, refetch } = trpc.stall.menu.getAllCategory.useQuery({
    registrantId: stall.id as string,
  });
  const { mutate } = trpc.stall.menu.createCategory.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Category created");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { mutate: addMenu } = trpc.stall.menu.createMenu.useMutation({
    onSuccess: () => {
      toast.success("Menu created");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { mutate: updateCategoryOrderList } =
    trpc.stall.menu.updateCategory.useMutation({
      onSuccess: () => {
        refetch();
        toast.success("Category order updated");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
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
    mutate({
      ...value,
      registrantId: stall.id as string,
      order: data?.length as number,
    });
    setIsCategoryModalOpen(false);
    setSubmitIsLoading(false);
    reset();
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
    value.categoryId = query.category as string;
    addMenu(value);
    setIsMenuModalOpen(false);
    setSubmitIsLoading(false);
    resetMenu();
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

    if (active.id !== over.id && oldList) {
      const newList = arrayMove(
        oldList,
        oldList.indexOf(active.id),
        oldList.indexOf(over.id)
      );
      updateCategoryOrderList(newList);
    }
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
          <button
            className="bg-secondary p-2 text-black"
            type="button"
            onClick={() => {
              setIsMenuModalOpen(true);
            }}>
            Add Menu
          </button>
        )}
      </StallHeader>
      <p className="font-semibold uppercase">Categories </p>

      <section id="category" className="flex flex-wrap gap-x-3 rounded-md p-2">
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
      <ModalTemplate
        title="Add Category"
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
                  src={watch("icon")?.cdnUrl}
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
        title="Add Menu"
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
            defaultValue={{
              cdnUrl: "",
              name: "",
            }}
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
    </StallLayout>
  );
};

export default Menu;
