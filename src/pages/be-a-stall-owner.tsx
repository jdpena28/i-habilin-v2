import { InputForm } from "@/client/components/form";
import { HomeLayout } from "@/client/components/layout";

const BeAStallOwner = () => {
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

      <form className="flex flex-wrap">
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
              id="stallname"
              type="text"
              labelText="Stall Name"
              name="stallname"
            />
          </div>
          <div>
            <InputForm
              id="stalladdress"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="stalladdress"
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <InputForm
                id="province"
                type="text"
                labelText="Province"
                name="province"
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
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="city"
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
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="barangay"
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
              />
            </div>
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="w-1/2">
              <InputForm
                id="contactno"
                type="text"
                labelText="Contact No."
                name="contactno"
              />
            </div>
            <div className="w-1/2">
              <InputForm
                id="stallname"
                type="text"
                labelText="Email"
                name="stallname"
                helperText="You will be notified via this email."
              />
            </div>
          </div>
          <div className="w-full">
            <div className="md:w-[49%]">
              <InputForm
                id="email"
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
            id="email"
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
          />
          <InputForm
            id="email"
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
          />
          <InputForm
            id="email"
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
                id="stalladdress"
                type="text"
                labelText="First Name"
                name="stalladdress"
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="stalladdress"
                type="text"
                labelText="Middle Name"
                name="stalladdress"
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="stalladdress"
                type="text"
                labelText="Last Name"
                name="stalladdress"
              />
            </div>
          </div>
          <div>
            <InputForm
              id="stalladdress"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="stalladdress"
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <InputForm
                id="email"
                type="text"
                labelText="Province"
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
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="email"
                type="text"
                labelText="City"
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
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="email"
                type="text"
                labelText="Barangay"
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
              />
            </div>
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="w-1/2">
              <InputForm
                id="stallname"
                type="text"
                labelText="Contact No."
                name="stallname"
              />
            </div>
            <div className="w-1/2">
              <InputForm
                id="stallname"
                type="text"
                labelText="Email"
                name="stallname"
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
                id="stalladdress"
                type="text"
                labelText="First Name"
                name="stalladdress"
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="stalladdress"
                type="text"
                labelText="Middle Name"
                name="stalladdress"
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="stalladdress"
                type="text"
                labelText="Last Name"
                name="stalladdress"
              />
            </div>
          </div>
          <div>
            <InputForm
              id="stalladdress"
              type="text"
              labelText="House no. / Block / Subdivision / Lot No. / Street"
              name="stalladdress"
            />
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="md:w-1/3">
              <InputForm
                id="email"
                type="text"
                labelText="Province"
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
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="email"
                type="text"
                labelText="City"
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
              />
            </div>
            <div className="md:w-1/3">
              <InputForm
                id="email"
                type="text"
                labelText="Barangay"
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
              />
            </div>
          </div>
          <div className="flex w-full space-x-3 ">
            <div className="w-1/2">
              <InputForm
                id="stallname"
                type="text"
                labelText="Contact No."
                name="stallname"
              />
            </div>
            <div className="w-1/2">
              <InputForm
                id="stallname"
                type="text"
                labelText="Email"
                name="stallname"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="focus:tertiary my-10 ml-auto flex  w-32 bg-secondary text-highlight hover:bg-primary focus:ring">
          Submit
        </button>
      </form>
    </HomeLayout>
  );
};

export default BeAStallOwner;
