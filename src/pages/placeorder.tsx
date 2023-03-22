import OrderSummaryCard from "@/client/components/OrderSummaryCard";

const placeorder = () => {
  return (
    <section className="bg-white px-4">
      <form action="">
        <div className="mt-2 mb-10 flex w-full max-w-5xl items-center ">
          <div>
            <button
              type="button"
              className="flex rounded-full text-blue-700 hover:bg-gray-200 hover:text-white">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 32 32">
                <path
                  d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                  data-name="4-Arrow Left"
                />
              </svg>
            </button>
          </div>
          <div className="mr-10 flex w-full justify-center font-brocha text-xl font-bold">
            My Order
          </div>
        </div>
        <OrderSummaryCard text="Sinigang" price={45.0} />
        <div className="my-8">
          <div>
            <p className="font-brocha text-lg font-bold">Have a promo code?</p>
          </div>
          <div className="">
            <div className="flex">
              <div className="relative w-full max-w-5xl">
                <input
                  type="text"
                  className="h-14 w-full rounded-3xl border-none bg-gray-50 pr-20"
                  placeholder="Enter promo code here"
                />
                <div className="absolute top-2 right-3">
                  <button
                    type="button"
                    className="h-10 w-28 rounded-2xl bg-secondary text-sm text-highlight">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className="font-brocha text-lg font-bold">Order Summary</p>
          </div>
          <div className="items-between flex w-full max-w-5xl flex-col rounded-3xl bg-gray-50 px-6 py-4 text-sm text-gray-500">
            <div className="my-1 flex justify-between">
              <p className="font-semibold">Subtotal</p>
              <p className="font-semibold">₱ 180.00 </p>
            </div>
            <div className="my-1 flex justify-between">
              <p className="font-semibold">VAT</p>
              <p className="font-semibold">₱ 21.60 </p>
            </div>
            <div className="mt-1 mb-8 flex justify-between">
              <p className="font-semibold">Coupon Discount</p>
              <p className="font-semibold">₱ 0</p>
            </div>
            <div>
              <hr />
            </div>
            <div className="flex justify-between pt-4 text-lg text-highlight">
              <p className="font-semibold ">Total</p>
              <p className="font-semibold">₱ 201.60 </p>
            </div>
          </div>
          <button
            type="button"
            className="my-24 w-full max-w-5xl bg-secondary font-brocha text-highlight">
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
};

export default placeorder;
