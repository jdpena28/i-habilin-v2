import BackgroundImage from "@public/background-image";
import InputForm from "@/client/components/form/InputForm";

const admin = () => {
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
                This signup page is hidden for public and grant authorization of
                Super Admin.
              </p>
            </div>

            <form>
              <div className="flex-col space-y-2 md:w-full lg:pt-6">
                <div className="flex w-full space-x-2">
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
                <div className="flex w-full space-x-2">
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
                <div>
                  <InputForm
                    id="stalladdress"
                    type="text"
                    labelText="Contact Number"
                    name="stalladdress"
                  />
                </div>
                <div>
                  <InputForm
                    id="stalladdress"
                    type="text"
                    labelText="Email"
                    name="stalladdress"
                  />
                </div>
                <div>
                  <InputForm
                    id="stalladdress"
                    type="text"
                    labelText="Password"
                    name="stalladdress"
                  />
                </div>
                <div>
                  <InputForm
                    id="stalladdress"
                    type="text"
                    labelText="Confirm Password"
                    name="stalladdress"
                  />
                </div>
              </div>
              <button
                type="button"
                className="focus:tertiary mt-6 w-full bg-secondary text-highlight hover:bg-primary focus:ring">
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default admin;
