/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trpc } from "@/server/utils/trpc";
import {
  CreateAccountSchema,
  createAccountSchema,
  getSuperAdminPassword,
  GetSuperAdminPassword,
} from "@/server/schema/public";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import BackgroundImage from "@public/public/background-image";
import InputForm from "@/client/components/form/InputForm";
import { SelectForm } from "@/client/components/form";
import { SubmitButton } from "@/client/components/buttons";

const Signup = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CreateAccountSchema>({
    resolver: yupResolver(createAccountSchema),
  });

  const {
    register: registerSuperAdmin,
    handleSubmit: registerHandleSubmit,
    formState: { errors: errorsSuperAdmin },
  } = useForm<GetSuperAdminPassword>({
    resolver: yupResolver(getSuperAdminPassword),
  });

  const [isAuthenticateViaPassword, setIsAuthenticatedViaPassword] =
    useState<boolean>(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const { data: provData, isFetching: provIsFetching } =
    trpc.address.getProvinces.useQuery();
  const { data: cityData, isFetching: cityIsFetching } =
    trpc.address.getCities.useQuery({
      prov_code: watch("person.address.prov_code"),
    });
  const { data: brgyData, isFetching: brgyIsFetching } =
    trpc.address.getBrgy.useQuery({
      city_code: watch("person.address.city_code"),
    });
  const { mutate } = trpc.public.createAccount.useMutation({
    onSuccess: () => {
      setSubmitIsLoading(false);
      toast.success("Account created successfully");
      push("/auth/login");
    },
    onError: (err) => {
      setSubmitIsLoading(false);
      toast.error(err.message);
    },
  });

  const { mutate: superAdminPasswordMutate } =
    trpc.public.getPassword.useMutation({
      onSuccess: (data) => {
        setIsAuthenticatedViaPassword(data);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const onSubmit = (values: CreateAccountSchema) => {
    setSubmitIsLoading(true);
    mutate(values);
  };

  const onSubmitSuperAdminPassword = (values: GetSuperAdminPassword) => {
    superAdminPasswordMutate(values);
  };

  if (isAuthenticateViaPassword) {
    return (
      <section className="container mx-auto flex min-h-screen items-center">
        <div className="mx-auto rounded-lg bg-white shadow-xl">
          <div className=" flex max-w-[59rem] flex-col lg:w-full lg:flex-row ">
            <div className="w-0 lg:w-full">
              <BackgroundImage />
            </div>

            <div className="flex-col p-4 md:mt-10 md:w-full md:px-6 md:pt-6">
              <div className="decorated-underline mb-5">
                <h4 className="font-bold">I-Habilin</h4>
                <div />
              </div>
              <div className="space-y-2">
                <h6 className="text-xl font-bold">
                  Do not share to unauthorized person.
                </h6>
                <p>
                  This signup page is hidden for public and grant authorization
                  of Super Admin.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-col space-y-2 md:w-full lg:pt-6">
                  <div className="flex w-full space-x-2">
                    <div className="md:w-1/3">
                      <InputForm
                        id="person.firstName"
                        type="text"
                        labelText="First Name*"
                        name="person.firstName"
                        error={errors}
                        register={register}
                      />
                    </div>
                    <div className="md:w-1/3">
                      <InputForm
                        id="person.middleName"
                        type="text"
                        labelText="Middle Name"
                        name="person.firstName"
                        error={errors}
                        register={register}
                      />
                    </div>
                    <div className="md:w-1/3">
                      <InputForm
                        id="person.lastName"
                        type="text"
                        labelText="Last Name*"
                        name="person.lastName"
                        error={errors}
                        register={register}
                      />
                    </div>
                  </div>
                  <div>
                    <InputForm
                      id="person.address.addressLine"
                      type="text"
                      labelText="House no. / Block / Subdivision / Lot No. / Street"
                      name="person.address.addressLine"
                      error={errors}
                      register={register}
                    />
                  </div>
                  <div className="flex w-full space-x-2">
                    <div className="md:w-1/3">
                      <SelectForm
                        register={register}
                        error={errors}
                        id="person.address.prov_code"
                        placeholder="Province*"
                        data={provData}
                        filterBy="prov_name"
                        selectedBy="prov_code"
                        setValue={setValue}
                        watch={watch}
                        isLoading={provIsFetching}
                      />
                    </div>
                    <div className="md:w-1/3">
                      <SelectForm
                        register={register}
                        error={errors}
                        id="person.address.city_code"
                        placeholder="City*"
                        data={cityData}
                        filterBy="city_name"
                        selectedBy="city_code"
                        setValue={setValue}
                        watch={watch}
                        isLoading={cityIsFetching}
                      />
                    </div>
                    <div className="md:w-1/3">
                      <SelectForm
                        register={register}
                        error={errors}
                        id="person.address.brgyId"
                        placeholder="Barangay"
                        data={brgyData}
                        filterBy="brgy_loc"
                        selectedBy="id"
                        setValue={setValue}
                        watch={watch}
                        isLoading={brgyIsFetching}
                      />
                    </div>
                  </div>
                  <div>
                    <InputForm
                      id="person.contactNo"
                      type="text"
                      labelText="Contact Number*"
                      name="person.contactNo"
                      error={errors}
                      register={register}
                    />
                  </div>
                  <div>
                    <InputForm
                      id="person.email"
                      sideEffect={() => {
                        setValue("email", watch("person.email"));
                      }}
                      type="email"
                      labelText="Email*"
                      name="person.email"
                      error={errors}
                      register={register}
                    />
                  </div>
                  <div>
                    <InputForm
                      id="password"
                      type="password"
                      labelText="Password*"
                      name="password"
                      error={errors}
                      register={register}
                    />
                  </div>
                  <div>
                    <InputForm
                      id="confirmPassword"
                      type="password"
                      labelText="Confirm Password*"
                      name="confirmPassword"
                      error={errors}
                      register={register}
                    />
                  </div>
                </div>
                <SubmitButton
                  text="Create an account"
                  className="mt-6 !w-full bg-secondary !text-highlight hover:bg-primary focus:ring"
                  isLoading={submitIsLoading}
                />
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </section>
    );
  }
  return (
    <section className="container mx-auto flex min-h-screen items-center">
      <form
        className="mx-auto w-full max-w-lg space-y-3"
        onSubmit={registerHandleSubmit(onSubmitSuperAdminPassword)}>
        <label className="label-text" htmlFor="password">
          Please enter the Super Admin password.
        </label>
        <InputForm
          id="password"
          type="password"
          labelText="Password*"
          name="password"
          error={errorsSuperAdmin}
          register={registerSuperAdmin}
        />
        <div className="flex justify-end">
          <button className="bg-primary">Submit</button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default Signup;
