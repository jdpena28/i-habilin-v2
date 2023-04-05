import type { NextPage } from "next";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { isEmpty } from "lodash";

import {
  createCategorySchema,
  CreateCategorySchema,
} from "@/server/schema/stall/menu";
import { slugify } from "@/server/lib/slugify";
import { useStallConfigurationStore } from "@/client/store";
import { trpc } from "@/server/utils/trpc";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { CategoryButton, SubmitButton } from "@/client/components/buttons";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { FileUploader, InputForm, EmojiPicker } from "@/client/components/form";

const Menu: FC<NextPage> = () => {
  const { stall } = useStallConfigurationStore();
  const { data, refetch } = trpc.stall.category.getAllCategory.useQuery({
    registrantId: stall.id as string,
  });
  const { mutate } = trpc.stall.category.createCategory.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Category created");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
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
    });
    setIsCategoryModalOpen(false);
    setSubmitIsLoading(false);
    reset();
  };

  return (
    <StallLayout>
      <StallHeader
        title="Menu"
        buttonText="Add Category"
        onClickButton={() => {
          setIsCategoryModalOpen(true);
        }}
      />
      <p className="font-semibold uppercase">Categories </p>
      <section id="category" className="flex flex-wrap gap-x-3 rounded-md p-2">
        {!isEmpty(data) ? (
          data?.map((i) => {
            return <CategoryButton key={i.id} icon={i.icon} text={i.name} />;
          })
        ) : (
          <p>No data available</p>
        )}
      </section>
      <ModalTemplate
        title="Edit Application"
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
    </StallLayout>
  );
};

export default Menu;
