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
import { useStallConfigurationStore } from "@/client/store";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { InputForm, SelectForm } from "@/client/components/form";
import { SubmitButton } from "@/client/components/buttons";

const OperatingHours = () => {
  const { stall } = useStallConfigurationStore();
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
  const {
    data: stallOperationHoursData,
    refetch: stallOperationHoursRefetch,
    status: stallOperationHoursStatus,
  } = trpc.stall.settings.getStallOperationTime.useQuery(
    {
      id: stall.id as string,
    },
    {
      onSuccess: (data) => {
        if (data?.operatingHours) {
          const parseJSON = JSON.parse(
            data.operatingHours
          ) as CreateStallSettingsSchema;
          setValue("id", data.id);
          setValue("type", parseJSON.type);
          setValue("startTime", parseJSON.startTime);
          setValue("endTime", parseJSON.endTime);
          setValue("days", parseJSON.days);
          setValue("operationHours", parseJSON.operationHours); // #TODO: when updating or checked another days the input time will be go to that index
        }
      },
    }
  );
  const { mutate: updateStallClosed } =
    trpc.stall.settings.updateStallClosed.useMutation({
      onSuccess: (data) => {
        stallOperationHoursRefetch();
        if (data.isClosed) {
          toast.success("Stall is now closed", {
            icon: "🚫",
          });
        } else {
          toast.success("Stall is now open", {
            icon: "🟢",
          });
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
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
    mutate({
      ...values,
      id: stall.id as string,
    });
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
              checked={stallOperationHoursData?.isClosed}
              onChange={(e) => {
                updateStallClosed({
                  id: stall.id as string,
                  isClosed: e.target.checked,
                });
              }}
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
          {stallOperationHoursStatus === "success" && (
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
                    {DAYS.map((day, indexes) => {
                      return (
                        <label className="font-poppins" htmlFor={day}>
                          <input
                            className="inline-block text-primary outline-none focus:ring-primary"
                            type="checkbox"
                            id={day}
                            value={day}
                            checked={watch("days")?.includes(day)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                const value = [watch("days"), day].flat(1);
                                setValue(`days`, value);
                                setValue(`operationHours.${indexes}.day`, day);
                              } else {
                                setValue(
                                  `days`,
                                  watch("days")?.filter(
                                    (i) => i !== day && i !== null
                                  )
                                );
                                setValue(`operationHours.${indexes}`, null);
                              }
                            }}
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
                watch("type") === "Custom" &&
                DAYS?.map((i, index) => {
                  if (!watch("days")?.includes(i)) return null;
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
                        />
                        <div className="h-[1px] w-7 bg-highlight" />
                        <InputForm
                          id={`operationHours[${index}].endTime`}
                          name={`operationHours[${index}].endTime`}
                          type="time"
                          labelText="End Time*"
                          error={errors}
                          register={register}
                        />
                      </div>
                    </div>
                  );
                })}
              <SubmitButton isLoading={submitIsLoading} />
            </form>
          )}
        </div>
      </section>
    </StallLayout>
  );
};

export default OperatingHours;
