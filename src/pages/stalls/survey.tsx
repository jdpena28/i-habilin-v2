import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import { useCustomerReferenceStore } from "@/client/store";
import { trpc } from "@/server/utils/trpc";
import { createSurveySchema, CreateSurveySchema } from "@/server/schema/public";

import { CustomerLayout } from "@/client/components/layout";
import { SubmitButton } from "@/client/components/buttons";
import { InputForm, SelectForm } from "@/client/components/form";

const Survey = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { customerReference, updateCustomerReference } =
    useCustomerReferenceStore();
  const { mutate } = trpc.public.createCustomer.useMutation({
    onSuccess: (data) => {
      setIsLoading(false);
      toast.success("Successfully submitted your answer");
      updateCustomerReference({
        ...customerReference,
        id: data.id,
        name: data.name,
        isSurveyed: true,
      });
      push("/stalls");
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CreateSurveySchema>({
    resolver: yupResolver(createSurveySchema),
  });

  const onSubmit = (data: CreateSurveySchema) => {
    setIsLoading(true);
    mutate(data);
  };

  const FOOD_PREFERENCE_DATA = [
    "Rice Meals",
    "Pasta",
    "Snacks",
    "Vegan",
    "Foreign Dishes",
    "Coffee",
    "Pastries",
  ];

  const CUISINE_DATA = [
    "Asian",
    "American",
    "European",
    "Middle Eastern",
    "Other",
  ];

  const COOKED_PREFERENCE_DATA = [
    "Fried",
    "Grilled",
    "Boiled",
    "Baked",
    "Other",
  ];

  return (
    <CustomerLayout isLoading={false}>
      <section id="survey" className="mt-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <InputForm
            id="name"
            name="name"
            type="text"
            labelText="Name"
            error={errors}
            register={register}
            aboveLabel="Name"
          />
          <SelectForm
            register={register}
            error={errors}
            id="sex"
            placeholder="Sex*"
            aboveLabel="Sex*"
            data={[
              { name: "Select sex" },
              { name: "Male" },
              { name: "Female" },
            ]}
            filterBy="name"
            selectedBy="name"
            setValue={setValue}
            watch={watch}
          />
          <SelectForm
            register={register}
            error={errors}
            id="age"
            placeholder="Age*"
            aboveLabel="Age*"
            data={[
              { name: "17 and Below" },
              { name: "18-24" },
              { name: "25-34" },
              { name: "35-44" },
              { name: "45-54" },
              { name: "55-64" },
              { name: "65 and Above" },
            ]}
            filterBy="name"
            selectedBy="name"
            setValue={setValue}
            watch={watch}
          />
          <SelectForm
            register={register}
            error={errors}
            id="price_preference"
            placeholder="Price Preference*"
            aboveLabel="Price Preference*"
            data={[
              { name: "₱50 - ₱149 (Student Budget)" },
              { name: "₱150 - ₱299 (Fair Price)" },
              { name: "₱300+ (Expensive)" },
            ]}
            filterBy="name"
            selectedBy="name"
            setValue={setValue}
            watch={watch}
          />
          <div>
            <p className="label-text">Type of food you are looking for?*</p>
            <fieldset id="food_preference" className="grid grid-cols-2">
              {FOOD_PREFERENCE_DATA.map((i) => {
                return (
                  <label
                    key={i}
                    htmlFor="food_preference"
                    className="label-text !font-normal">
                    <input
                      type="checkbox"
                      className="text-primary outline-none focus:ring-primary"
                      id="food_preference"
                      value={i}
                      {...register("food_preference")}
                    />
                    &ensp;{i}
                  </label>
                );
              })}
            </fieldset>
            {errors.food_preference && (
              <p className="helper-text mt-1 font-medium !text-red-400">
                {errors.food_preference?.message}
              </p>
            )}
          </div>
          <div>
            <p className="label-text">
              What type of cuisine do you enjoy the most?*
            </p>
            <fieldset id="cuisine_preference" className="grid grid-cols-2">
              {CUISINE_DATA.map((i) => {
                return (
                  <label
                    key={i}
                    htmlFor="cuisine_preference"
                    className="label-text !font-normal">
                    <input
                      type="checkbox"
                      className="text-primary outline-none focus:ring-primary"
                      id="cuisine_preference"
                      value={i}
                      {...register("cuisine_preference")}
                    />
                    &ensp;{i}
                  </label>
                );
              })}
            </fieldset>
            {errors.cuisine_preference && (
              <p className="helper-text mt-1 font-medium !text-red-400">
                {errors.cuisine_preference?.message}
              </p>
            )}
          </div>
          <SelectForm
            register={register}
            error={errors}
            id="spiciness"
            placeholder="Spiciness*"
            aboveLabel="Spiciness*"
            data={[
              { name: "None" },
              { name: "Mild" },
              { name: "Spicy" },
              { name: "Very Spicy" },
            ]}
            filterBy="name"
            selectedBy="name"
            setValue={setValue}
            watch={watch}
          />
          <div>
            <p className="label-text">
              How do you like your food to be cooked?*
            </p>
            <fieldset id="cooked_preference" className="grid grid-cols-2">
              {COOKED_PREFERENCE_DATA.map((i) => {
                return (
                  <label
                    key={i}
                    htmlFor="cooked_preference"
                    className="label-text !font-normal">
                    <input
                      type="checkbox"
                      className="text-primary outline-none focus:ring-primary"
                      id="cooked_preference"
                      value={i}
                      {...register("cooked_preference")}
                    />
                    &ensp;{i}
                  </label>
                );
              })}
            </fieldset>
            {errors.cooked_preference && (
              <p className="helper-text mt-1 font-medium !text-red-400">
                {errors.cooked_preference?.message}
              </p>
            )}
          </div>
          <InputForm
            id="food_allergy"
            name="food_allergy"
            type="textarea"
            labelText="Food Allergy*"
            error={errors}
            register={register}
            aboveLabel="Indicate any food allergy"
          />
          <div className="flex flex-row-reverse">
            <SubmitButton isLoading={isLoading} />
          </div>
        </form>
      </section>
    </CustomerLayout>
  );
};

export default Survey;
