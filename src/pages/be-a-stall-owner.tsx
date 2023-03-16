import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/server/utils/trpc";
import {
  CreateRegistrantSchema,
  createRegistrantSchema,
} from "@/server/schema/public";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import { FileUploader, InputForm, SelectForm } from "@/client/components/form";
import { HomeLayout } from "@/client/components/layout";

const BeAStallOwner = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useForm<CreateRegistrantSchema>({
    resolver: zodResolver(createRegistrantSchema),
  });

  const { data: registrantProvData, isFetching: registrantProvIsLoading } =
    trpc.address.getProvinces.useQuery();
  const { data: registrantCityData, isFetching: registrantCityIsLoading } =
    trpc.address.getCities.useQuery({
      prov_code: watch("registrant.address.prov_code"),
    });
  const { data: registrantBrgyData, isFetching: registrantBrgyIsLoading } =
    trpc.address.getBrgy.useQuery({
      city_code: watch("registrant.address.city_code"),
    });

  const { data: ownerProvData, isFetching: ownerProvIsLoading } =
    trpc.address.getProvinces.useQuery();
  const { data: ownerCityData, isFetching: ownerCityIsLoading } =
    trpc.address.getCities.useQuery({
      prov_code: watch("owner.address.prov_code"),
    });
  const { data: ownerBrgyData, isFetching: ownerBrgyIsLoading } =
    trpc.address.getBrgy.useQuery({
      city_code: watch("owner.address.city_code"),
    });

  const {
    data: representativeProvData,
    isFetching: representativeProvIsLoading,
  } = trpc.address.getProvinces.useQuery();
  const {
    data: representativeCityData,
    isFetching: representativeCityIsLoading,
  } = trpc.address.getCities.useQuery({
    prov_code: watch("representative.address.prov_code"),
  });
  const {
    data: representativeBrgyData,
    isFetching: representativeBrgyIsLoading,
  } = trpc.address.getBrgy.useQuery({
    city_code: watch("representative.address.city_code"),
  });

  const { mutate: createRegistrant } = trpc.public.createRegistrant.useMutation(
    {
      onSuccess: () => {
        toast.success("Success");
        push("/notification");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSubmit = async (value: CreateRegistrantSchema) => {
    createRegistrant(value);
  };

  return (
    <HomeLayout>
      <div className="decorated-underline mt-5 md:w-1/2">
        <h5 className="font-bold">Be a Stall Owner</h5>
        <div />
        <p className="text-md mt-4 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo nemo
          autem, beatae in quis sunt fugiat dignissimos consequatur nesciunt,
          ducimus eaque perspiciatis quam. Explicabo quam nobis deserunt unde
          eos qui.
        </p>
      </div>

      <form className="flex flex-wrap" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex lg:w-1/2 lg:justify-between lg:pr-6">
          <div className="decorated-underline pb-8">
            <h6>Stall Information</h6>
            <div />
            <p className="text-md mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <div className="w-full flex-col space-y-3 lg:w-1/2">
          <div>
            <InputForm
              id="registrant.name"
              type="text"
              labelText="Stall Name"
              name="stallname"
              error={errors}
              register={register}
            />
          </div>
          <div>
            <InputForm
              id="registrant.address.addressLine"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="registrant.address.addressLine"
              error={errors}
              register={register}
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="registrant.address.prov_code"
                placeholder="Province"
                data={registrantProvData}
                filterBy="prov_name"
                selectedBy="prov_code"
                setValue={setValue}
                watch={watch}
                isLoading={registrantProvIsLoading}
              />
            </div>
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="registrant.address.city_code"
                placeholder="City"
                data={registrantCityData}
                filterBy="city_name"
                selectedBy="city_code"
                setValue={setValue}
                watch={watch}
                isLoading={registrantCityIsLoading}
              />
            </div>
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="registrant.address.brgyId"
                placeholder="Barangay"
                data={registrantBrgyData}
                filterBy="brgy_loc"
                selectedBy="id"
                setValue={setValue}
                watch={watch}
                isLoading={registrantBrgyIsLoading}
              />
            </div>
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="w-1/2">
              <InputForm
                id="registrant.contactNo"
                type="text"
                labelText="Contact No."
                name="registrant.contactNo"
                error={errors}
                register={register}
              />
            </div>
            <div className="w-1/2">
              <InputForm
                id="registrant.email"
                type="text"
                labelText="Email"
                name="registrant.email"
                helperText="You will be notified via this email."
                error={errors}
                register={register}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="md:w-[49%]">
              <FileUploader
                setValue={setValue}
                error={errors}
                crop="1:1"
                label="Logo"
                id="registrant.logo"
                defaultValue={{
                  cdnUrl: "",
                  name: "",
                }}
                getValues={getValues}
                watch={watch}
                register={register}
              />
            </div>
          </div>
        </div>

        <div className="flex lg:w-1/2 lg:justify-between lg:pr-6 lg:pt-8">
          <div className="decorated-underline mt-12 pb-8 lg:mt-5">
            <h6>Stall / Government Files</h6>
            <div />
            <p className="text-md mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <div className="w-full space-y-3 lg:w-[33%] lg:pt-12">
          <FileUploader
            crop={["16:9", "9:16"]}
            setValue={setValue}
            error={errors}
            label="DTI Permit*"
            id="dtiPermit"
            defaultValue={{
              cdnUrl: "",
              name: "",
            }}
            getValues={getValues}
            watch={watch}
            register={register}
          />
          <FileUploader
            crop={["16:9", "9:16"]}
            setValue={setValue}
            error={errors}
            label="Sanitary Permit*"
            id="sanitaryPermit"
            defaultValue={{
              cdnUrl: "",
              name: "",
            }}
            getValues={getValues}
            watch={watch}
            register={register}
          />
          <FileUploader
            crop={["16:9", "9:16"]}
            setValue={setValue}
            error={errors}
            label="Business Permit*"
            id="businessPermit"
            defaultValue={{
              cdnUrl: "",
              name: "",
            }}
            getValues={getValues}
            watch={watch}
            register={register}
          />
        </div>
        <div className="flex lg:w-1/2 lg:justify-between lg:pr-6 lg:pt-8">
          <div className="decorated-underline mt-12 pb-8 lg:mt-5">
            <h6>Business Owner Information</h6>
            <div />
            <p className="text-md mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <div className="w-full flex-col space-y-3 lg:w-1/2 lg:pt-12">
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <InputForm
                id="owner.firstName"
                type="text"
                labelText="First Name"
                name="owner.firstName"
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="owner.middleName"
                type="text"
                labelText="Middle Name"
                name="owner.middleName"
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="owner.lastName"
                type="text"
                labelText="Last Name"
                name="owner.lastName"
                error={errors}
                register={register}
              />
            </div>
          </div>
          <div>
            <InputForm
              id="owner.address.addressLine"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="owner.address.addressLine"
              error={errors}
              register={register}
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="owner.address.prov_code"
                placeholder="Province"
                data={ownerProvData}
                filterBy="prov_name"
                selectedBy="prov_code"
                setValue={setValue}
                watch={watch}
                isLoading={ownerProvIsLoading}
              />
            </div>
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="owner.address.city_code"
                placeholder="City"
                data={ownerCityData}
                filterBy="city_name"
                selectedBy="city_code"
                setValue={setValue}
                watch={watch}
                isLoading={ownerCityIsLoading}
              />
            </div>
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="owner.address.brgyId"
                placeholder="Barangay"
                data={ownerBrgyData}
                filterBy="brgy_loc"
                selectedBy="id"
                setValue={setValue}
                watch={watch}
                isLoading={ownerBrgyIsLoading}
              />
            </div>
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="w-1/2">
              <InputForm
                id="owner.contactNo"
                type="text"
                labelText="Contact No."
                name="owner.contactNo"
                error={errors}
                register={register}
              />
            </div>
            <div className="w-1/2">
              <InputForm
                id="owner.email"
                type="text"
                labelText="Email"
                name="owner.email"
                error={errors}
                register={register}
              />
            </div>
          </div>
        </div>

        <div className="flex lg:w-1/2 lg:justify-between lg:pt-8">
          <div className="decorated-underline mt-12 pb-8 lg:mt-5">
            <h6>Contact Person Information</h6>
            <div />
            <p className="text-md mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <div className="w-full flex-col space-y-3 lg:w-1/2 lg:pt-12">
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <InputForm
                id="representative.firstName"
                type="text"
                labelText="First Name"
                name="representative.firstName"
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="representative.middleName"
                type="text"
                labelText="Middle Name"
                name="representative.middleName"
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="representative.lastName"
                type="text"
                labelText="Last Name"
                name="representative.lastName"
                error={errors}
                register={register}
              />
            </div>
          </div>
          <div>
            <InputForm
              id="representative.address.addressLine"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="representative.address.addressLine"
              error={errors}
              register={register}
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="representative.address.prov_code"
                placeholder="Province"
                data={representativeProvData}
                filterBy="prov_name"
                selectedBy="prov_code"
                setValue={setValue}
                watch={watch}
                isLoading={representativeProvIsLoading}
              />
            </div>
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="representative.address.city_code"
                placeholder="City"
                data={representativeCityData}
                filterBy="city_name"
                selectedBy="city_code"
                setValue={setValue}
                watch={watch}
                isLoading={representativeCityIsLoading}
              />
            </div>
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="representative.address.brgyId"
                placeholder="Barangay"
                data={representativeBrgyData}
                filterBy="brgy_loc"
                selectedBy="id"
                setValue={setValue}
                watch={watch}
                isLoading={representativeBrgyIsLoading}
              />
            </div>
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="w-1/2">
              <InputForm
                id="representative.contactNo"
                type="text"
                labelText="Contact No."
                name="representative.contactNo"
                error={errors}
                register={register}
              />
            </div>
            <div className="w-1/2">
              <InputForm
                id="representative.email"
                type="text"
                labelText="Email"
                name="representative.email"
                error={errors}
                register={register}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="focus:tertiary my-10 ml-auto flex  w-32 bg-secondary text-highlight hover:bg-primary focus:ring">
          Submit
        </button>
      </form>
    </HomeLayout>
  );
};

export default BeAStallOwner;
