import OrderSummaryCard from "@/client/components/card/OrderSummaryCard";
import { FormatCurrency } from "@/client/lib/TextFormatter";
import FoodStallTitle from "@/client/components/FoodStallTitle";

const placeorder = () => {
  return (
    <section className="bg-white px-4">
      <form action="">
        <div className="mt-2 flex w-full max-w-7xl items-center ">
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
        <FoodStallTitle
          text="Zeus Silog"
          src="/.././public/jollibee-logo.jpg"
          alt="Zeus Silog"
        />
        <OrderSummaryCard
          src="/.././public/food-placeholder.jpg"
          alt="sisig"
          text="Sinigang"
          price={45.0}
        />
        <OrderSummaryCard
          src="/.././public/food-placeholder.jpg"
          alt="sisig"
          text="Sinigang"
          price={45.0}
        />
        <hr />
        <div className="my-8">
          <div>
            <p className="font-brocha text-lg font-bold ">Have a promo code?</p>
          </div>
          <div>
            <div className="flex">
              <div className="relative w-full md:max-w-md">
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
          <div className="items-between flex w-full flex-col rounded-3xl bg-gray-50 px-6 py-4 text-sm text-gray-500 md:max-w-md">
            <div className="my-1 flex justify-between">
              <p className="font-semibold">Subtotal</p>
              <p className="font-semibold">
                {FormatCurrency(180, "PHP", true)}
              </p>
            </div>
            <div className="my-1 flex justify-between">
              <p className="font-semibold">VAT</p>
              <p className="font-semibold">
                {FormatCurrency(21.6, "PHP", true)}
              </p>
            </div>
            <div className="mt-1 mb-8 flex justify-between">
              <p className="font-semibold">Coupon Discount</p>
              <p className="font-semibold">{FormatCurrency(0, "PHP", true)}</p>
            </div>
            <div>
              <hr />
            </div>
            <div className="flex justify-between pt-4 text-lg text-highlight">
              <p className="font-semibold ">Total</p>
              <p className="font-semibold">
                {FormatCurrency(201.6, "PHP", true)}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="my-12 w-full bg-secondary font-brocha text-highlight md:max-w-md">
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
};

export default placeorder;
