import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { isEmpty } from "lodash";

import {
  createStallSettingsSchema,
  CreateStallSettingsSchema,
} from "@/server/schema/stall/settings";
import { OPERATION_TYPE } from "@/client/constant";
import { trpc } from "@/server/utils/trpc";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { InputForm, SelectForm } from "@/client/components/form";
import { SubmitButton } from "@/client/components/buttons";

const OperatingHours = () => {
  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CreateStallSettingsSchema>({
    resolver: yupResolver(createStallSettingsSchema),
  });

  const { mutate } = trpc.stall.settings.operationHours.useMutation({
    onSuccess: () => {
      setSubmitIsLoading(false);
      toast.success("Operating hours updated successfully");
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.error(error.message);
    },
  });

  const onSubmit = (values: CreateStallSettingsSchema) => {
    setSubmitIsLoading(true);
    mutate(values);
  };

  return (
    <StallLayout>
      <StallHeader title="Operating Hours" goBack />
      <section id="maintenance" className="space-y-3 rounded-md bg-white p-5">
        <div className="flex flex-row items-center gap-x-5">
          <p className="label-text">Closed</p>
          <label
            htmlFor="AcceptConditions"
            className="relative h-8 w-14 cursor-pointer">
            <input
              type="checkbox"
              id="AcceptConditions"
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500" />
            <span className="absolute inset-0 m-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6" />
          </label>
        </div>
        <p className="helper-text">
          By enabling it, the operation time will be altered and the stall will
          set to &quot;Closed&quot;
        </p>
        <div className="space-y-3">
          <p className="label-text !text-lg !font-semibold">Operating Time</p>
          <form
            className="max-w-3xl space-y-3"
            onSubmit={handleSubmit(onSubmit)}>
            <SelectForm
              register={register}
              error={errors}
              id="type"
              aboveLabel="Operation Type"
              placeholder="Select Type"
              data={OPERATION_TYPE}
              filterBy="text"
              selectedBy="text"
              setValue={setValue}
              watch={watch}
            />
            {watch("type") !== "Custom" ? (
              <div className="flex items-center gap-x-10">
                <InputForm
                  id="startTime"
                  name="startTime"
                  type="time"
                  labelText="Start Time*"
                  error={errors}
                  register={register}
                  aboveLabel="Start Time*"
                />
                <div className="h-[1px] w-7 bg-highlight" />
                <InputForm
                  id="endTime"
                  name="endTime"
                  type="time"
                  labelText="End Time*"
                  error={errors}
                  register={register}
                  aboveLabel="End Time*"
                />
              </div>
            ) : (
              <div>
                <p className="label-text">Days</p>
                <fieldset className="flex flex-wrap gap-3">
                  {DAYS.map((day) => {
                    return (
                      <label className="font-poppins" htmlFor={day}>
                        <input
                          className="inline-block text-primary outline-none focus:ring-primary"
                          type="checkbox"
                          id={day}
                          value={day}
                          {...register("days")}
                        />
                        &nbsp;{day}
                      </label>
                    );
                  })}
                </fieldset>
                {errors.days?.message && (
                  <p className="helper-text mt-1 font-medium !text-red-400">
                    {errors.days?.message}
                  </p>
                )}
              </div>
            )}
            {!isEmpty(watch("days")) &&
              watch("days")?.map((i, index) => {
                return (
                  <div className="flex items-center gap-x-10">
                    <p className="label-text flex-[.4]">{i}</p>
                    <div className="flex items-center gap-x-10">
                      <InputForm
                        id={`operationHours[${index}].startTime`}
                        name={`operationHours[${index}].startTime`}
                        type="time"
                        labelText="Start Time*"
                        error={errors}
                        register={register}
                        sideEffect={() => {
                          setValue(`operationHours.${index}.day`, i as string);
                        }}
                      />
                      <div className="h-[1px] w-7 bg-highlight" />
                      <InputForm
                        id={`operationHours[${index}].endTime`}
                        name={`operationHours[${index}].endTime`}
                        type="time"
                        labelText="End Time*"
                        error={errors}
                        register={register}
                        sideEffect={() => {
                          setValue(`operationHours.${index}.day`, i as string);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            <pre>{JSON.stringify(watch(), null, 1)}</pre>
            <SubmitButton isLoading={submitIsLoading} />
          </form>
        </div>
      </section>
    </StallLayout>
  );
};

export default OperatingHours;
