/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { trpc } from "@/server/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { formatDate } from "@/client/lib/TextFormatter";
import {
  CreateStallAccountSchema,
  createStallAccountSchema,
} from "@/server/schema/application/user";
import { useStallConfigurationStore } from "@/client/store";

import { InputForm, SelectForm } from "@/client/components/form";
import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";
import { Spinner } from "@/client/components/loader";
import ModalTemplate from "@/client/components/modal/ModalTemplate";
import { SubmitButton } from "@/client/components/buttons";

const User = () => {
  const { stall } = useStallConfigurationStore();
  const { query } = useRouter();
  const [ids, setIds] = useState<string[] | undefined>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const ORDER_BY_OPTION = [
    {
      label: "Name (Asc)",
      value: "name_asc",
    },
    {
      label: "Name (Desc)",
      value: "name_desc",
    },
  ];
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<CreateStallAccountSchema>({
    resolver: yupResolver(createStallAccountSchema),
  });

  const { data, isLoading, refetch } =
    trpc.application.user.getAllUser.useQuery({
      registrantId: stall.id,
      orderBy: query.orderBy as string,
      search: query.search as string,
    });

  const { data: provData, isFetching: provIsFetching } =
    trpc.address.getProvinces.useQuery(undefined, {
      enabled: isAddUserModalOpen,
    });
  const { data: cityData, isFetching: cityIsFetching } =
    trpc.address.getCities.useQuery(
      {
        prov_code: watch("person.address.prov_code"),
      },
      {
        enabled: isAddUserModalOpen,
      }
    );
  const { data: brgyData, isFetching: brgyIsFetching } =
    trpc.address.getBrgy.useQuery(
      {
        city_code: watch("person.address.city_code"),
      },
      {
        enabled: isAddUserModalOpen,
      }
    );

  const { mutate: addUser } = trpc.stall.user.createAccount.useMutation({
    onSuccess: () => {
      setSubmitIsLoading(false);
      setIsAddUserModalOpen(false);
      refetch();
      toast.success("Account created successfully");
    },
    onError: (err) => {
      setSubmitIsLoading(false);
      toast.error(err.message);
    },
  });

  const { mutate } = trpc.application.user.deleteUser.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted user.");
      setIds([]);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const selectIds = (id: string, type?: "select-all") => {
    if (type === "select-all") {
      return data?.length === ids?.length
        ? setIds([])
        : setIds(data?.map((i) => i.id));
    }
    if (ids?.includes(id)) {
      return setIds(ids?.filter((i) => i !== id));
    }
    return ids?.length ? setIds([...ids, id]) : setIds([id]);
  };

  const onSubmit = async (values: CreateStallAccountSchema) => {
    setSubmitIsLoading(true);
    addUser({
      ...values,
      registrantId: stall.id,
    });
  };

  return (
    <StallLayout>
      <StallHeader
        title="Users"
        filterQuery="orderBy"
        filter={
          <>
            <option value="default" selected>
              Sort By
            </option>
            {ORDER_BY_OPTION.map((value) => {
              return (
                <option key={value.value} value={value.value}>
                  {value.label}
                </option>
              );
            })}
          </>
        }
        search
        buttonText="Add User"
        onClickButton={() => {
          setIsAddUserModalOpen(true);
        }}
      />
      {ids && ids?.length > 1 ? (
        <button
          className="my-1 ml-1 bg-red-500 !p-1 text-sm text-white"
          onClick={() => {
            mutate({
              id: ids,
            });
          }}>
          Delete
        </button>
      ) : null}
      <section id="users" className="bg-white">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <label
                    id="select-all"
                    htmlFor="select-all"
                    className="sr-only">
                    Select All
                  </label>
                  <input
                    type="checkbox"
                    id="select-all"
                    name="select-all"
                    className="h-5 w-5 rounded border-gray-300 text-secondary checked:ring-secondary focus:ring-secondary"
                    onChange={() => selectIds("", "select-all")}
                    checked={ids?.length === data?.length && !isEmpty(data)}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {!isEmpty(data) ? (
                data?.map((value) => {
                  return (
                    <tr key={value.id}>
                      <td>
                        <input
                          type="checkbox"
                          id={value.id}
                          name="select-all"
                          className="h-5 w-5 rounded border-gray-300 text-secondary checked:ring-secondary focus:ring-secondary"
                          onChange={() => selectIds(value.id)}
                          checked={ids?.includes(value.id)}
                        />
                      </td>
                      <Link href={`users/${value.id}`}>
                        <td className="mt-1 flex items-center gap-x-3 ">
                          <div className="heading h-9 w-9 overflow-hidden rounded-full bg-gray-200 text-center font-medium uppercase leading-[36px]">
                            {value?.person?.firstName.charAt(0)}
                            {value?.person?.lastName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">
                              {value.person?.firstName}
                              {value.person?.middleName &&
                                ` ${value.person.middleName} `}
                              {value.person?.lastName}
                            </p>
                          </div>
                        </td>
                      </Link>
                      <td>{value.email}</td>
                      <td>
                        <p>
                          {value.person?.address?.addressLine &&
                            `${value.person?.address?.addressLine} `}
                          {value.person?.address?.province.prov_name}{" "}
                          {value.person?.address?.city.city_name}
                          {value.person?.address?.Brgy?.brgy_loc &&
                            ` ${value.person?.address?.Brgy.brgy_loc}`}
                        </p>
                      </td>
                      <td>{formatDate(value.createdAt)}</td>
                      <td>
                        <ActionDropdown
                          viewOnClick={`users/${value.id}`}
                          options={["View", "Delete"]}
                          onDelete={() => {
                            mutate({
                              id: value.id,
                            });
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="w-52">
                    {isLoading ? <Spinner /> : "No data available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <ModalTemplate
        title="Add User"
        isOpenModal={isAddUserModalOpen}
        setIsOpenModal={setIsAddUserModalOpen}
        bodyClassName="max-w-2xl min-h-[30vh]">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-col space-y-2 md:w-full">
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
            <div className="mt-4 flex justify-end gap-x-2">
              <button
                type="reset"
                className="bg-yellow-400 text-black"
                onClick={() => {
                  reset();
                  setIsAddUserModalOpen(false);
                }}>
                Cancel
              </button>
              <SubmitButton isLoading={submitIsLoading} />
            </div>
          </div>
        </form>
      </ModalTemplate>
    </StallLayout>
  );
};

export default User;
