import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateRegistrantSchema,
  createRegistrantSchema,
} from "@/server/schema/public";

import { InputForm, SelectForm } from "@/client/components/form";
import { HomeLayout } from "@/client/components/layout";

const BeAStallOwner = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CreateRegistrantSchema>({
    resolver: zodResolver(createRegistrantSchema),
  });

  const onSubmit = () => {
    alert("Submitted");
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
              id="registrant.stallName"
              type="text"
              labelText="Stall Name"
              name="stallname"
              error={errors}
              register={register}
            />
          </div>
          <div>
            <InputForm
              id="registrant.address.addressLine1"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="stalladdress"
              error={errors}
              register={register}
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <SelectForm
                register={register}
                error={errors}
                id="registrant.address.provCode"
                data={[
                  {
                    id: 1,
                    text: "Metro Manila",
                  },
                  {
                    id: 2,
                    text: "Cavite",
                  },
                ]}
                filterBy="text"
                selectedBy="id"
                setValue={setValue}
                watch={watch}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="registrant.address.cityCode"
                type="text"
                labelText="City"
                name="city"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="registrant.address.brgyId"
                type="text"
                labelText="Barangay"
                name="barangay"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
                register={register}
              />
            </div>
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="w-1/2">
              <InputForm
                id="registrant.contactNo"
                type="text"
                labelText="Contact No."
                name="contactno"
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
              <InputForm
                id="registrant.logo"
                type="text"
                labelText="Logo"
                name="email"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
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
          <InputForm
            id="dtiPermit.media"
            type="text"
            labelText="DTI Permit"
            name="email"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                  clipRule="evenodd"
                />
              </svg>
            }
            error={errors}
            register={register}
          />
          <InputForm
            id="sanitaryPermit.media"
            type="text"
            labelText="Sanitary Permit"
            name="email"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                  clipRule="evenodd"
                />
              </svg>
            }
            error={errors}
            register={register}
          />
          <InputForm
            id="businessPermit.media"
            type="text"
            labelText="Business Permit"
            name="email"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                  clipRule="evenodd"
                />
              </svg>
            }
            error={errors}
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
              id="owner.address.addressLine1"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="owner.address.addressLine1"
              error={errors}
              register={register}
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <InputForm
                id="owner.address.provCode"
                type="text"
                labelText="Province"
                name="owner.address.provCode"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="owner.address.cityCode"
                type="text"
                labelText="City"
                name="owner.address.cityCode"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="owner.address.brgyId"
                type="text"
                labelText="Barangay"
                name="owner.address.brgyId"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
                register={register}
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
              id="representative.address.addressLine1"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="representative.address.addressLine1"
              error={errors}
              register={register}
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <InputForm
                id="representative.address.provCode"
                type="text"
                labelText="Province"
                name="representative.address.provCode"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="representative.address.cityCode"
                type="text"
                labelText="City"
                name="representative.address.cityCode"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
                register={register}
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="representative.address.brgyId"
                type="text"
                labelText="Barangay"
                name="representative.address.brgyId"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                error={errors}
                register={register}
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
        <pre>{JSON.stringify(watch(), null, 1)}</pre>
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
